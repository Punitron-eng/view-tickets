<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
        <div class="custom-modal vendor-modal-outer" @click.stop>
            <div class="modal-header">
                <div class="heading-text poppins-semibold gray-800">Select Vendor</div>
                <img v-if="darkModeVal != true" class="close" src="../../assets/images/modal-close-icon.svg" alt="close-svg" @click="$emit('close-modal')" />
                <img v-else class="close" src="../../assets/images/dark-mode/dark-modal-close-icon.svg" alt="close-svg" @click="$emit('close-modal')" />
            </div>
            <div class="modal-body custp">
                <div class="input-group m-b-15">
                    <input type="text" class="form-control" placeholder="Vendor Name" name="search_vendor_name" v-model.trim="searchVendorName" id="search_vendor_name" @keydown.enter="searchData()" />
                    <div class="input-group-append" id="button-addon1">
                        <button class="btn popover-search-button" type="button" @click="searchData()">
                            <i class="pi pi-search"></i>
                        </button>
                    </div>
                </div>
                <div class="checkbox-custom-outer vendor-checkbox-custom-outer" id="modal_lazyload_content_div" @scroll="onScrollData('modal_lazyload_content_div')" ref="modal_lazyload_content_div">
                    <div v-for="allVendorData in newVendorDataArray" :key="allVendorData" class="field-checkbox">
                        <input
                            type="checkbox"
                            class="vendor-check-list hover:cursor-pointer"
                            :id="allVendorData.id"
                            name="option"
                            :value="allVendorData.company_name_short + ',' + allVendorData.id"
                            @change="getVendorNameChecked(allVendorData.company_name_short + ',' + allVendorData.id)"
                            v-model="checkboxValue"
                        />
                        <span class="input-before"></span>
                        <label :for="allVendorData.id" class="cursor-pointer helvetica-regular">{{ allVendorData.company_name_short }}</label>
                    </div>
                    <div v-if="isShowDiv" id="load_data_message">
                        <div class="text-center p-2">{{ responseText }}</div>
                    </div>
                </div>
                <div style="height: 20px" class="p-3">
                    <div class="error" v-if="isError">Please select at least one Vendor.</div>
                    <div class="response" v-if="isloading">Please Wait ...</div>
                </div>
            </div>

            <div class="modal-footer">
                <div class="col-6 apply-reset-btn" @click="applyVendorFilter()">
                    <button class="btn btn-primary w-100 filter-button-apply helvetica-regular">Apply</button>
                </div>
                <div class="col-6 apply-reset-btn" @click="resetVendorFilter()">
                    <button class="btn w-100 filter-button-reset helvetica-regular">Reset</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { getVendorDataApi } from '../../api/VendorModalData';
import { DARKMODE } from '../../store/dark-mode/constants';

const props = defineProps(['vendorId']);
const emit = defineEmits(['applyVendor', 'resetVendor', 'close-modal', 'vendorData']);

const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

const newVendorDataArray = ref([]);
const limit = ref(50);
const start = ref(0);
const action = ref('inactive');
const searchVendorName = ref('');
const inputType = ref('checkbox');
const moduleName = ref('itl-dashboard-v3');
const checkboxValue = ref([]);
const vendorApiResponse = ref([]);
const isShowDiv = ref(false);
const isError = ref(false);
const isloading = ref(false);
const responseText = ref('');
const checkIsMoreVendorAvail = ref(true);

onMounted(async () => {
    vendorApiResponse.value = [];
    if (props.vendorId !== undefined && props.vendorId != '') {
        checkboxValue.value.push(`${props.vendorId[0]},${props.vendorId[1]}`);
    } else {
        checkboxValue.value = [];
    }
    newVendorDataArray.value = [];
    isError.value = false;
    await getVendorData(50, 0);
});

const searchData = async () => {
    responseText.value = '';
    if (searchVendorName.value != '') {
        checkboxValue.value = [];
        await getVendorData(50, 0);
    } else {
        if (checkboxValue.value.length == 0) {
            isError.value = true;
            setTimeout(() => {
                isError.value = false;
            }, 1000);
        }
        return;
    }
};

const getVendorData = async (limit: number, start: number) => {
    isloading.value = true;
    const apiResponse = await getVendorDataApi(limit, start, searchVendorName.value, inputType.value);
    if (apiResponse.status === 'success') {
        if (apiResponse.is_more_data == 1) {
            checkIsMoreVendorAvail.value = true;
        } else {
            checkIsMoreVendorAvail.value = false;
        }
        isloading.value = false;
        if (searchVendorName.value !== '') {
            vendorApiResponse.value = apiResponse.all_vendors_data_array;
            newVendorDataArray.value = vendorApiResponse.value;
        } else {
            vendorApiResponse.value = apiResponse.all_vendors_data_array;
            newVendorDataArray.value = newVendorDataArray.value.concat(vendorApiResponse.value);
        }
        if (newVendorDataArray.value.length == 0) {
            action.value = 'active';
            isShowDiv.value = true;
            responseText.value = 'No Data Found';
        }
    }
};

const onScrollData = (id: any) => {
    const scrollData = document.querySelector(`#${id}`);
    if (checkIsMoreVendorAvail.value) {
        if (Math.abs(scrollData.scrollTop + scrollData.offsetHeight - scrollData.scrollHeight) <= 1) {
            start.value = start.value + limit.value;
            limit.value = 50;
            getVendorData(limit.value, start.value);
        }
    } else {
        return;
    }
};

const getVendorNameChecked = (selectedVendor) => {
    checkboxValue.value = [];
    checkboxValue.value.push(selectedVendor);
};

const applyVendorFilter = () => {
    if (checkboxValue.value.length == 0) {
        isError.value = true;
        setTimeout(() => {
            isError.value = false;
        }, 1000);
    } else {
        const data = {
            type: 'vendorModal',
            vendorData: checkboxValue.value,
        };
        emit('vendorData', data);
        emit('applyVendor', checkboxValue.value);
    }
};

const resetVendorFilter = () => {
    searchVendorName.value = '';
    vendorApiResponse.value = [];
    checkboxValue.value = [];
    newVendorDataArray.value = [];
    getVendorData(50, 0);
    emit('resetVendor');
};

defineExpose({ resetVendorFilter });
</script>
<!-- <script lang="ts">
import { defineComponent, defineProps } from 'vue';
import { getVendorDataApi } from '../../api/VendorModalData';
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { DARKMODE } from '../../store/dark-mode/constants';
const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
export default defineComponent({
    emits: ['applyVendor', 'resetVendor', 'close-modal', 'vendorData'],
    props: ['vendorId'],
    expose: ['resetVendorFilter'],
    data() {
        return {
            newVendorDataArray: [] as any,
            limit: 50,
            start: 0,
            action: 'inactive',
            searchVendorName: '',
            inputType: 'checkbox',
            moduleName: 'itl-dashboard-v3',
            checkboxValue: [],
            vendorApiResponse: [],
            isShowDiv: false,
            isError: false,
            isloading: false,
            responseText: '',
            darkModeVal: '',
            checkIsMoreVendorAvail: true,
        };
    },
    async mounted() {
        this.vendorApiResponse = [];
        if (this.$props.vendorId !== undefined && this.$props.vendorId != '') {
            this.checkboxValue.push(`${this.vendorId[0]},${this.vendorId[1]}`);
        } else {
            this.checkboxValue = [];
        }
        // this.checkboxValue.push('ITL1007 - iThink test1 - Kshitij Thorat,9');
        // console.log('this.checkboxValue',this.checkboxValue)
        // this.checkboxValue = [];
        this.newVendorDataArray = [];
        this.isError = false;
        await this.getVendorData(50, 0);
    },
    methods: {
        async searchData() {
            this.responseText = '';
            if (this.searchVendorName != '') {
                this.checkboxValue = [];
                await this.getVendorData(50, 0);
            } else {
                if (this.checkboxValue.length == 0) {
                    this.isError = true;
                    setTimeout(() => {
                        this.isError = false;
                    }, 1000);
                }
                return;
            }
        },
        async getVendorData(limit: number, start: number) {
            this.isloading = true;
            const apiResponse = await getVendorDataApi(limit, start, this.searchVendorName, this.inputType);
            if (apiResponse.status === 'success') {
                if (apiResponse.is_more_data == 1) {
                    this.checkIsMoreVendorAvail = true;
                } else {
                    this.checkIsMoreVendorAvail = false;
                }
                this.isloading = false;
                if (this.searchVendorName !== '') {
                    this.vendorApiResponse = apiResponse.all_vendors_data_array;
                    this.newVendorDataArray = this.vendorApiResponse;
                } else {
                    this.vendorApiResponse = apiResponse.all_vendors_data_array;
                    this.newVendorDataArray = this.newVendorDataArray.concat(this.vendorApiResponse);
                }
                if (this.newVendorDataArray.length == 0) {
                    this.action = 'active';
                    this.isShowDiv = true;
                    this.responseText = 'No Data Found';
                }
                // else {
                // if(apiResponse.is_more_data == 1) {
                // this.action = "inactive";
                // this.isShowDiv = true;
                // this.responseText = "Please Wait...."
                // }else {
                // this.action = "active";
                // }
                // }
            }
        },
        onScrollData(id: any) {
            const scrollData = document.querySelector(`#${id}`);
            if (this.checkIsMoreVendorAvail) {
                if (Math.abs(scrollData.scrollTop + scrollData.offsetHeight - scrollData.scrollHeight) <= 1) {
                    this.start = this.start + this.limit;
                    // searchVendor();
                    this.limit = 50;
                    // this.start = 0;
                    this.isVendorSearch = false;

                    this.getVendorData(this.limit, this.start);
                }
            } else {
                return;
            }
        },
        // onScrollData() {
        //     const scrollTop: number = window.pageYOffset || document.documentElement.scrollTop;
        //     const windowHeight: number = window.innerHeight;
        //     let tempId = document.getElementById('modal_lazyload_content_div') as HTMLElement;
        //     const modalHeight: number | undefined = tempId?.offsetHeight;

        //     if (scrollTop + windowHeight > modalHeight && this.action === 'inactive') {
        //         this.action = 'active';
        //         this.start = this.start + this.limit;
        //         setTimeout(() => {
        //             this.getVendorData(this.limit, this.start);
        //         }, 1000);
        //     }
        // },
        getVendorNameChecked(selectedVendor) {
            this.checkboxValue = [];
            this.checkboxValue.push(selectedVendor);

            // eslint-disable-next-line no-undef
            // const vendorCheckList = document.querySelectorAll('.vendor-check-list') as NodeListOf<HTMLInputElement>;
            // vendorCheckList.forEach((checkbox) => {
            //     checkbox.addEventListener('change', (event) => {
            //         const target = event.target as HTMLInputElement;
            //         if (target.checked) {
            //             vendorCheckList.forEach((checkbox) => {
            //                 checkbox.checked = false;
            //                 this.checkboxValue = [];
            //             });
            //             target.checked = true;
            //             this.checkboxValue.push(checkbox.value);
            //             console.log(this.checkboxValue,'this.checkboxValue')
            //         } else {
            //             vendorCheckList.forEach((checkbox) => {
            //                 checkbox.checked = false;
            //             });
            //         }
            //     });
            // });
        },
        applyVendorFilter() {
            if (this.checkboxValue.length == 0) {
                this.isError = true;
                setTimeout(() => {
                    this.isError = false;
                }, 1000);
            } else {
                const data = {
                    type: 'vendorModal',
                    vendorData: this.checkboxValue,
                };
                this.$emit('vendorData', data);
                this.$emit('applyVendor', this.checkboxValue);
            }
        },
        resetVendorFilter() {
            this.searchVendorName = '';
            this.vendorApiResponse = [];
            this.checkboxValue = [];
            this.newVendorDataArray = [];
            this.getVendorData(50, 0);
            this.$emit('resetVendor');
        },
    },
});
</script> -->
<style lang="scss">
@import '../../assets/itl-common-css/common-css.scss';

.vendor-modal-outer label {
    font-size: 13px !important;
    font-family: 'Inter-Regular' !important;
}

.error {
    font-family: $interRegular;

    @include theme() {
        color: theme-get('red-clr');
    }
}

.custom-modal.vendor-modal-outer {
    max-width: 600px;
    width: 600px;
}

.modal-header {
    padding: 24px 36px 23px 40px;
    border-bottom: 1px solid #e5e7eb;
    position: relative;
    border-top-left-radius: 0.1875rem;
    border-top-right-radius: 0.1875rem;
    display: flex;
    border-bottom: solid 1px rgba(9, 30, 66, 0.13);
}

.field-checkbox {
    padding-left: 0.625rem;
    padding-right: 0.625rem;
    position: relative;
}

.field-checkbox > label {
    line-height: 1.2;
    display: block;
}

.modal-footer {
    padding: 0.938rem 1.25rem 1.25rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .filter-button-apply,
    .filter-button-apply:hover,
    .filter-button-apply:focus,
    .filter-button-apply:active {
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        box-shadow: none !important;
        border-radius: 16px;
        background-image: linear-gradient(to bottom, #1ea2fa, #168afc 97%, #0e6fff);
        padding: 8px 28px;
        height: 34px;
        border: none;
        color: #fff;
        cursor: pointer;
    }

    .apply-reset-btn {
        padding-top: 0;
        padding-bottom: 0;
    }

    .filter-button-reset,
    .filter-button-reset:hover,
    .filter-button-reset:focus,
    .filter-button-reset:active {
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        box-shadow: none !important;

        // background: #fff !important;
        @include theme() {
            background-color: theme-get('background') !important;
            color: theme-get('checkbox-color');
        }

        border: none;
        padding-top: 8px;
        cursor: pointer;
        font-size: 14px;
    }
}

input.form-control {
    background: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 50px;
    padding: 8px 16px;
    font-size: 13px !important;
    width: 100%;
    height: 40px;
}

.input-group.m-b-15 {
    margin-bottom: 15px;
}

.input-group {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: stretch;
    align-items: stretch;
    width: 100%;
}

.input-group > .custom-select:not(:last-child),
.input-group > .form-control:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.input-group-append,
.input-group-prepend {
    display: -ms-flexbox;
    display: flex;
}

.input-group > .input-group-append > .btn,
.input-group > .input-group-append > .input-group-text,
.input-group > .input-group-prepend:first-child > .btn:not(:first-child),
.input-group > .input-group-prepend:first-child > .input-group-text:not(:first-child),
.input-group > .input-group-prepend:not(:first-child) > .btn,
.input-group > .input-group-prepend:not(:first-child) > .input-group-text {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.input-group-append .btn,
.input-group-prepend .btn {
    position: relative;
    z-index: 2;
}

.popover-search-button {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    background-image: linear-gradient(to bottom, #1ea2fa, #168afc 97%, #0e6fff);
    color: #ffffff;
    border: none;
    padding: 0.4375rem 0.875rem;
}

.input-group-append,
.input-group-prepend {
    display: -ms-flexbox;
    display: flex;
}

.input-group > .input-group-append > .btn,
.input-group > .input-group-append > .input-group-text,
.input-group > .input-group-prepend:first-child > .btn:not(:first-child),
.input-group > .input-group-prepend:first-child > .input-group-text:not(:first-child),
.input-group > .input-group-prepend:not(:first-child) > .btn,
.input-group > .input-group-prepend:not(:first-child) > .input-group-text {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.input-group-append .btn,
.input-group-prepend .btn {
    position: relative;
    z-index: 2;
}

.popover-search-button {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    background-image: linear-gradient(to bottom, #1ea2fa, #168afc 97%, #0e6fff);
    color: #ffffff;
    border: none;
    padding: 0.4375rem 0.875rem;
}

.pi {
    font-weight: bold;
    font-size: 16px;
}

[type='button']:not(:disabled),
[type='reset']:not(:disabled),
[type='submit']:not(:disabled),
button:not(:disabled) {
    cursor: pointer;
}

.w-100 {
    width: 100%;
}

.heading-text {
    font-size: 1.25rem;
}

#modal_lazyload_content_div {
    padding-top: 16px;
    max-height: 230px;
    overflow: auto;
}

.modal-body {
    padding: 1.25rem;

    // border-bottom: 1px solid #e5e7eb;
    @include theme() {
        border-bottom: 1px solid theme-get('border-black-400');
    }

    .vendor-checkbox-custom-outer::-webkit-scrollbar {
        width: 5px;
    }

    .vendor-checkbox-custom-outer::-webkit-scrollbar-track {
        // background: #fff;
    }

    .vendor-checkbox-custom-outer::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 5px;
    }

    .vendor-checkbox-custom-outer::-webkit-scrollbar-thumb:hover {
        background: #c1c1c1;
    }
}

.modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: center;
    z-index: 9999;
    overflow-y: auto;
    overflow-x: hidden;
    transition: opacity 0.15s linear 0s;
    background: #0000006e;
    backdrop-filter: blur(4px);
}

.custom-modal {
    // background-color: white;
    @include theme() {
        background-color: theme-get('background');
    }

    max-width: 560px;
    border-radius: 20px;
    margin: 7.73rem auto;
    box-shadow: 0 0.25rem 0.5rem rgb(0 0 0 / 10%);
    transform: none;

    @media (max-width: 767px) {
        margin-left: 8px !important;
        margin-right: 8px !important;
        width: 96% !important;
    }
}

.close-img {
    width: 25px;
}

.close {
    cursor: pointer;
    margin-left: auto;
}

.checkbox-custom-outer .input-before {
    content: '';
    display: inline-block;
    height: 16px;
    min-width: 16px;
    border: 1px solid #b9babb;
    margin-right: 10px;
    margin-top: 0;
    vertical-align: middle;
    left: 0;
    background: transparent;
}

.checkbox-custom-outer .input-before::after {
    content: '';
    display: inline-block;
    height: 5px;
    width: 11px;

    // border-left: 2px solid #ffffff;
    // border-bottom: 2px solid #ffffff;
    @include theme() {
        border-left: 2px solid #ffffff;
        border-bottom: 2px solid #ffffff;
    }

    transform: rotate(-45deg);
    left: 2px;

    @media screen and (max-width: 380px) {
        left: 0px;
    }

    position: relative;
    top: -6px;
}

.vendor-modal-outer .field-checkbox {
    padding-left: 30px;
}

.checkbox-custom-outer input[type='checkbox'] {
    opacity: 0;
    position: absolute;
    z-index: 1;
    top: 0px;
    width: 16px;
    height: 16px;
    padding: 0;
    margin: 0;
    left: 30px;
    width: 70%;
}

.checkbox-custom-outer input[type='checkbox']:checked + .input-before {
    @include theme() {
        border: 1px solid theme-get('checkbox-color');
        background: theme-get('checkbox-color');
        border-color: theme-get('checkbox-color');
    }
}

.popover-search-button {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    background-image: linear-gradient(to bottom, #1ea2fa, #168afc 97%, #0e6fff);
    color: #fff;
    border: none;
    padding: 0.4375rem 0.875rem;
}
</style>
