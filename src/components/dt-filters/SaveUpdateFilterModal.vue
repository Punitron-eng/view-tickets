<script setup lang="ts">
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useEmitter } from '@nguyenshort/vue3-mitt';
import SaveUpdateFilterContent from './component/SaveUpdateFilterContent.vue';
import { ref, defineProps, onMounted, onBeforeMount, defineEmits, computed, onUnmounted, watch, inject } from 'vue';
import { dataTableVariables as dataVariable } from '../../components/itl-dataTable-files/itl-dataTable/commonVariable';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import { objectEntries } from '@vueuse/core';
import cloneDeep from 'lodash/cloneDeep';
const store = useStore();
const route = useRoute();
const toast = useToast();
const storeName: any = inject('storeName');
const props = defineProps({
    typeOfModal: { type: String, required: true },
    showSaveUpdateFilterModal: { type: Boolean, required: true },
    propsData: { type: Object, required: false },
    updatedFrom: { type: Boolean, required: true },
});

const FilterArr = ref<any>({});
const inputValue = ref('');
const UpdateFilterType = ref(false);
const routerId = ref(route.params.id);
const emits = defineEmits(['closeModal', 'saveNewFilter', 'updatefilterfunData']);
const emitter = useEmitter();
onBeforeMount(() => {
    UpdateFilterType.value = props?.propsData?.updateFilterCheck || false;
    if (props.typeOfModal != 'SaveModal') {
        const savedFilteredList = computed(() => store.getters[`${storeName.NAME}/savedFilteredList`]);
        setTimeout(() => {
            checkFilterName(savedFilteredList);
        }, 10);
    }
    FilterArr.value = cloneDeep(props?.propsData?.filters);
    // FilterArr.value = { ...props?.propsData?.filters };
});
watch(
    () => dataVariable.value.apiResponse,
    (newVal) => {
        if (newVal.status == 'success') {
            closeModal();
        }
    }
);

const filterData = computed(() => store.getters[`${storeName.NAME}/getMappedFilterValue`]);
watch(
    () => filterData.value,
    (newVal) => {
        if (props.typeOfModal == 'SaveModal') {
            for (const keys in newVal) {
                if (newVal[keys] === '') {
                    delete newVal[keys];
                }
            }

            FilterArr.value = newVal;
        }
    }
);
const checkFilterName = (filterList: any) => {
    try {
        if (UpdateFilterType.value != undefined) {
            if (UpdateFilterType.value) {
                inputValue.value = props?.propsData?.name || '';
            } else {
                const activeFilterList = filterList.value.saveFilterView.filter((res: any) => res.id == routerId.value);
                inputValue.value = activeFilterList[0].filter_name;
            }
        }
    } catch (error) {
        console.log(error.message);
    }
};
const showModal = ref(props.showSaveUpdateFilterModal);
const closeModal = () => {
    emits('closeModal');
    showModal.value = false;
};
const saveAppliedFilters = (updateType: any) => {
    if (inputValue.value !== '') {
        if (!Object.keys(FilterArr.value).length || (Object.keys(FilterArr.value).length === 1 && Object.keys(FilterArr.value).includes('vendor_name'))) {
            toast.add({ severity: 'error', detail: 'Please add at least one filter', life: 3000 });
            return;
        } else {
            let data = {
                isUpdate: false,
                filterName: inputValue.value,
                filterArr: FilterArr.value,
            };
            emits('saveNewFilter', data);
        }
    } else {
        toast.add({ severity: 'error', detail: 'Please Add Filter Name', life: 3000 });
    }
};
const removeFilterByIndex = (key: any) => {
    delete FilterArr.value[key];
    store.commit(`${storeName.NAME}/clearfilterbyfield`, key);
};
const removeGroupFilter = (data: any) => {
    delete FilterArr.value[data.field][data.objectKey];
    store.commit(`${storeName.NAME}/clearGroupFilter`, data);
};
const UpdateFilter = () => {
    if (inputValue.value != '') {
        const data = {
            filterArr: FilterArr.value,
            filterName: inputValue.value,
            isUpdate: true,
            filterId: FilterArr.value?.id,
            updatedFrom: props.updatedFrom,
            is_pinned: FilterArr.value.is_pinned,
        };
        const checkEmptyFilter = [];

        for (const key in FilterArr.value) {
            if (key != 'id' && key != 'name' && key != 'is_pinned' && key != '') {
                checkEmptyFilter.push(key);
            }
        }
        if (checkEmptyFilter.length > 0) {
            if (Object.keys(data.filterArr).length > 3) {
                if (dataVariable.value.router.currentRoute.path.includes('tickets')) {
                    store.commit(`${storeName.NAME}/clearTicketDepartmentId`, '');
                    dataTableFncs.getColumnData(dataVariable.value.saveFilterID);
                }
                emitter.emit('updateFilterData', data);
                store.commit(`${storeName.NAME}/setOpenModalFalse`, 'saveUpdateModal');
                closeModal();
            } else {
                toast.add({ severity: 'error', detail: 'Please Select atleast 1 Filter', life: 3000 });
            }
        } else {
            toast.add({ severity: 'error', detail: 'Please Select atleast 1 Filter', life: 3000 });
        }
    } else {
        toast.add({ severity: 'error', detail: 'Please Add Filter Name', life: 3000 });
    }
};

const updateFilterData = (data: any) => {
    console.log('updateFilterData', data);
};
defineExpose({ updateFilterData });
</script>
<template>
    <DialogView
        id="save-update-filter-modal"
        :draggable="false"
        :dismissableMask="true"
        v-model:visible="showModal"
        @update:visible="(e: boolean) => { !e ? $emit('closeModal') : '' }"
        modal
        header="Save Filter"
        class="w-[400px] save-filter-modal-parent"
    >
        <template #header>
            <div>
                <p class="header">{{ props.typeOfModal == 'SaveModal' ? 'Save Filter' : 'Update existing' }}</p>
            </div>
        </template>
        <div>
            <SaveUpdateFilterContent v-model.trim="inputValue" :type-of-modal="props.typeOfModal" :updateFilterType="UpdateFilterType" :FilterArr="FilterArr" @removeSingleFilter="removeFilterByIndex" @remove-group-filter="removeGroupFilter" />
        </div>
        <template #footer>
            <div class="action-btns">
                <button class="action-btn close-btn-modal-footer" @click="closeModal()">Close</button>
                <button v-if="UpdateFilterType" class="action-btn save-btn-modal-footer view-save-filter" @click="UpdateFilter()">Update</button>
                <button v-else class="action-btn save-btn-modal-footer" @click="saveAppliedFilters(props.typeOfModal == 'SaveModal' ? 'add' : 'edit')">Save</button>
            </div>
        </template>
    </DialogView>
</template>
<style lang="scss">
@import './saveUpdateFilterModal.scss';
</style>
