<script setup>
import FilterBtnModal from '../../../dt-filters/filterBtnModal.vue';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import { RETURN } from '@/store/domestic/return-flow/constants';
</script>
<template>
    <FilterBtnModal
        @filterModalValue="dataTableFncs.setFilterValue"
        @deleteSaveFilters="dataTableFncs.showDeleteFilterPopup"
        @updateFilterFunc="dataTableFncs.saveEditFiltersViewBilling"
        @clearOneFilter="dataTableFncs.clearFilter"
        @applyselectedFilter="dataTableFncs.applySaveFilterData"
        :store-name="RETURN"
    />
</template>
