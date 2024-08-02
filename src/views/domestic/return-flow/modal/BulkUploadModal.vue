<template>
    <div
        @click="handleBulkUpload('Bulk Upload')"
        class="export-btn-outer flex gap-2 items-center bg-[#fff] dark:bg-[#313131] shadow-md rounded-[6px] hover:cursor-pointer px-2 dark:border-[#4d4d4d] border-[1px] w-max text-[12px]"
        v-if="route.params.tabs != 'rev-return-request' && dataVariables.selectedTabHeading && (checkAccessRight ? true : deepCheckAccessRight('domestic', 'reverse_order', 'bulk_upload'))"
    >
        <img v-if="!darkModeVal" src="@/assets/images/export-btn.svg" />
        <img v-else src="@/assets/images/dark-mode/dark-export-btn.svg" />
        <span>Bulk Upload </span>
    </div>

    <BulkUploadModal
        v-if="showBulkTitle == 'Bulk Upload'"
        :visible="showBulkUpload"
        title="Bulk Upload Processing Orders via CSV"
        :isloading="setBulkUploadIsLoading"
        sampleDownloadLink="https://itl-uploads.s3.ap-south-1.amazonaws.com/uploads/order/bulk_order_sample_file1.csv"
        @handleChangeVisible="handleChangeShowBulkUpload"
        @returnObjectProps="handleBulkUploadData"
        :selectedVendorId="VendorId"
        :pickupWareHouse="selectedWareHouse"
    >
        <template #vendorModal v-if="showBulkTitle == 'Bulk Upload'">
            <div v-if="checkUserType('admin') || checkUserType('subadmin')">
                <p @click="() => (ShowBulkVendorModal = true)" class="font-medium m-0 border-[1px] border-[#dfe3e6] dark:border-[#5d5d5d] hover:cursor-pointer p-2 rounded-[4px]">
                    {{ BulkVendorData.length > 0 ? BulkVendorData : 'Select Vendor ' }}
                </p>
            </div>
        </template>

        <template #DropdownWarehouse v-if="checkUserType('admin') || (checkUserType('subadmin') && BulkVendorData.length > 0) || checkUserType('vendor')">
            <Dropdown
                id="bulkupload-dropdown"
                v-model="selectedWareHouse"
                :options="warehouseData.warehouseStripData?.data_arr"
                optionLabel="company_name"
                class="max-h-[32px] w-full bg-transparent border-[#dfe3e6] dark:border-[#5d5d5d] rounded-[4px] hover:border-[#5d5d5d]"
                placeholder="Select Warehouse"
                filter
            >
            </Dropdown>
        </template>
    </BulkUploadModal>
    <VendorModal v-if="(checkUserType('admin') || checkUserType('subadmin')) && ShowBulkVendorModal" @close-modal="ShowBulkVendorModal = false" @applyVendor="applyVendorFilter" @resetVendor="resetVendorFilter" />
</template>

<script setup>
// show Bulk Upload Modal
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { checkUserType, checkAccessRight, deepCheckAccessRight } from '@/util/commonHandlers.ts';
import { returnFlowVariables as dataVariables } from '../returnFlow';
import BulkUploadModal from '@/components/modal/BulkUploadModal.vue';
import VendorModal from '@/components/common-modal-files/VendorModal.vue';
import { useStore } from 'vuex';
import { RETURN } from '@/store/domestic/return-flow/constants';
import { DARKMODE } from '@/store/dark-mode/constants';
import { useToast } from 'primevue/usetoast';
import { apiHandlerWithFile } from '@/api/common/api.ts';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const warehouseData = computed(() => store.getters[`${RETURN.NAME}/getStripWarehouseData`]);
const toast = useToast();
const route = useRoute();
const store = useStore();
const showBulkUpload = ref(false);
const showBulkTitle = ref('');
const BulkVendorData = ref([]);
const VendorId = ref('');
const ShowBulkVendorModal = ref(false);
const setBulkUploadIsLoading = ref(false);
const { isFullAccess, connectPlusAccess, selectedWareHouseTemp, warehouseDataTemp } = defineProps(['isFullAccess', 'connectPlusAccess', 'selectedWareHouseTemp', 'warehouseDataTemp']);
const selectedWareHouse = ref(selectedWareHouseTemp || []);

watch(
    () => showBulkUpload.value,
    (newValue) => {
        if (newValue) {
            document.body.classList.add('bulk-upload-modal-open');
        } else {
            document.body.classList.remove('bulk-upload-modal-open');
        }
    }
);
watch(
    () => selectedWareHouseTemp,
    (newValue) => {
        selectedWareHouse.value = newValue;
    }
);
watch(
    () => warehouseDataTemp,
    (newValue) => {
        warehouseData.value = newValue;
    }
);

const handleBulkUpload = (title) => {
    showBulkTitle.value = title;
    BulkVendorData.value = [];
    selectedWareHouse.value = '';
    resetVendorFilter();
    showBulkUpload.value = !showBulkUpload.value;
};
const handleChangeShowBulkUpload = (hidevalue) => {
    BulkVendorData.value = [];
    selectedWareHouse.value = '';
    resetVendorFilter();
    showBulkUpload.value = hidevalue;
};

const applyVendorFilter = async (vendorData) => {
    vendorData.forEach(async (element) => {
        const tempData = element.split(',');
        BulkVendorData.value = tempData[0];
        VendorId.value = tempData[1];
    });
    const payload = {
        vendor_id: VendorId.value || '',
        module_name: ' reverse_order',
        tab_name: dataVariables.value.selectedTabName,
    };
    await store.dispatch(`${RETURN.NAME}/getStripWarehouse`, payload);
    ShowBulkVendorModal.value = false;
};

const resetVendorFilter = () => {
    BulkVendorData.value = [];
    ShowBulkVendorModal.value = false;
};

const handleBulkUploadData = async (bulkuploadData) => {
    setBulkUploadIsLoading.value = true;
    if (bulkuploadData.BulkUploadProps.pickupWareHouse?.id && bulkuploadData.BulkUploadFile) {
        try {
            const payload = {
                vendor_id: bulkuploadData.BulkUploadProps.selectedVendorId,
                vendor_pickup_address_id: bulkuploadData.BulkUploadProps.pickupWareHouse.id,
                process_type: 2,
                uploadBtn1: bulkuploadData.BulkUploadFile,
                is_reverse: '1',
            };
            const url = 'common-module-v3/bg-process-import-submit-v3.json';

            const result = await apiHandlerWithFile(url, payload, true);
            if (result.status === 'success') {
                toast.add({ severity: 'success', detail: result.html_message, life: 3000 });
                selectedWareHouse.value = '';
                setBulkUploadIsLoading.value = false;
                window.open(dataVariables.value.config.baseUrlPanel + 'view-bg-process-v3', '_blank');
                handleChangeShowBulkUpload(false);
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
