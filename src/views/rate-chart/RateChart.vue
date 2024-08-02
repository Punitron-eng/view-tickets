<script setup>
import { onMounted, ref, computed, onBeforeUnmount, onBeforeMount, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { useEmitter } from '@nguyenshort/vue3-mitt';
import { useCookies } from "vue3-cookies";
import { RATECHART } from '../../store/rate-chart/constants';
import { checkAccessRight, checkUserType, deepCheckAccessRight } from '../../util/commonHandlers';
import config from '../../util/config';
import { authHeader } from '../../util/AuthHeader';

import Header from '../../components/header-files/rc-header-files/Header.vue';
import RateChartTable from '../../components/rateChartTable/RateChartTable.vue';
import VendorModal from '../../components/common-modal-files/VendorModal.vue';
import RateChartDeleteModal from '../../components/rateChartTable/rateChartDeleteModal/rateChartDeleteModal.vue';
import RateChartModal from '../../components/rateChartTable/rateChartModal/RateChartModal.vue';
import RateChartVerifyOtpModal from '../../components/rateChartTable/rateChartVerifyOtpModal/rateChartVerifyOtpModal.vue';
import ConfirmDelete from '../../components/rateChartTable/rateChartDeleteModal/ConfirmDelete.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();
const { cookies } = useCookies();
const emitter = useEmitter();

const topHeader = ref(JSON.parse(localStorage.getItem('top_header')));
const defaultSelectedVendor = ref(localStorage.getItem('vendor_code') + ' - ' + localStorage.getItem('selected_vendor'));
const showRateChartModal = ref(false);
const newRateChartModal = ref(false);
const showVendorModal = ref(false);
const isFirstTimeVendorSelect = ref(false);
const storeSelectedVendor = ref([]);
const storeSelectedVendorForComponent = ref(defaultSelectedVendor.value ? defaultSelectedVendor.value.split(',') : '')
const showDeleteModal = ref({
    id: null,
    value: null
});
const confirmDeleteModal = ref(false);
const deleteId = ref(null);
const showOtpModalOrNot = ref(localStorage.getItem('showOtpModal'));
const callServiceTypeRef = ref(false);
const makeBandNullOnVModel = ref(false);

(async () => {
    if (route.params.id && !checkUserType('vendor')) {
            const params_temp = new URLSearchParams();
            params_temp.append('vendor_id', route.params.id);
            params_temp.append('limit', '0');
            params_temp.append('start', '0');
            params_temp.append('input_type', 'checkbox');
            let result = await fetch(config.baseUrlApi + 'common-module-v3/get-vendor-data-v3.json', {
                method: 'POST',
                headers: authHeader(),
                body: params_temp,
            });
            result = await result.json();
            localStorage.setItem('vendor_code', result.all_get_my_user_data_array.vendor_code);
            localStorage.setItem('selected_vendor', result.all_get_my_user_data_array.company_name + ' - ' + result.all_get_my_user_data_array.user_name + ' ,' + route.params.id);

            storeSelectedVendorForComponent.value = [result.all_get_my_user_data_array.vendor_code + ' - ' + result.all_get_my_user_data_array.company_name + ' - ' + result.all_get_my_user_data_array.user_name, route.params.id]; 
        }
})();

onBeforeMount(() => {
    checkAccessRight('') ? true : deepCheckAccessRight('domestic', 'rate_chart', 'settings_view_rate_chart_v3') ? true : window.location.href = config.baseUrlPanel + 'logout';
    cookies.set("mobile_token", cookies.get("request_token"))
})

onMounted(async () => {
    document.body.classList.add('rate-chart-parent-class');

    setTimeout(async () => {
        if (localStorage.getItem('selected_vendor') && !checkUserType('vendor')) await setVendor(localStorage.getItem('selected_vendor'), 'ONMOUNTED');
    }, 350);
})

onBeforeUnmount(() => {
    document.body.classList.remove('rate-chart-parent-class');
})

const setVendor = async (vendor, status) => {
    if (vendorData.value.id == '') {
        isFirstTimeVendorSelect.value = true;
    } else {
        isFirstTimeVendorSelect.value = false;
    }
    storeSelectedVendor.value = vendor;
    
    
    await store.dispatch(`${RATECHART.NAME}/setVendor`, vendor);
    await store.dispatch(`${RATECHART.NAME}/fetchData`, {
        vendor_id: vendorData.value.id,
        delivery_type: deliveryType.value,
        tab_type: tabType.value
    });
    await changeVendorDataInLocalStorage(vendor, status);
    showVendorModal.value = false;
}

const changeVendorDataInLocalStorage = async (vendor, status) => {
    if (typeof vendor == 'object') vendor = vendor[0];
    if (!status) {
        localStorage.setItem('vendor_code', vendor.split('-')[0].trim());
        localStorage.setItem('selected_vendor', vendor.replace(/^[^-]+ - /, '').trim());
    }

    let accountSettingMenu = JSON.parse(localStorage.getItem('all_final_menu_header_data_array'));
    await accountSettingMenu['account'].forEach((el) => {
        if (el?.url && el.url.includes('account-setting/')) {
            if ((el.url.match(/\//g) || []).length < 2) {
                el.url = el.url + '/' + vendor.split(',')[1];
            } else {
                let parts = el.url.split('/');
                parts[parts.length - 1] = vendor.split(',')[1];
                el.url = parts.join('/');
            }
        }
    });
    await accountSettingMenu['setting'].forEach((el) => {
        if (el?.url && el.url.includes('account-setting/')) {
            if ((el.url.match(/\//g) || []).length < 2) {
                el.url = el.url + '/' + vendor.split(',')[1];
            } else {
                let parts = el.url.split('/');
                parts[parts.length - 1] = vendor.split(',')[1];
                el.url = parts.join('/');
            }
        }
    });
    localStorage.setItem('all_final_menu_header_data_array', JSON.stringify(accountSettingMenu));
    emitter.emit('vendor_changed');
    storeSelectedVendorForComponent.value = [localStorage.getItem('vendor_code') + ' - ' + localStorage.getItem('selected_vendor').split(',')[0].trim(), localStorage.getItem('selected_vendor').split(',')[1]]; 
    router.replace('/rate-chart/' + localStorage.getItem('selected_vendor').split(',')[1]);
}

const resetVendorFilter = async () => {
    let accountSettingMenu = JSON.parse(localStorage.getItem('all_final_menu_header_data_array'));
    await accountSettingMenu['account'].forEach((el) => {
        if (el?.url && el.url.includes('account-setting/')) {
            let parts = el.url.split('/');
            parts.pop();
            el.url = parts.join('/');
        }
    });
    await accountSettingMenu['setting'].forEach((el) => {
        if (el?.url && el.url.includes('account-setting/')) {
            let parts = el.url.split('/');
            parts.pop();
            el.url = parts.join('/');
        }
    });
    localStorage.setItem('all_final_menu_header_data_array', JSON.stringify(accountSettingMenu));
    localStorage.removeItem('selected_vendor');
    localStorage.removeItem('vendor_code');
    window.location.assign(`${config.baseUrlPanel}v4/rate-chart`);
}

const showRateChartModalFn = async (editId) => {
    await store.dispatch(`${RATECHART.NAME}/fetchModalData`, { tab_type: tabType.value, edit_id: editId, vendor_id: vendorData.value.id, delivery_type: 0 });
    document.body.classList.add('edit-modal-open');
    newRateChartModal.value = false;
    showRateChartModal.value = true;
}

const closeRateChartModalFn = async () => {
    showRateChartModal.value = false;
    document.body.classList.remove('edit-modal-open');
}

const showDeleteModalHandler = (data) => {
    if (data == 'show') {
        document.body.classList.add('delete-modal-parent');
    } else {
        document.body.classList.remove('delete-modal-parent');
    }
}

const showConfirmDeleteModal = (val) => {
    deleteId.value = null;
    deleteId.value = val;
    confirmDeleteModal.value = true;
}

watch(() => showVendorModal.value, (newValue) => {
    if (newValue) {
        document.body.classList.add('rate-chart-overflow-hidden');
    } else {
        document.body.classList.remove('rate-chart-overflow-hidden');
    }
});

const callServiceType = () => {
    callServiceTypeRef.value = !callServiceTypeRef.value;
}

const vendorData = computed(() => store.getters[`${RATECHART.NAME}/getVendor`]);
const deliveryType = computed(() => store.getters[`${RATECHART.NAME}/getDeliveryType`]);
const tabType = computed(() => store.getters[`${RATECHART.NAME}/getTabType`]);
</script>

<template>
    <div class="rate-chart min-h-[85vh] md:min-h-[93vh] lg:min-h-[85vh]">
        <div class="content-wrapper">
            <div class="content">
                <Header headingTitle="Rate Chart" class="right-actions"
                    v-on:showRateChartModal="() => { showRateChartModal = true; newRateChartModal = true; }"
                    v-on:showVendorModal="showVendorModal = true" @callServiceType="callServiceType()"
                    :makeBandNullOnVModel="makeBandNullOnVModel">
                </Header>
                <RateChartTable :showOtpModalOrNot="showOtpModalOrNot"
                    v-on:showDeleteModal="(e) => { showDeleteModal.value = true; showDeleteModal.id = e; showDeleteModalHandler('show') }"
                    v-on:showRateChartModal="(data) => { showRateChartModalFn(data) }"
                    :isFirstTimeVendorSelect="isFirstTimeVendorSelect" :callServiceType="callServiceTypeRef">
                </RateChartTable>
                <RateChartModal :showRateChartModal="showRateChartModal" :newRateChartModal="newRateChartModal"
                    @setBandNull="makeBandNullOnVModel = !makeBandNullOnVModel"
                    v-on:hideRateChartModal="() => { closeRateChartModalFn() }">
                </RateChartModal>
                <div v-if="topHeader.user_type != 3">
                    <VendorModal v-show="showVendorModal" @close-modal="showVendorModal = false"
                        @applyVendor="(vendor) => setVendor(vendor)" @resetVendor="resetVendorFilter"
                        :storeSelectedVendor="storeSelectedVendor" :vendor-id="storeSelectedVendorForComponent">
                    </VendorModal>
                </div>
                <RateChartDeleteModal :showDeleteModal="showDeleteModal"
                    v-on:closeDeleteModal="showDeleteModal.value = false; showDeleteModal.id = null; showDeleteModalHandler('hide');"
                    @openConfirmDeleteModal="(val) => showConfirmDeleteModal(val)">
                </RateChartDeleteModal>
                <ConfirmDelete :id="deleteId" :showModal="confirmDeleteModal"
                    @closeConfirmDeleteModal="confirmDeleteModal = false" />
                <RateChartVerifyOtpModal v-on:show-otp-modal-or-not="(val) => showOtpModalOrNot = val" />
            </div>
        </div>
    </div>
</template>

<style>
@import './RateChart.scss';
</style>
