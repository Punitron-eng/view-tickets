<script setup lang="ts">
import { computed, ref, onMounted, watch, onUnmounted } from 'vue';
import getImg from '../../../util/getImg';
import CircleProgress from 'vue3-circle-progress';
import draggable from 'vuedraggable';
import { useStore } from 'vuex';
import { DARKMODE } from '../../../store/dark-mode/constants';
import Skeleton from 'primevue/skeleton';
// import logisticData from '../logisticData';
import { getLogisticsData } from '../../../api/rule-engine/RuleEngineList';
import { checkUserType } from '../../../util/commonHandlers';
import { RULEENGINE } from '../../../store/rule-engine/constants'; // import constants
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const store = useStore();
const logisticData = computed(() => store.getters[`${RULEENGINE.NAME}/logisticsdata`]); // ruleLogisticsData from store
const list = ref(); // store api data
const isLoading = ref<boolean>(false);
const drag = ref<boolean>(false);
const dragOptions = computed(() => {
    return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
    };
});
const showSekeletons = [1, 2, 3, 4];
const props = defineProps<{
    activeBtn: {
        type: Array<any>;
        required: true;
    };
    vendorId: string
    // isLoading: boolean;
}>();

const emits = defineEmits(['handleToggleDropdown', 'handleChangesValue', 'handleChangeBtn', 'log', 'handleSideContent', 'sendNewValues']);

//handle toggle dropdown
const toggleDropdown = (index: number) => {
    emits('handleToggleDropdown', index);
};

const changesValue = (val: boolean, index: number) => {
    emits('handleChangesValue', val, index);
    console.log(val, 'val');
};

const changeBtn = (index: number) => {
    // console.log(index)
    emits('handleChangeBtn', index);
};

const dragchangesvalue = (e) => {
    console.log(logisticData.value, 'logistic data');
    emits('sendNewValues', e);
};

const showSideContent = () => {
    emits('handleSideContent');
};

const apiCall = async () => {
    console.log('api called');
    const payload = {
        vendor_id: !checkUserType('vendor') ? props.vendorId : '',
    };
    console.log(payload);
    isLoading.value = true;

    const res: any = await getLogisticsData(payload);
    if (res.status == 'success') {
        isLoading.value = false;
        await store.dispatch(`${RULEENGINE.NAME}/getlogisticsdata`, res.data); // action call
        const tempData = logisticData.value
        list.value = tempData;
        console.log(list.value, 'logisticData here');
        return list.value
    }
    else{
        isLoading.value = false;
    }
};

onMounted(async () => {
    isLoading.value = true;
    list.value = logisticData.value.length > 0 ? logisticData.value : await apiCall();
    // isLoading.value = logisticData.value.length == 0 ? true : false;
    console.log('on mounted and again mounted', logisticData?.value.length, logisticData?.value.length == 0)
    // console.log('on mounted and again api', apiCall())
});
onUnmounted(async () => {
    logisticData.value.splice(0);
    await store.dispatch(`${RULEENGINE.NAME}/getlogisticsdata`, logisticData.value);
})
</script>

<template>
    <!-- main content -->
    <div class="md:flex justify-between relative md:top-[0px] m-[0px] md:mx-[18px]" :class="checkUserType('vendor') ? 'top-[70px]' : 'top-[116px]'">
        <!-- main content container -->
        <div
            class="md:bg-[#fff] my-0 md:my-[24px] rounded-[12px] w-[100%] dark:bg-[#313131] dark:text-[#fff] z-[10] h-[fit-content]">
            <!-- Header -->
            <div class="md:flex justify-between pb-[24px] md:py-[24px] md:px-[24px] p-[16px] relative">
                <div class="md:w-[35%] flex items-center gap-2 justify-between mb-[9px] md:mb-0">
                    <div class="flex items-center">
                        <img :src="getImg('courier-priority')" alt="" />
                        <p class="text-[#1f2937] text-[16px] dark:text-[#fff] pl-[16px] font-inter">Select Courier
                            Priority</p>
                    </div>
                    <!-- <img :src="getImg('re-display-icon')" alt="" class="md:hidden cursor-pointer" @click="showSideContent" /> -->
                </div>
                <div class="md:w-[70%] flex gap-2 overflow-x-auto snap-end pb-[5px] md:pb-[0px]">
                    <div class="flex gap-2 h-[32px]" v-for="(element, index) in props.activeBtn"
                        :class="index == 0 ? 'ml-[auto]' : ''">
                        <button class="border-[1px] rounded-[50px] w-[111px] md:w-[100%] py-[4px] px-[18px]"
                            @click="changeBtn(index)"
                            :class="element.active ? 'border-[#00875a] bg-[#36b27e] text-[#fff]' : 'border-[#d1d5db] text-[#374151] bg-[#fff] dark:text-[#fff] dark:bg-[#4d4d4d] dark:border-[#474747]'">
                            {{ element.Label }}
                        </button>
                    </div>
                </div>
            </div>
            <!-- Header -->
            <!-- Table -->

            <!-- other than custom option -->
            <div v-if="props.activeBtn[3].active == false" class="flex flex-col items-center pb-[172px] px-[16px]">
                <div v-for="btn in props.activeBtn">
                    <img v-if="btn.Label == 'Best rated' && btn.active"
                        :src="getImg('re-recom-engine-best-rated', darkModeVal)" alt="selectedPriorityImage"
                        class="dark:rounded-[23px]" />
                    <img v-else-if="btn.Label == 'Cheapest' && btn.active"
                        :src="getImg('re-recom-engine-cheapest', darkModeVal)" alt="cheapest priority"
                        class="dark:rounded-[23px]" />
                    <img v-else-if="btn.Label == 'Fastest' && btn.active"
                        :src="getImg('re-recom-engine-fastest', darkModeVal)" class="dark:rounded-[23px]" />
                </div>
                <div class="text-[20px] text-[#1f2937] text-center pb-[16px] dark:text-[#fff]">Courier Priority</div>

                <!-- active button -->
                <div v-for="btn in props.activeBtn">
                    <div v-if="btn.active" class="text-center text-[#4b5563] text-[16px] dark:text-[#fff]">
                        You have selected <span class="text-[16px] text-[#0065ff] font-inter">{{ btn.Label }}</span>
                    </div>
                </div>
            </div>
            <!-- custom option -->
            <div v-else>
                <div
                    class="bg-[#f3f4f6] max-h-[48px] text-[12px] text-[#6b7280] hidden md:flex items-center py-[8px] px-[32px] dark:bg-[#4d4d4d] dark:text-[#fff]">
                    <div class="w-[50%]">Logistics</div>
                    <div class="flex w-[50%] gap-[7px] justify-between">
                        <div class="w-[20%]">Pickup <span class="block">Performance</span></div>
                        <div class="w-[20%]">Delivery <span class="block">Performance</span></div>
                        <div class="w-[20%]">NDR <span class="block">Remark</span></div>
                        <div class="w-[20%]">Weight<span class="block">Cases</span></div>
                    </div>
                </div>
                <!-- draggable content -->
                <div class="px-[16px] md:px-[0px]" v-if="!isLoading">
                    <draggable @start="drag = true" @end="drag = false" item-key="logistic_id" :list="list"
                        @change="dragchangesvalue" v-bind="dragOptions" v-if="list">
                        <template #item="{ element, index }">
                            <div v-if="logisticData.value?.length !== 0" class="hover:cursor-pointer block w-[auto] md:w-[100%] md:flex px-[16px] lg:pl-[32px] md:pr-[18px] py-[16px] items-center relative rounded-[12px] md:rounded-[0px] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] md:shadow-none bg-[#fff] mb-[8px] md:mt-[16px] md:my-0 md:mx-0 dark:bg-[#4d4d4d] dark:border-[#4d4d4d] dark:border-[1px]"
                                :key="index"> 
                                <div class="flex gap-4 items-center justify-between pr-[38px] w-[50%] ml-[12px]">
                                    <div class="flex gap-[12px]">
                                        <img :src="getImg('drag-icon')" alt=""
                                            class="absolute bottom-0 left-[50%] rotate-[90deg] md:rotate-[0px] md:static" />
                                        <!-- logo image -->
                                        <div class="relative">
                                            <!-- logo image -->
                                            <img :src="getImg(element.logistic_logo)" alt="Logo1" class="w-[24px]" />
                                            <!-- air surface image -->
                                            <img :src="getImg(element.air_surface, darkModeVal)"
                                                class="w-[14px] absolute bottom-[-3px] right-[-7px]" />
                                        </div>
                                        <p
                                            class="text-[14px] w-[126px] m-0 absolute md:static left-[60px] dark:text-[#fff]">
                                            {{ element.logistic_name }}</p>
                                    </div>
                                    <div class="flex gap-2 absolute right-[15px] md:static items-center">
                                        <img :src="getImg('rule-engine-star')" alt="" />
                                        <span class="text-[13px]"> {{ element.logistic_rating }}</span>

                                        <!-- dropdown buttons -->
                                        <button v-if="element.logistic_dropdown" @click="toggleDropdown(index)"
                                            class="block md:hidden">
                                            <img :src="getImg('re-downArrow', darkModeVal)" alt="Logo" />
                                        </button>
                                        <button v-else @click="toggleDropdown(index)">
                                            <img :src="getImg('re-downArrow', darkModeVal)" alt="Logo"
                                                class="rotate-180 block md:hidden" />
                                        </button>
                                    </div>
                                </div>
                                <hr />

                                <div class="relative flex h-[120px] md:h-auto md:w-[50%] gap-[22px] justify-between"
                                    v-if="element.logistic_dropdown">
                                    <div class="w-[20%] absolute top-[10px] left-[0px] md:static">
                                        <CircleProgress :percent="100 / element.logistic_pickup" :size="32"
                                            :border-width="2" :border-bg-width="2" :transition="2000"
                                            :show-percent="true" fill-color="#ff5230" empty-color="#e9ebef" />
                                        <span
                                            class="md:hidden absolute top-0 left-[45px] text-[11px] text-[#6b7280] font-inter dark:text-[#fff]">Pickup
                                            <span class="block">Performance</span></span>
                                    </div>
                                    <div class="w-[20%] absolute top-[10px] right-[51px] md:static">
                                        <CircleProgress :percent="100 / element.logistic_delivery" :size="32"
                                            :border-width="2" :border-bg-width="2" :transition="2000"
                                            :show-percent="true" fill-color="#ffab00" empty-color="#e9ebef" />
                                        <span
                                            class="md:hidden absolute top-0 left-[45px] text-[11px] text-[#6b7280] font-inter dark:text-[#fff]">NDR
                                            <span class="block">Remark</span></span>
                                    </div>
                                    <div class="w-[20%] absolute bottom-[15px] left-[0px] md:static">
                                        <CircleProgress :percent="100 / element.logistic_ndr" :size="32"
                                            :border-width="2" :border-bg-width="2" :transition="2000"
                                            :show-percent="true" fill-color="#62b78d" empty-color="#e9ebef" />
                                        <span
                                            class="md:hidden absolute top-0 left-[45px] text-[11px] text-[#6b7280] font-inter dark:text-[#fff]">Delivery
                                            <span class="block">Performance</span></span>
                                    </div>
                                    <div class="w-[20%] absolute bottom-[15px] right-[51px] md:static flex">
                                        <CircleProgress :percent="100 / element.logistic_weight_case" :size="32"
                                            :border-width="2" :border-bg-width="2" :transition="2000"
                                            :show-percent="true" fill-color="#ffab00" empty-color="#e9ebef" />
                                        <span
                                            class="md:hidden absolute top-0 left-[45px] text-[11px] text-[#6b7280] font-inter dark:text-[#fff]">Weight
                                            <span class="block">Cases</span></span>
                                    </div>
                                </div>
                                <!-- checkbox -->
                                <div class="ml-auto absolute top-[18px] left-[8px] md:static">
                                    <input type="checkbox" class="cursor-pointer w-[16px] h-[16px]" :checked="element.logistic_isChecked"
                                        @change="(e) => changesValue(e.target.checked, index)" />
                                    <!-- <BaseCheckBox  :data="{id: Number(logistic_id), value:'logistic_id', is_checked : element.logistic_isChecked}" @listenCheckboxChange="(val) => changesValue(val, index)"" /> -->
                                </div>
                            </div>
                        </template>
                    </draggable>
                    <div v-if="list?.length == 0" class="h-[63vh] flex flex-col justify-center items-center">
                        <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" class="w-[75px]" />
                        <div class="head">No Records Found</div>
                    </div>
                </div>
                <!-- skeleton -->
                <div v-else class="px-[16px] md:px-[0px]">
                    <div class="hover:cursor-pointer block w-[auto] md:w-[100%] md:flex px-[16px] lg:pl-[32px] md:pr-[18px] py-[16px] items-center relative rounded-[12px] md:rounded-[0px] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] md:shadow-none bg-[#fff] mb-[8px] md:mt-[16px] md:my-0 md:mx-0 dark:bg-[#4d4d4d] dark:border-[#4d4d4d] dark:border-[1px]"
                        v-for="sekeleton in showSekeletons" :key="sekeleton">
                        <div class="flex gap-4 items-center justify-between pr-[38px] w-[50%] md:ml-[12px]">
                            <div class="flex gap-[12px]">
                                <!-- <Skeleton width="1rem" height="1.5rem"></Skeleton> -->
                                <!-- logo image -->
                                <div class="relative">
                                    <Skeleton shape="circle" width="1.5rem" height="1.5rem"></Skeleton>
                                </div>
                                <Skeleton width="4rem" height="1.2rem"></Skeleton>
                            </div>
                            <div class="flex gap-2 absolute right-[15px] md:static items-center">
                                <Skeleton size="1.5rem"></Skeleton>
                                <Skeleton size="1.5rem"></Skeleton>
                            </div>
                        </div>
                        <hr />

                        <div class="relative flex h-[120px] md:h-auto md:w-[50%] gap-[22px] justify-between">
                            <div class="w-[20%] absolute top-[10px] left-[0px] md:static">
                                <Skeleton shape="circle" width="2rem" height="2rem"></Skeleton>
                            </div>
                            <div class="w-[20%] absolute top-[10px] right-[51px] md:static">
                                <Skeleton shape="circle" width="2rem" height="2rem"></Skeleton>
                            </div>
                            <div class="w-[20%] absolute bottom-[15px] left-[0px] md:static">
                                <Skeleton shape="circle" width="2rem" height="2rem"></Skeleton>
                            </div>
                            <div class="w-[20%] absolute bottom-[15px] right-[51px] md:static flex">
                                <Skeleton shape="circle" width="2rem" height="2rem"></Skeleton>
                            </div>
                        </div>
                        <!-- checkbox -->
                        <div class="ml-auto absolute top-[18px] left-[8px] md:static hidden md:block">
                            <Skeleton width="1.2rem" height="1.2rem"></Skeleton>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Table -->
        </div>
    </div>
</template>

<style lang="scss">
@import '../RuleEngine.scss';
</style>
