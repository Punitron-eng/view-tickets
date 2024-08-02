<template>
    <div class="main-card w-[52vw] px-[8px] my-[8px] md:px-0 md:mt-[32px] md:mb-[16px]">
        <Panel toggleable v-for="(item, index) in data" :key="index" class="mb-[16px]" :collapsed="collapsedStates[index]" @toggle="onToggle(index)">
            <template #header>
                <div class="text-[#1d252b] font-semibold">{{ item.title }}</div>
            </template>
            <template #togglericon>
                <div class="text-[#1279ff] flex items-center gap-2">
                    <div>{{ collapsedStates[index] ? 'View Details' : 'Hide Details' }}</div>
                    <span class="pi" :class="collapsedStates[index] ? 'pi-angle-down' : 'pi-angle-up'" />
                </div>
            </template>
            <AttemptHistorySmallCard :processData="item.processData" />
        </Panel>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import AttemptHistorySmallCard from './AttemptHistorySmallCard.vue';

const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
});

const data = props.data;
console.log(data, 'data');
const collapsedStates = ref(data.map((_, index) => index >= 1));

const onToggle = (index) => {
    collapsedStates.value[index] = !collapsedStates.value[index];
};
</script>

<style>
.p-panel-icons {
    width: fit-content;
}
.p-panel .p-panel-header .p-panel-header-icon {
    width: fit-content;
    border-radius: 0px;
}
.p-panel .p-panel-header .p-panel-header-icon:enabled:hover {
    background: transparent;
}
.p-panel .p-panel-header .p-panel-header-icon:focus {
    box-shadow: none;
}
.p-panel .p-panel-header {
    border-radius: 4px;
    background-color: #ffffff;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #f1f3f5;
}
.p-panel .p-panel-content:last-child {
    border-radius: 4px;
    border: none;
}
.main-card {
    @media (min-width: 320px) and (max-width: 1024px) {
        width: 100%;
    }
}
</style>
