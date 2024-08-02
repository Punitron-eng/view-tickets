<script setup>
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import DeleteConfirmationModal from '@/components/common-modal-files/DeleteConfirmationModal.vue';
import { dataTableVariables as dtVariable } from '@/components/itl-dataTable-files/itl-dataTable/commonVariable';

const cancleDeleteFilter = () => (dataVariables.value.showDeleteFilter = false);
const dataVariables = dtVariable;
</script>

<template>
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
