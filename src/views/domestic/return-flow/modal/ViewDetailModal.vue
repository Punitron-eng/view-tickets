<script setup>
import DialogView from 'primevue/dialog';
import { returnFlowVariables, filterModal } from '../returnFlow';
import ViewDetailsModal from '@/components/dt-filters/ViewDetailsModal.vue';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';

const dataVariables = returnFlowVariables;
const viewdetailsCloseModal = () => (dataVariables.value.showActionModal = false);
const rejectModalVal = async (data) => (dataVariables.value.showRejectModal = true);
</script>
<template>
    <DialogView id="view-details-modal" v-model:visible="dataVariables.showActionModal" maximizable :modal="true" :draggable="false" dismissableMask :maximizable="true" style="z-index: 9999; max-width: 100vw">
        <ViewDetailsModal
            @show-modal="dataTableFncs.pickNowModal"
            @reject-modal="rejectModalVal"
            @update-return-data="dataTableFncs.getBillingData"
            :close="viewdetailsCloseModal"
            :rowId="dataVariables.rowIdValue"
            :skeletonData="dataVariables.skeletonDataValue"
            :tabName="dataVariables.subTabName"
            :weightUpdateAvail="dataVariables.isWeightUpdateAvail"
        />
    </DialogView>
</template>
