<script setup lang="ts">
import { useStore } from 'vuex';
import filterModal from './filterModal.vue';
import ViewSaveFilter from './ViewSaveFilter.vue';
import SelectCourierModal from './SelectCourierModal.vue';
import SaveUpdateFilterModal from './SaveUpdateFilterModal.vue';
import { onBeforeMount, ref, defineEmits, computed, watch, inject } from 'vue';

const updateExistingFilterModal = ref<boolean>(false);
const selectCourierModal = ref<boolean>(false);
const visibleObj = ref();
const store = useStore();
const storeName: any = inject('storeName');
const emit = defineEmits(['filterModalValue', 'deleteSaveFilters', 'saveNewFilter', 'updateFilterFunc', 'clearOneFilter', 'applyselectedFilter']);
const props = defineProps(['storeName']);
const modalValue = computed(() => store.getters[`${storeName.NAME}/getOpenModal`]);
watch(modalValue.value, (updateModalValue) => {
    visibleObj.value = updateModalValue;
});
onBeforeMount(() => {
    const res = store.getters[`${storeName.NAME}/getOpenModal`];
    visibleObj.value = res;
});
const filterModalValue = (data: string[]) => {
    emit('filterModalValue', data);
};
const deleteSaveFilter = (data: string | number) => {
    emit('deleteSaveFilters', data);
};
const tempSaveNewFilter = (updateType: any) => {
    emit('updateFilterFunc', updateType);
};
const singfilterModal = (data: any) => {
    emit('clearOneFilter', data);
};
const applyfilterview = (data: any, index: any) => {
    emit('applyselectedFilter', data, index);
};
</script>

<template>
    <DialogView id="filter-modal" :draggable="false" v-model:visible="visibleObj.filterModal" modal dismissableMask class="w-screen h-screen md:max-w-[98vw] md:h-[98vh]" :breakpoints="{ '1199px': '75vw', '767px': '100vw' }">
        <filterModal @filterModalValue="filterModalValue" @singlefilterDelete="singfilterModal" />
    </DialogView>
    <!--view save filter modal start-->
    <DialogView id="view-save-filter-modal" :draggable="false" :dismissableMask="true" v-model:visible="visibleObj.viewSaveFilterModal" modal header="Filters">
        <template #header>
            <div class="">
                <div>
                    <p class="header">Filters</p>
                </div>
            </div>
        </template>
        <ViewSaveFilter @deleteSaveFilter="deleteSaveFilter" @updatefilterfunData="tempSaveNewFilter" @applySaveFilter="applyfilterview" />
    </DialogView>
    <!--view save filter modal end-->
    <DialogView id="update-modal" :draggable="false" :dismissableMask="true" v-model:visible="visibleObj.saveUpdateModal" modal header="">
        <SaveUpdateFilterModal typeOfModal="UpdateModal" :showSaveUpdateFilterModal="updateExistingFilterModal" @closeModal="updateExistingFilterModal = false" />
    </DialogView>
    <!-- Update Existing Modal closes here -->

    <SelectCourierModal v-if="selectCourierModal" :show-modal="selectCourierModal" @close-modal="selectCourierModal = false" />
</template>

<style lang="scss"></style>
