<template>
    <div class="ndr-history-wrapper relative">
        <div class="ndr-history-outer">
            <div v-for="(item, index) in props.processData" :key="index" class="small-card">
                <div class="mb-[8px]">
                    <div
                        class="border border-[#f1f3f5] w-[full] rounded-4px relative bg-[#fbfcfd] rounded-[4px] dark:bg-dark-0 dark:border-dark-200"
                        :class="[
                            getBorderClass(item.chipType),
                            {
                                'mt-[24px]': item.chipText,
                                'mb-[16px]': item.isPanel,
                            },
                        ]"
                    >
                        <div
                            v-if="item.chipText"
                            class="text-[10px] leading-[12px] absolute top-[-12px] left-[-1px] text-white font-medium flex items-center justify-center px-[9px] py-[3px] rounded-t-[5px] rounded-br-[5px]"
                            :class="getBgColorClass(item.chipType)"
                        >
                            <div class="badge-corner"><div class="badge-corner-triangle" :class="item.chipType == 'auto' ? 'notification-green' : 'notification-blue'"></div></div>
                            {{ item.chipText }}
                        </div>
                        <div class="relative flex flex-wrap justify-between items-center border-b border-[#f1f3f5] px-[12px] py-[10px] md:px-[16px] dark:border-dark-200" :class="{ 'pt-[18px]': item.chipText }">
                            <div class="flex items-center" :class="{ 'status-text-wrap': item.status.text?.length >= 12 }">
                                <img :src="getImg(item.img1, false, 'modals')" class="w-[20px] mr-[8px] mt-1" />
                                <!-- <img :src="getImg(item.img2, false, 'modals')" class="w-[12px] mr-[8px] mt-1" /> -->
                                <img :src="getImg(item.img2, true, 'modals')" class="w-[12px] mr-[8px] mt-1" />
                                <img :src="getImg(item.img3, false, 'modals')" class="w-[20px] mr-[8px] mt-1" />
                                <span class="text-[#3c4249] text-[12px] md:text-[16px] dark:text-dark-1000">{{ item.vendorName }}</span>
                            </div>
                            <div class="rounded-[2px] text-[10px] text-center font-semibold px-[5px] leading-[16px] status-text" :class="[getTextColorClass(item.status.color), getBgColorClass(item.status.color)]">
                                {{ item.status.text }}
                            </div>
                            <div class="timeline-circle"></div>
                        </div>
                        <Panel v-if="item.isPanel" toggleable :collapsed="collapsedStates" @toggle="onToggle()" class="small-card-panel">
                            <template #header>
                                <div class="text-[#1d252b] font-semibold dark:text-dark-1000">{{ item.panel.heading }}</div>
                            </template>
                            <template #togglericon>
                                <div class="text-[#1279ff] flex items-center gap-2">
                                    <div>{{ collapsedStates ? 'Show Details' : 'Hide Details' }}</div>
                                    <span :class="collapsedStates ? 'pi pi-angle-down' : 'pi pi-angle-up'" />
                                </div>
                            </template>

                            <template #default>
                                <div class="flex items-start md:items-center">
                                    <img :src="getImg(item.panel.img1, false, 'modals')" class="w-[24px] ml-0 mr-[8px] md:ml-[16px]" />
                                    <div class="w-[62vw] md:w-[42vw] py-[8px] px-[12px] md:pl-[16px] md:pr-[46px] bg-white rounded-[4px] shadow-md break-words text-[11px] md:text-[14px] dark:!bg-dark-300">{{ item.panel.content }}</div>
                                </div>
                                <div class="text-[#656f7d] text-[10px] pl-[48px] py-[8px]">{{ item.date }} - {{ item.time }}</div>
                            </template>
                        </Panel>
                        <div v-else class="p-[16px] flex items-center gap-4">
                            <img v-if="item.descriptionImg" :src="getImg(item.descriptionImg, false, 'modals')" class="w-[24px]" />
                            <div class="text-[#3c4249] text-[13px] dark:text-dark-1000">{{ item.description }}</div>
                        </div>
                    </div>
                </div>
                <div v-if="!item.isPanel" class="text-[#656f7d] text-[10px] pl-[8px] mb-[16px] dark:text-dark-800">{{ item.date }} - {{ item.time }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import getImg from '@/util/getImg';
import { ref } from 'vue';

const props = defineProps({
    processData: null,
});

const collapsedStates = ref(props.processData.map((_, index) => index >= 1));

const onToggle = () => {
    collapsedStates.value = !collapsedStates.value;
};

const getBgColorClass = (color) => {
    if (color === 'greenClr') {
        return `bg-[#e6f8ef] `;
    } else if (color === 'brownClr') {
        return `bg-[#ffedb1] `;
    } else if (color === 'manual') {
        return `bg-[#1279ff] `;
    } else if (color === 'auto') {
        return `bg-[#00a656] `;
    }
    return `bg-[${color}] `;
};
const getBorderClass = (color) => {
    if (color === 'auto') {
        return `gradient-border-green`;
    } else if (color === 'manual') {
        return `gradient-border-blue`;
    }
    return `border-[${color}] `;
};
const getTextColorClass = (color) => {
    if (color === 'greenClr') {
        return `text-[#0f9409] `;
    } else if (color === 'brownClr') {
        return `text-[#b6684b] `;
    }
    return `text-[${color}]`;
};
</script>

<style lang="scss">
@import '@/assets/itl-common-css/common-css.scss';
.small-card {
    .p-panel {
        background-color: #fbfcfd !important;
        @include theme() {
            background-color: theme-get('dark-100') !important;
        }
    }
    .p-panel .p-panel-header {
        border: transparent !important;
        background-color: #fbfcfd !important;
    }
    .p-panel .p-panel-content {
        background-color: #fbfcfd !important;
    }
    .p-panel-header {
        background-color: #fbfcfd !important;
    }

    .gradient-border-blue {
        border-image-source: linear-gradient(to bottom, #1279ff, rgba(18, 121, 255, 0) 128%);
        border-image-slice: 1;
    }
    .gradient-border-green {
        border-image-source: linear-gradient(to bottom, #00a656, rgba(0, 166, 86, 0) 128%);
        border-image-slice: 1;
    }
    #pv_id_25_content .p-panel-content {
        padding-top: 3px !important;
        padding-bottom: 0px !important;
        background-color: #fbfcfd !important;
    }
}

.darkTheme {
    .small-card .p-panel .p-panel-content {
        background-color: #212121 !important;
    }
    .main-card-panel .small-card-panel .p-panel-header {
        background-color: #212121 !important;
    }
}

.ndr-history-wrapper {
    &:after {
        left: 10px;
        content: '';
        position: absolute;
        z-index: 1;
        background-color: #e9ecef;
        height: 100%;
        width: 1px;
        z-index: 0;
        top: 0;
        @include theme() {
            background-color: theme-get('dark-200');
        }
    }
    .ndr-history-outer {
        padding-left: 32px;
    }
    .timeline-circle {
        margin-bottom: 0;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        box-shadow: -3px 2px 4px -1px #0000000f;
        box-shadow: 0px 4px 6px -1px #0000001a;
        border: solid 4px #ffffff;
        background-color: #1279ff;
        position: absolute;
        bottom: -8px;
        /* transform: translateY(-50%); */
        left: -30px;
        /* transform: translate(0%, -50%); */
        z-index: 1;
        @include theme() {
            border: 4px solid theme-get('dark-300');
        }
        &:after {
            left: 12px;
            content: '';
            position: absolute;
            top: 50%;
            margin-top: 0px;
            height: 1px;
            width: 14px;
            background-color: #e9ecef;
            z-index: 1;
            @include theme() {
                background-color: theme-get('dark-200');
            }
        }
    }
    .badge-corner {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 6px;
        height: 6px;
        background-color: #fff;
        @include theme() {
            background-color: theme-get('dark-100');
        }
    }
    .badge-corner-triangle {
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 0px 6px 6px;
        &.notification-green {
            border-color: transparent transparent transparent #44e2a0;
        }
        &.notification-blue {
            border-color: transparent transparent transparent #afcafd;
        }
    }
}
@media (min-width: 320px) and (max-width: 1024px) {
    .small-card-panel .p-panel-content {
        padding: 12px !important;
        background-color: #fbfcfd;
    }
    .p-panel-content {
        padding: 16px !important;
    }
    .ndr-history-wrapper .ndr-history-outer {
        padding-left: 24px;
    }
    .ndr-history-wrapper:after {
        left: 2px;
    }
    .status-text {
        margin-right: 15px;
    }
    .status-text-wrap {
        margin-bottom: 8px;
    }
}
</style>
