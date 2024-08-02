<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import getImg from '../../../util/getImg';
import { useStore } from 'vuex';
import { DARKMODE } from '../../../store/dark-mode/constants';
import { RULEENGINE } from '../../../store/rule-engine/constants'; // import constants
import { useRoute } from 'vue-router';
import { checkUserType } from '../../../util/commonHandlers';
const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const dropdownDataComputed = computed(() => store.getters[`${RULEENGINE.NAME}/dropdowndata`]); // dropdownData from store
const cloneData = computed(() => store.getters[`${RULEENGINE.NAME}/showCloneData`]); // get clone data from store
const selectedVendorData = computed(() => store.getters[`${RULEENGINE.NAME}/showVendorID`]); // ruleListData from store
const route = useRoute();
const dropdownData = ref(route.params.id ? cloneData.value[0]?.rule : dropdownDataComputed);
const emits = defineEmits(['handleSideContent']);
const props = defineProps<{
    showContent: String;
}>();
const showSideContent = () => {
    emits('handleSideContent');
};
watchEffect(() => {
    dropdownData.value = route.params.id ? cloneData?.value[0]?.rule : dropdownDataComputed.value || dropdownDataComputed.value;
    if (cloneData?.value.length == 0) {
        dropdownData.value = dropdownDataComputed.value
    }
});

const format = (value, conditionId) => {
    if (conditionId == 1) {
        const start_time = value.fromValue?.hours > 12 ? value.fromValue?.hours - 12 : value.fromValue?.hours
        const start_minutes = value.fromValue?.minutes < 10 ? '0' + value.fromValue?.minutes : value.fromValue?.minutes;
        const end_time = value.toValue?.hours > 12 ? value.toValue?.hours - 12 : value.toValue?.hours
        const end_minutes = value.toValue?.minutes < 10 ? '0' + value.toValue?.minutes : value.toValue?.minutes;

         return (value.fromValue ? (`${start_time < 9 ? '0'+start_time : start_time}:${start_minutes} ${value.fromValue.hours >= 12 ? 'PM' : 'AM'} to `) : '') + (value.toValue ? (`${end_time < 9 ? '0'+end_time : end_time}:${end_minutes} ${value.toValue.hours >= 12 ? 'PM' : 'AM'}`) : '');
    }
    else {
        const formattedHours = value.hours > 12 ? value.hours - 12 : value.hours;
        const formattedMinutes = value.minutes < 10 ? '0' + value.minutes : value.minutes;
        return ` ${formattedHours}:${formattedMinutes} ${value.hours >= 12 ? 'PM' : 'AM'}`;
    }
}


const renderData = (data) => {
    if (data.id == 10 && data.inputValue) {
        // channel and store
        const channel = data.inputValue.channel ? `Channel : ${data.inputValue.channel.value}` : '';
        const store = data.inputValue.store ? `, Store : ${data.inputValue.store.value}` : '';
        return channel + store;
    } else if (data.id == 2 && data.inputValue) {
        // weight

        const range1 = data.inputValue.fromValue ? data.inputValue.fromValue + ' KG to ' : '';
        const range2 = data.inputValue.toValue ? data.inputValue.toValue + ' KG' : '';
        return data.condition.id === 1 ? range1 + range2 : data.inputValue ? data.inputValue + ' KG' : '';
    } else if (data.id == 4 && data.inputValue) {
        // order value

        const range1 = data.inputValue.fromValue ? '₹ ' + data.inputValue.fromValue + ' to ' : '';
        const range2 = data.inputValue.toValue ? '₹ ' + data.inputValue.toValue + ' ' : '';
        return data.condition.id === 1 ? range1 + range2 : data.inputValue ? '₹ ' + data.inputValue : '';
    } else if (data.id == 8 && data.inputValue) {
        // assigned time
        // const range1 = data.inputValue.fromValue ? data.inputValue.fromValue.hours + ' hours ' + data.inputValue.fromValue.minutes + ' minutes' : '';
        // const range2 = data.inputValue.toValue ? data.inputValue.toValue.hours + ' hours ' + data.inputValue.toValue.minutes + ' minutes' : '';
        // return data.condition.id === 1 ? range1 + ' to ' + range2 : data.inputValue ? data.inputValue.hours + ' hours ' + data.inputValue.minutes + ' minutes' : '';
        return format(data.inputValue, data.condition.id);
    } else if (data.id == 5 || data.id == 7) {
        //city and state
        return data.inputValue?.map((item) => `${item.from.value} to ${item.to.value}`).join(', ');
    } else if (data.id == 3) {
        //zones
        return route.params.id ? data.inputValue?.map((ele) => ele).join(',') : data.inputValue?.map((ele) => ele).join(',');
    } else {
        return data.inputValue && data.id == 9 ? (data.inputValue.fileName ? data.inputValue.fileName : data.inputValue) : data.inputValue?.value;
    }
};
</script>
<template>
    <Transition name="slide">
        <div v-if="props.showContent" class="side-content bg-[#fff] h-[100vh] md:max-w-[200px] fixed overflow-auto right-[0px] left-0 md:left-auto z-[20] dark:bg-[#313131] w-[100%]">
            <div class="flex justify-between items-center mb-[32px] relative">
                <h4 class="text-[11px] text-[#6b7280] tracking-[1px] leading-[1.45] dark:text-[#fff] font-[500]">PREVIEW</h4>
                <!-- showSide content function image  -->
                <img @click="showSideContent()" :src="getImg('close-icon', darkModeVal)" class="imgm-0 cursor-pointer xl:hidden absolute top-[-2px] right-0 w-[18px]" />
            </div>
            <!-- rules in sidecontent -->
            <div class="flex md:flex-col 2xl:flex-row justify-between mt-[16px]" v-for="data in dropdownData">
                <div v-if="selectedVendorData.length !==0 || checkUserType('vendor')" class="data w-[50%] md:w-[100%] text-[#374151] text-[14px] font-inter pr-[16px] dark:text-[#fff] capitalize">{{ data.value }}</div>
                <div v-if="selectedVendorData.length !==0 || checkUserType('vendor')" class="data w-[50%] md:w-[100%] text-[#374151] text-[14px] dark:text-[#fff] capitalize">
                    <span class="capitalize value">{{ data.condition?.value || '' }}{{` `}}</span>
                    <div v-if="data.id == 6">
                        <span v-if="data.inputValue?.pickup_from && data.inputValue?.pickup_from.length !== 0" v-tooltip.top="'Warehouse-ID : ' + data.inputValue?.pickup_from?.map((pickup) => pickup).join(', ')" class="text-[#0052cc] dark:text-[#64a4ed] cursor-pointer">View</span>
                        <div v-if="data.inputValue?.fileName">File Upload : {{ data.inputValue.fileName?.fileName ? data.inputValue.fileName?.fileName : data.inputValue.fileName }}</div>
                    </div>
                    <div v-if="data.id !== 6" class="break-words inline">{{ renderData(data) }}</div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style lang="scss">
.side-content {
    padding: 25px 25px 80px;
    @media (min-width: 1441px) {
        max-width: 338px;
    }
    .data{
        @media (min-width: 1536px) {
            width: 50%;
        } 
    }
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.7s ease-in;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}

.slide-enter-to,
.slide-leave {
    transform: translateX(0);
}
</style>
