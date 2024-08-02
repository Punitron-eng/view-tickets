<script setup>
import { defineProps, ref, reactive, watch, onMounted, computed, defineEmits } from 'vue';
import { useStore } from 'vuex';
import { CHANNELPARTNER } from '../../../store/channel-partner/channel-partner-dashboard/constants';
import DateTimeRangePicker from '../../itl-common-features/itl-date-range-picker/dataTable-dateRange/DateTimeRangePicker.vue';
import { subDays, format } from 'date-fns';
const store = useStore();
const getSelectedVendors = ref({
    id: [],
    value: []
});
const props = defineProps(['headingTitle', 'vendorData']);
const emit = defineEmits(['removeChartData', 'showVendorModal']);

const domesticInternational = ref({ name: 'Domestic' });
const domesticInternationalOptions = reactive([{ name: 'Domestic' }, { name: 'International' }]);

const startDate = ref([subDays(new Date(), 29), new Date()]);

const tempDate = computed(() => store.getters[`${CHANNELPARTNER.NAME}/getDate`]);

watch(
    () => tempDate.value,
    (date) => {
        if (date.id !== '') {
            startDate.value = date.value.split(' ');
        }
    }
);


onMounted(() => {
    formatDate();
    getSelectedVendors.value = store.getters[`${CHANNELPARTNER.NAME}/getSelectedVendors`];
});

//  getSelectedVendors.value = computed(() => store.getters[`${CHANNELPARTNER.NAME}/getSelectedVendors`]);

const domesticOrInternational = computed(() => store.getters[`${CHANNELPARTNER.NAME}/getDomesticOrInternational`]);
const getDate = computed(() => store.getters[`${CHANNELPARTNER.NAME}/getDate`]);
// watch(
//     () => getSelectedVendors.value,
//     (value) => {
//         // console.log('getSelectedVendors =>', value)
//     }
// );
const setDomesticOrInternational = async (data) => {
    await store.dispatch(`${CHANNELPARTNER.NAME}/setDomesticOrInternational`, data.value.name);
    await store.dispatch(`${CHANNELPARTNER.NAME}/setChartData`, { filter_date: getDate.value.value, delivery_type: domesticOrInternational.value === 'Domestic' ? '0' : '1', vendor_ids: getSelectedVendors.value.id });

    // const res = await store.dispatch(`${CHANNELPARTNER.NAME}/fetchWidgetsNames`);
    // if (res.status == 'success') {
    // const res1 = await store.dispatch(`${CHANNELPARTNER.NAME}/fetchWidgetsValues`, { filter_date: getDate.value.value, delivery_type: domesticOrInternational.value == 'Domestic' ? '0' : '1', vendor_ids: getSelectedVendors.value.id });
    // }
    emit('removeChartData');
};

const updateDate = async (date) => {
    const data = {
        type: date.type,
        order_date: date,
    };
    store.dispatch(`${CHANNELPARTNER.NAME}/setDate`, data);
    await store.dispatch(`${CHANNELPARTNER.NAME}/setChartData`, { filter_date: getDate.value.value, delivery_type: domesticOrInternational.value === 'Domestic' ? '0' : '1', vendor_ids: getSelectedVendors.value.id });

    // const res = await store.dispatch(`${CHANNELPARTNER.NAME}/fetchWidgetsNames`);
    // if (res.status == 'success') {
    // const res1 = await store.dispatch(`${CHANNELPARTNER.NAME}/fetchWidgetsValues`, { filter_date: getDate.value.value, delivery_type: domesticOrInternational.value == 'Domestic' ? '0' : '1', vendor_ids: getSelectedVendors.value.id });
    // }

    emit('removeChartData');
};

const formatDate = async () => {
    const formatDateLength = 'YYYY-MM-DD';
    let data = '';
    if (formatDateLength.length === startDate.value[0].length) {
        data = {
            order_date: {
                date: startDate.value[0] + ' ' + startDate.value[1],
                selectedLabel: 'last_30_days',
            },
        };
    } else {
        const formattedStartDate = format(startDate.value[0], 'yyyy-MM-dd');
        const formattedEndDate = format(startDate.value[1], 'yyyy-MM-dd');
        data = {
            type: '',
            order_date: {
                selectedDate: formattedStartDate + ' ' + formattedEndDate,
                selectedLabel: 'last_30_days',
                label: '',
            },
        };
    }
    await store.dispatch(`${CHANNELPARTNER.NAME}/setDate`, data);
};
</script>

<template>
    <div class="cpd-page-header">
        <div class="page-header">
            <div class="heading-section">
                <div class="heading-title">{{ props.headingTitle }}</div>
            </div>

            <div class="actions-section">
                <DateTimeRangePicker @updateDate="updateDate" class="w-5 mr-4 date-time-range-picker" :startDate="startDate" :inline="false" />
                <button @click="$emit('showVendorModal')" class="mr-3 action-btn sel-vendor-btn">
                    <span class="vendor-text">{{ getSelectedVendors.value.length ? 'Vendor:' + getSelectedVendors.value.length + ' ' + 'Selected' : 'Select Vendor' }}</span>
                    <!-- <i class="pi pi-angle-down angle-down-arrow"></i> -->
                </button>

                <!-- {{ selectedVendors }} -->
                <Dropdown v-model="domesticInternational" :options="domesticInternationalOptions" optionLabel="name" @change="(data) => setDomesticOrInternational(data)" placeholder="Domestic" class="di-dropdown">
                    <template #option="slotProps">
                        <div class="dropdown-panel-options-parent">
                            <div>{{ slotProps.option.name }}</div>
                            <img v-show="domesticInternational.name == slotProps.option.name" class="check-sign" src="../../../assets/images/IcOutlineCheck.svg" alt="Check Sign" />
                        </div>
                    </template>
                </Dropdown>
            </div>
        </div>
        <div class="actions-section-responsive">
            <DateTimeRangePicker class="w-full date-time-range-picker" @updateDate="updateDate" :startDate="startDate" :inline="false" />

            <button @click="$emit('showVendorModal')" class="action-btn sel-vendor-btn">
                <span class="vendor-text">{{ getSelectedVendors.value.length ? 'Vendor:' + getSelectedVendors.value.length + ' ' + 'selected' : 'Select Vendor' }}</span>
                <!-- <i class="pi pi-angle-down angle-down-arrow"></i> -->
            </button>
        </div>
    </div>
</template>

<style scoped>
@import './Header.scss';
</style>

<style lang="scss">
@import '../../../assets/itl-common-css/common-css.scss';

.dp__input_icon_pad {
    font-family: $helveticaRegular;
    font-size: 12px;
}

.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
    color:blue;
    background: none !important;
    font-family: $helveticaRegular;
}

.p-dropdown-panel .p-dropdown-items .p-dropdown-item {
    margin: 0;
    padding: 0.75rem 1.25rem;
    border: 0 none;
    color: #69707a;
    background: transparent;
    transition: box-shadow 0.2s;
    border-radius: 0;
    font-family: $helveticaRegular;
}

.dropdown-panel-options-parent {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.dropdown-panel-options-parent .check-sign {
    width: 13px;
    height: 13px;
}

.actions-section .dp__input_icon_pad {
    border-radius: 45px;
    height: 32px;
    // padding-top: 3px;
    // padding-bottom: 3px;
}

.actions-section-responsive .dp__input_icon_pad {
    border-radius: 45px;
    height: 32px;
    // padding-top: 3px;
    // padding-bottom: 3px;
}

.p-dropdown {
    border: 1px solid #dfe3e6;
    border-radius: none !important;
    border-top-left-radius: 45px !important;
    border-bottom-left-radius: 45px !important;
    border-top-right-radius: 45px !important;
    border-bottom-right-radius: 45px !important;
    // margin: 4px 0px 20px 0px;
    width: 160px;
    height: 32px;

    .p-inputtext {
        padding: 10px 16px !important;
        font-size: 0.9rem;
        color: $blackColor !important;
        padding: 0.5rem 0px 0.5rem 1rem !important;
    }
}

@media (max-width: 767px) {
    .cpd-page-header .page-header .actions-section .p-dropdown {
        width: 100%;
    }
}

.p-dropdown:not(.p-disabled).p-focus {
    box-shadow: none;
}

.p-dropdown-label {
    font-family: $helveticaRegular;
}

.p-dropdown .p-dropdown-label .p-placeholder {
    color: $blackColor !important;
    font-family: $helveticaRegular;
}

.dropdown-panel-options-parent {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.dropdown-panel-options-parent .check-sign {
    width: 13px;
    height: 13px;
}

.p-dropdown-panel {
    font-size: 13px;
    font-family: $helveticaRegular;
}

.p-dropdown-panel .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled):hover {
    background: none;
}

.cpd-page-header .page-header .actions-section .p-dropdown .p-inputtext {
    padding: 0.5rem 0px 0.5rem 1rem !important;
}

.p-dropdown-items-wrapper {
    height: auto !important;
    max-height: max-content !important;
}

.p-dialog .p-dialog-header .p-dialog-header-icon:enabled:hover {
    background: none;
}

.p-dialog .p-dialog-header .p-dialog-header-icon:focus {
    box-shadow: none;
}
.dp__clear_icon {
    display: none;
}
</style>
