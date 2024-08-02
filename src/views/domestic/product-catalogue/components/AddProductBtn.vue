<script setup lang="ts">
import { onBeforeMount, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { checkUserType, checkAccessRight, deepCheckAccessRight } from '../../../../util/commonHandlers';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import { productCatalogueVariable } from '../productCatalogue';
import { PRODUCTCATALOGUE } from '@/store/domestic/product-catalogue/constants';
import BulkUploadModal from '../modal/BulkUploadModal.vue';
import { DARKMODE } from '@/store/dark-mode/constants';
import { dataVariables } from '../../../../components/itl-dataTable-files/itl-dataTable-li/dataTableLi';
import config from '../../../../util/config';

const store = useStore();
const toast = useToast();

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

const addProduct = (val, rowId) => {
    console.log(val);
    if (val == 'add') {
        productCatalogueVariable.value.modalType = 'add';
    } else if (val == 'edit') {
        productCatalogueVariable.value.modalType = 'edit';
    } else if (val == 'view') {
        productCatalogueVariable.value.modalType = 'view';
        console.log('dataVariables.value.rowIdValue', productCatalogueVariable.value.rowIdValue);
        console.log('dataTableFncs.tableRowId', dataTableFncs.tableRowId);
    }

    productCatalogueVariable.value.showProductModel = true;
};
</script>

<template>
    <button class="block lg:hidden bg-[#1279ff] text-[#fff] px-2 py-1 h-11 rounded-md w-full">
        <div class="flex items-center justify-start gap-2" v-if="checkAccessRight('product_catalogue') ? true : deepCheckAccessRight('domestic', 'product_catalogue', 'add')" @click="addProduct('add')">
            <img v-if="!darkModeVal" height="12" width="12" src="@/assets/images/plus-circle.svg" />
            <img v-else height="12" width="12" src="@/assets/images/dark-mode/dark-plus-circle.svg" />
            <span class="text-[#fff] text-sm">Add Product</span>
        </div>
    </button>
</template>
