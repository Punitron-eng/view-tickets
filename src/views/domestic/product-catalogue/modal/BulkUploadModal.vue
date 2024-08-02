<template>
    <button
        v-if="checkAccessRight('product_catalogue') ? true : deepCheckAccessRight('domestic', 'product_catalogue', 'import')"
        @click="handleBulkUpload('Bulk Upload')"
        class="export-btn-outer flex gap-2 items-center bg-[#fff] dark:bg-[#313131] shadow-md rounded-[6px] hover:cursor-pointer px-2 dark:border-[#4d4d4d] border-[1px] w-max text-[12px] h-8"
    >
        <img v-if="!darkModeVal" src="@/assets/images/export-btn.svg" />
        <img v-else src="@/assets/images/dark-mode/dark-export-btn.svg" />
        <span>Bulk Upload </span>
    </button>

    <BulkUploadModal
        ref="bulkUploadModal"
        v-if="showBulkTitle == 'Bulk Upload'"
        :visible="showBulkUpload"
        title="Bulk Upload Processing Orders via CSV"
        :isloading="setBulkUploadIsLoading"
        sampleDownloadLink="https://itl-uploads.s3.ap-south-1.amazonaws.com/uploads/product_catalogue/bulk_product_sample_file.csv"
        @handleChangeVisible="handleChangeShowBulkUpload"
        @returnObjectProps="handleBulkUploadData"
        :selectedVendorId="VendorId"
    >
        <template #vendorModal v-if="showBulkTitle == 'Bulk Upload'">
            <div v-if="checkUserType('admin') || checkUserType('subadmin')">
                <p @click="() => (ShowBulkVendorModal = true)" class="font-medium text-[#344563] dark:text-[#dfdfdf] m-0 border-[1px] border-[#dfe3e6] dark:border-[#5d5d5d] hover:cursor-pointer p-2 rounded-[4px]">
                    {{ BulkVendorData.length > 0 ? BulkVendorData : 'Select Vendor ' }}
                </p>
            </div>
        </template>
    </BulkUploadModal>
    <VendorModal
        v-if="(checkUserType('admin') || checkUserType('subadmin')) && ShowBulkVendorModal"
        :vendorId="selectedVendorId"
        id="pc-bulk-vendor"
        ref="vendorModalComponent"
        @close-modal="ShowBulkVendorModal = false"
        @applyVendor="applyVendorFilter"
        @resetVendor="resetVendorFilter"
    />
</template>

<script setup>
// show Bulk Upload Modal
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { checkUserType, checkAccessRight, deepCheckAccessRight } from '@/util/commonHandlers.ts';
import { productCatalogueVariable as dataVariables } from '../productCatalogue';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import BulkUploadModal from '@/components/modal/BulkUploadModal.vue';
import { PRODUCTCATALOGUE } from '@/store/domestic/product-catalogue/constants';
import VendorModal from '@/components/common-modal-files/VendorModal.vue';
import { useStore } from 'vuex';
import { RETURN } from '@/store/domestic/return-flow/constants';
import { DARKMODE } from '@/store/dark-mode/constants';
import { useToast } from 'primevue/usetoast';
import { apiHandler } from '@/api/common/api.ts';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const toast = useToast();
const route = useRoute();
const store = useStore();
const showBulkUpload = ref(false);
const showBulkTitle = ref('');
const BulkVendorData = ref([]);
const VendorId = ref('');
const ShowBulkVendorModal = ref(false);
const setBulkUploadIsLoading = ref(false);
const vendorModalComponent = ref(null);
const bulkUploadModal = ref(null);
const selectedVendorId = ref('');
// const warehouseData = ref(warehouseDataTemp || [])

watch(showBulkUpload, () => {
    VendorId.value = '';
    selectedVendorId.value = '';
    BulkVendorData.value = [];
    ShowBulkVendorModal.value = false;
    if (bulkUploadModal.value) bulkUploadModal.value.clearFile();
});

const handleBulkUpload = (title) => {
    showBulkTitle.value = title;
    BulkVendorData.value = [];
    resetVendorFilter();
    // vendorModalComponent.value.resetVendorFilter();
    showBulkUpload.value = !showBulkUpload.value;
};
const handleChangeShowBulkUpload = (hidevalue) => {
    BulkVendorData.value = [];
    resetVendorFilter();
    // vendorModalComponent.value.resetVendorFilter();
    showBulkUpload.value = hidevalue;
};

const applyVendorFilter = async (vendorData) => {
    vendorData.forEach(async (element) => {
        const tempData = element.split(',');
        selectedVendorId.value = tempData;
        BulkVendorData.value = tempData[0];
        VendorId.value = tempData[1];
    });
    const payload = {
        vendor_id: VendorId.value || '',
        module_name: ' reverse_order',
        tab_name: dataVariables.value.selectedTabName,
    };
    // await store.dispatch(`${RETURN.NAME}/getStripWarehouse`, payload);
    ShowBulkVendorModal.value = false;
};

const resetVendorFilter = () => {
    VendorId.value = '';
    selectedVendorId.value = '';
    BulkVendorData.value = [];
    ShowBulkVendorModal.value = false;
};

const handleBulkUploadData = async (bulkuploadData) => {
    console.log(bulkuploadData.BulkUploadProps.selectedVendorId);
    if (!checkUserType('vendor') && !bulkuploadData.BulkUploadProps.selectedVendorId) {
        toast.add({ severity: 'error', detail: 'Please select vendor', life: 3000 });
        return;
    }
    setBulkUploadIsLoading.value = true;
    if (bulkuploadData.BulkUploadFile) {
        try {
            const payload = {
                vendor_id: bulkuploadData.BulkUploadProps.selectedVendorId || '',
                process_type: 171,
                file_name: bulkuploadData.BulkUploadFile,
            };
            const url = 'common-module-v3/bg-process-import-submit-v3.json';

            const result = await store.dispatch(`${PRODUCTCATALOGUE.NAME}/bgProcessImportSubmit`, payload);
            if (result.status === 'success') {
                toast.add({ severity: 'success', detail: result.html_message, life: 3000 });
                setBulkUploadIsLoading.value = false;
                window.open(dataVariables.value.config.baseUrlPanel + 'view-bg-process-v3', '_blank');
                handleChangeShowBulkUpload(false);
                setTimeout(async () => {
                    await dataTableFncs.getDataTableData();
                }, 3000);
            } else {
                setBulkUploadIsLoading.value = false;
                toast.add({ severity: 'error', detail: result.html_message, life: 3000 });
            }
        } catch (err) {
            console.log(err.message);
        }
    } else {
        setBulkUploadIsLoading.value = false;
        toast.add({ severity: 'error', detail: 'Please Fill All Required Details', life: 3000 });
    }
};

// show Bulk Upload Modal
</script>

<style lang="scss">
#pc-bulk-vendor .checkbox-custom-outer .input-before::after {
    left: 2px;
    top: -6px !important;
}
</style>
