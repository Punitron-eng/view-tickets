<script setup lang="ts">
import MultiSelect from 'primevue/multiselect';
import Skeleton from 'primevue/skeleton';
import { ref, watch, computed } from 'vue';
import { RULEENGINE } from '../../../store/rule-engine/constants'; // import constants
import { useStore } from 'vuex';
const props = defineProps(['values', 'showData', 'id', 'defaultValue']);
const selectedZone = ref(props.defaultValue);
const showWarehouseDataStore = computed(() => store.getters[`${RULEENGINE.NAME}/warehousedata`]); // get channel api data from store
const zones = ref(props.values);
const store = useStore();

watch(zones.value, (newValue, oldValue) => {
    zones.value = newValue;
    // console.log('zone value updated :', zones.value);
});

watch(selectedZone, (newValue) => {
    // console.log('selected zone', newValue)
});

const emits = defineEmits(['change']);
// for zones
const dropdown = async () => {
    if(selectedZone.value.length !== 0){
        await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, false);
    }
    else{
        await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true);
    }
    emits('change', selectedZone.value);
};

// for pincodes
const pincodeDropdown = (val) => {
    emits('change', selectedZone);
};
</script>

<template>
    <div v-if="id == 3">
        <MultiSelect
            :appendTo="'self'"
            v-model="selectedZone"
            :options="zones"
            optionLabel="value"
            placeholder="Select Zone"
            optionValue="value"
            :maxSelectedLabels="3"
            :showToggleAll="false"
            class="rounded-[6px] dark:border-[#474747] h-[40px] w-[100%]"
            :autoOptionFocus="false"
            @change="dropdown"
        />
    </div>

    <div v-if="id == 6">
        <div v-if="showWarehouseDataStore">
            <MultiSelect
                :appendTo="'self'"
                v-model="selectedZone"
                :options="zones"
                filter
                filterMatchMode="contains"
                optionLabel="value"
                placeholder="Select Warehouse"
                :maxSelectedLabels="3"
                resetFilterOnHide
                optionValue="id"
                class="rounded-[6px] dark:border-[#474747] h-[40px] w-[100%]"
                :autoOptionFocus="false"
                @change="pincodeDropdown()"
            />
        </div>
        <div v-else>
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="40px" class="mb-2"></Skeleton>
        </div>
    </div>
</template>

<style lang="scss">
@import '../../../assets/itl-common-css/common-css.scss';

// Common styles
.p-component span {
    max-width: 310px !important;
    overflow: hidden;
    text-overflow: ellipsis !important;
    white-space: nowrap;
}

.p-multiselect-panel{
    max-width: 200px;
}
.p-checkbox-box {
    border-radius: 2px !important;

    @include theme() {
        background-color: theme-get('background') !important;
    }
}

.p-checkbox-icon {
    @include theme() {
        color: theme-get('black-900') !important;
    }
}

// Multiselect
.p-multiselect {
    background: transparent;
    position: relative;

    .p-multiselect-label {
        padding: 9px !important;
        height: 37px !important;
        font-size: 14px;
    }

    &:not(.p-disabled):hover,
    &:not(.p-disabled).p-focus {
        border-color: #dfe1e4;
    }

    &:not(.p-disabled).p-focus {
        box-shadow: 0 0 0 0 #dfe1e4;
    }
}

.p-multiselect-panel,
.p-multiselect-header {
    @include theme() {
        background-color: theme-get('background') !important;
    }
}

.lightTheme .p-multiselect-panel .p-multiselect-items .p-multiselect-item:not(.p-highlight):not(.p-disabled):hover {
    background: #dfe3e6 !important;
}

.darkTheme .p-multiselect-panel .p-multiselect-items .p-multiselect-item:not(.p-highlight):not(.p-disabled):hover {
    background: #6d6d6d !important;
}
.p-multiselect-panel .p-multiselect-items .p-multiselect-item,
.p-multiselect-panel .p-component span {
    &.p-highlight {
        background: none;
    }
}

.p-multiselect-panel .p-multiselect-items .p-multiselect-item.p-highlight.p-focus {
    background: none !important;
}

// Checkbox
.p-checkbox-box.p-highlight {
    border-color: #0052cc !important;
    background: #0052cc !important;

    &:hover {
        border-color: #0052cc !important;
        background: #0052cc !important;
    }
}

.p-checkbox:not(.p-checkbox-disabled) {
    & .p-checkbox-box.p-highlight:hover,
    & .p-checkbox-box:hover {
        border-color: #0052cc !important;
    }

    & .p-checkbox-box:focus {
        box-shadow: none !important;

        @include theme() {
            border-color: theme-get('border-black-600') !important;
        }
    }
}

.p-checkbox .p-checkbox-box .p-checkbox-icon.p-icon {
    width: 13px;
    height: 12px;
    color: #ffffff !important;
}

.p-checkbox .p-checkbox-box {
    height: 16px;
    width: 16px;
    margin-top: 3px;
}

.p-multiselect-panel .p-multiselect-header .p-multiselect-filter-container {
    .p-inputtext {
        padding-left: 30px !important;
        border-radius: 6px;
    }
    .p-multiselect-filter-icon {
        width: 20px;
        top: 19px;
        left: 5px;
    }
}
.p-multiselect-panel .p-multiselect-header .p-multiselect-close:enabled:hover{
    background: transparent;
}
</style>
