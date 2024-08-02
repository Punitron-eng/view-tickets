<script setup>
import { onMounted, ref, watch, computed, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { Bar } from 'vue-chartjs';
import { channelPartnerDashboardVariables } from './ChannelPartnerDashboard';
import { options } from './chartConfig';
import { CHANNELPARTNER } from '../../../store/channel-partner/channel-partner-dashboard/constants';

import Header from '../../../components/header-files/cpd-header-files/Header.vue';
import VendorModalDatatable from '../../../components/common-modal-files/vendor-modal/VendorModalDatatable.vue';

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const store = useStore();

const chartData = ref({
    datasets: [],
});

onMounted(async () => {
    channelPartnerDashboardVariables.value.removeCheck = true;
    document.body.classList.add('channel-partner-dashboard-outer');
    channelPartnerDashboardVariables.value.removeCheck = false;
    store.dispatch(`${CHANNELPARTNER.NAME}/resetVendors`);
    await vendorDataValue(50, 0, '', 'checkbox');
    await store.dispatch(`${CHANNELPARTNER.NAME}/setChartData`, { filter_date: getDate.value.value });
    // await store.dispatch(`${CHANNELPARTNER.NAME}/fetchWidgetsValues`);
    const res = await store.dispatch(`${CHANNELPARTNER.NAME}/fetchWidgetsNames`);
    // console.log('cfggh', res)
    if (res.status == 'success') {
        const res1 = await store.dispatch(`${CHANNELPARTNER.NAME}/fetchWidgetsValues`);
    }
});
onBeforeUnmount(() => {
    document.body.classList.remove('channel-partner-dashboard-outer');
});

const removeChartData = () => {
    chartData.value = [];
};

const setFilter = (data) => {
    store.dispatch(`${CHANNELPARTNER.NAME}/setSelectedVendors`, data);
    store.dispatch(`${CHANNELPARTNER.NAME}/setChartData`, { filter_date: getDate.value.value, delivery_type: domesticOrInternational.value == 'Domestic' ? '0' : '1', vendor_ids: getSelectedVendors.value.id });
    channelPartnerDashboardVariables.value.showVendorModal = false;
    chartData.value = [];
};

const resetVendor = async () => {
    store.dispatch(`${CHANNELPARTNER.NAME}/resetVendors`);
    await vendorDataValue(50, 0, '', 'checkbox');
    chartData.value = [];
};

const searchByVendorName = async (data) => {
    await store.dispatch(`${CHANNELPARTNER.NAME}/getVendorModalData`, {
        limit: data.limit,
        start: data.start,
        searchVendorName: data.searchVendorName,
        inputType: data.inputType,
        isVendorSearch: data.isVendorSearch,
    });
};

const vendorDataValue = async (limit, start, searchVendorName, inputType) => {
    await store.dispatch(`${CHANNELPARTNER.NAME}/getVendorModalData`, { limit: limit, start: start, searchVendorName: searchVendorName, inputType: inputType });
};

const getVendorValues = computed(() => store.getters[`${CHANNELPARTNER.NAME}/getVendorValues`]);
const getVendorModalPayload = computed(() => store.getters[`${CHANNELPARTNER.NAME}/getVendorModalPayload`]);
const getVendorDataStatus = computed(() => store.getters[`${CHANNELPARTNER.NAME}/getVendorStatus`]);
const getMappedFilterValue = computed(() => store.getters[`${CHANNELPARTNER.NAME}/getMappedFilterValue`]);
const getSelectedVendors = computed(() => store.getters[`${CHANNELPARTNER.NAME}/getSelectedVendors`]);
const getChartData = computed(() => store.getters[`${CHANNELPARTNER.NAME}/getChartData`]);
const getWidgetsData = computed(() => store.getters[`${CHANNELPARTNER.NAME}/getWidgetsData`]);
const domesticOrInternational = computed(() => store.getters[`${CHANNELPARTNER.NAME}/getDomesticOrInternational`]);
const getDate = computed(() => store.getters[`${CHANNELPARTNER.NAME}/getDate`]);
const getWidgetsNames = computed(() => store.getters[`${CHANNELPARTNER.NAME}/getWidgetsNames`]);
const getWidgetsValues = computed(() => store.getters[`${CHANNELPARTNER.NAME}/getWidgetsValues`]);

watch(getChartData.value, () => {
    chartData.value = [];
    setTimeout(() => {
        chartData.value = getChartData.value;
    }, 100)
});

watch(
    () => channelPartnerDashboardVariables.value.showVendorModal,
    (value) => {
        if (value) {
            document.body.classList.add('model-open');
        } else {
            document.body.classList.remove('model-open');
        }
    }
);

const getImgUrl = (val) => {
    return new URL(`../../../assets/images/channel-partner-dashboard/${val}.svg`, import.meta.url).href;
};
</script>

<template>
    <div class="rate-chart">
        <div class="content-wrapper">
            <div class="content">
                <Header headingTitle="Dashboard" @removeChartData="removeChartData"
                    @showVendorModal="channelPartnerDashboardVariables.showVendorModal = true"> </Header>
                <section class="widgets-container">
                    <div v-for="(widgetName, i) in getWidgetsNames" :key="i" class="widget">
                        <Card>
                            <template #content>
                                <div class="title-container">
                                    <span class="title">{{ widgetName.name }}</span>
                                </div>
                                <div class="widget-body">
                                    <skeletonView
                                        v-if="getWidgetsValues[i].value == '' && getWidgetsValues[i].value == undefined && getWidgetsValues[i].value == null"
                                        width="3rem" height="16px"></skeletonView>
                                    <span v-else class="widget-numbers">
                                        {{ getWidgetsValues[i].value }}
                                    </span>
                                </div>
                            </template>
                        </Card>
                    </div>
                </section>

                <div class="chart-container">
                    <Card>
                        <template #title> Order Summary </template>
                        <template #content>
                            <Bar :data="chartData" :options="options" height="350" />
                        </template>
                    </Card>
                </div>

                <VendorModalDatatable v-show="channelPartnerDashboardVariables.showVendorModal" @vendorData="setFilter"
                    @close-modal="channelPartnerDashboardVariables.showVendorModal = false" @reset-vendor="resetVendor"
                    :vendor-store="getMappedFilterValue.vendor_name"
                    :remove-check="channelPartnerDashboardVariables.removeCheck" :getVendorValues="getVendorValues"
                    :getVendorModalPayload="getVendorModalPayload" :getVendorDataStatus="getVendorDataStatus"
                    @search-vendor-name="searchByVendorName" />
            </div>
        </div>
    </div>
</template>

<style>
@import './ChannelPartnerDashboard.scss';

.channel-partner-dashboard-outer {
    .dp--menu-wrapper {
        z-index: 5 !important;
    }

    ::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 16px;
    }

    ::-webkit-scrollbar-track {
        background: #fff;
    }

    @media screen and (min-width: 1026px) {
        .dp__outer_menu_wrap {
            left: 11px !important;
        }
    }

    @media screen and (max-width: 1024px) {
        .dp__outer_menu_wrap {
            top: 40px !important;
            left: 0px !important;
        }
        .dp--menu-wrapper {
            max-height: 307px !important;
            overflow: auto;
        }
    }
}

.channel-partner-dashboard-outer .checkbox-custom-outer input[type='checkbox'] {
    left: 0 !important;
    cursor: pointer;
}

.channel-partner-dashboard-outer.model-open {
    overflow: hidden;
}

.channel-partner-dashboard-outer .custom-sort {
    padding: 0;
}

@media (min-width: 1023px) and (max-width: 1024px) {
    .channel-partner-dashboard-outer .dp-custom-menu-show-main {
        left: 0 !important;
        position: relative;
        min-width: 0 !important;
    }
}

@media (min-width: 819px) and (max-width: 912px) {
    .channel-partner-dashboard-outer .dp-custom-menu-show-main {
        left: 0 !important;
        position: relative;
        min-width: 0 !important;
    }

    .channel-partner-dashboard-outer .layout-container.layout-light.layout-light-menu.layout-transparent-topbar.layout-drawer.layout-sidebar-active.layout-sidebar-anchored .layout-content-wrapper {
        margin-left: 0 !important;
    }
}

@media (min-width: 768px) and (max-width: 769px) {
    .channel-partner-dashboard-outer .dp-custom-menu-show-main {
        left: 0 !important;
        position: relative;
        min-width: 0 !important;
    }

    .channel-partner-dashboard-outer .dp__outer_menu_wrap.dp--menu-wrapper {
        max-height: 307px !important;
        overflow: auto;
    }

    .channel-partner-dashboard-outer .dp__menu_inner.dp__flex_display {
        display: block;
    }

    .channel-partner-dashboard-outer .custom-sort {
        padding: 0;
    }

    .channel-partner-dashboard-outer .dp__menu_content_wrapper .dp__instance_calendar {
        margin-left: 0;
    }

    .channel-partner-dashboard-outer .dp__menu .dp__menu_content_wrapper .dp__sidebar_left {
        width: 247px;
    }

    .channel-partner-dashboard-outer .layout-container.layout-light.layout-light-menu.layout-transparent-topbar.layout-drawer.layout-sidebar-active.layout-sidebar-anchored .layout-content-wrapper {
        margin-left: 0 !important;
    }
}

@media (max-width: 767px) {
    .channel-partner-dashboard-outer .layout-topbar {
        height: auto !important;
    }

    .channel-partner-dashboard-outer .dp--menu-wrapper {
        z-index: 96;
    }

    .channel-partner-dashboard-outer .dp-custom-menu-show-main {
        left: 0 !important;
        position: relative;
        min-width: 0 !important;
    }

    .channel-partner-dashboard-outer .dp__outer_menu_wrap.dp--menu-wrapper {
        max-height: 307px !important;
        overflow: auto;
    }

    .channel-partner-dashboard-outer .custom-sort {
        padding: 0;
    }
}
</style>
