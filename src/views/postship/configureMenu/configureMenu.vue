<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import getImg from '../../../util/getImg';
import { useToast } from 'primevue/usetoast';
import VendorModal from '../../../components/common-modal-files/VendorModal.vue';
const topHeader = JSON.parse(localStorage.getItem('top_header')) || {};
import Dropdown from 'primevue/dropdown';
import { useStore } from 'vuex';
import { DARKMODE } from '../../../store/dark-mode/constants';
import { getPostShipStoreList, saveConfigData, saveConfigdropdown } from '../../../api/configuremenu-postshipping/configuremenu';

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const selectedCity = ref();
const vendorData = ref([]);
const isAdmin = ref(false);
const store = useStore();
const toast = useToast();
const max_rows = 6;
const rows = ref([{ id: 1 }]);
let nextRowId = 2;

const addRow = () => {
    if (rows.value.length < max_rows) {
        rows.value.push({ id: nextRowId });
        nextRowId++;
    } else {
        toast.add({ severity: 'error', summary: 'You can add upto 6 menu rows only!', life: 1000 });
    }
};

const deleteRow = (id) => {
    const index = rows.value.findIndex((row) => row.id === id);
    if (index !== -1) {
        rows.value.splice(index, 1);
    }
};

const showVendorModal = () => {
    isAdmin.value = true;
};

const getListByStoreId = async (id) => {
    await saveConfigdropdown({ storeId: id.value.id });
};
const applyVendorFilter = async (vendorName) => {
    // debugger
    vendorName.forEach(async (element) => {
        const tempData = element.split(',');
        const payload = {
            framework: '1',
            vendorID: tempData[1],
        };
        vendorData.value = tempData;
        isAdmin.value = false;
    });
};

const resetVendorFilter = () => {
    vendorData.value = [];
    isAdmin.value = false;
};

onMounted(async () => {
    // document.body.classList.add('config_para');
    try {
        const result = await getPostShipStoreList();
        if (result && result.data) {
            // Assuming the data returned from the API is an array of objects with 'name' and 'value' properties
            vendorData.value = result.data.map((item) => ({
                name: item.name,
                value: item.value,
            }));
        }
    } catch (error) {
        console.error('Error fetching vendor data:', error);
        toast.add({ severity: 'error', summary: 'Failed to fetch vendor data', life: 2000 });
    }
});
// onBeforeUnmount(()=>{
//     document.body.classList.remove('config_para');

// });

// on click save button this api load
const saveConfig = async (id) => {
    console.log(id, 'id');

    try {
        // Assuming you have some data to send to the API, construct the payload here
        const payload = {};

        // Call the saveConfigData API with the payload
        const response = await saveConfigData(payload);

        // Handle the response as needed
        console.log('Save Config Data Response:', response);
        toast.add({ severity: 'success', summary: 'Config data saved successfully', life: 2000 });
    } catch (error) {
        console.error('Error saving config data:', error);
        toast.add({ severity: 'error', summary: 'Failed to save config data', life: 2000 });
    }
};

const cities = ref([
    { name: 'New York', code: 'NY', id: 1 },
    { name: 'Rome', code: 'RM', id: 2 },
    { name: 'London', code: 'LDN', id: 3 },
    { name: 'Istanbul', code: 'IST', id: 4 },
    { name: 'Paris', code: 'PRS', id: 5 },
]);

// const handleDropdownChange = async () => {
//   try {
//     // Make API call based on the selected option
//     const response = await fetch('post-ship-v3/get-user-store-list.json');
//     const data = await response.json();

//     // Update input fields with API data
//     // Assuming data contains the necessary fields for input fields
//     // Example: Assuming data.name and data.link are the fields received from the API
//     // You would update the input fields accordingly
//     // For example:
//     rows.value.forEach((row, index) => {
//       rows.value[index].name = data.name; // Update name input field
//       rows.value[index].link = data.link; // Update link input field
//     });
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     toast.add({ severity: 'error', summary: 'Failed to fetch data', life: 2000 });
//   }
// };
</script>

<template>
    <div class="h-[87.5vh]">
        <ToastView class="text-center text-[14px] text-red-500" />

        <div class="flex flex-col justify-between md:items-center mb-[20px] md:flex-row md:items-left">
            <div class="md:flex gap-3 md:items-center">
                <div class="text-[20px] text-[#1F2937] dark:text-[#dfdfdf] font-[600]">Configure Menu Links</div>
                <div v-if="topHeader['user_type'] == 1 || topHeader['user_type'] == 2" class="flex align-items-center gap-1 cursor-pointer font-medium text-[16px]">
                    <span v-if="vendorData.length == 0" @click="showVendorModal()" style="cursor: pointer"> ( - ) </span>
                    <span v-else>
                        {{ vendorData[0] }}
                    </span>
                    <button @click="showVendorModal()" class="show-vendor-btn font-medium">
                        <img :src="getImg('vendor_v3')" alt="delete img" class="cursor-pointer h-[15px]" />
                    </button>
                    <!-- vendor model  -->
                    <VendorModal v-if="topHeader['user_type'] == 1 || topHeader['user_type'] == 2" v-show="isAdmin" @close-modal="isAdmin = false" @applyVendor="applyVendorFilter" @resetVendor="resetVendorFilter" />
                </div>
            </div>
            <div class="flex justify-between items-center">
                <div class="flex items-center bg-[#fff] dark:text-[#dfdfdf] dark:bg-[#4d4d4d] dark:border-[#4d4d4d] border-[1px] border-[#d1d5db] rounded-[12px] py-[2px]">
                    <img src="../../../assets/images/config-menu-store.svg" alt="logo" class="pt-[2px] pl-[10px]" />

                    <div>
                        <Dropdown id="config-menu" v-model="selectedCity" @change="getListByStoreId" :options="vendorData.length ? vendorData : cities" optionLabel="name" placeholder="N/A" class="w-full md:w-14rem border-none h-[32px]" />
                    </div>
                </div>

                <input
                    v-if="topHeader['user_type'] == 3"
                    type="button"
                    value="Preview Your Tracking Page"
                    class="rounded-[25px] px-[8px] py-[8px] bg-[#36b37e] text-[13px] font-semibold text-[#ffffff] border-[1px] border-[#00875a] w-[200px] text-center cursor-pointer ml-[10px]"
                />
            </div>
        </div>
        <!-- menu div start from here  -->
        <div class="bg-[#fff] dark:bg-[#313131] text-[#4b5563] text-[13px] rounded-[12px] w-full pt-[27px] pb-[30px]">
            <table class="w-[100%]">
                <thead class="header border-b-[1px] border-[#4b5563] dark:border-[#4d4d4d] text-[#4b5563] dark:text-[#dfdfdf]">
                    <tr class="">
                        <th class="w-[23%] text-left px-[31px]">Menu Name</th>
                        <th class="w-[59%] text-left pr-[16px] pl-[20px]">Link</th>
                        <th class="w-[7%] text-left pr-[16px] pl-[20px]">Action</th>
                    </tr>
                </thead>
                <!-- input start  -->

                <tbody class="mt-[20px] border-b-[1px] border-[#4b5563] dark:border-[#4d4d4d]">
                    <tr v-for="row in rows" :key="row.id">
                        <td class="pr-[0] pb-[10px] pl-[32px] pt-[16px]">
                            <input type="text" class="border-[1px] border-[ #374151] text-[13px] h-[40px] text-left w-full py-[1px] pr-[2px] pl-[17px] dark:border-[#4d4d4d]" />
                        </td>
                        <td class="pr-[0] pb-[10px] pl-[10px] pt-[16px]">
                            <input type="text" placeholder="www.test.com" class="border-[1px] border-[ #374151] dark:border-[#4d4d4d] text-[13px] h-[40px] text-left py-[1px] pr-[2px] pl-[15px] w-full" />
                        </td>
                        <td class="pr-[0] pb-[10px] pl-[27px] pt-[16px]">
                            <img :src="getImg('delete')" alt="delete img" @click="deleteRow(row.id)" class="cursor-pointer" />
                        </td>
                    </tr>

                    <tr>
                        <td colspan="3" class="text-[14px] pt-[10px] pb-[23px] mr-[16px]">
                            <button type="button" class="text-[#0052cc] mt-[10px] mr-[0] mb-[5px] ml-[32px] text-center" @click="addRow">Add Row</button>
                        </td>
                    </tr>
                </tbody>

                <tr>
                    <td colspan="3" class="pt-[23px] pl-[33px]">
                        <button type="button" class="w-[88px] h-[32px] rounded-[50px] bg-[#0052cc] text-[13px] text-[#fff]" @click="saveConfig">Save</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<style lang="scss">
@import './configureMenu.scss';
@import '../../../assets/itl-common-css/common-css.scss';

.header {
    font-family: $interRegular;
}

.layout-content {
    padding: 20px !important;
}

.p-dropdown:not(.p-disabled).p-focus {
    border-color: transparent !important;
    box-shadow: none;
    padding: 0px !important;
}

#config-menu .p-inputtext {
    padding: 7px;
}

.show-vendor-btn {
    margin-top: 5px;
    font-weight: 900;
}

// .input-before .vendor-check-list{
// top: 0;
//     }
</style>
