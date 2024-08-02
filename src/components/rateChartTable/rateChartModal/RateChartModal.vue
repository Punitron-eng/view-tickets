<script setup>
import { ref, watch, onUpdated, computed } from 'vue';
import { useStore } from 'vuex';
import { RATECHART } from '../../../store/rate-chart/constants';
import { returnPayloadModal, setValuesOnUpdated, setValuesOnFetchBaseChart } from './helperFunctions';
import { useToast } from "primevue/usetoast";
import { rateChartModalVariables, rateChartModalConstantVariables, checkBoxHandler, setToDefaultValues, checkValidations, setDefaultData } from './RateChartModal'
import { DARKMODE } from '@/store/dark-mode/constants';

const store = useStore();
const toast = useToast();
const showModal = ref(false);
const isLoading = ref(false);

const props = defineProps(['showRateChartModal', 'tableData', 'newRateChartModal']);
const emit = defineEmits(['hideRateChartModal', 'setBandNull']);

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const getActiveLogistics = computed(() => store.getters[`${RATECHART.NAME}/getActiveLogistics`]);
const getModalData = computed(() => store.getters[`${RATECHART.NAME}/getModalData`]);
const getLogisticsDataArrayModal = computed(() => store.getters[`${RATECHART.NAME}/getLogisticsDataArrayModal`]);
const getLogisticsServiceTypeArrayModal = computed(() => store.getters[`${RATECHART.NAME}/getLogisticsServiceTypeArrayModal`]);
const getVendor = computed(() => store.getters[`${RATECHART.NAME}/getVendor`]);
const tabType = computed(() => store.getters[`${RATECHART.NAME}/getTabType`]);
const getDeliveryType = computed(() => store.getters[`${RATECHART.NAME}/getDeliveryType`]);
const getBand = computed(() => store.getters[`${RATECHART.NAME}/getBand`]);

const handleDropdownChangeLogistics = async () => {
    if (rateChartModalVariables.logistic.name == 'Select Logistics') {
        rateChartModalVariables.logisticServiceType = { value: '', name: 'Select Logistics Service Type' };
    } else {
        let edit_id = '0';
        let res = '';
        if (!props.newRateChartModal) {
            edit_id = getModalData.value.rate_card_data_array[0].id;

            res = await store.dispatch(`${RATECHART.NAME}/fetchLogisticServiceTypeByChangeModal`, {
                edit_id: edit_id,
                tab_type: rateChartModalVariables.tabTypeOptions.find((el) => {
                    return el.value == rateChartModalVariables.tabType
                }).id,
                logistic_id: rateChartModalVariables.logisticsOptions.find((el) => {
                    return el.value == rateChartModalVariables.logistic
                }).logistic_id,
                slab_weight_in_kg: rateChartModalVariables.slabType,
                vendor_id: getVendor.value.id,
                logistics_service_type: '',
                delivery_type: getDeliveryType.value
            });
        } else {
            res = await store.dispatch(`${RATECHART.NAME}/fetchLogisticServiceTypeByChangeModal`, {
                edit_id: edit_id,
                tab_type: rateChartModalVariables.tabTypeOptions.find((el) => {
                    return el.value == rateChartModalVariables.tabType
                }).id,
                logistic_id: rateChartModalVariables.logisticsOptions.find((el) => {
                    return el.value == rateChartModalVariables.logistic
                }).logistic_id,
                slab_weight_in_kg: '',
                vendor_id: getVendor.value.id,
                logistics_service_type: '',
                delivery_type: getDeliveryType.value
            });
        }
        rateChartModalVariables.logisticServiceType = 'Select Logistics Service Type';
        rateChartModalVariables.logisticServiceTypeArr = [{ 'id': '', value: 'Select Logistics Service Type' }, ...res.service_type_option];
    }

    rateChartModalVariables.logisticsRequiredText = false;
    rateChartModalVariables.allValuesRequiredText = false;
    rateChartModalVariables.allValuesRequiredTextEcom = false;
}

const handleDropdownSlabType = () => {
    rateChartModalConstantVariables.multiplyFactorOptions = [{ value: '', weight: 'Select Multiply Factor' }];
    const index = rateChartModalConstantVariables.slabTypeOptions.indexOf(rateChartModalConstantVariables.slabTypeOptions.find(({ value }) => value === rateChartModalVariables.slabType));
    let getMultiplyFactorValues = rateChartModalConstantVariables.slabTypeOptions.filter((ele, i) => {
        return i <= index
    })
    rateChartModalConstantVariables.multiplyFactorOptions = getMultiplyFactorValues;
    rateChartModalVariables.slabTypeRequiredText = false;
    rateChartModalConstantVariables.multiplyFactorOptions.length > 0 ? rateChartModalConstantVariables.multiplyFactorOptions[0].weight = 'Select Multiply Factor' : '';
}

const submitData = async () => {
    let edit_id = '0';
    let is_active = '1';
    let logistics_service_type = rateChartModalVariables.logisticServiceTypeArr.find((el) => {
        return el.value == rateChartModalVariables.logisticServiceType;
    }).id;

    if (!props.newRateChartModal) {
        edit_id = getModalData.value.rate_card_data_array[0].id;
        is_active = getModalData.value.rate_card_data_array[0].is_active;

        logistics_service_type = rateChartModalVariables.logisticServiceTypeArr.find((el) => {
            return el.value == rateChartModalVariables.logisticServiceType;
        }).logistic_service_type_id;
        if(logistics_service_type == undefined){
            logistics_service_type = rateChartModalVariables.logisticServiceTypeArr.find((el) => {
                return el.value == rateChartModalVariables.logisticServiceType;
            }).id;
        }
    }
    if (checkValidations()) {
        isLoading.value = true;
        const res = await store.dispatch(`${RATECHART.NAME}/postModalData`, {
            edit_id: edit_id,
            logistic_id: rateChartModalVariables.logisticsOptions.filter((el) => {
                return el.value == rateChartModalVariables.logistic;
            })[0].logistic_id || '',
            logistics_service_type: logistics_service_type,
            tab_type:  rateChartModalVariables.tabTypeOptions.find((el) => {
                return el.value == rateChartModalVariables.tabType;
            }).id,
            slab_weight_in_kg: simplifyDecimal(rateChartModalVariables.slabType),
            multiply_factor: simplifyDecimal(rateChartModalVariables.multiplyFactor),
            rate_type: rateChartModalVariables.rateTypeOptions.filter((el) => {
                return el.value == rateChartModalVariables.rateType;
            })[0].id || '',
            working_factor: rateChartModalVariables.workingFactor || '',

            vendor_id: getVendor.value.id || '',
            delivery_type: getDeliveryType.value || '',
            // rate_slab: getModalData.value.rate_card_data_array[0].rate_slab,
            rate_slab_type: rateChartModalVariables.rateTypeZoneWise == 'ZW' ? 0 : 1,
            is_active: is_active,
            ...returnPayloadModal(rateChartModalVariables)
        });

        if (res.status == 'success') {
            toast.add({ severity: 'success', summary: 'Success Message', detail: res.html_message, life: 2000 });
        } else {
            toast.add({ severity: 'error', summary: 'Error Message', detail: res.html_message, life: 1000 });
        }

        rateChartModalVariables.rateType = '';
        rateChartModalVariables.rateTypeOptions = [];
        store.dispatch(`${RATECHART.NAME}/setBand`, { id: '', value: 'Select Band (%)' });
        emit('setBandNull');

        await store.dispatch(`${RATECHART.NAME}/fetchData`, {
            vendor_id: getVendor.value.id, 
            delivery_type: getDeliveryType.value, 
            tab_type: tabType.value, 
            band_id: ''
        });
        store.dispatch(`${RATECHART.NAME}/setActiveLogistics`, getActiveLogistics.value);
        isLoading.value = false;
        emit('hideRateChartModal');
        setToDefaultValues();
    } else {
        const modal = document.querySelector('.p-dialog-mask');
        modal.scrollTop = 0;
        return
    }
}

onUpdated(async () => {
    setToDefaultValues();
    rateChartModalVariables.tabType = '';
    rateChartModalVariables.rateTypeOptions = [{ id: '', value: 'Select Rate Type' }, ...getModalData.value['all_rate_type_data_array']]

    rateChartModalVariables.logisticsOptions = getLogisticsDataArrayModal.value;

    if (!props.newRateChartModal) {
        for (let i of getLogisticsServiceTypeArrayModal.value) {
            if (i.logistic_service_type_id == getModalData.value.rate_card_data_array[0].logistics_service_type) {
                rateChartModalVariables.logisticServiceType = i.value;
                break;
            }
        }

        for (let i of getLogisticsDataArrayModal.value) {
            if (i.id == getModalData.value.rate_card_data_array[0].logistic_id) {
                rateChartModalVariables.logistic = i.value;
                break;
            }
        }

        for (let i of rateChartModalVariables.rateTypeOptions) {
            if (i.id == getModalData.value.rate_card_data_array[0].band_type) {
                rateChartModalVariables.rateType = i.value;
                break;
            }
        }

        rateChartModalVariables.tabType = rateChartModalVariables.tabTypeOptions.find((el) => {
            return el.id == tabType.value;
        }).value;
        rateChartModalVariables.logisticsOptions = getLogisticsDataArrayModal.value;
        rateChartModalVariables.slabType = getModalData.value.rate_card_data_array[0].slab_weight_in_kg;
        handleDropdownSlabType();
        rateChartModalVariables.multiplyFactor = getModalData.value.rate_card_data_array[0].multiply_factor;
        rateChartModalVariables.workingFactor = getModalData.value.rate_card_data_array[0].working_factor;
        rateChartModalVariables.logisticsFwd = getModalData.value.rate_card_data_array[0].logistics_fwd;
        rateChartModalVariables.logisticsFwdAdditional = getModalData.value.rate_card_data_array[0].logistics_fwd_additional;

        setValuesOnUpdated(getModalData);
    }
})

watch(getLogisticsServiceTypeArrayModal, () => {
    rateChartModalVariables.logisticServiceTypeArr = getLogisticsServiceTypeArrayModal.value;
})

const fetchBaseRateChart = async () => {
    if (rateChartModalVariables.logistic != '' && rateChartModalVariables.logisticServiceType != 'Select Logistics Service Type' && rateChartModalVariables.slabType != '' && rateChartModalVariables.slabType != '0.00' && rateChartModalVariables.rateType != 'Select Rate Type') {
        let res = await store.dispatch(`${RATECHART.NAME}/fetchBaseRateChartModalDropdownChange`, {
            logistic_id: rateChartModalVariables.logisticsOptions.filter((el) => {
                return el.value == rateChartModalVariables.logistic;
            })[0].logistic_id,
            rate_type: rateChartModalVariables.rateTypeOptions.filter((el) => {
                return el.value == rateChartModalVariables.rateType;
            })[0].id,
            slab_weight_in_kg: rateChartModalVariables.slabType,
            logistic_service_type: rateChartModalVariables.logisticServiceTypeArr.filter((el) => {
                return el.value == rateChartModalVariables.logisticServiceType;
            })[0].id
        });

        if (res.status == "success") {
            setDefaultData();
            rateChartModalVariables.baseRateChartFetched = true;
            let temp = res.all_zone_data;
            setValuesOnFetchBaseChart(temp);
        }
    }
}

const handleTabTypeDropdown = async () => { 
    rateChartModalVariables.tabTypeRequiredText = false;

    let res = await store.dispatch(`${RATECHART.NAME}/fetchLogisticsTabTypeDropdownChangeModal`, {
        tab_type: rateChartModalVariables.tabTypeOptions.find((el) => {
            return el.value == rateChartModalVariables.tabType
        }).id,
        vendor_id: getVendor.value.id,
        edit_id: !props.newRateChartModal ? getModalData.value.edit_id : '0',
        delivery_type: getDeliveryType.value 
    });
    if(res.status == 'success'){
        rateChartModalVariables.logistic = 'Select Logistics';
        rateChartModalVariables.logisticsOptions = [{id: '', value: 'Select Logistics'}];
        rateChartModalVariables.logisticServiceTypeArr = [{id: '', value: 'Select Logistics Service Type'}];
        for(let i in res.logistics_v2_data_array){
            let obj = {
                id: i,
                logistic_id: res.logistics_v2_data_array[i].logistic_id,
                value: res.logistics_v2_data_array[i].logistic_name,
            };
            rateChartModalVariables.logisticsOptions.push(obj)
        }

        rateChartModalVariables.rateTypeOptions = [];
        rateChartModalVariables.rateTypeOptions = [{ id: '', value: 'Select Rate Type' }, ...res['all_rate_type_data_array']];
        rateChartModalVariables.rateType = 'Select Rate Type';
    }
}

const isNumber = (evt) => {
    const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'Backspace'];
    const keyPressed = evt.key;
    
    if (!keysAllowed.includes(keyPressed)) {
           evt.preventDefault();
           return;
    }
    
    rateChartModalVariables.rateType = 'Select Rate Type';
}

const simplifyDecimal = (str) => {
    const decimalNumber = parseFloat(str);
    const hasNonZeroDecimalPart = decimalNumber.toString().split(".")[1] !== "0";
    const formattedNumber = hasNonZeroDecimalPart ? decimalNumber.toFixed(1) : decimalNumber;

    return formattedNumber;
}

watch(() => props.showRateChartModal, () => {
    if(props.showRateChartModal == false){
        rateChartModalVariables.rateType = getBand.value.value;
    }
    showModal.value = props.showRateChartModal;
})
</script>
<template>
    <div class="modal-start" id="rateChart">
        <DialogView id="rateCharModal" maximizable v-model:visible="showModal" modal :draggable="false" header="Header" :dismissableMask="true" @update:visible="(e) => { !e ? $emit('hideRateChartModal') : '' }"
            :style="{ width: '768px', zIndex: '2345678979'  }"
            :breakpoints="{ '1024px': '80%', '1023px': '90%', '575px': '100%' }">
            <template #header>
                <span class="modal-title font-bold white-space-nowrap">Add Rate</span>
                    <div>
                        <img @click="$emit('hideRateChartModal')" v-if="!darkModeVal" src="../../../assets/images/modal-close-icon.svg" alt="close-btn" class="close-btn" />
                        <img @click="$emit('hideRateChartModal')" v-else src="../../../assets/images/dark-mode/modal-close-icon.svg" alt="close-btn" class="close-btn" />
                    </div>
            </template>
            <div class="m-0 modal-content">
                <div class="selects">
                    <div class="select">
                        <label class="modal-label">Tab Type<span class="required-asterisk">*</span></label>
                        <Dropdown id="drp-1" @change="handleTabTypeDropdown()" v-model="rateChartModalVariables.tabType"
                            :options="rateChartModalVariables.tabTypeOptions" optionLabel="value" optionValue="value"
                            placeholder="Select Tab Type" class="w-full">
                            <template #option="slotProps">
                                <div class="dropdown-panel-options-parent">
                                    <div>{{ slotProps.option.value }}</div>
                                    <img v-if="!darkModeVal" v-show="rateChartModalVariables.tabType == slotProps.option.value"
                                        class="check-sign" src="../../../assets/images/IcOutlineCheck.svg" alt="Check Sign">
                                    <img v-else v-show="rateChartModalVariables.tabType == slotProps.option.value"
                                        class="check-sign" src="../../../assets/images/dark-mode/dark-IcOutlineCheck.svg" alt="Check Sign">
                                </div>
                            </template>
                        </Dropdown>
                        <p class="mb-3 required-error">{{ rateChartModalVariables.tabTypeRequiredText ? 'This value is required.' : '' }}</p>
                    </div>
                    <div class="select">
                        <label class="modal-label">Logistics<span class="required-asterisk">*</span></label>
                        <Dropdown id="drp-2" @change="handleDropdownChangeLogistics();" v-model="rateChartModalVariables.logistic"
                            :options="rateChartModalVariables.logisticsOptions" optionLabel="value" optionValue="value"
                            placeholder="Select Logistics" class="w-full">
                            <template #option="slotProps">
                                <div class="dropdown-panel-options-parent">
                                    <div>{{ slotProps.option.value }}</div>
                                    <img v-if="!darkModeVal" v-show="rateChartModalVariables.logistic == slotProps.option.value"
                                        class="check-sign" src="../../../assets/images/IcOutlineCheck.svg" alt="Check Sign">
                                    <img v-else v-show="rateChartModalVariables.logistic == slotProps.option.value"
                                        class="check-sign" src="../../../assets/images/dark-mode/dark-IcOutlineCheck.svg" alt="Check Sign">
                                </div>
                            </template>
                        </Dropdown>
                        <p class="mb-3 required-error">{{ rateChartModalVariables.logisticsRequiredText ? 'This value is required.' : '' }}</p>
                    </div>
                    <div class="select">
                        <label class="modal-label">Logistics Service Type<span class="required-asterisk">*</span></label>
                        <Dropdown id="drp-3" @change="fetchBaseRateChart(); rateChartModalVariables.logisticsServiceTypeRequiredText = false;" v-model="rateChartModalVariables.logisticServiceType"
                            :options="rateChartModalVariables.logisticServiceTypeArr" optionLabel="value"
                            optionValue="value" placeholder="Select Logistics Service Type" class="w-full">
                            <template #option="slotProps">
                                <div class="dropdown-panel-options-parent">
                                    <span class="dropdown-panel-text">{{ slotProps.option.value }}</span>
                                    <img v-if="!darkModeVal" v-show="rateChartModalVariables.logisticServiceType == slotProps.option.value"
                                        class="check-sign" src="../../../assets/images/IcOutlineCheck.svg" alt="Check Sign">
                                    <img v-else v-show="rateChartModalVariables.logisticServiceType == slotProps.option.value"
                                        class="check-sign" src="../../../assets/images/dark-mode/dark-IcOutlineCheck.svg" alt="Check Sign">
                                    
                                </div>
                            </template>
                        </Dropdown>
                        <p class="mb-3 required-error">{{ rateChartModalVariables.logisticsServiceTypeRequiredText ? 'This value is required.' : '' }}</p>
                    </div>
                    <div class="select">
                        <label class="modal-label">Slab Type<span class="required-asterisk">*</span></label>
                        <Dropdown id="drp-4" @change="handleDropdownSlabType(); fetchBaseRateChart();" v-model="rateChartModalVariables.slabType"
                            :options="rateChartModalConstantVariables.slabTypeOptions" optionLabel="weight"
                            optionValue="value" placeholder="Select Slab Type" class="w-full">
                            <template #option="slotProps">
                                <div class="dropdown-panel-options-parent">
                                    <span class="dropdown-panel-text">{{ slotProps.option.weight }}</span>
                                    <img v-if="!darkModeVal" v-show="rateChartModalVariables.slabType == slotProps.option.value"
                                        class="check-sign" src="../../../assets/images/IcOutlineCheck.svg" alt="Check Sign">
                                    <img v-else v-show="rateChartModalVariables.slabType == slotProps.option.value"
                                        class="check-sign" src="../../../assets/images/dark-mode/dark-IcOutlineCheck.svg" alt="Check Sign">
                                </div>
                            </template>
                        </Dropdown>
                        <p class="mb-3 required-error">{{ rateChartModalVariables.slabTypeRequiredText ? 'This value is required.' : '' }}</p>
                    </div>
                    <div class="select">
                        <label class="modal-label">Multiply Factor<span class="required-asterisk">*</span></label>
                        <Dropdown id="drp-5" @change="rateChartModalVariables.multiplyFactorRequiredText = false"
                            v-model="rateChartModalVariables.multiplyFactor"
                            :options="rateChartModalConstantVariables.multiplyFactorOptions" optionLabel="weight"
                            optionValue="value" placeholder="Select Multiply Factor" class="w-full">
                            <template #option="slotProps">
                                <div class="dropdown-panel-options-parent">
                                    <span class="dropdown-panel-text">{{ slotProps.option.weight }}</span>
                                    <img v-if="!darkModeVal" v-show="rateChartModalVariables.multiplyFactor == slotProps.option.value"
                                        class="check-sign" src="../../../assets/images/IcOutlineCheck.svg" alt="Check Sign">
                                    <img v-else v-show="rateChartModalVariables.multiplyFactor == slotProps.option.value"
                                        class="check-sign" src="../../../assets/images/dark-mode/dark-IcOutlineCheck.svg" alt="Check Sign">
                                </div>
                            </template>
                        </Dropdown>
                        <p class="mb-3 required-error">{{ rateChartModalVariables.multiplyFactorRequiredText ? 'This value is required.' : '' }}</p>
                    </div>
                    <div class="select mb-4">
                        <label class="modal-label">Rate Type</label>
                        <Dropdown id="drp-6" @change="fetchBaseRateChart();" v-model="rateChartModalVariables.rateType"
                            :options="rateChartModalVariables.rateTypeOptions" optionLabel="value" optionValue="value"
                            placeholder="Select Rate Type" class="w-full">
                            <template #option="slotProps">
                                <div class="dropdown-panel-options-parent">
                                    <span class="dropdown-panel-text">{{ slotProps.option.value }}</span>
                                    <img v-if="!darkModeVal" v-show="rateChartModalVariables.rateType == slotProps.option.value"
                                        class="check-sign" src="../../../assets/images/IcOutlineCheck.svg" alt="Check Sign">
                                    <img v-else v-show="rateChartModalVariables.rateType == slotProps.option.value"
                                        class="check-sign" src="../../../assets/images/dark-mode/dark-IcOutlineCheck.svg" alt="Check Sign">
                                </div>
                            </template>
                        </Dropdown>
                    </div>
                    <div class="select">
                        <label class="modal-label">Working Factor</label>
                        <input v-model="rateChartModalVariables.workingFactor" class="input w-full" type="text">
                    </div>
                </div>
                <div class="radio-btns flex flex-wrap gap-3">
                    <label class="radio-main-label">Rate Type</label>
                    <div class="flex align-items-center">
                        <RadioButton v-model="rateChartModalVariables.rateTypeZoneWise" inputId="ingredient1"
                            name="Zone Wise" value="ZW" />
                        <label for="ingredient1" class="ml-2 mr-3">Zone Wise</label>
                    </div>
                    <div class="flex align-items-center">
                        <RadioButton v-model="rateChartModalVariables.rateTypeZoneWise" inputId="ingredient2"
                            name="Flat Rate" value="FR" />
                        <label for="ingredient2" class="ml-2">FLAT Rate</label>
                    </div>
                </div>
                <div class="edit-table pt-4"
                    v-show="((rateChartModalVariables.logistic != 'Ecom Express') && (rateChartModalVariables.rateTypeZoneWise == 'ZW')) && (rateChartModalVariables.logistic != 'Ecom Express')">
                    <table class="table">
                        <thead class="thead">
                            <tr>
                                <th class="first-child">
                                    <div class="input-switch-container">
                                        <div class="table-title">
                                            ZONE
                                        </div>
                                    </div>
                                </th>
                                <th class="sec-child">A</th>
                                <th>B</th>
                                <th>C</th>
                                <th>D</th>
                                <th>E</th>
                                <th class="last-child">F</th>
                            </tr>
                        </thead>
                        <tbody class="tbody">
                            <tr class="tr">
                                <td class="data-first-child">
                                    FWD
                                </td>
                                <td class="data-second-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_a"
                                        class="edit-value-input w-full md:2rem" type="text"  
                                        @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'"
                                    >
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_b"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesCheckEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_c"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_d"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_e"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_f"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                            </tr>
                            <tr class="tr">
                                <td class="data-first-child">
                                    FWD Additional
                                    <div class="sublabel-checkbox-parent">
                                        <span class="sublabel">Same as FWD</span>
                                        <CheckboxView @change="checkBoxHandler(1, (getModalData.rate_card_data_array != '' && getModalData.rate_card_data_array != null && getModalData.rate_card_data_array != undefined && rateChartModalVariables.baseRateChartFetched == false) ? getModalData.rate_card_data_array
                                        [0] : ''); rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false; rateChartModalVariables.rateType = 'Select Rate Type';" v-model="rateChartModalVariables.fwdAddCheckbox" :binary="true" />
                                    </div>
                                </td>
                                <td class="data-second-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_a_fwd_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_b_fwd_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_c_fwd_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_d_fwd_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_e_fwd_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_f_fwd_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                            </tr>
                            <tr class="tr"
                                v-show="((rateChartModalVariables.logistic != 'Ekart') && (rateChartModalVariables.logistic != 'BlueDart'))">
                                <td class="data-first-child">
                                    FWD FSC (%)
                                    <div class="sublabel-checkbox-parent">
                                        <span class="sublabel">Same for all Zones</span>
                                        <CheckboxView @change="checkBoxHandler(2, (getModalData.rate_card_data_array != '' && getModalData.rate_card_data_array != null && getModalData.rate_card_data_array != undefined && rateChartModalVariables.baseRateChartFetched == false) ? getModalData.rate_card_data_array
                                        [0] : ''); rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false; rateChartModalVariables.rateType = 'Select Rate Type';" v-model="rateChartModalVariables.fwdFscCheckbox" :binary="true" />
                                    </div>
                                </td>
                                <td class="data-second-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_a_fwd_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_b_fwd_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_c_fwd_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_d_fwd_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_e_fwd_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_f_fwd_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                            </tr>
                            <tr class="tr">
                                <td class="data-first-child">
                                    COD
                                    <div class="sublabel-checkbox-parent">
                                        <span class="sublabel">Same for all Zones</span>
                                        <CheckboxView @change="checkBoxHandler(3, (getModalData.rate_card_data_array != '' && getModalData.rate_card_data_array != null && getModalData.rate_card_data_array != undefined && rateChartModalVariables.baseRateChartFetched == false) ? getModalData.rate_card_data_array
                                        [0] : ''); rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false; rateChartModalVariables.rateType = 'Select Rate Type';" v-model="rateChartModalVariables.codCheckbox" :binary="true" />
                                    </div>
                                </td>
                                <td class="data-second-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_a_cod"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_b_cod"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_c_cod"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_d_cod"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_e_cod"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_f_cod"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                            </tr>
                            <tr class="tr">
                                <td class="data-first-child">
                                    COD (%)
                                    <div class="sublabel-checkbox-parent">
                                        <span class="sublabel">Same for all Zones</span>
                                        <CheckboxView @change="checkBoxHandler(4, (getModalData.rate_card_data_array != '' && getModalData.rate_card_data_array != null && getModalData.rate_card_data_array != undefined && rateChartModalVariables.baseRateChartFetched == false) ? getModalData.rate_card_data_array
                                        [0] : ''); rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false; rateChartModalVariables.rateType = 'Select Rate Type';" v-model="rateChartModalVariables.codPerCheckbox" :binary="true" />
                                    </div>
                                </td>
                                <td class="data-second-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_a_cod_per"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_b_cod_per"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_c_cod_per"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_d_cod_per"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_e_cod_per"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_f_cod_per"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                            </tr>
                            <tr class="tr">
                                <td class="data-first-child">
                                    RTO
                                    <div class="sublabel-checkbox-parent">
                                        <span class="sublabel">Same for all Zones</span>
                                        <CheckboxView @change="checkBoxHandler(5, (getModalData.rate_card_data_array != '' && getModalData.rate_card_data_array != null && getModalData.rate_card_data_array != undefined && rateChartModalVariables.baseRateChartFetched == false) ? getModalData.rate_card_data_array
                                        [0] : ''); rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false; rateChartModalVariables.rateType = 'Select Rate Type';" v-model="rateChartModalVariables.rtoCheckbox" :binary="true" />
                                    </div>
                                </td>
                                <td class="data-second-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_a_rto"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_b_rto"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_c_rto"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_d_rto"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_e_rto"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_f_rto"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                            </tr>
                            <tr class="tr">
                                <td class="data-first-child">
                                    RTO Additional
                                    <div class="sublabel-checkbox-parent">
                                        <span class="sublabel">Same for all Zones</span>
                                        <CheckboxView @change="checkBoxHandler(6, (getModalData.rate_card_data_array != '' && getModalData.rate_card_data_array != null && getModalData.rate_card_data_array != undefined && rateChartModalVariables.baseRateChartFetched == false) ? getModalData.rate_card_data_array
                                        [0] : ''); rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false; rateChartModalVariables.rateType = 'Select Rate Type';" v-model="rateChartModalVariables.rtoAddCheckbox" :binary="true" />
                                    </div>
                                </td>
                                <td class="data-second-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_a_rto_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_b_rto_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_c_rto_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_d_rto_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_e_rto_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_f_rto_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                            </tr>
                            <tr class="tr"
                                v-show="((rateChartModalVariables.logistic != 'Ekart') && (rateChartModalVariables.logistic != 'BlueDart'))">
                                <td class="data-first-child">
                                    RTO FSC (%)
                                    <div class="sublabel-checkbox-parent">
                                        <span class="sublabel">Same for all Zones</span>
                                        <CheckboxView @change="checkBoxHandler(7, (getModalData.rate_card_data_array != '' && getModalData.rate_card_data_array != null && getModalData.rate_card_data_array != undefined && rateChartModalVariables.baseRateChartFetched == false) ? getModalData.rate_card_data_array
                                        [0] : ''); rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false; rateChartModalVariables.rateType = 'Select Rate Type';" v-model="rateChartModalVariables.rtoFscCheckbox" :binary="true" />
                                    </div>
                                </td>
                                <td class="data-second-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_a_rto_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_b_rto_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_c_rto_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_d_rto_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_e_rto_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_f_rto_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-show="rateChartModalVariables.rateTypeZoneWise == 'FR'" class="rate-type-zone-wise-parent">
                    <div class="block md:flex items-center justify-start">
                        <div class="fwd">
                            <label class="modal-label">COD</label>
                            <input v-model="rateChartModalVariables.modalData.cod_flat_rate_value" @keypress="isNumber($event); rateChartModalVariables.bothFlatRatesValuesRequiredText = false;" @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'" class="input w-full md:w-12rem lg:w-15rem" type="text">
                        </div>
                        <div>
                            <label class="modal-label">COD Additional</label>
                            <input v-model="rateChartModalVariables.modalData.cod_flat_rate_add_value" @keypress="isNumber($event); rateChartModalVariables.bothFlatRatesValuesRequiredText = false;" @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'"
                            class="input w-full md:w-12rem lg:w-15rem" type="text">
                        </div>
                    </div>
                    <div class="block md:flex items-center justify-start">
                        <div class="fwd">
                            <label class="modal-label">Prepaid</label>
                            <input v-model="rateChartModalVariables.modalData.prepaid_flat_rate_value" @keypress="isNumber($event); rateChartModalVariables.bothFlatRatesValuesRequiredText = false;" @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'" class="input w-full md:w-12rem lg:w-15rem" type="text">
                        </div>
                        <div>
                            <label class="modal-label">Prepaid Additional</label>
                            <input v-model="rateChartModalVariables.modalData.prepaid_flat_rate_add_value" @keypress="isNumber($event); rateChartModalVariables.bothFlatRatesValuesRequiredText = false;" @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'"
                            class="input w-full md:w-12rem lg:w-15rem" type="text">
                        </div>
                    </div>
                </div>

                <!-- Ecom Express Table -->
                <div v-show="((rateChartModalVariables.logistic == 'Ecom Express') && (rateChartModalVariables.rateTypeZoneWise == 'ZW')) && (rateChartModalVariables.logistic == 'Ecom Express')"
                    class="edit-table-ecom-express pt-4">
                    <table class="table">
                        <thead class="thead">
                            <tr>
                                <th class="first-child">
                                    <div class="input-switch-container">
                                        <div class="table-title">
                                            ZONE
                                        </div>
                                    </div>
                                </th>
                                <th class="sec-child">A</th>
                                <th>B</th>
                                <th>C</th>
                                <th>D</th>
                                <th>E</th>
                                <th class="last-child">F</th>
                            </tr>
                        </thead>
                        <tbody class="tbody">
                            <tr class="tr">
                                <td class="data-first-child">
                                    FWD
                                </td>
                                <td class="data-second-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_a"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_b"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_c"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_d"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_e"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_f"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                            </tr>
                            <tr class="tr">
                                <td class="data-first-child">
                                    FWD Additional
                                    <div class="sublabel-checkbox-parent">
                                        <span class="sublabel">Same as FWD</span>
                                        <CheckboxView @change="checkBoxHandler(1, (getModalData.rate_card_data_array != '' && getModalData.rate_card_data_array != null && getModalData.rate_card_data_array != undefined && rateChartModalVariables.baseRateChartFetched == false) ? getModalData.rate_card_data_array
                                        [0] : ''); rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false; rateChartModalVariables.rateType = 'Select Rate Type';" v-model="rateChartModalVariables.fwdAddCheckbox" :binary="true" />
                                    </div>
                                </td>
                                <td class="data-second-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_a_fwd_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_b_fwd_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_c_fwd_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_d_fwd_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_e_fwd_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_f_fwd_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                            </tr>
                            <tr class="tr"
                                v-show="(getVendor.id) || ((getActiveLogistics.value.logistic_name != 'Ekart') && (getActiveLogistics.value.logistic_name != 'BlueDart'))">
                                <td class="data-first-child">
                                    FWD FSC
                                    <div class="sublabel-checkbox-parent">
                                        <span class="sublabel">Same for all Zones</span>
                                        <CheckboxView @change="checkBoxHandler(2, (getModalData.rate_card_data_array != '' && getModalData.rate_card_data_array != null && getModalData.rate_card_data_array != undefined && rateChartModalVariables.baseRateChartFetched == false) ? getModalData.rate_card_data_array
                                        [0] : ''); rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false; rateChartModalVariables.rateType = 'Select Rate Type';" v-model="rateChartModalVariables.fwdFscCheckbox" :binary="true" />
                                    </div>
                                </td>
                                <td class="data-second-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_a_fwd_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_b_fwd_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_c_fwd_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_d_fwd_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_e_fwd_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_f_fwd_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                            </tr>
                            <tr class="tr">
                                <td class="data-first-child">
                                    COD
                                    <div class="sublabel-checkbox-parent">
                                        <span class="sublabel">Same for all Zones</span>
                                        <CheckboxView @change="checkBoxHandler(3, (getModalData.rate_card_data_array != '' && getModalData.rate_card_data_array != null && getModalData.rate_card_data_array != undefined && rateChartModalVariables.baseRateChartFetched == false) ? getModalData.rate_card_data_array
                                        [0] : ''); rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false; rateChartModalVariables.rateType = 'Select Rate Type';" v-model="rateChartModalVariables.codCheckbox" :binary="true" />
                                    </div>
                                </td>
                                <td class="data-second-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_a_cod"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_b_cod"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_c_cod"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_d_cod"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_e_cod"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_f_cod"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                            </tr>
                            <tr class="tr">
                                <td class="data-first-child">
                                    COD (%)
                                    <div class="sublabel-checkbox-parent">
                                        <span class="sublabel">Same for all Zones</span>
                                        <CheckboxView @change="checkBoxHandler(4, (getModalData.rate_card_data_array != '' && getModalData.rate_card_data_array != null && getModalData.rate_card_data_array != undefined && rateChartModalVariables.baseRateChartFetched == false) ? getModalData.rate_card_data_array
                                        [0] : ''); rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false; rateChartModalVariables.rateType = 'Select Rate Type'" v-model="rateChartModalVariables.codPerCheckbox" :binary="true" />
                                    </div>
                                </td>
                                <td class="data-second-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_a_cod_per"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_b_cod_per"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_c_cod_per"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_d_cod_per"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_e_cod_per"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_f_cod_per"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                            </tr>
                            <tr class="tr">
                                <td class="data-first-child">
                                    RTO
                                    <div class="sublabel-checkbox-parent">
                                        <span class="sublabel">Same for all Zones</span>
                                        <CheckboxView @change="checkBoxHandler(5, (getModalData.rate_card_data_array != '' && getModalData.rate_card_data_array != null && getModalData.rate_card_data_array != undefined && rateChartModalVariables.baseRateChartFetched == false) ? getModalData.rate_card_data_array
                                        [0] : ''); rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false; rateChartModalVariables.rateType = 'Select Rate Type'" v-model="rateChartModalVariables.rtoCheckbox" :binary="true" />
                                    </div>
                                </td>
                                <td class="data-second-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_a_rto"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_b_rto"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_c_rto"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_d_rto"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_e_rto"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_f_rto"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                            </tr>
                            <tr class="tr">
                                <td class="data-first-child">
                                    RTO Additional
                                    <div class="sublabel-checkbox-parent">
                                        <span class="sublabel">Same for all Zones</span>
                                        <CheckboxView @change="checkBoxHandler(6, (getModalData.rate_card_data_array != '' && getModalData.rate_card_data_array != null && getModalData.rate_card_data_array != undefined && rateChartModalVariables.baseRateChartFetched == false) ? getModalData.rate_card_data_array
                                        [0] : ''); rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false; rateChartModalVariables.rateType = 'Select Rate Type';" v-model="rateChartModalVariables.rtoAddCheckbox" :binary="true" />
                                    </div>
                                </td>
                                <td class="data-second-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_a_rto_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_b_rto_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_c_rto_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_d_rto_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_e_rto_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_f_rto_add"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                            </tr>
                            <tr class="tr"
                                v-show="(getVendor.id) || ((getActiveLogistics.value.logistic_name != 'Ekart') && (getActiveLogistics.value.logistic_name != 'BlueDart'))">
                                <td class="data-first-child">
                                    RTO FSC (%)
                                    <div class="sublabel-checkbox-parent">
                                        <span class="sublabel">Same for all Zones</span>
                                        <CheckboxView @change="checkBoxHandler(7, (getModalData.rate_card_data_array != '' && getModalData.rate_card_data_array != null && getModalData.rate_card_data_array != undefined && rateChartModalVariables.baseRateChartFetched == false) ? getModalData.rate_card_data_array
                                        [0] : ''); rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false; rateChartModalVariables.rateType = 'Select Rate Type';" v-model="rateChartModalVariables.rtoFscCheckbox" :binary="true" />
                                    </div>
                                </td>
                                <td class="data-second-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_a_rto_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_b_rto_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_c_rto_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_d_rto_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_e_rto_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                                <td class="data-other-child">
                                    <input @input="rateChartModalVariables.allValuesRequiredText = false; rateChartModalVariables.allValuesRequiredTextEkartBluedart = false; rateChartModalVariables.allValuesRequiredTextEcom = false;" v-model="rateChartModalVariables.modalData.zone_f_rto_fsc"
                                        class="edit-value-input w-full md:2rem" type="text"  @keypress="isNumber($event)"
                                        @keyup.delete="rateChartModalVariables.rateType = 'Select Rate Type'"
                                        @paste="rateChartModalVariables.rateType = 'Select Rate Type'">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p v-show="(rateChartModalVariables.logistic != 'Ecom Express' && rateChartModalVariables.logistic != 'Ekart' && rateChartModalVariables.logistic != 'BlueDart') && rateChartModalVariables.rateTypeZoneWise == 'ZW'" class="mb-3 required-error-for-all">{{ rateChartModalVariables.allValuesRequiredText ? 'These all values are required.' : '' }}</p>
                <p v-show="(rateChartModalVariables.logistic == 'Ekart' || rateChartModalVariables.logistic == 'BlueDart') && rateChartModalVariables.rateTypeZoneWise == 'ZW'" class="mb-3 required-error-for-all">{{ rateChartModalVariables.allValuesRequiredTextEkartBluedart ? 'These all values are required.' : '' }}</p>
                <p v-show="rateChartModalVariables.logistic == 'Ecom Express' && rateChartModalVariables.rateTypeZoneWise == 'ZW'" class="mb-3 required-error-for-all">{{ rateChartModalVariables.allValuesRequiredTextEcom ? 'These all values are required.' : '' }}</p>
                <p v-show="rateChartModalVariables.rateTypeZoneWise == 'FR'" class="mb-3 required-error-for-all">{{ rateChartModalVariables.bothFlatRatesValuesRequiredText ? 'These values are required.' : '' }}</p>
            </div>
            <template #footer>
                <div class="actions-btns">
                    <button class="cancel-btn" @click="$emit('hideRateChartModal')" autofocus>Cancel</button>
                    <button class="submit-btn" :class="[isLoading ? 'disable-pointer-events' : '']" @click="submitData()" autofocus>
                        <div v-if="isLoading">
                            <i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i>
                        </div>
                    <div v-else>Submit</div>
                    </button>
                </div>
            </template>
        </DialogView>
</div>
<ToastView />
</template>

<style lang="scss">
@import './RateChartModal.scss';
 .rate-chart-parent-class {
    .p-dialog {
        margin:32px 0px !important;
        max-height: none !important;
        @media screen and (min-width: 769px) and (max-width: 1025px) {
            margin: auto 0 !important;
        }
    }
  .p-dialog-mask.p-component-overlay{
        align-items: flex-start !important;
  }
}
</style>