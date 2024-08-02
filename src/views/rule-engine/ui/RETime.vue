<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from 'vue';
import TimePicker from '../../../components/itl-common-features/TimePicker.vue';
import { useStore } from 'vuex';
import { RULEENGINE } from '../../../store/rule-engine/constants'; // import constants
const selectedSlot = ref<number | null>(null);
const props = defineProps(['defaultValue'])
const emits = defineEmits(['inputChange']);
const clearTimefunc = ref(null)
const store = useStore();


const timeSlotValue = async (val) => {
    selectedSlot.value = val;
    if(selectedSlot.value){
        await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, false); // enabled dropdown
    }
    else{
        await store.dispatch(`${RULEENGINE.NAME}/getdisableddropdown`, true); // disabled dropdown
    }
    emits('inputChange', selectedSlot.value);
};

watchEffect(() => {
    if (props.defaultValue) {
        selectedSlot.value = props.defaultValue;
    } else {
        clearTimefunc?.value?.clearTime() || null
        selectedSlot.value = null
    }
});

</script>

<template>
    <div class="flex flex-wrap gap-3">
        <div class="flex-auto">
            <label for="selectedSlot" class="block mb-[8px] dark:text-[#dfdfdf]">Selected Time</label>
            <TimePicker @getTime="(e) => timeSlotValue(e)" :defaultValue="props.defaultValue" ref="clearTimefunc" />
        </div>
    </div>
</template>

<style lang="scss"></style>
