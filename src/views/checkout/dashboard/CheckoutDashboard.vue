<script setup>
import { apiDashboard } from '../../../api/checkout/dashboard';
import { apiDropdown } from '../../../api/checkout/genralSettingDropdown';
import config from '../../../util/config';
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import Line from '../../../components/Charts/Line.vue';
import Bar from '../../../components/Charts/Bar.vue';
import Doughnut from '../../../components/Charts/Doughnut.vue';
import HalfDoughnut from '../../../components/Charts/HalfDoughnut.vue';
import NewFunnel from '../../../components/Charts/NewFunnel.vue';
import LineBar from '../../../components/Charts/LineBar.vue';
import StaticLine from '../../../components/Charts/StaticLine.vue';
import NormalTabels from '../../../components/itl-dataTable-files/itl-table/NormalTables.vue';
import DashboardPhone from '../../../assets/images/dashboard-phone.svg';
import DashboardDesktop from '../../../assets/images/dashboard-desktop.svg';
import ShopifyIcon from '../../../assets/images/modal-shopify-icon.webp';
import DashboardTab from '../../../assets/images/dashboard-tab.svg';
import UpArrow from '../../../assets/images/dashboard-uparrow-icon.svg';
import { jsonData } from '../../../components/Charts/DummyData.ts';
import DownArrow from '../../../assets/images/dashboard-downarrow-icon.svg';
import DropDownStatus from '../../../assets/images/dropDownStatus.svg';
import CompleteStatus from '../../../assets/images/converstionStatus.svg';
import { checkUserType, checkAccessRight, deepCheckAccessRight } from '../../../util/commonHandlers.ts';
import { DARKMODE } from '../../../store/dark-mode/constants';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
import DateTimeRangePicker from '../../../components/itl-common-features/itl-date-range-picker/dataTable-dateRange/DateTimeRangePicker.vue';
import { subDays, format } from 'date-fns';
import { useStore } from 'vuex';
import NoRecord from './component/NoRecord.vue';
import VendorModal from '../../../components/common-modal-files/VendorModal.vue';
const store = useStore();
const doughnutColor = ['#d0d6dc', '#222222', '#9275f8', '#4c9aff', '#36b712'];
const HalfdoughnutColor = ['#4c9aff', '#36b712', '#9275f8'];
const FunnelColor = ['#2848c0', '#376bcb', '#5fb7e5', '#add9f0', '#24d21d'];
const startDate = ref([subDays(new Date(), 29), new Date()]);
const topHeader = JSON.parse(localStorage.getItem('top_header'));
const vendorData = ref([]);
const isAdmin = ref(false);
const cities = ref([
    { name: 'Divinetrends', img: ShopifyIcon },
    { name: 'Option 2', img: DownArrow },
    { name: 'Option 3', img: DashboardTab },
    { name: 'Option 4', img: UpArrow },
    { name: 'Option 5', img: UpArrow },
    { name: 'Option 6', img: UpArrow },
]);
const funnel = ref({ name: 'All Device', id: 0 });
const tempData = ref({
    dropDownOptions: '',
    header: '',
    visits: '',
    orderGraph: '',
    product: '',
    transaction: '',
    state: '',
    totalSessionGraph: '',
    vistsByTime: '',
    salesgraph: '',
    salesOverview: '',
    payment: '',
    funnel: '',
});
const visitsData = ref([]);
const funnelOptions = ref([
    { name: 'All Device', id: 0 },
    { name: 'Mobile', id: 3 },
    { name: 'Desktop', id: 1 },
    { name: 'Tab', id: 2 },
]);
const selectedCity = ref();
const newUpdateValue = ref('');
const tooltip = true;
const deviceId = ref();
const FetchImg = (imgName) => {
    return config.baseUrlImages + imgName;
};
const fetchApi = async (path, date, storeId) => {
    try {
        const payload = {
            platformId: '2',
            storeId: storeId,
            searchDateLabel: newDate ? newDate.value?.label || 'Last 30 Days' : 'Last 30 Days',
            searchDate: newDate ? newDate.value?.selectedDate || getDefaultDateRange() : getDefaultDateRange(),
            device_type: deviceId ? deviceId.value?.id : '1',
            vendor_id: vendorData.value[1] || '',
        };
        return await apiDashboard(payload, path);
    } catch (error) {
        console.error('Error in fetchApi:', error);
        throw error;
    }
};
const updateStoreId = async (newStoreId) => {
    newUpdateValue.value = newStoreId;
    tempData.value.header = await fetchApi('widgets', selectedCity.value.id, newStoreId);
    tempData.value.visits = await fetchApi('visits', selectedCity.value.id, newStoreId);
    tempData.value.orderGraph = await fetchApi('order-graph', selectedCity.value.id, newStoreId);
    tempData.value.totalSessionGraph = await fetchApi('total-session-graph', selectedCity.value.id, newStoreId);
    tempData.value.product = await fetchApi('product', selectedCity.value.id, newStoreId);
    tempData.value.transaction = await fetchApi('transaction', selectedCity.value.id, newStoreId);
    tempData.value.state = await fetchApi('state', selectedCity.value.id, newStoreId);
    tempData.value.vistsByTime = await fetchApi('visit-by-time', selectedCity.value.id, newStoreId);
    tempData.value.salesgraph = await fetchApi('sales-graph', selectedCity.value.id, newStoreId);
    tempData.value.salesOverview = await fetchApi('sales-overview', selectedCity.value.id, newStoreId);
    tempData.value.payment = await fetchApi('payment', selectedCity.value.id, newStoreId);
    tempData.value.funnel = await fetchApi('sales-funnel-graph', selectedCity.value.id, newStoreId);
};
const updateFunnel = async (newId) => {
    tempData.value.funnel = await fetchApi('sales-funnel-graph', selectedCity.value.id, newUpdateValue.value, newId.toString());
};
watch(funnel, (newValue) => {
    if (newValue) {
        deviceId.value = newValue;
        updateFunnel(newValue.id);
    }
});
watch(selectedCity, async (newValue) => {
    if (newValue) {
        tempData.value.orderGraph = '';
        tempData.value.vistsByTime = '';
        tempData.value.funnel = '';
        // if (topHeader['user_type'] != 1 && topHeader['user_type'] != 2) {
        await updateStoreId(newValue.id);
        // }
    }
});
const getDefaultDateRange = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 30);
    const startDate = currentDate.toISOString().split('T')[0];
    const endDate = new Date().toISOString().split('T')[0];
    return `${startDate} ${endDate}`;
};
const ApiCalls = async (date) => {
    try {
        tempData.value.header = await fetchApi('widgets', date, selectedCity.value.id);
        tempData.value.visits = await fetchApi('visits', date, selectedCity.value.id);
        tempData.value.orderGraph = await fetchApi('order-graph', date, selectedCity.value.id);
        tempData.value.totalSessionGraph = await fetchApi('total-session-graph', date, selectedCity.value.id);
        tempData.value.product = await fetchApi('product', date, selectedCity.value.id);
        tempData.value.transaction = await fetchApi('transaction', date, selectedCity.value.id);
        tempData.value.state = await fetchApi('state', date, selectedCity.value.id);
        tempData.value.vistsByTime = await fetchApi('visit-by-time', date, selectedCity.value.id);
        tempData.value.salesgraph = await fetchApi('sales-graph', date, selectedCity.value.id);
        tempData.value.salesOverview = await fetchApi('sales-overview', date, selectedCity.value.id);
        tempData.value.payment = await fetchApi('payment', date, selectedCity.value.id);
        tempData.value.funnel = await fetchApi('sales-funnel-graph', date, selectedCity.value.id);
    } catch (error) {
        console.error('Error in ApiCalls:', error);
    }
};
const newDate = ref();
const updateDate = async (date) => {
    newDate.value = date;
    tempData.value.orderGraph = '';
    tempData.value.vistsByTime = '';
    tempData.value.funnel = '';
    await ApiCalls();
    startDate.value = date.selectedDate.split(' ');
};
onMounted(async () => {
    if (topHeader['user_type'] != 1 && topHeader['user_type'] != 2) {
        tempData.value.dropDownOptions = await apiDropdown();
        [selectedCity.value] = tempData.value.dropDownOptions.data;
        // await ApiCalls(selectedCity.value.id);
    }
});
onMounted(() => document.body.classList.add('checkout-dashboard'));
onUnmounted(() => document.body.classList.remove('checkout-dashboard'));
// Select Vendor model
const getImg = (imageName) => {
    return new URL(`../../../assets/images/${imageName}.svg`, import.meta.url).href;
};
const applyVendorFilter = async (vendorName) => {
    vendorName.forEach(async (element) => {
        const tempData = element.split(',');
        console.log(tempData);
        isAdmin.value = false;
        const payload = {
            vendor_id: tempData[1],
        };
        vendorData.value = tempData;
    });
    // const data = {
    //     vendor_id: vendorData.value[1] || '',
    // };
    tempData.value.dropDownOptions = await apiDropdown({ vendor_id: vendorData.value[1] });
    [selectedCity.value] = tempData.value.dropDownOptions.data;
    await ApiCalls(selectedCity.value.id);
    // await store.dispatch(`${CHECKOUTSETTING.NAME}/getStoreDetails`, data);
};
const resetVendorFilter = () => {
    vendorData.value = [];
    isAdmin.value = false;
    tempData.value = {
        dropDownOptions: '',
        header: '',
        visits: '',
        orderGraph: '',
        product: '',
        transaction: '',
        state: '',
        totalSessionGraph: '',
        vistsByTime: '',
        salesgraph: '',
        salesOverview: '',
        payment: '',
        funnel: '',
    }
};
const showVendorModal = () => {
    isAdmin.value = true;
};
// Selecte vendor model end
</script>
<template>
    <div class="dashboard-main-outer-layer">
        <div class="flex flex-column justify-content-between lg:align-items-center md:flex-row">
            <div class="flex">
                <div class="dashboard-title">Dashboard</div>
                <div v-if="(topHeader['user_type'] == 1 || topHeader['user_type'] == 2) && checkAccessRight('dashboard') ? true : deepCheckAccessRight('checkout', 'dashboard', 'dashboard_view')"
                    class="flex md:justify-center md:items-center md:ml-[10px]">
                    <div class="show-vendor ml-[5px] cursor-pointer"
                        v-if="topHeader['user_type'] == 1 || topHeader['user_type'] == 2">
                        <button @click="showVendorModal()" class="show-vendor-btn">
                            <img v-if="!darkModeVal" :src="getImg('vendor_v3')" />
                            <img v-else src="../../../assets/images/dark-mode/dark-vendor_v3.svg" alt="vendor" />
                        </button>
                        <span v-if="vendorData.length == 0" @click="showVendorModal()" class="ml-[4px]"> ( Select
                            Vendor
                            ) </span>
                        <span v-else @click="showVendorModal()" class="vendorMargin ml-2"> {{ vendorData[0] }} </span>
                    </div>
                    <VendorModal v-if="topHeader['user_type'] == 1 || topHeader['user_type'] == 2" v-show="isAdmin"
                        @close-modal="isAdmin = false" @applyVendor="applyVendorFilter"
                        @resetVendor="resetVendorFilter" />
                </div>
            </div>
            <div class="dashbord-heading-dropdown flex justify-content-between align-items-center">
                <div class="heading-dropdown-option"
                    v-if="(topHeader['user_type'] == 1 || topHeader['user_type'] == 2 && vendorData.length > 0) || topHeader['user_type'] == 3">
                    <Dropdown v-model="selectedCity" id="checkout-dashboard" :options="tempData.dropDownOptions.data"
                        optionLabel="store_name" placeholder="Select a City" class="w-20rem"
                        v-if="selectedCity && tempData.dropDownOptions.data">
                        <template #value="slotProps">
                            <div class="flex align-items-center gap-2 opition-class">
                                <!-- <img :src="FetchImg(slotProps.value.store_logo)" class="option-image" /> -->
                                <div class="">{{ slotProps.value.store_name }}</div>
                            </div>
                        </template>
                    </Dropdown>
                </div>
                <div class="heading-calender">
                    <!-- <DateTimeRangePicker @updateDate="updateDate"  :startDate="startDate" /> -->
                    <DateTimeRangePicker @updateDate="updateDate" :hideEmptySpace="true" :startDate="startDate"
                        :inline="false" />
                </div>
            </div>
        </div>
        <!-- section 1  start here  -->
        <div class="dashboard-section1 flex flex-column md:flex-row">
            <div class="dashboard-section-card">
                <div class="section-card-header justify-content-between">
                    <div class="section-card-contains flex">
                        <div class="section-card-title">Total Sales</div>
                        <div v-if="tempData.header.all_sales_data_array"
                            class="section-card-number flex align-items-center flex-wrap">
                            <div v-if="tempData.header.all_sales_data_array[0].total_sales != 0"
                                v-tooltip.top="tempData.header.all_sales_data_array[4].tooltip"
                                class="hover:cursor-pointer">
                                ₹{{ tempData.header.all_sales_data_array ?
                    tempData.header.all_sales_data_array[0].total_sales :
                    0 }}
                            </div>
                            <div v-else class="hover:cursor-pointer">₹{{ tempData.header.all_sales_data_array ?
                    tempData.header.all_sales_data_array[0].total_sales : 0 }}</div>
                            <span class="flex">
                                <span
                                    :class="tempData.header.all_sales_data_array && tempData.header.all_sales_data_array[3]?.isWidgetUpArrow != 'false' ? 'text-[#178713] flex gap-1 ' : 'text-[#EE596B] flex gap-1 '">
                                    <img
                                        :src="tempData.header.all_sales_data_array && tempData.header.all_sales_data_array[3]?.isWidgetUpArrow != 'false' ? UpArrow : DownArrow" />
                                    {{ tempData.header.all_sales_data_array ?
                    tempData.header.all_sales_data_array[2].total_sales_up_down_percentage : 0 }}
                                </span>
                                &nbsp;vs last month
                            </span>
                        </div>
                        <div v-else class="font-bold text-[20px]">
                            ₹0
                        </div>
                    </div>
                    <div class="section1-graph" v-if="tempData.header.all_sales_data_array">
                        <!-- {{ tempData.header.all_sales_data_array[3]?.isWidgetUpArrow  }} -->
                        <StaticLine type="line" id="TotalSaletempData.header.all_sales_data_array" :pointer="false"
                            :borderColor="tempData.header.all_sales_data_array && tempData.header.all_sales_data_array[3]?.isWidgetUpArrow != 'false' ? '#62B78D' : '#f67181'"
                            tension="0.4" height="44px" width="90px" :axesVisible="false"
                            :backgroundColor="tempData.header.all_sales_data_array && tempData.header.all_sales_data_array[3]?.isWidgetUpArrow != 'false' ? 'rgba(0,255,0,0.10)' : 'rgba(255,0,0,0.10)'" />
                    </div>
                </div>
                <div class="section-card-footer">
                    Monthly Average is <span>₹ {{ tempData.header.all_sales_data_array ?
                    tempData.header.all_sales_data_array[1].monthly_avarage_total_sales : 0 }} </span>
                </div>
            </div>
            <div class="dashboard-section-card">
                <div class="section-card-header justify-content-between">
                    <div class="section-card-contains flex">
                        <div class="section-card-title">Total Orders</div>
                        <div v-if="tempData.header.all_order_data_array"
                            class="section-card-number flex align-items-center flex-wrap">
                            <div v-if="tempData.header.all_order_data_array[0].total_orders != 0"
                                v-tooltip.top="tempData.header.all_order_data_array[4].tooltip"
                                class="hover:cursor-pointer">
                                {{ tempData.header.all_order_data_array ?
                    tempData.header.all_order_data_array[0].total_orders :
                    0 }}
                            </div>
                            <div v-else class="hover:cursor-pointer">{{ tempData.header.all_order_data_array ?
                    tempData.header.all_order_data_array[0].total_orders : 0 }}</div>
                            <span class="flex">
                                <span
                                    :class="tempData.header.all_order_data_array && tempData.header.all_order_data_array[3]?.isWidgetUpArrow != 'false' ? 'text-[#178713] flex gap-1 ' : 'text-[#EE596B] flex gap-1 '">
                                    <img
                                        :src="tempData.header.all_order_data_array && tempData.header.all_order_data_array[3]?.isWidgetUpArrow != 'false' ? UpArrow : DownArrow" />
                                    {{ tempData.header.all_order_data_array ?
                    tempData.header.all_order_data_array[2].total_orders_up_down_percentage : 0 }}
                                </span>&nbsp;
                                vs last month
                            </span>
                        </div>
                        <div v-else class="font-bold text-[20px]">
                            0
                        </div>
                    </div>
                    <div
                        v-if="tempData.header.all_order_data_array && tempData.header?.all_order_data_array?.[3]?.isWidgetUpArrow">
                        <StaticLine type="line" id="TotalOrders" :pointer="false"
                            :borderColor="tempData.header.all_order_data_array && tempData.header.all_order_data_array[3]?.isWidgetUpArrow != 'false' ? '#62B78D' : '#f67181'"
                            tension="0.4" height="44px" width="90px" :axesVisible="false"
                            :backgroundColor="tempData.header.all_order_data_array && tempData.header.all_order_data_array[3]?.isWidgetUpArrow != 'false' ? 'rgba(0,255,0,0.10)' : 'rgba(255,0,0,0.10)'" />
                    </div>
                </div>
                <div class="section-card-footer">
                    Monthly Average is <span> {{ tempData.header.all_order_data_array ?
                    tempData.header.all_order_data_array[1].monthly_avarage_total_orders : 0 }} </span>
                </div>
            </div>
            <div class="dashboard-section-card">
                <div class="flex section-card-header-last">
                    <div>
                        <div class="section-card-title">Prepaid Order Value</div>
                        <div v-if="tempData.header.all_prepaid_value_data_array" class="">
                            <div v-if="tempData.header.all_prepaid_value_data_array[0].prepaid_order_value != 0"
                                class="section-card-subtitle hover:cursor-pointer"
                                v-tooltip.top="tempData.header.all_prepaid_value_data_array[3].tooltip">
                                ₹ {{ tempData.header.all_prepaid_value_data_array ?
                    tempData.header.all_prepaid_value_data_array[0].prepaid_order_value : 0 }}
                            </div>
                            <div v-else class="section-card-subtitle hover:cursor-pointer">₹ {{
                    tempData.header.all_prepaid_value_data_array ?
                        tempData.header.all_prepaid_value_data_array[0].prepaid_order_value : 0 }}</div>
                        </div>
                        <div v-else class="font-bold text-[20px]">
                            ₹0
                        </div>
                    </div>
                    <div>
                        <div class="section-card-title">COD Order Value</div>
                        <div v-if="tempData.header.all_cod_value_data_array"
                            class="flex flex-column justify-content-start">
                            <div v-if="tempData.header.all_cod_value_data_array[0].cod_order_value != 0"
                                class="section-card-subtitle hover:cursor-pointer"
                                v-tooltip.top="tempData.header.all_cod_value_data_array[3].tooltip">
                                ₹ {{ tempData.header.all_cod_value_data_array ?
                    tempData.header.all_cod_value_data_array[0].cod_order_value : 0 }}
                            </div>
                            <div v-else class="section-card-subtitle hover:cursor-pointer">₹ {{
                    tempData.header.all_cod_value_data_array ?
                        tempData.header.all_cod_value_data_array[0].cod_order_value : 0 }}</div>
                        </div>
                        <div v-else class="font-bold text-[20px]">
                            ₹0
                        </div>
                    </div>
                </div>
                <div class="flex section-last-card-number align-items-center">
                    <div class="flex">
                        <span
                            :class="tempData.header.all_prepaid_value_data_array && tempData.header.all_prepaid_value_data_array[2].isWidgetUpArrow != 'false' ? 'text-[#178713] flex gap-1' : 'text-[#EE596B] flex gap-1 '">
                            <img
                                :src="tempData.header.all_prepaid_value_data_array && tempData.header.all_prepaid_value_data_array[2].isWidgetUpArrow != 'false' ? UpArrow : DownArrow" />
                            {{ tempData.header.all_prepaid_value_data_array ?
                    tempData.header.all_prepaid_value_data_array[1].prepaid_order_up_down_percentage : 0 }}
                        </span>
                        &nbsp; vs last month
                    </div>
                    <div class="flex">
                        <span
                            :class="tempData.header.all_cod_value_data_array && tempData.header.all_cod_value_data_array[2].isWidgetUpArrow != 'false' ? 'text-[#178713] flex gap-1 ' : 'text-[#EE596B] flex gap-1 '">
                            <img
                                :src="tempData.header.all_cod_value_data_array && tempData.header.all_cod_value_data_array[2].isWidgetUpArrow != 'false' ? UpArrow : DownArrow" />
                            {{ tempData.header.all_cod_value_data_array ?
                    tempData.header.all_cod_value_data_array[1].cod_order_up_down_percentage : 0 }}
                        </span>
                        &nbsp; vs last month
                    </div>
                </div>
            </div>
        </div>
        <!-- section 1  ends here  -->
        <!-- Below section  start here  -->
        <div class="dashboard-section2 flex flex-column md:flex-row md:flex-wrap">
            <!-- section 2 start -->
            <div class="section2-contain1">
                <div class="section2-contain1-title">Sales Overview</div>
                <div v-if="(!checkUserType('vendor') && vendorData.length > 0) || checkUserType('vendor')"
                    class="flex graph-section flex-column lg:flex-row align-items-center">
                    <div class="section2-graph">
                        <div
                            v-if="tempData && tempData.salesgraph && !tempData.salesgraph?.noRecord && tempData.salesgraph.total_sales_data">
                            <Line type="line" id="sale-overview" backgroundColor="rgba(18, 120, 255,0.10)" :line2="true"
                                data2backgroundColor="rgba(255,0,0,0.10)" :data2="sortedData" data2borderColor="#ffc42e"
                                data2tension="0" :tempData="tempData.salesgraph.total_sales_data" borderColor="#1279ff"
                                :pointer="false" :customeWidth="true" tension="0" borderWidth="2" data2borderWidth="2"
                                width="500" height="500" :legendDisplay="true" :axesVisible="true" />
                        </div>
                        <div v-else class="no-record-outer flex flex-col justify-center items-center gap-1">
                            <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" class="w-[75px]" />
                            <div class="head">No Records Found</div>
                            <div class="sub-head">Try changing the filters or search term.</div>
                            <slot name="viewAllApiData"></slot>
                        </div>
                    </div>
                    <div class="flex md:flex-wrap flex-column justify-content-start ml-0 md:ml-[16px] w-1/2">
                        <div class="section2-graph-info flex justify-content-between flex-wrap md:flex-row"
                            v-if="tempData.salesOverview">
                            <div class="">
                                <div class="graph-info-title">Conversion Rate</div>
                                <div class="graph-info-subtitle">
                                    {{ tempData.salesOverview?.conversion_rate_array?.percentage || 0 }}
                                    <span
                                        :class="tempData.salesOverview.conversion_rate_array.isWidgetUpArrow ? 'text-[#178713] flex gap-1 ' : 'text-[#EE596B] flex gap-1'">
                                        <img
                                            :src="tempData.salesOverview.conversion_rate_array.isWidgetUpArrow ? UpArrow : DownArrow" />
                                        {{
                    tempData.salesOverview?.conversion_rate_array.total_conversion_rate_up_down_percentage
                }}</span>
                                </div>
                            </div>
                            <div class="" style="margin-right: 8px">
                                <div class="graph-info-title">Abandonment Rate</div>
                                <div class="graph-info-subtitle">
                                    {{ tempData.salesOverview?.abandonment_rate_array?.percentage || 0 }}
                                    <span
                                        :class="tempData.salesOverview.abandonment_rate_array.isWidgetUpArrow ? 'text-[#178713] flex gap-1' : 'text-[#EE596B] flex gap-1'">
                                        <img
                                            :src="tempData.salesOverview.abandonment_rate_array.isWidgetUpArrow ? UpArrow : DownArrow" />
                                        {{
                    tempData.salesOverview?.abandonment_rate_array.total_abandonment_rate_up_down_percentage
                }}</span>
                                </div>
                            </div>
                            <div class="">
                                <div class="graph-info-title">Avg. Checkout Time</div>
                                <div class="graph-info-subtitle">
                                    {{ tempData.salesOverview?.avarage_checkout_time_array?.avarage_checkout_time || 0
                                    }}
                                    <span
                                        :class="tempData.salesOverview.avarage_checkout_time_array.isWidgetUpArrow ? 'text-[#178713] flex gap-1' : 'text-[#EE596B] flex gap-1'">
                                        <img
                                            :src="tempData.salesOverview.avarage_checkout_time_array.isWidgetUpArrow ? UpArrow : DownArrow" />
                                        {{
                    tempData.salesOverview?.avarage_checkout_time_array.avg_checkout_time_up_down_percent
                }}</span>
                                </div>
                            </div>
                            <div class="">
                                <div class="graph-info-title">Coupon Usage Rate</div>
                                <div class="graph-info-subtitle">
                                    {{ tempData.salesOverview?.coupon_usage_rate_array?.coupon_used || 0 }}
                                    <span
                                        :class="tempData.salesOverview.coupon_usage_rate_array.isWidgetUpArrow ? 'text-[#178713] flex gap-1' : 'text-[#EE596B] flex gap-1'">
                                        <img
                                            :src="tempData.salesOverview.coupon_usage_rate_array.isWidgetUpArrow ? UpArrow : DownArrow" />
                                        {{
                    tempData.salesOverview?.coupon_usage_rate_array.coupon_usage_rate_up_down_percentage
                }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="no-record-outer flex flex-col justify-center items-center gap-1">
                    <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" class="w-[75px]" />
                    <div class="head">No Records Found</div>
                    <div class="sub-head">Try changing the filters or search term.</div>
                    <slot name="viewAllApiData"></slot>
                </div>
            </div>
            <div class="section2-contain2">
                <div class="section2-contain2-title">Total Sessions</div>
                <div v-if="!tempData.totalSessionGraph.noRecord"
                    class="section2-contain2-subtitle flex items-center gap-2">
                    <div v-tooltip.top="tempData.totalSessionGraph.tooltip" class="hover:cursor-pointer"
                        style="max-width: fit-content">{{ tempData.totalSessionGraph.total_sessions_data_count }}</div>
                    <div class="flex text-[11px]">
                        <span
                            :class="tempData.totalSessionGraph && tempData.totalSessionGraph.isWidgetUpArrow != 'false' ? 'text-[#178713] flex gap-1 ' : 'text-[#EE596B] flex gap-1 '">
                            <img
                                :src="tempData.totalSessionGraph && tempData.totalSessionGraph.isWidgetUpArrow != 'false' ? UpArrow : DownArrow" />
                            {{ tempData?.totalSessionGraph?.total_sessions_up_down_percentage || 0 }}
                        </span>
                        <span class="span-month">&nbsp;vs last month</span>
                    </div>
                </div>
                <div class="section2-graph"
                    v-if="tempData && tempData.totalSessionGraph && !tempData.totalSessionGraph?.noRecord && tempData.totalSessionGraph.total_sessions_data">
                    <Line type="line" id="totalSession" borderColor="#23cea5" :pointer="false" :customeWidth="true"
                        data1Label="Sessions" tension="0" borderWidth="2"
                        :tempData="tempData.totalSessionGraph.total_sessions_data" data2borderWidth="2"
                        :legendDisplay="true" backgroundColor="rgba(18, 255, 120,0.10)" :axesVisible="true"
                        :line2="true" data2backgroundColor="rgba(255,0,0,0.10)" :data2="sortedData"
                        data2borderColor="#ffc42e" data2tension="0.3" />
                </div>
                <div v-else class="no-record-outer flex flex-col justify-center items-center gap-1">
                    <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" class="w-[75px]" />
                    <div class="head">No Records Found</div>
                    <div class="sub-head">Try changing the filters or search term.</div>
                    <slot name="viewAllApiData"></slot>
                </div>
                <!-- If No Record Found -->
                <!-- <div v-if="tempData && tempData.totalSessionGraph && !tempData.totalSessionGraph?.no_record_data">
                    <NoRecord />
                </div> -->
                <!-- If No Record Found -->
            </div>
            <!-- section 2  ends -->
            <!-- section 3 start  -->
            <!-- <div class="dashboard-section3 flex flex-column md:flex-row"> -->
            <div class="section3-card">
                <div>
                    <div class="section3-title">Orders</div>
                    <div v-if="tempData.dropDownOptions" class="section3-subtitle flex items-center gap-2">
                        <div v-tooltip.top="tempData.orderGraph.tooltip" class="hover:cursor-pointer"
                            style="max-width: fit-content">
                            {{ tempData.orderGraph ? tempData.orderGraph.total_orders_data_count : 0 }}
                        </div>
                        <span class="flex">
                            <span
                                :class="tempData.header.all_order_data_array && tempData.header.all_order_data_array[3]?.isWidgetUpArrow != 'false' ? 'text-[#178713] flex gap-1 ' : 'text-[#EE596B] flex gap-1 '">
                                <img
                                    :src="tempData.header.all_order_data_array && tempData.header.all_order_data_array[3]?.isWidgetUpArrow != 'false' ? UpArrow : DownArrow" />
                                {{ tempData.header.all_order_data_array ?
                    tempData.header.all_order_data_array[2].total_orders_up_down_percentage : 0 }}
                            </span>
                            <span class="section3-span"> &nbsp; vs last month </span>
                        </span>
                    </div>
                </div>
                <div v-if="tempData && tempData.orderGraph && tempData.orderGraph.total_orders_data && !tempData.orderGraph.noRecord"
                    class="section3-graph1">
                    <Bar type="bar" id="Orders" borderColor="blue" tension="0" :customeWidth="true"
                        backgroundColor="#4c9aff" :tempData="tempData.orderGraph.total_orders_data"
                        :legendDisplay="true" :axesVisible="true" :line2="true" :data2="sortedData"
                        data2backgroundColor="green" data2borderColor="green" data2tension="0.3" data1Label="Orders" />
                </div>
                <div v-else class="no-record-outer flex flex-col justify-center items-center gap-1">
                    <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" class="w-[75px]" />
                    <div class="head">No Records Found</div>
                    <div class="sub-head">Try changing the filters or search term.</div>
                    <slot name="viewAllApiData"></slot>
                </div>
            </div>
            <div class="section3-card">
                <div class="section3-title">Payments</div>
                <div v-if="tempData.payment && !tempData.payment.noRecord">
                    <div>
                        <!-- 
                            this is the hide because of the label the chart is getting smaller and the labels are getting bigger 
                        :legendDisplay="true" -->
                        <div v-if="tempData.payment"
                            class="section3-graph2 flex justify-content-center align-items-center">
                            <Doughnut v-if="tempData.payment" type="doughnut" id="Payments" borderColor="white"
                                tension="0" width="380" height="205" :tempData="tempData.payment.Graph_array"
                                :customWidth="true" :legendDisplay="true" :backgroundColor="doughnutColor"
                                :axesVisible="false" :line2="false" :data2="sortedData" data2backgroundColor="green"
                                data2borderColor="red" data2tension="0.3" />
                        </div>
                    </div>
                    <div v-if="tempData.dropDownOptions" class="flex flex-column section3-footer">
                        <div class="flex justify-content-between align-item-center">
                            <div>
                                <div class="section3-footer-heading">Cash on Delivery</div>
                                <div class="section3-footer-subheading">{{ tempData.payment ?
                    tempData.payment.cod_order_percentage
                    : 0 }}%</div>
                            </div>
                            <div>
                                <div class="border-1 border-circle section3-heading-center">VS</div>
                            </div>
                            <div class="section3-prepaid-footer">
                                <div class="section3-footer-heading">Prepaid</div>
                                <div class="section3-footer-subheading">{{ tempData.payment ?
                    tempData.payment.prepaid_order_percentage : 0 }}%</div>
                            </div>
                        </div>
                        <div>
                            <div class="relative flex gap-1">
                                <div class="bg-[#46b9f6] h-[8px] rounded-[100px]"
                                    :style="{ width: tempData.payment ? `${tempData.payment.cod_order_percentage}%` : '0%' }">
                                </div>
                                <div class="bg-[#dfe3e6] h-[8px] rounded-[100px]"
                                    :style="{ width: tempData.payment ? `${100 - tempData.payment.cod_order_percentage}%` : '0%' }">
                                </div>
                            </div>
                            <!-- <ProgressBar :value="tempData.payment ? tempData.payment.cod_order_percentage : 0"
                            style="background-color: #dfe3e6; border-radius: 30px" :pt="{
                            value: { style: { background: '#46b9f6', borderRadius: '30px' } },
                        }" /> -->
                        </div>
                    </div>
                </div>
                <div v-else class="no-record-outer flex flex-col justify-center items-center gap-1">
                    <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" class="w-[75px]" />
                    <div class="head">No Records Found</div>
                    <div class="sub-head">Try changing the filters or search term.</div>
                    <slot name="viewAllApiData"></slot>
                </div>
            </div>
            <div class="section3-card">
                <div class="section3-title">Visits by Device</div>
                <div class="flex flex-column justify-content-center align-items-center gap-2">
                    <div
                        v-if="tempData && tempData.visits && tempData.visits.all_visits_percentage_array && !tempData.visits.noRecord">
                        <HalfDoughnut type="doughnut" id="vistsbydevice" borderColor="white" tension="0" width="220"
                            height="220" :tempData="tempData.visits.all_visits_percentage_array"
                            :backgroundColor="HalfdoughnutColor" :legendDisplay="true" :axesVisible="false"
                            :line2="false" :data2="sortedData" data2backgroundColor="green" data2borderColor="red"
                            data2tension="0.3" />
                    </div>
                    <div v-else class="no-record-outer flex flex-col justify-center items-center gap-1 mt-5">
                        <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" class="w-[75px]" />
                        <div class="head">No Records Found</div>
                        <div class="sub-head">Try changing the filters or search term.</div>
                        <slot name="viewAllApiData"></slot>
                    </div>
                    <div class="flex align-items-center section3-footer-content" v-if="!tempData.visits.noRecord">
                        <!--  If Sequence is Change Just Change the Parent Div -->
                        <div class="flex flex-column align-items-center justify-content-center" style="gap: 3px">
                            <span>
                                <img :src="DashboardPhone" />
                            </span>
                            <span class="footer-content-title"> {{ tempData.visits.all_mobile_visits_array ?
                    tempData.visits.all_mobile_visits_array.mobile_visits_percentage : 0 }}% </span>
                            <span class="flex gap-1">
                                <img
                                    :src="tempData.visits.all_mobile_visits_array && tempData.visits.all_mobile_visits_array.isWidgetUpArrow != 'false' ? UpArrow : DownArrow" />
                                <span
                                    :class="tempData.visits.all_mobile_visits_array && tempData.visits.all_mobile_visits_array.isWidgetUpArrow != 'false' ? 'text-[#178713] ' : 'text-[#EE596B]'">
                                    {{ tempData.visits.all_mobile_visits_array ?
                    tempData.visits.all_mobile_visits_array.mobile_visits_up_down_percentage : 0
                                    }}%</span>
                            </span>
                        </div>
                        <div class="flex flex-column align-items-center justify-content-center" style="gap: 3px">
                            <span><img :src="DashboardTab" /></span>
                            <span class="footer-content-title"> {{ tempData.visits.all_tab_visits_array ?
                    tempData.visits.all_tab_visits_array.tab_visits_percentage : 0 }}%</span>
                            <span class="flex gap-1">
                                <img
                                    :src="tempData.visits.all_tab_visits_array && tempData.visits.all_tab_visits_array.isWidgetUpArrow != 'false' ? UpArrow : DownArrow" />
                                <span
                                    :class="tempData.visits.all_tab_visits_array && tempData.visits.all_tab_visits_array.isWidgetUpArrow != 'false' ? 'text-[#178713] ' : 'text-[#EE596B] '">
                                    {{ tempData.visits.all_tab_visits_array ?
                    tempData.visits.all_tab_visits_array.tab_visits_up_down_percentage : 0 }}%</span>
                            </span>
                        </div>
                        <div class="flex flex-column align-items-center justify-content-center" style="gap: 3px">
                            <span><img :src="DashboardDesktop" /></span>
                            <span class="footer-content-title"> {{ tempData.visits.all_desktop_visits_array ?
                    tempData.visits.all_desktop_visits_array.desktop_visits_percentage : 0 }}% </span>
                            <span class="flex gap-1">
                                <img
                                    :src="tempData.visits.all_desktop_visits_array && tempData.visits.all_desktop_visits_array.isWidgetUpArrow != 'false' ? UpArrow : DownArrow" />
                                <span
                                    :class="tempData.visits.all_desktop_visits_array && tempData.visits.all_desktop_visits_array.isWidgetUpArrow != 'false' ? 'text-[#178713] ' : 'text-[#EE596B]'">
                                    {{ tempData.visits.all_desktop_visits_array ?
                    tempData.visits.all_desktop_visits_array.desktop_visits_up_down_percentage : 0
                                    }}%</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- section 3 ends  -->
            <!-- sections 4 start  -->
            <!-- </div> -->
            <!-- <div class="dashboard-section4 flex flex-column md:flex-row"> -->
            <div class="section4-left-card relative">
                <div class="flex align-items-center justify-content-between">
                    <div class="section4-title">Sales Funnel</div>
                    <!-- Return Selected ID in API -->
                    <Dropdown v-if="tempData.dropDownOptions" v-model="funnel" :options="funnelOptions"
                        optionLabel="name" placeholder="All Devices" class="w-10rem"
                        style="max-height: 32px; max-width: 136px">
                        <template #value="slotProps">
                            <div class="flex align-items-center gap-2 opition-class">
                                <div class="">{{ slotProps.value.name }}</div>
                            </div>
                        </template>
                    </Dropdown>
                </div>
                <div v-if="tempData.dropDownOptions && !tempData.funnel.noRecord" class="section4-graph">
                    <div class="funnel-labels" v-if="tempData.funnel">
                        <div v-for="id in tempData.funnel.percentage_ratios_array">
                            <div class="funnel-labels-data">
                                <span class="funnel-heading"> {{ id.label }}</span>
                                <div class="flex items-center justify-center">
                                    <span class="dropdown-status">
                                        <img :src="!id.is_widget_up ? DropDownStatus : CompleteStatus" />
                                    </span>
                                    <span class="funnel-preg">{{ id.percentage_ratios }} </span>
                                    <span class="funnel-preg-subheading">{{ id.count }}</span>
                                </div>
                                <span :class="!id.is_widget_up ? 'funnel-dropStatus' : 'funnel-converstionRate'"> {{
                    !id.is_widget_up ? 'Dropoff' : 'Conversion Rate' }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="max-w-[80%] w-[100%] flex items-center funnel-data-outer">
                        <NewFunnel v-if="tempData.funnel && !tempData.funnel.noRecord" id="SaleFunnel"
                            :tempData="tempData.funnel.graph_data_array" :backgroundColor="FunnelColor"
                            :legendDisplay="false" />
                    </div>
                </div>
                <div v-else
                    class="no-record-outer flex flex-col justify-center items-center gap-1 absolute top-[30%] left-[37%]">
                    <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" class="w-[75px]" />
                    <div class="head">No Records Found</div>
                    <div class="sub-head">Try changing the filters or search term.</div>
                    <slot name="viewAllApiData"></slot>
                </div>
            </div>
            <div class="flex flex-column section4-right-card-div">
                <div class="section4-right-card">
                    <div class="section4-right-title">Visits by time</div>
                    <div class="section4-right-graph-1"
                        v-if="tempData && tempData.vistsByTime.data && !tempData.vistsByTime.noRecord">
                        <LineBar id="vistsbytime" borderColor="orange" tension="0" :tempData="tempData.vistsByTime.data"
                            backgroundColor="#e4e4e4" :legendDisplay="true" :axesVisible="true" :line2="true"
                            :data2="sortedData" data2backgroundColor="#4c9aff" data2borderColor="#4c9aff"
                            data2tension="0.3" />
                    </div>
                    <div v-else class="no-record-outer flex flex-col justify-center items-center gap-1">
                        <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" class="w-[75px]" />
                        <div class="head">No Records Found</div>
                        <div class="sub-head">Try changing the filters or search term.</div>
                        <slot name="viewAllApiData"></slot>
                    </div>
                </div>
                <div class="section4-right-card">
                    <div class="section4-right-title">Top Products</div>
                    <div class="section4-right-graph-2" v-if="tempData && tempData.product">
                        <NormalTabels :Datas="tempData.product.products" :coloumData="tempData.product.ColoumnKey"
                            borderClass="noBorder" />
                    </div>
                    <div v-else class="no-record-outer flex flex-col justify-center items-center gap-1">
                        <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" class="w-[75px]" />
                        <div class="head">No Records Found</div>
                        <div class="sub-head">Try changing the filters or search term.</div>
                        <slot name="viewAllApiData"></slot>
                    </div>
                </div>
            </div>
            <!-- section 4 ends  -->
            <!-- section 5 start  -->
            <!-- </div> -->
            <!-- <div class="dashboard-section5"> -->
            <div class="flex flex-column md:flex-row" style="gap: 16px; margin-bottom: 80px; width: 100%">
                <div class="section5-card">
                    <div class="section5-title">Top State</div>
                    <div class="section5-table" v-if="tempData && tempData.state">
                        <NormalTabels :Datas="tempData.state.statewise_data" :coloumData="tempData.state.ColoumnKey" />
                    </div>
                    <div v-else class="no-record-outer flex flex-col justify-center items-center gap-1">
                        <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" class="w-[75px]" />
                        <div class="head">No Records Found</div>
                        <div class="sub-head">Try changing the filters or search term.</div>
                        <slot name="viewAllApiData"></slot>
                    </div>
                </div>
                <div class="section5-card">
                    <div class="section5-title">Top Transactions</div>
                    <div class="section5-table" v-if="tempData && tempData.transaction">
                        <NormalTabels :Datas="tempData.transaction.transaction"
                            :coloumData="tempData.transaction.ColoumnKey" />
                    </div>
                    <div v-else class="no-record-outer flex flex-col justify-center items-center gap-1">
                        <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" class="w-[75px]" />
                        <div class="head">No Records Found</div>
                        <div class="sub-head">Try changing the filters or search term.</div>
                        <slot name="viewAllApiData"></slot>
                    </div>
                </div>
            </div>
            <!-- section 5 ends  -->
        </div>
        <!-- </div> -->
    </div>
</template>
<style lang="scss">
@import './CheckoutDashboard.scss';
</style>
