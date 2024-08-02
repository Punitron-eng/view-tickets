import { dataTableVariables, commonFilterModal } from '@/components/itl-dataTable-files/itl-dataTable/commonVariable.js';
import { ref } from 'vue'; // Importing watch from Vue 3

export const productCatalogueVariable = ref(dataTableVariables.value);

productCatalogueVariable.value.channel = '';
productCatalogueVariable.value.channelOptions = [];
productCatalogueVariable.value.store = '';
productCatalogueVariable.value.storeOptions = [];
productCatalogueVariable.value.showDropdowns = false;
productCatalogueVariable.value.productCategory = { id: '', value: '' };
productCatalogueVariable.value.selectedCheckBoxes = null;
productCatalogueVariable.value.productCategoryOptions = [];
productCatalogueVariable.value.showProductModel = false;
productCatalogueVariable.value.modalType = '';
productCatalogueVariable.value.isLoading = false;

export const filterModal = commonFilterModal;
