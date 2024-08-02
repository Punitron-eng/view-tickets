<template>
    <!-- <ToastView class="notification-bar" /> -->
    <div class="modal-overlay" @click="closeVendorModal()">
        <div class="custom-modal vendor-modal-outer" @click.stop>
            <div class="modal-header">
                <div class="heading-text poppins-semibold gray-800">Select Vendor</div>
                <img v-if="darkModeVal != true" class="close" src="../../../assets/images/modal-close-icon.svg" alt="close-svg" @click="closeVendorModal()" />
                <img v-else class="close" src="../../../assets/images/dark-mode/dark-modal-close-icon.svg" alt="close-svg" @click="closeVendorModal()" />
            </div>
            <div class="modal-body">
                <div class="input-group m-b-15">
                    <input type="text" class="form-control" placeholder="Vendor Name" name="search_vendor_name" v-model="dataVariables.searchVendorName" id="search_vendor_name" @keydown.enter="searchVendor()" />
                    <div class="input-group-append" id="button-addon1">
                        <button class="btn popover-search-button" type="button" @click="searchVendor()">
                            <i class="pi pi-search"></i>
                        </button>
                    </div>
                </div>
                <!-- <div class="checkbox-custom-outer vendor-checkbox-custom-outer" id="modal_lazyload_content_div" v-on:scroll="onScrollData()" ref="modal_lazyload_content_div"> -->
                <div class="checkbox-custom-outer vendor-checkbox-custom-outer" id="modal_lazyload_content_div" @scroll="handleOnScroll('modal_lazyload_content_div')" ref="modal_lazyload_content_div">
                    <div v-for="allVendorData in props.getVendorModalPayload" :key="allVendorData.id" class="field-checkbox">
                        <input type="checkbox" class="vendor-check-list" :id="allVendorData.id" name="option" :value="allVendorData.company_name_short + ',' + allVendorData.id" v-model="dataVariables.checkboxValue" />
                        <span class="input-before"></span>
                        <label :for="allVendorData.id" class="cursor-pointer helvetica-regular">{{ allVendorData.company_name_short }}</label>
                    </div>
                    <div v-if="!props.getVendorModalPayload.length" id="load_data_message">
                        <div class="text-center p-2">No Data Found</div>
                    </div>
                </div>
                <div v-show="dataVariables.showVendorError" class="vendor-error">Please select at least one Vendor.</div>
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
<script lang="ts" setup>
import { VendorModalDatatable } from './VendorModalDatatable';
import { watch, onMounted, defineProps, defineEmits, ref, computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { DARKMODE } from '../../../store/dark-mode/constants';
const store = useStore();
const route = useRoute();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
// import { BILLING } from '../../../store/view-billing/constants';
// import { useStore } from 'vuex';

// const store = useStore();
const props = defineProps(['vendorsName', 'removeCheck', 'getVendorValues', 'getVendorModalPayload', 'getVendorDataStatus']);
const emit = defineEmits(['applyVendor', 'resetVendor', 'close-modal', 'vendorData', 'searchVendorName']);
const dataVariables = VendorModalDatatable;
// const getVendorValues = computed(() => store.getters[`${BILLING.NAME}/getVendorValues`]);
// const getVendorModalPayload = computed(() => store.getters[`${BILLING.NAME}/getVendorModalPayload`]) as any;
// const getVendorDataStatus = computed(() => store.getters[`${BILLING.NAME}/getVendorStatus`]);

watch(
    () => dataVariables.value.checkboxValue,
    () => {
        dataVariables.value.showVendorError = false;
    }
);
watch(
    () => props.removeCheck,
    (val) => {
        if (val) {
            dataVariables.value.checkboxValue = [];
            dataVariables.value.searchVendorName = '';
        }
    }
);
watch(
    () => route.params.tabs,
    () => {
        dataVariables.value.checkboxValue = [];
        dataVariables.value.searchVendorName = '';
    }
);
onBeforeMount(() => {
    // dataVariables.value.searchVendorName = '';
    dataVariables.value.checkboxValue = [];
    dataVariables.value.showVendorError = false;
    props.getVendorValues['value'] = [];
    props.getVendorValues['id'] = [];
    for (let i = 0; i < props.getVendorValues['id'].length; i++) {
        dataVariables.value.checkboxValue.push(props.getVendorValues['value'][i] + ',' + props.getVendorValues['id'][i]);
        const checkbox = document.getElementById(props.getVendorValues['id'][i]) as HTMLInputElement;
        if (checkbox) {
            checkbox.checked = true;
        }
    }
});

const searchVendor = async () => {
    dataVariables.value.isShowDiv = false;
    if (dataVariables.value.searchVendorName != '') {
        dataVariables.value.limit = 50;
        dataVariables.value.start = 0;
        dataVariables.value.isVendorSearch = true;
        const data = {
            limit: dataVariables.value.limit,
            start: dataVariables.value.start,
            searchVendorName: dataVariables.value.searchVendorName,
            inputType: dataVariables.value.inputType,
            isVendorSearch: dataVariables.value.isVendorSearch,
        };
        emit('searchVendorName', data);
        if (props.getVendorModalPayload.length === 0) {
            dataVariables.value.action = 'active';
            dataVariables.value.isShowDiv = true;
            dataVariables.value.responseText = 'No Data Found';
        } else {
            dataVariables.value.action = 'inactive';
        }
    } else {
        dataVariables.value.isVendorSearch = false;
        return;
    }
};
// const onScrollData = () => {
//     console.log('document.documentElement.scrollTop =>', document.documentElement.scrollTop);
//     console.log('document.documentElement.offsetHeight =>', document.documentElement.offsetHeight);
//     dataVariables.value.isShowDiv = false;
//     const scrollTop: number = window.pageYOffset || document.documentElement.scrollTop;
//     console.log('scrollTop =>', scrollTop);
//     const windowHeight: number = window.innerHeight;
//     console.log('windowHeight =>', windowHeight);
//     let tempId = document.getElementById('modal_lazyload_content_div') as HTMLElement;
//     const modalHeight: number | undefined = tempId?.offsetHeight;
//     console.log('modalHeight =>', modalHeight);
//     if (props.getVendorDataStatus != 0) {
//         if (scrollTop + windowHeight > modalHeight && dataVariables.value.action === 'inactive') {
//             dataVariables.value.action = 'active';
//             dataVariables.value.start = dataVariables.value.start + dataVariables.value.limit;
//             searchVendor();
//         }
//     } else {
//         return;
//     }
// };
const applyVendorFilter = () => {
    if (dataVariables.value.checkboxValue.length !== 0) {
        dataVariables.value.searchVendorName = '';
        const data = {
            type: 'vendorModal',
            vendorData: dataVariables.value.checkboxValue,
        };
        emit('vendorData', data);
        const buttonElements = document.querySelectorAll('.p-button-outlined');
        // Attach event listeners to each button
        buttonElements.forEach((buttonElement) => {
            buttonElement.dispatchEvent(new Event('click'));
        });
    } else {
        dataVariables.value.showVendorError = true;
        return;
    }
};
const resetVendorFilter = async () => {
    dataVariables.value.searchVendorName = '';
    dataVariables.value.checkboxValue = [];
    dataVariables.value.isShowDiv = false;
    dataVariables.value.isVendorSearch = false;
    dataVariables.value.showVendorError = false;
    if (props.getVendorValues['id'].length !== 0) {
        emit('resetVendor', false);
    } else {
        emit('resetVendor', true);
    }

    const buttonElements = document.querySelectorAll('.p-button-outlined');
    // Attach event listeners to each button
    buttonElements.forEach((buttonElement) => {
        buttonElement.dispatchEvent(new Event('click'));
    });
};
const closeVendorModal = async () => {
    if (!dataVariables.value.isVendorSearch) {
        dataVariables.value.searchVendorName = '';
    }
    dataVariables.value.showVendorError = false;
    emit('close-modal');
};
const handleOnScroll = (id: any) => {
    const scrollData = document.querySelector(`#${id}`);
    if (props.getVendorDataStatus != 0) {
        if (Math.abs(scrollData.scrollTop + scrollData.offsetHeight - scrollData.scrollHeight) <= 1) {
            dataVariables.value.start = dataVariables.value.start + dataVariables.value.limit;
            // searchVendor();
            dataVariables.value.limit = 50;
            // dataVariables.value.start = 0;
            dataVariables.value.isVendorSearch = false;
            const data = {
                limit: dataVariables.value.limit,
                start: dataVariables.value.start,
                searchVendorName: dataVariables.value.searchVendorName,
                inputType: dataVariables.value.inputType,
                isVendorSearch: dataVariables.value.isVendorSearch,
            };
            emit('searchVendorName', data);
        }
    } else {
        return;
    }
};
</script>
<style scoped lang="scss">
@import './VendorModalDatatable.scss';
</style>
