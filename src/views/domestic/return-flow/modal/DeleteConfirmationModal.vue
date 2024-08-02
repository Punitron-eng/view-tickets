<script setup>
import { returnFlowVariables } from '../returnFlow';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import DeleteConfirmationModal from '@/components/common-modal-files/DeleteConfirmationModal.vue';
const rejectCloseModal = () => (dataVariables.value.showRejectModal = false);
const cancleDeleteFilter = () => (dataVariables.value.showDeleteFilter = false);
const closeCancelOrder = (close) => (dataVariables.value.showCancelModal = close);
const dataVariables = returnFlowVariables;
</script>

<template>
    <DeleteConfirmationModal
        id="reject-modal"
        v-if="dataVariables.showRejectModal"
        @close-modal="rejectCloseModal"
        delete-heading="Reject Request"
        modalDescription="Please enter a reason to reject request."
        :actionBtnHandler="dataTableFncs.rejectModalData"
        actionBtnText="Reject"
        :loading="dataVariables.isLoadingSubmit"
    >
        <template #body>
            <div>
                <p>The return request is cancelled due to</p>
                <textarea style="resize: none" class="form-control" placeholder="Enter Reason" v-model.trim="dataVariables.rejectInput" cols="30" rows="8" no></textarea>
            </div>
        </template>
    </DeleteConfirmationModal>

    <DeleteConfirmationModal
        v-if="dataVariables.showCancelModal"
        @close-modal="closeCancelOrder"
        delete-heading="Cancel Order?"
        modalDescription="Are you sure you want to cancel this order?"
        :actionBtnHandler="dataTableFncs.cancelOrder"
        actionBtnText="Yes, Cancel It"
        :loading="dataVariables.isLoadingSubmit"
    >
    </DeleteConfirmationModal>
    <DeleteConfirmationModal
        v-if="dataVariables.showDeleteFilter"
        @close-modal="cancleDeleteFilter"
        delete-heading="Delete Filter"
        modalDescription="Are you sure you want to delete this filter?"
        :actionBtnHandler="dataTableFncs.deleteSaveFilter"
        actionBtnText="Yes, Delete it"
    >
    </DeleteConfirmationModal>
</template>
