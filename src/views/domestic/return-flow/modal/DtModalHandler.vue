<template>
    <!-- select courier modal  -->
    <SelectCourierModal v-model:visible="getDtModalData.SelectCourierModal" :skeletonData="dataVariables.skeletonDataValue" @pickclose-modal="getDtModalData.SelectCourierModal" :rowId="dataVariables.rowIdValue" />
    <!-- view detail modal  -->
    <DialogView id="view-details-modal" v-model:visible="getDtModalData.ViewDetailsModal" maximizable :modal="true" :draggable="false" dismissableMask :maximizable="true" style="z-index: 9999; max-width: 100vw">
        <ViewDetailsModal
            @show-modal="dataTableFncs.pickNowModal"
            @reject-modal="rejectModalVal"
            @update-return-data="dataTableFncs.getBillingData"
            :close="!getDtModalData.ViewDetailsModal"
            :haveAccessOrderDetail="checkAccessRight('reverse_order') ? true : deepCheckAccessRight('domestic', 'reverse_order', 'order_details')"
            :haveAccessActivity="checkAccessRight('reverse_order') ? true : deepCheckAccessRight('domestic', 'reverse_order', 'tracking')"
            :haveAccessParcel="checkAccessRight('reverse_order') ? true : deepCheckAccessRight('domestic', 'reverse_order', 'edit_parcel')"
            :haveAccessPickNow="checkAccessRight('reverse_order') ? true : deepCheckAccessRight('domestic', 'reverse_order', 'pick_now')"
            :haveAccessReject="checkAccessRight('reverse_order') ? true : deepCheckAccessRight('domestic', 'reverse_order', 'reject')"
            :rowId="dataVariables.rowIdValue"
            :skeletonData="dataVariables.skeletonDataValue"
            :tabName="dataVariables.subTabName"
            :weightUpdateAvail="dataVariables.isWeightUpdateAvail"
        />
    </DialogView>
    <!-- vendor modal data table  -->
    <VendorModalDatatable
        v-show="getDtModalData.VendorModalDatatable"
        @vendorData="dataTableFncs.setFilter"
        @close-modal="getDtModalData.VendorModalDatatable = false"
        @reset-vendor="dataTableFncs.resetvendor"
        :vendor-store="dataVariables.getMappedFilterValue.vendor_name"
        :remove-check="dataVariables.removeCheck"
        :getVendorValues="dataVariables.getVendorValues"
        :getVendorModalPayload="getVendorModalPayload"
        :getVendorDataStatus="getVendorDataStatus"
        @search-vendor-name="dataTableFncs.searchByVendorName"
    />
    <!-- vendor modal  -->
    <VendorModal
        v-if="(checkUserType('admin') || checkUserType('subadmin')) && getDtModalData.VendorModal"
        @close-modal="getDtModalData.VendorModal = false"
        @applyVendor="dataTableFncs.applyVendorFilter"
        @resetVendor="dataTableFncs.resetVendorFilter"
    />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { RETURN } from '@/store/domestic/return-flow/constants';
import { checkAccessRight, deepCheckAccessRight, checkUserType } from '../../../util/commonHandlers';
import SelectCourierModal from '../../../components/dt-filters/SelectCourierModal.vue';
import ViewDetailsModal from '../../../components/dt-filters/ViewDetailsModal.vue';
import VendorModalDatatable from '../../../components/common-modal-files/vendor-modal/VendorModalDatatable.vue';
import VendorModal from '../../../components/common-modal-files/VendorModal.vue';
import * as dataTableFncs from '../commonFunctions';
import { returnFlowVariables } from '../returnFlow';

const store = useStore();
const dataVariables = returnFlowVariables;
const rejectModalVal = async () => (dataVariables.value.showRejectModal = true);

const getVendorModalPayload = computed(() => store.getters[`${RETURN.NAME}/getVendorModalPayload`]);
const getDtModalData = computed(() => store.getters[`${RETURN.NAME}/getDtModal`]);
</script>
