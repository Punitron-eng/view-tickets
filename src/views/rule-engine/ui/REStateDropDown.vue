<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseDropdown from '../../../components/base/BaseDropdown.vue';
import Skeleton from 'primevue/skeleton';
import { useStore } from 'vuex';
import { RULEENGINE } from '../../../store/rule-engine/constants'; // import constants
const store = useStore();
const props = defineProps(['id', 'vendorData', 'defaultValue', 'lengthVal', 'index']);
const emits = defineEmits(['handleDelete', 'stateCityDropdown']);
const stateApiData = computed(() => store.getters[`${RULEENGINE.NAME}/stateapidata`]); // get state api data from store
const cityApiData = computed(() => store.getters[`${RULEENGINE.NAME}/cityapidata`]); // get city api data from store
const showStateCityContent = computed(() => store.getters[`${RULEENGINE.NAME}/showstatecitydata`]); // get showStateCity data from store

// dropdown selected value
const selectedValues = ref({
    inputFromValue: '',
    inputToValue: '',
});

const deleteState = () => {
    emits('handleDelete');
};

const dropdownValue = async (val) => {
    if(selectedValues.value.inputFromValue && selectedValues.value.inputToValue){
        await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, false); // enabled dropdown
    }
    else{
        await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true); // disabled dropdown
    }
    emits('stateCityDropdown', selectedValues.value); //emit the selected values
};


</script>

<template>
    <div v-if="showStateCityContent"
        class="flex flex-col md:flex-row gap-[16px] w-[100%] lg:items-center relative pt-[16px] md:pt-[0px]">
        <div>
            <label class="block font-medium mb-[8px] text-[13px] text-[#374151] font-inter dark:text-[#dfdfdf]">From
            </label>

            <BaseDropdown @listenDropdownChange="(val: any) => selectedValues.inputFromValue = val" :filter="true"
                :placeholder="'Select Value'" :options="id == 5 ? stateApiData?.from_data : cityApiData?.from_data"
                :defaultValue="props.defaultValue ? defaultValue[props.index]?.from?.id : null"
                :virtualScrollerOptions="{ itemSize: 12 }" twClasses="w-[80%] lg:w-[248px]"
                class="state-dropdown bg-[#ffffff] border-[#d1d5db] dark:bg-[#4d4d4d] dark:border-[#474747] md:w-[248px] h-[40px] rounded-[6px]"
                @change="dropdownValue" />
        </div>
        <div>
            <label
                class="block font-medium mb-[8px] text-[13px] text-[#374151] font-inter dark:text-[#dfdfdf]">To</label>
            <BaseDropdown @listenDropdownChange="(val: any) => selectedValues.inputToValue = val" :filter="true"
                :placeholder="'Select Value'" :options="id == 5 ? stateApiData?.to_data : cityApiData?.to_data"
                :defaultValue="props.defaultValue ? defaultValue[props.index]?.to?.id : null"
                :virtualScrollerOptions="{ itemSize: 38 }" twClasses="w-[80%] lg:w-[248px]"
                class="state-dropdown bg-[#ffffff] border-[#d1d5db] dark:bg-[#4d4d4d] dark:border-[#474747] md:w-[248px] h-[40px] rounded-[6px]"
                @change="dropdownValue" />
        </div>
        <div v-if="props.lengthVal"
            class="w-[40px] h-[40px] bg-[#f3f4f6] flex items-center justify-center mt-[27px] md:static absolute bottom-[0px] right-[-2px] dark:bg-[#474747] cursor-pointer"
            @click="deleteState">
            <div class="w-[14px] h-[2px] bg-[#6b7280] dark:bg-white"></div>
        </div>
    </div>

    <div v-else class="flex flex-col md:flex-row gap-[16px] w-[100%] lg:items-center relative pt-[16px] md:pt-[0px]">
        <div>
            <Skeleton width="2rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem" width="248px" class="mb-2 md:w-[248px] h-[40px] rounded-[6px] w-[80%] lg:w-[248px]">
            </Skeleton>
        </div>
        <div>
            <Skeleton width="2rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem" width="248px" class="mb-2 md:w-[248px] h-[40px] rounded-[6px] w-[80%] lg:w-[248px]">
            </Skeleton>
        </div>
    </div>
</template>

<style lang="scss">
.state-dropdown .p-dropdown-panel .p-dropdown-header .p-dropdown-filter-icon {
    background: url('../../../assets/images/store-order-search.svg');
    width: 16px;
    height: 16px;
    position: absolute;
    left: 8px;
    background-repeat: no-repeat;
}
.state-dropdown .p-dropdown-panel .p-dropdown-header .p-dropdown-filter-icon g {
    display: none;
}

.state-dropdown .p-dropdown-header .p-dropdown-filter-container input {
    padding-left: 30px !important;
}
</style>
