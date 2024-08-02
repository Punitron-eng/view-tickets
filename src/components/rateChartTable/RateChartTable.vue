<script setup>
import { ref, onMounted, computed, watch, defineProps } from 'vue'
import { useStore } from 'vuex'
import { useCookies } from "vue3-cookies";
import { simplifyDecimal } from './RateChartTable';
import { DARKMODE } from '../../store/dark-mode/constants';
import { useToast } from "primevue/usetoast";
import { RATECHART } from '../../store/rate-chart/constants';
import { setToDefaultValues } from '../rateChartTable/rateChartModal/RateChartModal.ts'
import { checkAccessRight, checkUserType, deepCheckAccessRight } from '../../util/commonHandlers';

const store = useStore();
const toast = useToast();
const { cookies } = useCookies();

const props = defineProps(['isFirstTimeVendorSelect', 'showOtpModalOrNot', 'callServiceType'])

const activeLogistic = ref({
    id: 0,
    name: null
})
const topHeader = ref(JSON.parse(localStorage.getItem('top_header')));
const disabledTable = ref(false)
const fwOrDto = ref('FW')
const activeImgUrl = ref(null);
const activeImgUrlForTable = ref(null);
const thead = ref(null);
const tbody = ref(null);

const activeLogisticDropdown = ref({
    logistic_name: null,
    logistics_logo: null,
    logistics_svg_logo: null
})
const tableData = ref({})
const tempTableData = ref([])
const dynDisabledTableToggle = ref([{ "value": null }, { "value": null }, { "value": null }, { "value": null }, { "value": null }, { "value": null }, { "value": null }, { "value": null }, { "value": null }, { "value": null }, { "value": null }, { "value": null }, { "value": null }, { "value": null }, { "value": null }, { "value": null }, { "value": null }, { "value": null },])
const logisticServiceType = ref([]);
const flatRateTables = ref([])
const dynDisabledToggleFlatRate = ref([])
const logisticServiceTypeFlatRate = ref([])
const tabTypeChanged = ref(false);

const screenWidth = ref(window.screen.width);

const tabs = ref([
    { title: 'Surface' },
    { title: 'Air' },
    { title: 'SND' }
]);

const getAllTableDataArray = computed(() => store.getters[`${RATECHART.NAME}/getAllTableDataArray`]);
const getAllFlatRateTablesDataArray = computed(() => store.getters[`${RATECHART.NAME}/getAllFlatRateTablesDataArray`]);

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const logisticsDataArray = computed(() => store.getters[`${RATECHART.NAME}/getAllLogisticsDataArray`]);
const getActiveLogistics = computed(() => store.getters[`${RATECHART.NAME}/getActiveLogistics`]);
const vendorData = computed(() => store.getters[`${RATECHART.NAME}/getVendor`]);
const deliveryType = computed(() => store.getters[`${RATECHART.NAME}/getDeliveryType`]);
const getTabType = computed(() => store.getters[`${RATECHART.NAME}/getTabType`]);
const getBand = computed(() => store.getters[`${RATECHART.NAME}/getBand`]);
const isSendOtp = computed(() => store.getters[`${RATECHART.NAME}/getIsSendOtp`]);


onMounted(async () => {
    if (topHeader.value.user_type == 3) {
        await store.dispatch(`${RATECHART.NAME}/fetchDefaultData`, { mobile_token: cookies.get("mobile_token"), delivery_type: '0', tab_type: '0' });
        if ((localStorage.getItem('showOtpModal') != 'false') && topHeader.value.user_type == 3) {
            setTimeout(async () => {
                const res = await store.dispatch(`${RATECHART.NAME}/sendOtp`, {});
                if (res.status == 'success') {
                    toast.add({ severity: 'success', summary: 'Success Message', detail: res.html_message, life: 3000 });
                    cookies.set("mobile_token", res.mobile_token);
                } else {
                    toast.add({ severity: 'error', summary: 'Error Message', detail: res.html_message, life: 3000 });
                }
            }, 100)
        }
    } else if (topHeader.value.user_type != 3 && vendorData.value.id) {
        await store.dispatch(`${RATECHART.NAME}/fetchData`, { vendor_id: vendorData.value.id, delivery_type: deliveryType.value, tab_type: getTabType.value });
    }

    if (logisticsDataArray.value.length > 0) {
        activeLogistic.value.id = logisticsDataArray.value[0].id;
        activeLogistic.value.name = logisticsDataArray.value[0].value.logistic_name;
        activeLogisticDropdown.value.logistic_name = logisticsDataArray.value[0].value.logistic_name;
        activeLogisticDropdown.value.logistics_logo = logisticsDataArray.value[0].value.logistics_logo;
        activeLogisticDropdown.value.logistics_svg_logo = logisticsDataArray.value[0].value.logistics_svg_logo;

        await store.dispatch(`${RATECHART.NAME}/setActiveLogistics`, logisticsDataArray.value[0]);

        activeImgUrl.value = getImgUrl('svg', getActiveLogistics.value.value.logistics_svg_logo);
        activeImgUrlForTable.value = getImgUrl('normal', getActiveLogistics.value.value.logistics_logo);

        tempTableData.value = await getAllTableDataArray.value[getActiveLogistics.value.id];
        flatRateTables.value = await getAllFlatRateTablesDataArray.value[getActiveLogistics.value.id]

        handleDynDisabledTableToggle();
    }
});

watch(() => getAllTableDataArray.value, async () => {
    if (getActiveLogistics.value.id == null) {
        activeLogistic.value.id = logisticsDataArray.value[0].id;
        activeLogistic.value.name = logisticsDataArray.value[0].value.logistic_name;
        activeLogisticDropdown.value.logistic_name = logisticsDataArray.value[0].value.logistic_name;
        activeLogisticDropdown.value.logistics_logo = logisticsDataArray.value[0].value.logistics_logo;
        activeLogisticDropdown.value.logistics_svg_logo = logisticsDataArray.value[0].value.logistics_svg_logo;

        await store.dispatch(`${RATECHART.NAME}/setActiveLogistics`, logisticsDataArray.value[0]);
    } else {
        activeLogistic.value.id = getActiveLogistics.value.id;
        activeLogistic.value.name = getActiveLogistics.value.value.logistic_name;
        activeLogisticDropdown.value.logistic_name = getActiveLogistics.value.value.logistic_name;
        activeLogisticDropdown.value.logistics_logo = getActiveLogistics.value.value.logistics_logo;
        activeLogisticDropdown.value.logistics_svg_logo = getActiveLogistics.value.value.logistics_svg_logo;
    }

    activeImgUrl.value = getImgUrl('svg', getActiveLogistics.value.value.logistics_svg_logo);
    activeImgUrlForTable.value = getImgUrl('normal', getActiveLogistics.value.value.logistics_logo);

    tempTableData.value = await getAllTableDataArray.value[getActiveLogistics.value.id];
    flatRateTables.value = await getAllFlatRateTablesDataArray.value[getActiveLogistics.value.id]

    handleDynDisabledTableToggle();

    if (!checkUserType('vendor') && props.isFirstTimeVendorSelect == false && tabTypeChanged.value == false) {
        let res = await store.dispatch(`${RATECHART.NAME}/fetchLogisticServiceTypeByChangeModal`, {
            edit_id: '0',
            tab_type: getTabType.value,
            logistic_id: getActiveLogistics.value.id,
            vendor_id: vendorData.value.id,
            // is_reverse: '0',
        });

        handleServiceTypeFn(res);
    }
})


watch(() => getActiveLogistics.value, async (newVal, oldVal) => {
    if (topHeader.value.user_type != 3) {
        logisticServiceType.value = [];
        logisticServiceTypeFlatRate.value = [];
        
        let res = await store.dispatch(`${RATECHART.NAME}/fetchLogisticServiceTypeByChangeModal`, {
            edit_id: '0',
            tab_type: getTabType.value,
            logistic_id: newVal.id,
            vendor_id: vendorData.value.id,
            // is_reverse: '0',
        });

        handleServiceTypeFn(res);
    }
})

const fetchServiceType = async () => {
    if (topHeader.value.user_type != 3) {
        logisticServiceType.value = [];
        logisticServiceTypeFlatRate.value = [];

        let res = await store.dispatch(`${RATECHART.NAME}/fetchLogisticServiceTypeByChangeModal`, {
            edit_id: '0',
            tab_type: getTabType.value,
            logistic_id: getActiveLogistics.value.id,
            vendor_id: vendorData.value.id,
            // is_reverse: '0',
        });

        handleServiceTypeFn(res);
    }
}

const activateLogisticFn = async (logistic) => {
    if (logistic == 'Dropdown') {
        logistic = logisticsDataArray.value.filter((el) => {
            return el.value.logistic_name == activeLogisticDropdown.value.logistic_name;
        })[0];
    }
    if (logistic) {
        activeLogistic.value.id = logistic.id;
        activeLogistic.value.name = logistic.value.logistic_name;
        store.dispatch(`${RATECHART.NAME}/setActiveLogistics`, logistic);
    } else {
        logisticsDataArray.value.forEach((logistic) => {
            if (logistic.value.logistic_name == activeLogisticDropdown.value.logistic_name) {
                activeLogistic.value.id = logistic.id;
                activeLogistic.value.name = logistic.value.logistic_name;
                store.dispatch(`${RATECHART.NAME}/setActiveLogistics`, logistic);
            }
        })
    }
    activeImgUrl.value = getImgUrl('svg', getActiveLogistics.value.value.logistics_svg_logo);
    activeImgUrlForTable.value = getImgUrl('normal', getActiveLogistics.value.value.logistics_logo);

    tempTableData.value = await getAllTableDataArray.value[getActiveLogistics.value.id];
    flatRateTables.value = await getAllFlatRateTablesDataArray.value[getActiveLogistics.value.id];

    handleDynDisabledTableToggle();
}

const getImgUrl = (check, val) => {
    if (darkModeVal.value) {
        const vals = new URL(`../../assets/images/dark-mode/logistics/dark-${val}.svg`, import.meta.url).href
        const val1 = new URL(`../../assets/images/dark-mode/logistics/full_logo/dark-${val}.svg`, import.meta.url).href;
        if (check == 'svg') return vals;
        else if (check == 'normal') return val1
    } else {
        const LightVal = new URL(`../../assets/images/logistics/${val}.svg`, import.meta.url).href
        const LightVal1 = new URL(`../../assets/images/logistics/full_logo/${val}.svg`, import.meta.url).href
        if (check == 'svg') return LightVal;
        else if (check == 'normal') return LightVal1;
    }
}

const addCss = (param) => {
    if (param == 'Dialog') {
        setTimeout(() => {
            const elem = document.getElementsByClassName('p-dialog-mask');
            elem[0].style.overflowY = 'auto';
        }, 300)
    } else if (param == 'Logistic-Dropdown-Mobile') {
        setTimeout(() => {
            const elem = document.getElementsByClassName('p-dropdown-panel')
            elem[0].style.zIndex = 5;
        }, 50)
    }
}

const setTabType = async (tabType) => {
    tableData.value = [];
    tempTableData.value = [];
    activeImgUrlForTable.value = '';
    activeImgUrlForTable.value = '';
    dynDisabledToggleFlatRate.value = [];
    logisticServiceTypeFlatRate.value = [];
    flatRateTables.value = [];
    tabTypeChanged.value = true;
    disabledTable.value = false;
    store.dispatch(`${RATECHART.NAME}/setTabType`, tabType);
    let res;
    if (topHeader.value.user_type != 3) {
        res = await store.dispatch(`${RATECHART.NAME}/fetchData`, {
            vendor_id: vendorData.value.id,
            delivery_type: deliveryType.value,
            tab_type: getTabType.value,
            band_id: getBand.value ? getBand.value.id : ''
        });
    } else {
        res = await store.dispatch(`${RATECHART.NAME}/fetchDefaultData`, { mobile_token: cookies.get("mobile_token"), delivery_type: deliveryType.value, tab_type: getTabType.value });
    }
    if (res.status == 'success') {
        store.dispatch(`${RATECHART.NAME}/setActiveLogistics`, getActiveLogistics.value);
        if (!logisticsDataArray.value.some((el) => el.id == activeLogistic.value.id)) {
            if (logisticsDataArray.value.length > 0) {
                store.dispatch(`${RATECHART.NAME}/setActiveLogistics`, { id: logisticsDataArray.value[0].id, value: logisticsDataArray.value[0].value });
            }
            activeLogistic.value.id = getActiveLogistics.value.id;
            activeLogistic.value.name = getActiveLogistics.value.value.logistic_name;
            activeLogisticDropdown.value.logistic_name = getActiveLogistics.value.value.logistic_name;
            activeLogisticDropdown.value.logistics_logo = getActiveLogistics.value.value.logistics_logo;
            activeLogisticDropdown.value.logistics_svg_logo = getActiveLogistics.value.value.logistics_svg_logo;

            activeImgUrl.value = getImgUrl('svg', getActiveLogistics.value.value.logistics_svg_logo);
            activeImgUrlForTable.value = getImgUrl('normal', getActiveLogistics.value.value.logistics_logo);
        }
        tempTableData.value = await getAllTableDataArray.value[getActiveLogistics.value.id];
        flatRateTables.value = await getAllFlatRateTablesDataArray.value[getActiveLogistics.value.id];

        if (logisticsDataArray.value.length == 0) {
            tempTableData.value = [];
            flatRateTables.value = [];
        }

        handleDynDisabledTableToggle();
    }
    tabTypeChanged.value = false;
}

const makeTableDisabled = async (table, edit_id, service_type, disable) => {
    const res = await store.dispatch(`${RATECHART.NAME}/setTableDisableApi`, {
        ...table,
        multiply_factor: String(simplifyDecimal(table.multiply_factor)),
        slab_weight_in_kg: String(simplifyDecimal(table.slab_weight_in_kg)),
        is_active: disable ? '1' : '0',
        logistic_id: getActiveLogistics.value.id,
        vendor_id: vendorData.value.id,
        service_type: service_type,
        tab_type: getTabType.value
    });

    if (res.status == 'success') {
        await store.dispatch(`${RATECHART.NAME}/fetchData`, { vendor_id: vendorData.value.id, delivery_type: deliveryType.value, tab_type: getTabType.value });

        tempTableData.value = await getAllTableDataArray.value[getActiveLogistics.value.id];
        flatRateTables.value = await getAllFlatRateTablesDataArray.value[getActiveLogistics.value.id]
        handleDynDisabledTableToggle();
    }
}

watch(() => vendorData.value, async () => {
    if (topHeader.value.user_type != 3) {
        tableData.value = [];
        tempTableData.value = [];

        await store.dispatch(`${RATECHART.NAME}/fetchData`, { vendor_id: vendorData.value.id, delivery_type: deliveryType.value, tab_type: getTabType.value });

        activeLogistic.value.id = logisticsDataArray.value[0].id;
        activeLogistic.value.name = logisticsDataArray.value[0].value.logistic_name;
        activeLogisticDropdown.value.logistic_name = logisticsDataArray.value[0].value.logistic_name;
        activeLogisticDropdown.value.logistics_logo = logisticsDataArray.value[0].value.logistics_logo;
        activeLogisticDropdown.value.logistics_svg_logo = logisticsDataArray.value[0].value.logistics_svg_logo;

        await store.dispatch(`${RATECHART.NAME}/setActiveLogistics`, logisticsDataArray.value[0]);

        activeImgUrl.value = getImgUrl('svg', getActiveLogistics.value.value.logistics_svg_logo);
        activeImgUrlForTable.value = getImgUrl('normal', getActiveLogistics.value.value.logistics_logo);

        tempTableData.value = await getAllTableDataArray.value[getActiveLogistics.value.id];
        flatRateTables.value = await getAllFlatRateTablesDataArray.value[getActiveLogistics.value.id]

        handleDynDisabledTableToggle();
    }
})

watch(darkModeVal, () => {
    if (getActiveLogistics.value.id) activateLogisticFn(getActiveLogistics.value);
})

watch(() => props.callServiceType, () => {
    fetchServiceType();
})

const handleDynDisabledTableToggle = () => {
    if (tempTableData.value) {
        tempTableData.value.forEach((el, i) => {
            dynDisabledTableToggle.value[i] = { value: el.is_active == '1' ? true : false }
        });
    }
    if (flatRateTables.value) {
        dynDisabledToggleFlatRate.value = [];
        flatRateTables.value.forEach((el, i) => {
            dynDisabledToggleFlatRate.value.push([]);
            el.forEach((el2) => {
                dynDisabledToggleFlatRate.value[i].push({ value: el2.is_active == '1' ? true : false });
            })
        })
    }
}

const handleServiceTypeFn = (res) => {
    if (tempTableData.value != undefined) {
        tempTableData.value.forEach((el, i) => {
            res.service_type_option.forEach((el2, i2) => {
                if (el.logistics_service_type == res.service_type_option[i2].id) {
                    logisticServiceType.value.push(el2);
                }
            })
        });
    }

    if (flatRateTables.value != undefined) {
        const uniqueServiceTypes = new Set();
        flatRateTables.value.forEach((el) => {
            el.forEach((el2) => {
                res.service_type_option.forEach((el3) => {
                    if (el2.logistics_service_type == el3.id && !uniqueServiceTypes.has(el3.id)) {
                        logisticServiceTypeFlatRate.value.push(el3);
                        uniqueServiceTypes.add(el3.id);
                    }
                });
            });
        });
    }
}
</script>

<template>
    <div class="parent-rate-chart">
        <div class="rate-chart-table card">
            <TabView v-if="(topHeader.user_type == 3) || (topHeader.user_type == 3 || vendorData.value)"
                @update:activeIndex="(e) => setTabType(e)">
                <TabPanel v-for="tab in tabs" :key="tab.title" :header="tab.title">
                    <div class="flex-container">
                        <div class="left-pane">
                            <!-- {{ detectDataSubmit }} -->
                            <p style="display: none;">{{ dynDisabledTableToggle }}</p>
                            <div class="selector" v-for="(logistic, i) in logisticsDataArray" :key="i"
                                :class="[logistic.id === activeLogistic.id ? 'active' : '']"
                                @click="activateLogisticFn(logistic)">
                                <div class="selector-img">
                                    <img :src="getImgUrl('svg', logistic.value.logistics_svg_logo)"
                                        :alt="logistic.value.logistic_name">
                                </div>
                                <div class="selector-title">
                                    {{ logistic.value.logistic_name }}
                                </div>
                            </div>
                        </div>

                        <div class="right-pane">
                            <div class="top-bar" v-show="logisticsDataArray.length > 0">
                                <!-- {{ renderImg(activeImgUrlForTable) }} -->
                                <img :src="activeImgUrlForTable" alt="Logistics Image">
                                <!-- <img :src="renderImg(activeImgUrlForTable)" alt="Logistics Image"> -->

                                <span class="button-set">
                                    <!-- <div class="pr-4">{{ logisticServiceType }}</div> -->
                                    <div>
                                        <button @click="fwOrDto = 'FW'" class="btn-set fw-btn"
                                            :class="[fwOrDto == 'FW' ? 'active-btn' : '']">FW</button>
                                        <button @click="fwOrDto = 'DTO'" class="btn-set dto-btn"
                                            :class="[fwOrDto == 'DTO' ? 'active-btn' : '']">DTO</button>
                                    </div>
                                </span>
                            </div>

                            <!-- Normal Logistics -->
                            <div v-if="logisticsDataArray.length > 0"
                                v-show="fwOrDto == 'FW' && activeLogistic.name != 'Ecom Express'"
                                v-for="(table, i) in tempTableData" :key='i' style="position: relative">
                                <div v-show="table.is_active == 0 && topHeader.user_type == 3"
                                    class="rate-is-disabled-info-div">
                                    <div class="rate-is-disabled-text">
                                        Your rate is disabled
                                    </div>
                                    <div class="call-text">
                                        Kindly call your Account Manager
                                    </div>
                                </div>
                                <div class="table-rate-chart" style="margin-bottom: 50px;">
                                    <!-- {{ table.rate_slab_type }} -->
                                    <div class="text-right mr-4 mb-4" v-show="topHeader.user_type != 3"><span
                                            class="service-type-default-txt">Service Type: </span> {{
                                                logisticServiceType[i]
                                                    ? logisticServiceType[i].value : '' }}</div>
                                    <!-- {{table}} -->
                                    <table v-show="table.rate_slab_type == '0'" class="table">
                                        <thead class="thead">
                                            <tr>
                                                <th class="first-child">
                                                    <div class="input-switch-container">
                                                        <div class="table-title"
                                                            :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                            ZONE
                                                        </div>
                                                        <div v-if="checkAccessRight('') ? true : deepCheckAccessRight('domestic', 'rate_chart', 'settings_edit_rate_chart_v3')"
                                                            v-show="topHeader.user_type != 3"
                                                            class="input-switch-icon px-1">
                                                            <!-- {{ table.id }} -->
                                                            <i @click="setToDefaultValues(); $emit('showRateChartModal', table.id); addCss('Dialog');"
                                                                class="pi pi-exclamation-circle px-1" v-tooltip.bottom="{
                                                                    value: 'Copy',
                                                                    pt: {
                                                                        arrow: {
                                                                            style: {
                                                                                borderBottomColor: 'gray-600'
                                                                            }
                                                                        },
                                                                        text: 'bg-gray-800 font-medium',
                                                                        style: 'margin: 10px; padding: 5px;'
                                                                    }
                                                                }" severity="secondary" label="Button"></i>
                                                            <i @click="$emit('showDeleteModal', table.id)"
                                                                class="pi pi-trash px-1 trash-icon"></i>
                                                        </div>
                                                        <div v-if="checkAccessRight('') ? true : deepCheckAccessRight('domestic', 'rate_chart', 'settings_edit_rate_chart_v3')"
                                                            v-show="topHeader.user_type != 3" class="input-switch">
                                                            <InputSwitch
                                                                @change="makeTableDisabled(table, table.id, logisticServiceType[i].id, dynDisabledTableToggle[i].value)"
                                                                v-model="dynDisabledTableToggle[i].value"
                                                                class="small-input-switch" />
                                                        </div>
                                                    </div>
                                                </th>
                                                <th class="sec-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    A
                                                </th>
                                                <th class="other-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    B
                                                </th>
                                                <th class="other-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    C
                                                </th>
                                                <th class="other-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    D
                                                </th>
                                                <th class="other-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    E
                                                </th>
                                                <th class="last-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    F
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody :class="[table.is_active == '0' ? 'disabled-table-value' : '']"
                                            class="tbody">
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">FWD ({{ table.slab_weight_in_kg }} KG)</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_fwd : 'XXX' }}
                                                </td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_fwd : 'XXX' }}
                                                </td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_fwd : 'XXX' }}
                                                </td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_fwd : 'XXX' }}
                                                </td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_fwd : 'XXX' }}
                                                </td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_fwd : 'XXX' }}
                                                </td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">FWD Additional ({{ table.multiply_factor }}
                                                    KG)
                                                </td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_fwd_additional
                                                    : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_fwd_additional
                                                    : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_fwd_additional
                                                    : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_fwd_additional
                                                    : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_fwd_additional
                                                    : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_fwd_additional
                                                    : 'XXX' }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']"
                                                v-show="activeLogistic.name != 'Ekart' && activeLogistic.name != 'BlueDart'">
                                                <td class="data-first-child">FWD FSC (%)</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_fsc_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_fsc_per : 'XXX'
                                                    }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_fsc_per : 'XXX'
                                                    }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_fsc_per : 'XXX'
                                                    }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_fsc_per : 'XXX'
                                                    }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_fsc_per : 'XXX'
                                                    }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">COD</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_cod : 'XXX' }}
                                                </td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_cod : 'XXX' }}
                                                </td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_cod : 'XXX' }}
                                                </td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_cod : 'XXX' }}
                                                </td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_cod : 'XXX' }}
                                                </td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_cod : 'XXX' }}
                                                </td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">COD %</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_cod_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_cod_per : 'XXX'
                                                    }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_cod_per : 'XXX'
                                                    }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_cod_per : 'XXX'
                                                    }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_cod_per : 'XXX'
                                                    }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_cod_per : 'XXX'
                                                    }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">RTO ({{ table.slab_weight_in_kg }} KG)</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_rto : 'XXX' }}
                                                </td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_rto : 'XXX' }}
                                                </td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_rto : 'XXX' }}
                                                </td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_rto : 'XXX' }}
                                                </td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_rto : 'XXX' }}
                                                </td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_rto : 'XXX' }}
                                                </td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">RTO Additional ({{ table.multiply_factor }}
                                                    KG)</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_rto_additional
                                                    : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_rto_additional
                                                    : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_rto_additional
                                                    : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_rto_additional
                                                    : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_rto_additional
                                                    : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_rto_additional
                                                    : 'XXX' }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']"
                                                v-show="activeLogistic.name != 'Ekart' && activeLogistic.name != 'BlueDart'">
                                                <td class="data-first-child">RTO FSC (%)</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_rto_fsc_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_rto_fsc_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_rto_fsc_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_rto_fsc_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_rto_fsc_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_rto_fsc_per :
                                                    'XXX' }}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>

                            </div>


                            <!-- Ecom Express Logistic -->
                            <div v-if="logisticsDataArray.length > 0" v-for="(table, i) in tempTableData" :key='i'
                                style="position: relative; padding-bottom: 52px;"
                                v-show="fwOrDto == 'FW' && activeLogistic.name == 'Ecom Express'">
                                <div class="text-right mr-4 mb-4" v-show="topHeader.user_type != 3">
                                    <span class="service-type-default-txt">Service Type: </span>
                                    {{ logisticServiceType[i] ? logisticServiceType[i].value : '' }}
                                </div>
                                <div v-show="table.is_active == 0 && topHeader.user_type == 3"
                                    class="rate-is-disabled-info-div">
                                    <div class="rate-is-disabled-text">
                                        Your rate is disabled
                                    </div>
                                    <div class="call-text">
                                        Kindly call your Account Manager
                                    </div>
                                </div>
                                <div class="table-rate-chart-ecom-express">
                                    <table class="table">
                                        <thead :class="[table.is_active == '0' ? 'disabled-table-value' : '']"
                                            class="thead">
                                            <tr>
                                                <th class="first-child">
                                                    <div class="input-switch-container">
                                                        <div class="table-title"
                                                            :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                            ZONE
                                                        </div>
                                                        <div v-if="checkAccessRight('') ? true : deepCheckAccessRight('domestic', 'rate_chart', 'settings_edit_rate_chart_v3')"
                                                            v-show="topHeader.user_type != 3"
                                                            class="input-switch-icon px-1">
                                                            <i @click="setToDefaultValues(); $emit('showRateChartModal', table.id); addCss('Dialog');"
                                                                class="pi pi-exclamation-circle px-1" v-tooltip.bottom="{
                                                                    value: 'Copy',
                                                                    pt: {
                                                                        arrow: {
                                                                            style: {
                                                                                borderBottomColor: 'gray-600'
                                                                            }
                                                                        },
                                                                        text: 'bg-gray-800 font-medium',
                                                                        style: 'margin: 10px; padding: 5px;'
                                                                    }
                                                                }" severity="secondary" label="Button"></i>
                                                            <i @click="$emit('showDeleteModal', table.id)"
                                                                class="pi pi-trash px-1 trash-icon"></i>
                                                        </div>
                                                        <div v-if="checkAccessRight('') ? true : deepCheckAccessRight('domestic', 'rate_chart', 'settings_edit_rate_chart_v3')"
                                                            v-show="topHeader.user_type != 3" class="input-switch">
                                                            <InputSwitch
                                                                @change="makeTableDisabled(table, table.id, logisticServiceType[i].id, dynDisabledTableToggle[i].value)"
                                                                v-model="dynDisabledTableToggle[i].value"
                                                                class="small-input-switch" />
                                                        </div>
                                                    </div>
                                                </th>
                                                <th class="sec-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    A
                                                </th>
                                                <th class="other-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    B
                                                </th>
                                                <th class="other-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    C
                                                </th>
                                                <th class="other-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    D
                                                </th>
                                                <th class="other-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    E
                                                </th>
                                                <th class="other-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    F
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody :class="[table.is_active == '0' ? 'disabled-table-value' : '']"
                                            class="tbody">
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">FWD ({{ table.slab_weight_in_kg }} KG)</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_fwd :
                                                    'XXX' }}
                                                </td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_fwd : 'XXX'
                                                    }}
                                                </td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_fwd : 'XXX'
                                                    }}
                                                </td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_fwd : 'XXX'
                                                    }}
                                                </td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_fwd :
                                                    'XXX'
                                                    }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_fwd :
                                                    'XXX'
                                                    }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">FWD Additional ({{ table.multiply_factor }}
                                                    KG)
                                                </td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_fwd_additional
                                                    : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_fwd_additional
                                                    : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_fwd_additional
                                                    : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_fwd_additional
                                                    : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_fwd_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_fwd_additional : 'XXX' }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']"
                                                v-show="activeLogistic.name != 'Ekart' && activeLogistic.name != 'BlueDart'">
                                                <td class="data-first-child">FWD FSC (%)</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_fsc_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_fsc_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_fsc_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_fsc_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_fsc_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_fsc_per : 'XXX' }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">COD</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_cod : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_cod : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_cod : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_cod : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_cod : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_cod : 'XXX' }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">COD %</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_cod_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_cod_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_cod_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_cod_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_cod_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_cod_per : 'XXX' }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">RTO ({{ table.slab_weight_in_kg }} KG)</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_rto : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_rto : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_rto : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_rto : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_rto : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_rto : 'XXX' }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">RTO Additional ({{ table.multiply_factor }}
                                                    KG)</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_rto_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_rto_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_rto_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_rto_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_rto_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_rto_additional : 'XXX' }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']"
                                                v-show="activeLogistic.name != 'Ekart' && activeLogistic.name != 'BlueDart'">
                                                <td class="data-first-child">RTO FSC (%)</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_rto_fsc_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_rto_fsc_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_rto_fsc_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_rto_fsc_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_rto_fsc_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_rto_fsc_per : 'XXX' }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>



                            <!-- Flat Rates Table -->
                            <div v-if="logisticsDataArray.length > 0" v-show="fwOrDto == 'FW'"
                                v-for="(table, i) in flatRateTables">
                                <div class="text-right mr-4 mb-4" v-show="topHeader.user_type != 3">
                                    <span class="service-type-default-txt">Service Type: </span>
                                    {{ logisticServiceTypeFlatRate[i] ? logisticServiceTypeFlatRate[i].value : '' }}
                                </div>
                                <div style="overflow-x: auto; margin-bottom: 50px;">
                                    <table class="table-flat-rate"
                                        :style="{ width: screenWidth < 1025 ? (table.length - table.length == 1 ? 0 : 1) + ((table.length == 1) ? '00%' : '30%') : '100%' }">
                                        <thead class="thead">
                                            <tr :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <th class="first-child"></th>
                                                <th v-for="(l, j) in table.length">
                                                    <!-- {{table[l-1].is_active}} -->
                                                    <div class="input-switch-container">
                                                        <div :class="[table[l - 1].is_active == '0' ? 'disabled-table-value' : '']"
                                                            class="table-title">
                                                            Flat Rate
                                                        </div>
                                                        <div v-if="checkAccessRight('') ? true : deepCheckAccessRight('domestic', 'rate_chart', 'settings_edit_rate_chart_v3')"
                                                            v-show="topHeader.user_type != 3"
                                                            class="input-switch-icon px-1">
                                                            <i @click="setToDefaultValues(); $emit('showRateChartModal', table[l - 1].id); addCss('Dialog');"
                                                                class="pi pi-exclamation-circle px-1" v-tooltip.bottom="{
                                                                    value: 'Copy',
                                                                    pt: {
                                                                        arrow: {
                                                                            style: {
                                                                                borderBottomColor: 'gray-600'
                                                                            }
                                                                        },
                                                                        text: 'bg-gray-800 font-medium',
                                                                        style: 'margin: 10px; padding: 5px;'
                                                                    }
                                                                }" severity="secondary" label="Button"></i>
                                                            <i @click="$emit('showDeleteModal', table[l - 1].id)"
                                                                class="pi pi-trash px-1 trash-icon"></i>
                                                        </div>
                                                        <div v-if="checkAccessRight('') ? true : deepCheckAccessRight('domestic', 'rate_chart', 'settings_edit_rate_chart_v3')"
                                                            v-show="topHeader.user_type != 3" class="input-switch">
                                                            <InputSwitch
                                                                @change="makeTableDisabled(table[l - 1], table[l - 1].id, logisticServiceTypeFlatRate[i].id, dynDisabledToggleFlatRate[i][j].value)"
                                                                v-model="dynDisabledToggleFlatRate[i][j].value"
                                                                class="small-input-switch" />
                                                        </div>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="tbody">
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">COD Fwd ({{ table[0].slab_weight_in_kg }}
                                                    KG)</td>
                                                <td class="data-other-child" v-for="l in table.length">
                                                    <div :class="[table[l - 1].is_active == '0' ? 'disabled-table-value' : '']"
                                                        style="display: flex; align-items: center; justify-content: center;">
                                                        <span>{{ ((topHeader.user_type != 3 ||
                                                            (topHeader.user_type == 3 && table[l - 1].is_active == '1')
                                                            &&
                                                            isSendOtp == 1)) ?
                                                            table[l - 1].cod_flat_rate_value :
                                                            'XXX' }}
                                                        </span>
                                                        <i class="pi pi-exclamation-circle px-2" v-tooltip.right="{
                                                            value: '( ' + table[l - 1].slab_weight_in_kg + ' KG )',
                                                            pt: {
                                                                arrow: {
                                                                    style: {
                                                                        borderBottomColor: 'gray-600'
                                                                    }
                                                                },
                                                                text: 'bg-gray-800 font-medium',
                                                                style: 'margin: 10px; padding: 5px;'
                                                            }
                                                        }" severity="secondary" label="Button"></i>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">COD Fwd Additional ({{
                                                    table[0].multiply_factor }} KG)</td>
                                                <td class="data-other-child" v-for="l in table.length">
                                                    <div :class="[table[l - 1].is_active == '0' ? 'disabled-table-value' : '']"
                                                        style="display: flex; align-items: center; justify-content: center;">
                                                        <span>{{ ((topHeader.user_type != 3 ||
                                                            (topHeader.user_type == 3 && table[l - 1].is_active == '1')
                                                            &&
                                                            isSendOtp == 1)) ?
                                                            table[l - 1].cod_flat_rate_add_value :
                                                            'XXX' }}
                                                        </span>
                                                        <i class="pi pi-exclamation-circle px-2" v-tooltip.right="{
                                                            value: '( ' + table[l - 1].multiply_factor + ' KG )',
                                                            pt: {
                                                                arrow: {
                                                                    style: {
                                                                        borderBottomColor: 'gray-600'
                                                                    }
                                                                },
                                                                text: 'bg-gray-800 font-medium',
                                                                style: 'margin: 10px; padding: 5px;'
                                                            }
                                                        }" severity="secondary" label="Button"></i>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">Prepaid Fwd ({{ table[0].slab_weight_in_kg
                                                    }} KG)</td>
                                                <td class="data-other-child" v-for="l in table.length">
                                                    <div :class="[table[l - 1].is_active == '0' ? 'disabled-table-value' : '']"
                                                        style="display: flex; align-items: center; justify-content: center;">
                                                        <span>{{ ((topHeader.user_type != 3 ||
                                                            (topHeader.user_type == 3 && table[l - 1].is_active == '1')
                                                            &&
                                                            isSendOtp == 1)) ?
                                                            table[l - 1].prepaid_flat_rate_value :
                                                            'XXX' }}
                                                        </span>
                                                        <i class="pi pi-exclamation-circle px-2" v-tooltip.right="{
                                                            value: '( ' + table[l - 1].slab_weight_in_kg + ' KG )',
                                                            pt: {
                                                                arrow: {
                                                                    style: {
                                                                        borderBottomColor: 'gray-600'
                                                                    }
                                                                },
                                                                text: 'bg-gray-800 font-medium',
                                                                style: 'margin: 10px; padding: 5px;'
                                                            }
                                                        }" severity="secondary" label="Button"></i>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">Prepaid Fwd Additional ({{
                                                    table[0].multiply_factor }} KG)</td>
                                                <td class="data-other-child" v-for="l in table.length">
                                                    <div :class="[table[l - 1].is_active == '0' ? 'disabled-table-value' : '']"
                                                        style="display: flex; align-items: center; justify-content: center;">
                                                        <span>{{ ((topHeader.user_type != 3 ||
                                                            (topHeader.user_type == 3 && table[l - 1].is_active == '1')
                                                            &&
                                                            isSendOtp == 1)) ?
                                                            table[l - 1].prepaid_flat_rate_add_value :
                                                            'XXX' }}
                                                        </span>
                                                        <i class="pi pi-exclamation-circle px-2" v-tooltip.right="{
                                                            value: '( ' + table[l - 1].multiply_factor + ' KG )',
                                                            pt: {
                                                                arrow: {
                                                                    style: {
                                                                        borderBottomColor: 'gray-600'
                                                                    }
                                                                },
                                                                text: 'bg-gray-800 font-medium',
                                                                style: 'margin: 10px; padding: 5px;'
                                                            }
                                                        }" severity="secondary" label="Button"></i>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                            <div class="dto-data" v-show="fwOrDto == 'DTO'">
                                <div>
                                    <img class="no-record-fnd-img"
                                        src="https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/no-record-v2.svg"
                                        alt="No Record Found">
                                    <div class="no-record-fnd-text">No Record Found</div>
                                </div>
                            </div>

                            <div v-if="logisticsDataArray.length == 0">
                                <div class="dto-data">
                                    <div>
                                        <img class="no-record-fnd-img"
                                            src="https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/no-record-v2.svg"
                                            alt="No Record Found">
                                        <div class="no-record-fnd-text">No Record Found</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex-container-responsive">
                        <div v-if="logisticsDataArray.length > 0">
                            <Dropdown id="logisticResponsiveDropdown" @click="addCss('Logistic-Dropdown-Mobile')"
                                @change="activateLogisticFn('Dropdown')" v-model="activeLogisticDropdown"
                                :options="logisticsDataArray" optionLabel="value" optionValue="value"
                                placeholder="Select Logistics" class="w-full">
                                <template #value="slotProps">
                                    <div class="flex align-items-center">
                                        <img :alt="slotProps.value.logistic_name" :src="activeImgUrl" />
                                        <div class="pl-2 responsive-logistic-dropdown-text">{{ slotProps.value.name ?
                                            slotProps.value.name :
                                            slotProps.value.logistic_name }}</div>
                                    </div>
                                </template>
                                <template #option="slotProps">
                                    <div class="dropdown-panel-options-parent">
                                        <div class="flex align-items-center">
                                            <img :src="getImgUrl('svg', slotProps.option.value.logistics_svg_logo)">
                                            <div class="logistics-dropdown-title">{{
                                                slotProps.option.value.logistic_name }}
                                            </div>
                                        </div>
                                        <img v-if="!darkModeVal"
                                            v-show="activeLogisticDropdown.logistic_name == slotProps.option.value.logistic_name"
                                            class="check-sign" src="../../assets/images/IcOutlineCheck.svg"
                                            alt="Check Sign">
                                        <img v-else
                                            v-show="activeLogisticDropdown.logistic_name == slotProps.option.value.logistic_name"
                                            class="check-sign"
                                            src="../../assets/images/dark-mode/dark-IcOutlineCheck.svg"
                                            alt="Check Sign">
                                    </div>
                                </template>
                            </Dropdown>


                            <div class="button-set">
                                <button @click="fwOrDto = 'FW'" class="btn-set fw-btn"
                                    :class="[fwOrDto == 'FW' ? 'active-btn' : '']">FW</button>
                                <button @click="fwOrDto = 'DTO'" class="btn-set dto-btn"
                                    :class="[fwOrDto == 'DTO' ? 'active-btn' : '']">DTO</button>
                            </div>


                            <div v-for="(table, i) in tempTableData" :key='i' class="table-rate-chart"
                                v-show="fwOrDto == 'FW' && activeLogistic.name != 'Ecom Express'"
                                style="margin-bottom: 42px;">
                                <div class="text-right mb-2 mr-2" v-show="topHeader.user_type != 3">
                                    <span class="service-type-default-txt">Service Type: </span>{{
                                        logisticServiceType[i] ?
                                            logisticServiceType[i].value : '' }}
                                </div>
                                <div v-show="table.is_active == 0 && topHeader.user_type == 3"
                                    class="rate-is-disabled-info-div">
                                    <div class="rate-is-disabled-text">
                                        Your rate is disabled
                                    </div>
                                    <div class="call-text">
                                        Kindly call your Account Manager
                                    </div>
                                </div>
                                <div class="table-parent">
                                    <table class="table" v-show="fwOrDto == 'FW' && table.rate_slab_type == '0'">
                                        <thead class="thead" ref="thead">
                                            <tr>
                                                <th class=" first-child">
                                                    <div class="input-switch-container">
                                                        <div class="table-title"
                                                            :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                            ZONE
                                                        </div>
                                                        <div v-if="checkAccessRight('') ? true : deepCheckAccessRight('domestic', 'rate_chart', 'settings_edit_rate_chart_v3')"
                                                            v-show="topHeader.user_type != 3"
                                                            class="input-switch-icon px-1">
                                                            <i @click="setToDefaultValues(); $emit('showRateChartModal', table.id); addCss('Dialog');"
                                                                class="pi pi-exclamation-circle px-1" v-tooltip.bottom="{
                                                                    value: 'Copy',
                                                                    pt: {
                                                                        arrow: {
                                                                            style: {
                                                                                borderBottomColor: 'gray-600'
                                                                            }
                                                                        },
                                                                        text: 'bg-gray-800 font-medium',
                                                                        style: 'margin: 10px; padding: 5px;'
                                                                    }
                                                                }" severity="secondary" label="Button"></i>
                                                            <i @click="$emit('showDeleteModal', table.id)"
                                                                class="pi pi-trash px-1 trash-icon"></i>
                                                        </div>
                                                        <div v-if="checkAccessRight('') ? true : deepCheckAccessRight('domestic', 'rate_chart', 'settings_edit_rate_chart_v3')"
                                                            v-show="topHeader.user_type != 3" class="input-switch">
                                                            <!-- {{ dynDisabledTableToggle[i] }} -->
                                                            <InputSwitch
                                                                @change="makeTableDisabled(table, table.id, logisticServiceType[i].id, dynDisabledTableToggle[i].value)"
                                                                v-model="dynDisabledTableToggle[i].value"
                                                                class="small-input-switch" />
                                                        </div>
                                                    </div>
                                                </th>
                                                <th class="sec-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    A
                                                </th>
                                                <th class="third-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    B
                                                </th>
                                                <th class="fourth-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    C
                                                </th>
                                                <th class="fifth-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    D
                                                </th>
                                                <th class=" sixth-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    E
                                                </th>
                                                <th class="last-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    F
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody :class="[table.is_active == '0' ? 'disabled-table-value' : '']"
                                            ref="tbody" class="tbody">
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">FWD ({{ table.slab_weight_in_kg }} KG)</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_fwd :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_fwd :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_fwd :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_fwd :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_fwd :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_fwd :
                                                    'XXX' }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">FWD Additional ({{ table.multiply_factor }}
                                                    KG)
                                                </td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_fwd_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_fwd_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_fwd_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_fwd_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_fwd_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_fwd_additional : 'XXX' }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']"
                                                v-show="activeLogistic.name != 'Ekart' && activeLogistic.name != 'BlueDart'">
                                                <td class="data-first-child">FWD FSC (%)</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_fsc_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_fsc_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_fsc_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_fsc_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_fsc_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_fsc_per :
                                                    'XXX' }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">COD</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_cod :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_cod :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_cod :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_cod :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_cod :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_cod :
                                                    'XXX' }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">COD %</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_cod_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_cod_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_cod_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_cod_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_cod_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_cod_per :
                                                    'XXX' }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">RTO ({{ table.slab_weight_in_kg }} KG)</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_rto :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_rto :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_rto :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_rto :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_rto :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_rto :
                                                    'XXX' }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">RTO Additional ({{ table.multiply_factor }}
                                                    KG)</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_rto_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_rto_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_rto_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_rto_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_rto_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_rto_additional : 'XXX' }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']"
                                                v-show="activeLogistic.name != 'Ekart' && activeLogistic.name != 'BlueDart'">
                                                <td class="data-first-child">RTO FSC (%)</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_rto_fsc_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_rto_fsc_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_rto_fsc_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_rto_fsc_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_rto_fsc_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_rto_fsc_per : 'XXX' }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                            <div v-for="(table, i) in tempTableData" :key='i' class="table-rate-chart-ecom-express"
                                v-show="fwOrDto == 'FW' && activeLogistic.name == 'Ecom Express'"
                                style="margin-bottom: 42px;">
                                <div class="text-right mb-2 mr-2" v-show="topHeader.user_type != 3">
                                    <span class="service-type-default-txt">Service Type: </span>{{
                                        logisticServiceType[i] ?
                                            logisticServiceType[i].value : '' }}
                                </div>
                                <div v-show="table.is_active == 0 && topHeader.user_type == 3"
                                    class="rate-is-disabled-info-div">
                                    <div class="rate-is-disabled-text">
                                        Your rate is disabled
                                    </div>
                                    <div class="call-text">
                                        Kindly call your Account Manager
                                    </div>
                                </div>
                                <div class="table-parent">
                                    <table class="table">
                                        <thead ref="thead" class="thead">
                                            <tr :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <th class="first-child">
                                                    <div class="input-switch-container">
                                                        <div class="table-title"
                                                            :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                            ZONE
                                                        </div>
                                                        <div v-if="checkAccessRight('') ? true : deepCheckAccessRight('domestic', 'rate_chart', 'settings_edit_rate_chart_v3')"
                                                            v-show="topHeader.user_type != 3"
                                                            class="input-switch-icon px-1">
                                                            <i @click="setToDefaultValues(); $emit('showRateChartModal', table.id); addCss('Dialog');"
                                                                class="pi pi-exclamation-circle px-1" v-tooltip.bottom="{
                                                                    value: 'Copy',
                                                                    pt: {
                                                                        arrow: {
                                                                            style: {
                                                                                borderBottomColor: 'gray-600'
                                                                            }
                                                                        },
                                                                        text: 'bg-gray-800 font-medium',
                                                                        style: 'margin: 10px; padding: 5px;'
                                                                    }
                                                                }" severity="secondary" label="Button"></i>
                                                            <i @click="$emit('showDeleteModal', table.id)"
                                                                class="pi pi-trash px-1 trash-icon"></i>
                                                        </div>
                                                        <div v-if="checkAccessRight('') ? true : deepCheckAccessRight('domestic', 'rate_chart', 'settings_edit_rate_chart_v3')"
                                                            v-show="topHeader.user_type != 3" class="input-switch">
                                                            <InputSwitch
                                                                @change="makeTableDisabled(table, table.id, logisticServiceType[i].id, dynDisabledTableToggle[i].value)"
                                                                v-model="dynDisabledTableToggle[i].value"
                                                                class="small-input-switch" />
                                                        </div>
                                                    </div>
                                                </th>
                                                <th class="sec-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    A
                                                </th>
                                                <th class="other-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    B
                                                </th>
                                                <th class="other-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    C
                                                </th>
                                                <th class="other-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    D
                                                </th>
                                                <th class="other-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    E
                                                </th>
                                                <th class="other-child"
                                                    :class="[table.is_active == '0' ? 'disabled-table-value' : '']">ZONE
                                                    F
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody :class="[table.is_active == '0' ? 'disabled-table-value' : '']"
                                            ref="tbody" class="tbody">
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">FWD ({{ table.slab_weight_in_kg }} KG)</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_fwd :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_fwd :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_fwd :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_fwd :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_fwd :
                                                    'XXX'
                                                    }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_fwd :
                                                    'XXX'
                                                    }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">FWD Additional ({{ table.multiply_factor }}
                                                    KG)
                                                </td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_fwd_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_fwd_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_fwd_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_fwd_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_fwd_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_fwd_additional : 'XXX' }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']"
                                                v-show="activeLogistic.name != 'Ekart' && activeLogistic.name != 'BlueDart'">
                                                <td class="data-first-child">FWD FSC (%)</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_fsc_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_fsc_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_fsc_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_fsc_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_fsc_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_fsc_per : 'XXX' }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">COD</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_cod :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_cod :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_cod :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_cod :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_cod : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_cod : 'XXX' }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">COD %</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_cod_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_cod_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_cod_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_cod_per :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_cod_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_cod_per : 'XXX' }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">RTO ({{ table.slab_weight_in_kg }} KG)</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_rto :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_rto :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_rto :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_rto :
                                                    'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_rto : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_rto : 'XXX' }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">RTO Additional ({{ table.multiply_factor }}
                                                    KG)</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_rto_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_rto_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_c_rto_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_d_rto_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_rto_additional : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_rto_additional : 'XXX' }}</td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']"
                                                v-show="activeLogistic.name != 'Ekart' && activeLogistic.name != 'BlueDart'">
                                                <td class="data-first-child">RTO FSC (%)</td>
                                                <td class="data-second-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_a_rto_fsc_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_b_rto_fsc_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_e_rto_fsc_per : 'XXX' }}</td>
                                                <td class="data-other-child">{{ ((topHeader.user_type != 3 ||
                                                    (topHeader.user_type == 3 && table.is_active == '1') &&
                                                    showOtpModalOrNot ==
                                                    'false')) ?
                                                    table.zone_f_rto_fsc_per : 'XXX' }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                            <div v-show="fwOrDto == 'FW'" v-for="(table, i) in flatRateTables">
                                <div class="text-right mr-2 mb-2" v-show="topHeader.user_type != 3">
                                    <span class="service-type-default-txt">Service Type: </span>
                                    {{ logisticServiceTypeFlatRate[i] ? logisticServiceTypeFlatRate[i].value : '' }}
                                </div>
                                <div style="overflow-x: auto; margin-bottom: 50px;">
                                    <table class="table-flat-rate"
                                        :style="{ width: screenWidth > 766 ? (table.length - table.length == 1 ? 0 : 1) + ((table.length == 1) ? '00%' : '20%') : table.length + '20%' }">
                                        <thead class="thead">
                                            <tr>
                                                <th class="first-child"></th>
                                                <th v-for="(l, j) in table.length">
                                                    <div class="input-switch-container">
                                                        <div :class="[table[l - 1].is_active == '0' ? 'disabled-table-value' : '']"
                                                            class="table-title">
                                                            Flat Rate
                                                        </div>
                                                        <div v-if="checkAccessRight('') ? true : deepCheckAccessRight('domestic', 'rate_chart', 'settings_edit_rate_chart_v3')"
                                                            v-show="topHeader.user_type != 3"
                                                            class="input-switch-icon px-1">
                                                            <i @click="setToDefaultValues(); $emit('showRateChartModal', table[l - 1].id); addCss('Dialog');"
                                                                class="pi pi-exclamation-circle px-1" v-tooltip.bottom="{
                                                                    value: 'Copy',
                                                                    pt: {
                                                                        arrow: {
                                                                            style: {
                                                                                borderBottomColor: 'gray-600'
                                                                            }
                                                                        },
                                                                        text: 'bg-gray-800 font-medium',
                                                                        style: 'margin: 10px; padding: 5px;'
                                                                    }
                                                                }" severity="secondary" label="Button"></i>
                                                            <i @click="$emit('showDeleteModal', table[l - 1].id)"
                                                                class="pi pi-trash px-1 trash-icon"></i>
                                                        </div>
                                                        <div v-if="checkAccessRight('') ? true : deepCheckAccessRight('domestic', 'rate_chart', 'settings_edit_rate_chart_v3')"
                                                            v-show="topHeader.user_type != 3" class="input-switch">
                                                            <InputSwitch
                                                                @change="makeTableDisabled(table[l - 1], table[l - 1].id, logisticServiceTypeFlatRate[i].id, dynDisabledToggleFlatRate[i][j].value)"
                                                                v-model="dynDisabledToggleFlatRate[i][j].value"
                                                                class="small-input-switch" />
                                                        </div>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="tbody">
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">COD Fwd ({{ table[0].slab_weight_in_kg }}
                                                    KG)</td>
                                                <td class="data-other-child" v-for="l in table.length">
                                                    <div :class="[table[l - 1].is_active == '0' ? 'disabled-table-value' : '']"
                                                        style="display: flex; align-items: center; justify-content: center;">
                                                        <span>{{ ((topHeader.user_type != 3 ||
                                                            (topHeader.user_type == 3 && table[l - 1].is_active == '1')
                                                            &&
                                                            isSendOtp == 1)) ?
                                                            table[l - 1].cod_flat_rate_value :
                                                            'XXX' }}</span>
                                                        <i class="pi pi-exclamation-circle px-2" v-tooltip.right="{
                                                            value: '( ' + table[l - 1].slab_weight_in_kg + ' KG )',
                                                            pt: {
                                                                arrow: {
                                                                    style: {
                                                                        borderBottomColor: 'gray-600'
                                                                    }
                                                                },
                                                                text: 'bg-gray-800 font-medium',
                                                                style: 'margin: 10px; padding: 5px;'
                                                            }
                                                        }" severity="secondary" label="Button"></i>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">COD Fwd Additional ({{
                                                    table[0].multiply_factor }} KG)</td>
                                                <td class="data-other-child" v-for="l in table.length">
                                                    <div :class="[table[l - 1].is_active == '0' ? 'disabled-table-value' : '']"
                                                        style="display: flex; align-items: center; justify-content: center;">
                                                        <span>{{ ((topHeader.user_type != 3 ||
                                                            (topHeader.user_type == 3 && table[l - 1].is_active == '1')
                                                            &&
                                                            isSendOtp == 1)) ?
                                                            table[l - 1].cod_flat_rate_add_value :
                                                            'XXX' }}</span>
                                                        <i class="pi pi-exclamation-circle px-2" v-tooltip.right="{
                                                            value: '( ' + table[l - 1].multiply_factor + ' KG )',
                                                            pt: {
                                                                arrow: {
                                                                    style: {
                                                                        borderBottomColor: 'gray-600'
                                                                    }
                                                                },
                                                                text: 'bg-gray-800 font-medium',
                                                                style: 'margin: 10px; padding: 5px;'
                                                            }
                                                        }" severity="secondary" label="Button"></i>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">Prepaid Fwd ({{ table[0].slab_weight_in_kg
                                                    }} KG)</td>
                                                <td class="data-other-child" v-for="l in table.length">
                                                    <div :class="[table[l - 1].is_active == '0' ? 'disabled-table-value' : '']"
                                                        style="display: flex; align-items: center; justify-content: center;">
                                                        <span>{{ ((topHeader.user_type != 3 ||
                                                            (topHeader.user_type == 3 && table[l - 1].is_active == '1')
                                                            &&
                                                            isSendOtp == 1)) ?
                                                            table[l - 1].prepaid_flat_rate_value :
                                                            'XXX' }}</span>
                                                        <i class="pi pi-exclamation-circle px-2" v-tooltip.right="{
                                                            value: '( ' + table[l - 1].slab_weight_in_kg + ' KG )',
                                                            pt: {
                                                                arrow: {
                                                                    style: {
                                                                        borderBottomColor: 'gray-600'
                                                                    }
                                                                },
                                                                text: 'bg-gray-800 font-medium',
                                                                style: 'margin: 10px; padding: 5px;'
                                                            }
                                                        }" severity="secondary" label="Button"></i>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="tr"
                                                :class="[table.is_active == '0' ? 'disabled-table-value' : '']">
                                                <td class="data-first-child">Prepaid Fwd Additional ({{
                                                    table[0].multiply_factor }} KG)</td>
                                                <td class="data-other-child" v-for="l in table.length">
                                                    <div :class="[table[l - 1].is_active == '0' ? 'disabled-table-value' : '']"
                                                        style="display: flex; align-items: center; justify-content: center;">
                                                        <span>{{ ((topHeader.user_type != 3 ||
                                                            (topHeader.user_type == 3 && table[l - 1].is_active == '1')
                                                            &&
                                                            isSendOtp == 1)) ?
                                                            table[l - 1].prepaid_flat_rate_add_value :
                                                            'XXX' }}</span>
                                                        <i class="pi pi-exclamation-circle px-2" v-tooltip.right="{
                                                            value: '( ' + table[l - 1].multiply_factor + ' KG )',
                                                            pt: {
                                                                arrow: {
                                                                    style: {
                                                                        borderBottomColor: 'gray-600'
                                                                    }
                                                                },
                                                                text: 'bg-gray-800 font-medium',
                                                                style: 'margin: 10px; padding: 5px;'
                                                            }
                                                        }" severity="secondary" label="Button"></i>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="dto-data" v-show="fwOrDto == 'DTO'">
                                <div>
                                    <img class="no-record-fnd-img"
                                        src="https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/no-record-v2.svg"
                                        alt="No Record Found">
                                    <div class="no-record-fnd-text">No Record Found</div>
                                </div>
                            </div>
                        </div>

                        <div v-else>
                            <div class="dto-data">
                                <div>
                                    <img class="no-record-fnd-img"
                                        src="https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/no-record-v2.svg"
                                        alt="No Record Found">
                                    <div class="no-record-fnd-text">No Record Found</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPanel>
            </TabView>
            <div v-if="!vendorData.value && (topHeader.user_type != 3)" class="blank-card">
                <div class="hidden md:block blank-left"></div>
                <div class="blank-right">
                    <div v-if="!vendorData.value && (topHeader.user_type != 3)"
                        class="blank-card flex items-center justify-center">
                        <div>
                            <img class="no-record-fnd-img"
                                src="https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/no-record-v2.svg"
                                alt="No Record Found">
                            <div class="no-record-fnd-text">No Record Found</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ToastView />
</template>

<style lang="scss">
@import './RateChartTable.scss';
@import "../../assets/itl-common-css/common-css.scss";

.rate-chart-parent-class {
    .p-dropdown:not(.p-disabled).p-focus {
        box-shadow: none !important;
        border-color: lightgrey !important;
    }

    .p-inputswitch.p-inputswitch-checked .p-inputswitch-slider {
        background: #0052cc;
    }

    .p-inputswitch.p-inputswitch-checked:not(.p-disabled):hover .p-inputswitch-slider {
        background: #0052cc;
    }

    .card {
        border-radius: 12px;
        padding: 0px;

        // border: 1px solid lightgray;
        @include theme() {
            border: 1px solid theme-get("border-black-400") !important;
        }
    }

    .p-tooltip.p-tooltip-bottom .p-tooltip-arrow {
        border-bottom-color: $primaryFontColor;
    }

    .p-tooltip .p-tooltip-text {
        padding: 3px 10px 5px 10px;
        font-size: 12px;
        border-radius: 4px;
    }
}
</style>