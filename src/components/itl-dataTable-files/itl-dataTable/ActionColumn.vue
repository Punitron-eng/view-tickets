<template>
    <div v-if="props.actionLink.isActionType == 1" class="action-link-outer">
        <!-- <a v-if="isActionText" :href="props.actionLink.auth_link" target="_blank">Link</a> -->
        <div v-if="!props.actionLink.isIcon" @click="redirectToNew()">Link</div>
        <img v-else :src="getActionIcon('store-order-view-details', darkModeVal)" alt="itl-view" class="cursor-pointer" @click="redirectToNew()" />
    </div>
    <div v-if="props.actionLink.isActionType == 2" class="action-flex">
        <img
            v-if="checkAccessRight('abandoned_cart') ? true : deepCheckAccessRight('checkout', 'abandoned_cart', 'view_details')"
            :src="getActionIcon('store-order-view-details', darkModeVal)"
            alt="itl-view"
            class="action-icon-mr cursor-pointer"
            @click="ViewModal()"
        />
        <img v-if="checkAccessRight('abandoned_cart') ? true : deepCheckAccessRight('checkout', 'abandoned_cart', 'copy_link')" :src="getActionIcon('copy', darkModeVal)" alt="itl-copy" @click="copyContent()" class="cursor-pointer" />
    </div>
    <div v-if="props.actionLink.isActionType == 3">
        <div v-if="props.actionLink.isReview" class="dark:!text-[#78c7ff] cursor-pointer discrepancy-review" @click="showDiscrepancyModels('review')">Review</div>
        <img v-else :src="getActionIcon('store-order-view-details', darkModeVal)" alt="itl-view" class="cursor-pointer" @click="showDiscrepancyModels('vendorView')" />
    </div>
    <div v-if="props.actionLink.isActionType == 4" class="action-flex">
        <img src="@/assets/images/accept-discrepancy.svg" alt="itl-accept" class="action-icon-mr cursor-pointer" @click="showDiscrepancyModels('acceptDiscrepancy')" />
        <img src="@/assets/images/rise-discrepancy.svg" alt="itl-rise" class="cursor-pointer" @click="showDiscrepancyModels('riseDiscrepancy')" />
        <div class="discrepancy-content">{{ props.actionLink.content }} days remaining</div>
    </div>
    <div v-if="props.actionLink.isActionType == 5" class="action-flex">
        <img v-if="props.actionLink.isEdit" src="@/assets/images/edit-discrepancy.svg" alt="itl-edit" class="cursor-pointer" @click="showDiscrepancyModels('editDiscrepancy')" />
        <img v-else :src="getActionIcon('store-order-view-details', darkModeVal)" alt="itl-view" class="cursor-pointer action-view-margin-top" @click="showDiscrepancyModels('vendorView')" />
    </div>
    <div v-if="props.actionLink.isActionType == 6">
        <img src="@/assets/images/store-action.svg" alt="itl-edit" class="cursor-pointer ml-[27px] mt-[6px]" @click="overlay.toggle($event)" />
        <OverlayPanel ref="overlay" class="return-action-column">
            <div v-for="(action, index) in props.actionLink.actionsAvail" :key="index">
                <div class="flex items-center cursor-pointer" :class="index !== props.actionLink.actionsAvail.length - 1 ? 'mb-[8px]' : ''" @click="getReturnActions(action)">
                    <img :src="getActionIcon(action.icon, darkModeVal)" alt="" class="mr-[8px]" />
                    <div :class="action.name == 'Reject' ? 'text-[#d12e42]' : ''">{{ action.name }}</div>
                </div>
            </div>
        </OverlayPanel>
    </div>
    <!-- <div v-if="props.actionLink.isActionType == 7" >
        <div class="flex gap-[8px]">
            <button class="bg-green-500 px-4 py-[8px] text-white rounded-lg " @click="rejectPicknowModal('picknow')">Pick now</button>
            <button class="bg-red-500 px-4 py-[8px] text-white rounded-lg " @click="rejectPicknowModal('reject')">Reject</button>
        </div>
    </div> -->
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useStore } from 'vuex';
import { DARKMODE } from '@/store/dark-mode/constants';
import { checkAccessRight, deepCheckAccessRight } from '@/util/commonHandlers';
const toast = useToast();
const store = useStore();
const props = defineProps(['actionLink', 'rowData']);
const emit = defineEmits(['showModal']);
const overlay = ref(null);
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const redirectToNew = () => {
    const redirectLink = props.actionLink.link;
    if (redirectLink != '') {
        window.open(redirectLink, '_blank');
    } else {
        const data = {
            isModalVisible: true,
            rowId: props.rowData.row_id,
        };
        emit('showModal', data);
    }
};
const copyContent = () => {
    navigator.clipboard.writeText(props.actionLink.link_send);
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Copied successfully', life: 1000 });
};
const ViewModal = () => {
    const data = {
        isModalVisible: true,
        rowId: props.rowData.row_id,
    };
    emit('showModal', data);
};
const showDiscrepancyModels = (modelType) => {
    const data = {
        isModalVisible: true,
        modelType: modelType,
        rowId: props.rowData,
        vendorEnteredWeight: props.rowData.vendor_entered_weight.entered_kg,
        courierWeight: props.rowData.charge_weight,
        awbNo: props.rowData.awb_no,
    };
    emit('showModal', data);
};
const getActionIcon = (actionIcon, darkModeVal) => {
    if (!darkModeVal) {
        const imagePath = new URL(`../../../assets/images/${actionIcon}.svg`, import.meta.url).href;
        return imagePath;
    } else {
        const imagePath = new URL(`../../../assets/images/dark-mode/dark-${actionIcon}.svg`, import.meta.url).href;
        return imagePath;
    }
    // const logisticLogoPath = imagePath.split('/');
    // const logisticLogoLastPart = logisticLogoPath[logisticLogoPath.length - 1];
    // if (logisticLogoLastPart == 'undefined') {
    //     const defaultImagePath = new URL(`../../../assets/images/default_logics_2.svg`, import.meta.url).href;
    //     return defaultImagePath;
    // } else {
    //     return imagePath;
    // }
};
const getReturnActions = (selectedAction) => {
    const data = {
        selectedAction: selectedAction,
        rowId: props.rowData.row_id ? props.rowData.row_id : props.rowData.row_id,
        selectedRowData: props.rowData,
    };
    emit('showModal', data);
    // if (selectedAction.link) {
    //     window.open(selectedAction.link, '_blank');
    // } else {
    //     let tempModalType = '';
    //     if (selectedAction.name == 'Pick Now') {
    //         tempModalType = 'picknow';
    //     } else if (selectedAction.name == 'Reject') {
    //         tempModalType = 'reject';
    //     } else if (selectedAction.name == 'Cancel') {
    //         tempModalType = 'Cancel';
    //     } else if (selectedAction.name == 'View') {
    //         tempModalType = 'view';
    //     } else if (selectedAction.name == 'Edit') {
    //         tempModalType = 'edit';
    //     } else {
    //         tempModalType = '';
    //     }
    //     const data = {
    //         isModalVisible: true,
    //         rowId: props.rowData.row_id,
    //         modalType: tempModalType,
    //     };
    //     emit('showModal', data);
    // }
};
// const rejectPicknowModal = (modalType) =>{
//     const data = {
//         isModalVisible: true,
//         rowId: props.rowData.row_id,
//         modalType:modalType,
//     }
//     emit('showModal', data);
// };
</script>
<style lang="scss">
@import '@/assets/itl-common-css/common-css.scss';

.action-link-outer {
    line-height: 16px;
    font-size: 13px;
    font-weight: 400;
    color: #0c0c0d;
    margin-left: 24px;
}

.action-flex {
    display: flex;
    align-items: center;
    margin-left: 8px;

    .action-icon-mr {
        margin-right: 8px;
    }
}

.discrepancy-content {
    // color: #1d252b;
    @include theme() {
        color: theme-get('black-700');
    }

    margin-left: 10px;
    margin-right: 8px;
    font-size: 12px;
    font-family: $interRegular;
}

.discrepancy-review {
    font-family: $interRegular;
    font-size: 13px;
    color: #0066ea;
}

.action-view-margin-top {
    margin-top: 2px;
}

.p-overlaypanel.return-action-column {
    width: 170px;
    // left: auto !important;
    right: 25px;
    border-radius: 4px;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.05), 0 10px 15px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #d0d6dc;
    overflow: hidden;
}

.lightTheme .p-overlaypanel.return-action-column {
    background-color: #fff;
    border: 1px solid #e9ecef;
}
</style>
