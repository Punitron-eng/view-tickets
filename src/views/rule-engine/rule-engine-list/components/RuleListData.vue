<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import BaseToggle from '../../../../components/base/BaseToggle.vue';
import draggable from 'vuedraggable';
import getImg from '../../../../util/getImg';
import { useToast } from 'primevue/usetoast';
import { useStore } from 'vuex';
import { DARKMODE } from '../../../../store/dark-mode/constants';
import { checkUserType } from '../../../../util/commonHandlers'; // checkusertype
import { updateRuleList } from '../../../../api/rule-engine/RuleEngineList';
import { RULEENGINE } from '../../../../store/rule-engine/constants'; // import constants
import { checkAccessRight, deepCheckAccessRight } from '../../../../util/commonHandlers';
const toast = useToast();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

const store = useStore();
const updatedlistseq = ref('');
//props
const props = defineProps<{
    changeValFnc:{
        type: Function,
    }
    updateList: {
        type: Array<any>;
        required: true;
    };
    vendorData: {
        required: true;
    };
    statusValue: {
        type: String;
        required: true;
    };
    channelData: {
        // required : true;
    };
}>();
console.log('vendor data', props.vendorData[1]);
// draggable Options
const drag = ref<boolean>(false);
const dragOptions = computed(() => {
    return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
    };
});

//emits
const emits = defineEmits(['handleToggleSwitch', 'handleToggleDropdown', 'handleCloneContent']);

const handleSwitch = (index: number, val: boolean, currentStatusValue: string) => {
    props.changeValFnc({index,val,currentStatusValue})
    // emits('handleToggleSwitch', index, val, currentStatusValue);
};

const toggleDropdown = (index: number) => {
    emits('handleToggleDropdown', index);
};

const copyContents = (id: number, index: number) => {
    emits('handleCloneContent', id, index); // emit the rule_id
};
// For user-type  (Api call onMounted)
const apiCall = async () => {
    const payload = {
        vendor_id: !checkUserType('vendor') ? props.vendorData[1] : '',
    };
    // Iterate over the array in reverse order
    for (let index = updatedlistseq.value.length - 1; index >= 0; index--) {
        const res = updatedlistseq.value[index];
        const descendingIndex = updatedlistseq.value.length - index;
        payload[`update_priority[${res}]`] = descendingIndex;
    }
    const updateData: any = await updateRuleList(payload);
    if (updateData.status == 'success') {
        toast.add({ severity: 'success', summary: 'Success', detail: updateData.html_message, life: 1000 });
        const payload = {
            vendor_id: !checkUserType('vendor') ? props.vendorData[1] : '',
            status: 'active',
        };
        await store.dispatch(`${RULEENGINE.NAME}/getrulelistdata`, payload);
    }
};
const updateRule = async () => {
    let tempList = props.updateList;
    let tempUpdatedList = [];
    tempList.forEach((item:any, index:number) => {
        tempUpdatedList.push(`${item.rule_id}`);
    });
    updatedlistseq.value = tempUpdatedList;
    await apiCall();
};


let temp = props.updateList;
const isPopoverVisible = ref(Array.from({ length: temp?.length }, () => false));// Initialize visibility array

const showPincodes = (index) => {
    isPopoverVisible.value[index] = !isPopoverVisible.value[index];
};

const handleClickOutside = (event) => {
    // Check if the click event occurred outside of the view
    if (!event.target.closest('.pincode')) {
        isPopoverVisible.value = Array.from({ length: temp?.length }, () => false);
    }
};

const format = (rule) => {
    if (rule.start_time) {
        const start_time = rule.start_time?.hours > 12 ? rule.start_time?.hours - 12 : rule.start_time?.hours
        const start_minutes = rule.start_time?.minutes < 10 ? '0' + rule.start_time?.minutes : rule.start_time?.minutes;
        const end_time = rule.end_time?.hours > 12 ? rule.end_time?.hours - 12 : rule.end_time?.hours
        const end_minutes = rule.end_time?.minutes < 10 ? '0' + rule.end_time?.minutes : rule.end_time?.minutes;

        return ` ${start_time} : ${start_minutes} ${rule.start_time?.hours >= 12 ? 'PM' : 'AM'} to ` + `${end_time} : ${end_minutes} ${rule.end_time?.hours >= 12 ? 'PM' : 'AM'}`;
    }
    else {
        const formattedHours = rule.value.hours > 12 ? rule.value.hours - 12 : rule.value.hours;
        const formattedMinutes = rule.value.minutes < 10 ? '0' + rule.value.minutes : rule.value.minutes;
        return ` ${formattedHours}:${formattedMinutes} ${rule.value.hours >= 12 ? 'PM' : 'AM'}`;
    }
}

onMounted(async () => {
    document.body.addEventListener('click', handleClickOutside);
});
const disableDraggable = ref(props.statusValue == 'all' || props.statusValue == 'inactive' ? true : false);
watch(() => props.statusValue, () => {
    disableDraggable.value = props.statusValue == 'all' || props.statusValue == 'inactive' ? true : false
})

// For responsive - dragging is only possible when clicking on the icon
const isMobile = computed(() => {
    if(window.matchMedia('(max-width: 768px)').matches){
        return true;
    }else{
        return false
    }
});

</script>

<template>
    <draggable group="test" :list="props.updateList" item-key="id" @change="updateRule" @start="drag = false"
        @end="drag = false" v-bind="dragOptions" :disabled="disableDraggable" :handle="isMobile ? '.handle' : ''">
        <template #item="{ element, index }">
            <div class="flex gap-2 md:gap-4 pl-[8px] pr-[16px]"
                :class="['relist-' + statusValue + '-data', checkAccessRight('rule_engine') ? true : deepCheckAccessRight('domestic', 'rule_engine', 'edit') ? '' : 'disabled-data']">
                <!-- draggable logo -->
                <div class="pt-[40px] w-[8px]"
                    v-if="(statusValue == 'active') && (checkAccessRight('rule_engine') ? true : deepCheckAccessRight('domestic', 'rule_engine', 'edit'))">
                    <button>
                        <img :src="getImg('re-dragging-icon', darkModeVal)" alt="Logo" class="w-full" :class="{ 'handle': isMobile }"/>
                    </button>
                </div>

                <div
                    class="border rounded-[12px] border-[#e5e7eb] w-[100%] mb-[16px] dark:border-[#474747] rule-data-outer">
                    <!-- header -->
                    <div
                        class="pl-[12px] md:pl-[24px] pt-[24px] pr-[8px] md:pr-[16px] flex justify-between items-center">
                        <div class="flex items-center w-[60%]">
                            <img :src="getImg('re-rule-logo', darkModeVal)" alt="Logo" class="pr-[8px] md:pr-[16px]" />
                            <h3
                                class="text-[13px] md:text-[16px] m-0 text-[#1f2937] font-bold leading-6 dark:text-[#f3f4f6] font-inter">
                                {{ element.rule_name }}</h3>
                        </div>
                        <div class="flex">
                            <!-- input switch toggle component -->
                            <div class="toggle-image px-[4px] md:px-[8px]"
                                v-if="(checkAccessRight('rule_engine') ? true : deepCheckAccessRight('domestic', 'rule_engine', 'edit')) && statusValue != 'all'" v-tooltip.top="element.isActive ? 'Active' : 'Inactive'">
                                <BaseToggle class="toggle" :value="element.isActive"
                                    @listenToggleChange="(val) => handleSwitch(index, val, statusValue)" />
                            </div>
                            <!-- copy contents buttton -->
                            
                            <button @click="copyContents(element.rule_id, index)"
                                v-if="(statusValue == 'active' ) && element.isActive && (checkAccessRight('rule_engine') ? true : deepCheckAccessRight('domestic', 'rule_engine', 'edit'))" v-tooltip.top="'Clone'">
                                <img :src="getImg('re-copy', darkModeVal)" alt="Logo" />
                            </button>
                            <!-- dropdown contents -->
                            <button v-if="element.isShow" @click="toggleDropdown(index)" class="px-[4px] md:px-[8px]">
                                <img :src="getImg('re-downArrow', darkModeVal)" alt="Logo" />
                            </button>
                            <button v-else @click="toggleDropdown(index)" class="px-[4px] md:px-[8px]">
                                <img :src="getImg('re-downArrow', darkModeVal)" alt="Logo" class="rotate-180" />
                            </button>
                        </div>
                    </div>
                    <!-- rules content -->
                    <div v-if="element.isShow" class="px-[24px] flex pt-[32px] flex-col">
                        <div class="flex pb-2" v-for="(rule) in element.rule">
                            <div
                                class="w-full md:max-w-[200px] m-0 text-[12px] dark:text-[#9ca3af] text-[#6b7280] font-[500] tracking-normal leading-[1.33] capitalize">
                                {{ rule.label }}</div>

                            <div
                                class="w-full md:max-w-[1000px] m-0 leading-[1.33] font-[500] tracking-normal text-right md:text-left text-[#4b5563] text-[12px] dark:text-[#d1d5db] font-inter capitalize">
                                <span
                                    v-if="rule.attr_id != 5 && rule.attr_id != 7 && rule.attr_id != 9 && rule.attr_id != 6 && rule.attr_id != 10">{{
        rule.condition ? rule.condition : rule.value }} </span>

                                <span v-if="rule.attr_id == 2 && rule.condition">{{ rule.from_value ? `
                                    ${rule.from_value} KG to ${rule.to_value} KG` : ` ${rule.value} KG` }} </span>

                                <span v-if="rule.attr_id == 4 && rule.condition">{{ rule.from_value ? ` ₹
                                    ${rule.from_value} to ₹ ${rule.to_value}` : ` ₹ ${rule.value}` }} </span>

                                <span v-if="rule.attr_id == 8 && rule.condition">{{ format(rule) }}</span>

                                <div v-if="rule.attr_id == 5 || rule.attr_id == 7">
                                    <!-- state and city -->
                                    <span v-for="(arr, i) in rule.value">{{ `${arr.from_value} to ${arr.to_value}` }}{{
        rule.value.length > i + 1 ? ', ' : '.' }} </span>
                                </div>

                                <!-- channel and store -->
                                <div v-if="rule.attr_id == 10">
                                    {{ `Channel :${rule.value[0].channel_id} Store : ${rule.value[0].store_id}` }}
                                </div>

                                <!-- product sku -->
                                <span v-if="rule.attr_id == 9"><a :href="rule.value" :target="{ _blank }"
                                        class="text-[#0052cc]" download>View </a></span>

                                <!-- customer pincode -->
                                <div v-if="rule.attr_id == 6"
                                    class="md:flex gap-0 md:gap-2 justify-end md:justify-start flex-wrap">
                                    <div v-if="rule.value?.pickup_from">Pickup_From: {{ rule.value.pickup_from }}</div>
                                    <div v-if="rule.value.filename">FileName: <a :href="rule.value.filename"
                                            :target="{ _blank }" download class="pl-[2px] text-[#0052cc]">View</a></div>
                                    <div v-if='rule.value.pincode_popover' class="relative pincode">
                                        Pincode:
                                        <a class="text-[#0052cc] cursor-pointer md:mr-[4px]" download
                                            @click="showPincodes(index)">View</a>
                                        <div v-if="isPopoverVisible[index]"
                                            class="pincode_popover border border-[#e5e7eb] max-w-[180px] md:min-w-[200px] absolute bg-[#fff] top-[-63px] md:top-[-31px] left-[51px] md:left-[100%] transform translate-y-[10px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] dark:bg-[#474747] dark:border-[#474747] gap-[7px] p-[16px] text-wrap overflow-y-scroll break-words max-h-[200px] min-h-[100px] z-10">
                                            {{ rule.value.pincode_popover }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- footer -->
                    <div
                        class="footer mt-[24px] flex flex-col md:flex-row justify-between bg-[#f2f4f7] pl-[23px] py-[8px] pr-[16px] dark:bg-[#3d3d3d]">
                        <div class="flex w-[100%] items-center justify-between md:justify-start md:max-w-[263px]">
                            <div class="m-0 text-[12px] text-[#6b7280] leading-[1.33] dark:text-[#9ca3af]">Courier
                                Priority</div>

                            <!-- custom or best rated -->
                            <div class="flex gap-1 items-center relative md:ml-[43%] image">
                                <p
                                    class=" text-[#4b5563] text-[12px] dark:text-[#d1d5db] font-[500] leading-[1.33] m-0 font-inter">
                                    {{ element.rule_courier_priority.label }}</p>
                                <div v-if="element.rule_courier_priority.label === 'Custom'" class="image">
                                    <div>
                                        <!-- image hover -->
                                        <img :src="getImg('box', darkModeVal)" alt="Logo" class="w-[14px]" />
                                    </div>

                                    <!-- hover container -->
                                    <div
                                        class="img-container border border-[#e5e7eb] absolute p-[16px] top-[26px] md:top-[auto] md:bottom-[-38px] right-0 md:left-[76px] flex flex-wrap bg-[#ffffff] w-[193px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] dark:bg-[#474747] dark:border-[#474747] gap-[7px] rounded-[6px] z-2">
                                        <div v-for="logo in element.rule_courier_priority.logo" class="relative">
                                            <!-- logo image -->
                                            <img :src="getImg(logo.logo_name)" alt="Logo1" class="w-[34px]" />
                                            <!-- air surface image -->
                                            <img :src="getImg('re-' + logo.is_surface, darkModeVal)"
                                                class="w-[16px] absolute bottom-[-2px] right-[-3px]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="flex md:justify-end w-[100%] items-center md:max-w-[176px] lg:max-w-[200px] gap-3 pt-2">
                            <div v-if="statusValue=='active'" class="m-0 text-[12px] font-medium leading-[1.33] text-[#4b5563] dark:text-[#9ca3af]">
                                Priority: <span
                                    class="font-inter leading-[1.33] text-[#1f2937] ml-2 text-[12px] dark:text-[#d1d5db]">{{
                                    element.display_priority }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </draggable>
</template>

<style lang="scss"></style>
