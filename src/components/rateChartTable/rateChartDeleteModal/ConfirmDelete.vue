<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useToast } from "primevue/usetoast";
import { DARKMODE } from '@/store/dark-mode/constants';
import { RATECHART } from '../../../store/rate-chart/constants';

const store = useStore();
const toast = useToast();

const props = defineProps(['showDeleteModal', 'showModal', 'id']);
const emit = defineEmits(['closeConfirmDeleteModal']);

const isLoading = ref(false)

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const getVendor = computed(() => store.getters[`${RATECHART.NAME}/getVendor`]);
const tabType = computed(() => store.getters[`${RATECHART.NAME}/getTabType`]);
const getDeliveryType = computed(() => store.getters[`${RATECHART.NAME}/getDeliveryType`]);
const bandOptions = computed(() => store.getters[`${RATECHART.NAME}/getBandOptions`]);
const getActiveLogistics = computed(() => store.getters[`${RATECHART.NAME}/getActiveLogistics`]);

const deleteFn = async () => {
    isLoading.value = true;
    let res = await store.dispatch(`${RATECHART.NAME}/deleteRateChart`, { edit_id: props.id, is_deleted: 1 });

    if (res.status == 'success') {
        toast.add({ severity: 'success', summary: 'Success Message', detail: res.html_message, life: 3000 });
        await store.dispatch(`${RATECHART.NAME}/fetchData`, {
            vendor_id: getVendor.value.id, delivery_type: getDeliveryType.value, tab_type: tabType.value, band_id: bandOptions.value.filter((el) => {
                // return el.value == rateChartModalVariables.rateType;
            })
        });

        store.dispatch(`${RATECHART.NAME}/setActiveLogistics`, getActiveLogistics.value);
    } else {
        toast.add({ severity: 'error', summary: 'Error Message', detail: res.html_message, life: 3000 });
    }

    isLoading.value = false;

    emit('closeConfirmDeleteModal');
} 
</script>

<template>
    <div class="delete-modal">
        <DialogView id="rcDeleteModal" v-model:visible="props.showModal" modal header="Header"
            :dismissableMask="true" :draggable="false"
            :style="{ width: '35rem', margin: 'auto 0 !important', height: 'auto !important' }"
            :breakpoints="{ '1199px': '75vw', '575px': '96vw' }">
            <template #header>
                <div class="font-bold white-space-nowrap">
                    <span class="main-title">Alert</span>
                    <span class="hidden delete-subtitle text-base md:block font-light">Priority for this Logistics in Recommendation Engine <br class="block md:hidden xl:block" /> will get Reset on this action. <br />Do you want to Continue?</span>
                    <span class="block delete-subtitle text-base md:hidden font-light">Priority for this Logistics in <br/> Recommendation Engine will get Reset <br/> on this action. <br />Do you want to Continue?</span>
                </div>
                <!-- <img @click="$emit('closeDeleteModal')"
                    src="https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/kyc-doc-modal-close.svg"
                    alt="close-btn" class="close-btn"> -->
                <div class="md:absolute md:top-8 md:right-8">
                    <img @click="$emit('closeConfirmDeleteModal')" v-if="!darkModeVal"
                        src="../../../assets/images/modal-close-icon.svg" alt="close-btn" class="close-btn" />
                    <img @click="$emit('closeConfirmDeleteModal')" v-else
                        src="../../../assets/images/dark-mode/modal-close-icon.svg" alt="close-btn" class="close-btn" />
                </div>
            </template>
            <div class="delete-modal-content">
                <button @click="$emit('closeConfirmDeleteModal')" class="cncl-btn">No</button>
                <button class="delete-btn" :class="[isLoading ? 'disable-pointer-events' : '']" @click="deleteFn()"
                    autofocus>
                    <div v-if="isLoading">
                        <i class="pi pi-spin pi-spinner loading-icon mx-5" aria-hidden="true"></i>
                    </div>
                    <div v-else>Yes, Continue</div>
                </button>
            </div>
        </DialogView>
    </div>
    <ToastView />
</template>

<style lang="scss">
@import "../../../assets/itl-common-css/common-css.scss";

#rcDeleteModal .p-dialog-header {
    @include theme() {
        background-color: theme-get("background");
        border-bottom: 1px solid theme-get("border-black-500");
    }
}

#rcDeleteModal .p-dialog-content {
    @include theme() {
        background-color: theme-get("background");
        border-bottom: 1px solid theme-get("border-black-500");
    }
}

#rcDeleteModal .cncl-btn {
    @include theme() {
        background: theme-get("cancel-btn-bg") !important;
        border: 1px solid theme-get("border-black-500");
        color: theme-get("black-500");
    }
}

#rcDeleteModal .delete-btn {
    @include theme() {
        border: 1px solid theme-get("submit-btn-border");
    }
}

.delete-modal-parent {
    .p-dialog .p-dialog-content {
        padding: 1rem 1rem 1rem 1rem !important;
    }

    .close-btn {
        margin-top: -20px;

        @media (max-width: 767px) {
            margin-top: 0px;
        }
    }
}

.rate-chart-parent-class {
    .main-title {
        font-size: 20px;
        line-height: 24px;

        @media (max-width: 420px) {
            font-size: 14px !important;
        }

        @media (min-width: 421px) and (max-width: 767px) {
            font-size: 16px;
        }
    }

    .delete-subtitle {
        padding-top: 8px;
    }

    .p-dialog .p-dialog-header {
        padding: 1.5rem 1.5rem 0.8rem 1.8rem !important;
    }

    .delete-modal-content {
        display: flex;
        justify-content: flex-end;
        font-family: 'HelveticaNowText-Regular';

        .cncl-btn {
            width: 88px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fff;
            font-family: 'HelveticaNowText-Regular';
            border: 1px solid #D1D5DB;
            border-radius: 50px;
            margin-right: 8px;
            font-size: 13px;
            cursor: pointer;
            color: #374151;
            font-weight: 300;
        }

        .delete-btn {
            height: 32px;
            width: 130px;
            background: #DE350B;
            font-family: 'HelveticaNowText-Regular';
            color: #fff;
            display: flex;
            cursor: pointer;
            outline: none;
            border: 1px solid #D1D5DB;
            justify-content: center;
            align-items: center;
            font-size: 13px;
            border-radius: 50px;
            font-weight: 500;
            padding: 8px 0px;
        }

        .disable-pointer-events {
            pointer-events: none;
        }
    }
}</style>