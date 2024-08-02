<script setup>
import InputSwitch from 'primevue/inputswitch';
import { ref, defineProps, computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
import { DARKMODE } from '@/store/dark-mode/constants';
// import { dataTableVariables as commonVariables } from './commonVariable';
// import * as dataTableFunc from './commonFunctions';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const props = defineProps(['columns', 'size', 'toggleFreezSelectedColumn', 'hideAndShowColumn', 'tempHeaderLoad']);
const overlay = ref(null);
// const resetToDefault = async () => {
//     // commonVariables.value.tempDataTableColumns
//     const temp = commonVariables.value.tempDataTableColumns.map((col) => `${col.field}::${col.width}::${col.isColumnFixed ? 1 : 0}::${col.isVisible ? 1 : 0}::${col.frozenPosition}`);
//     const data = {
//         newColumns: temp,
//     };
//     await dataTableFunc.editedColumnsPayload(data);
//     await dataTableFunc.getColumnData(commonVariables.value.saveFilterID);
// };
</script>
<template>
    <div class="customized-column">
        <div class="customized-column-outer" @click="overlay.toggle($event)">
            <img v-if="!darkModeVal" src="../../../assets/images/customize-column-icon.svg" />
            <img v-else src="../../../assets/images/dark-mode/dark-customize-column-icon.svg" />
            <span>Column</span>
        </div>
        <OverlayPanel ref="overlay" class="customized-column">
            <div class="customise-dropdown-header">Customized Columns</div>
            <div class="customise-column-divs">
                <div class="md:col-12 p-0">
                    <div class="select-columns">
                        <div v-if="props.tempHeaderLoad" class="gridfields">
                            <div v-for="(column, index) in props.columns" :key="index" class="field-checkbox">
                                <SkeletonView width="100px" />
                                <SkeletonView width="20px" class="ml-auto mr-[8px]" />
                                <SkeletonView width="20px" />
                            </div>
                        </div>
                        <div v-else class="gridfields">
                            <div v-for="(column, index) in props.columns" :key="index" class="field-checkbox">
                                <label :for="column.field" class="pointer">{{ column.header }}</label>
                                <InputSwitch :inputId="column.field" v-model="column.isVisible" @click="props.hideAndShowColumn(column)" :disabled="props.size === 4 && column.isVisible == true ? true : false" />
                                <div class="pin-column" :class="!column.isColumnFixed && !column.isVisible ? 'not-allowed' : ''">
                                    <img v-if="!column.isColumnFixed" src="@/assets/images/pin.svg" alt="pin-svg" @click="props.toggleFreezSelectedColumn(column)" :class="!column.isVisible ? 'cursor-NA' : ''" />
                                    <img v-else src="@/assets/images/active-pin.svg" alt="pin-svg" @click="props.toggleFreezSelectedColumn(column)" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </OverlayPanel>
    </div>
</template>
