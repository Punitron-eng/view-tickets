<script setup lang="ts">
import { ref, defineProps, computed, onMounted, defineEmits } from 'vue';
import * as Type from './types';
import getImg from '../../util/getImg';
import ProgressBar from 'primevue/progressbar';
import 'vue3-circle-progress/dist/circle-progress.css';
import CircleProgress from 'vue3-circle-progress';
import { RETURN } from '@/store/domestic/return-flow/constants';
const pickNowData = computed(() => store.getters[`${RETURN.NAME}/getPickNowDetails`]);

const props = defineProps({
    cardData: { type: Object, required: true },
    skeletonData: { type: Boolean, required: true },
    isSkeletonShow: { type: Boolean, required: true },
});
const emit = defineEmits(['logisticId']);
import { useStore } from 'vuex';
const store = useStore();
import { DARKMODE } from '@/store/dark-mode/constants';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const isActiveCard = ref(false);

const getActiveCard = (clickedCard) => {
    clickedCard.isActiveCard = !clickedCard.isActiveCard;
    pickNowData.value.card_data.forEach((card) => {
        if (card !== clickedCard) {
            card.isActiveCard = false;
        }
    });
    if (clickedCard.isActiveCard) {
        emit('logisticId', clickedCard.temp_logistic_id);
    }
};
const getLogisticIcon = (logisticLogo) => {
    const imagePath = new URL(`../../assets/images/${logisticLogo}-v2.svg`, import.meta.url).href;
    const logisticLogoPath = imagePath.split('/');
    const logisticLogoLastPart = logisticLogoPath[logisticLogoPath.length - 1];
    return logisticLogoLastPart === 'undefined' ? new URL(`../../assets/images/default_logics_2.svg`, import.meta.url).href : imagePath;
};
</script>

<template>
    <div class="w-[100%] lg:w-[296px] rounded-md border-[1px] border-[#dfe1e4] dark:border-[#4d4d4d]" v-if="props.skeletonData || props.isSkeletonShow">
        <Card id="select-courier-modal-card">
            <template #header>
                <div class="flex items-center justify-between rounded-[4px]">
                    <div class="flex items-center justify-between gap-3 text-[#3c4249] dark:text-[#dfdfdf] font-semibold text-[16px]">
                        <skeletonView width="20px" height="20px" class="rounded-[50%]"></skeletonView>
                        <span><skeletonView width="100px" height="8px" class="border-radius"></skeletonView></span>
                    </div>
                    <div class="flex items-center justify-between gap-1 px-[8px] py-[4px] rounded-[4px]">
                        <span><skeletonView width="50px" height="20px" class="border-radius"></skeletonView></span>
                    </div>
                </div>
                <div class="progress-bar flex items-center justify-between mt-3">
                    <skeletonView width="100%" height="8px" class="border-radius"></skeletonView>
                </div>
            </template>
            <template #content>
                <div class="px-[1.25rem] py-[16px]">
                    <skeletonView width="100px" height="20px" class="border-radius"></skeletonView>
                    <div class="flex items-center justify-between mt-4 text-[13px]">
                        <span class="text-[#656f7d]">Freight charges</span>
                        <span class="text-[#3c4249] font-semibold"><skeletonView width="50px" height="8px" class="border-radius"></skeletonView></span>
                    </div>
                    <div class="flex items-center justify-between mt-2 text-[13px]">
                        <span class="text-[#656f7d]">COD charges</span>
                        <span class="text-[#3c4249] font-semibold"><skeletonView width="50px" height="8px" class="border-radius"></skeletonView></span>
                    </div>
                    <div class="flex items-center justify-between text-center mt-[24px]">
                        <div class="w-[56px] h-[56px]">
                            <skeletonView width="56px" height="56px" class="rounded-[50%]"></skeletonView>
                        </div>
                        <div class="w-[56px] h-[56px]">
                            <skeletonView width="56px" height="56px" class="rounded-[50%]"></skeletonView>
                        </div>
                        <div class="w-[56px] h-[56px]">
                            <skeletonView width="56px" height="56px" class="rounded-[50%]"></skeletonView>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="flex items-center justify-center bg-[#e2f8e1] dark:bg-[#545454] text-[#178713] mt-3">
                    <skeletonView width="100%" height="24px" class="rounded-[0]"></skeletonView>
                </div>
                <div class="flex items-center justify-between text-[13px] px-[1.25rem] py-[8px]">
                    <span class="text-[#656f7d] dark:text-[#dfdfdf]">Est. delivery time</span>
                    <span class="text-[#3c4249] font-semibold"><skeletonView width="50px" height="16px" class="border-radius"></skeletonView></span>
                </div>
            </template>
        </Card>
    </div>

    <div class="w-[100%] lg:w-[296px] rounded-md border-[1px] border-[#dfe1e4] dark:border-[#4d4d4d] hover:cursor-pointer" :class="{ activeCard: props.cardData.isActiveCard }" v-else>
        <Card id="select-courier-modal-card" @click="getActiveCard(props.cardData)" v-if="pickNowData.card_data.length > 0">
            <template #header>
                <div class="flex items-center justify-between">
                    <div class="flex items-center justify-between gap-3 text-[#3c4249] dark:text-[#dfdfdf] font-semibold text-[16px]">
                        <img :src="getLogisticIcon(props.cardData.logistic.svg_logo)" alt="Logistic Name" />
                        <span class="capitalize">{{ props.cardData.logistic.name }}</span>
                    </div>
                    <div class="flex items-center justify-between gap-1 bg-[#d9e9ff] px-[8px] py-[4px] rounded-[4px]">
                        <img :src="getImg('select-courier-modal-truck')" alt="Logistic Name" v-if="props.cardData.courier_mode == 'Surface'" />
                        <img :src="getImg('air-fast')" alt="Logistic Name" v-else />
                        <span class="text-[#366cb8] text-[12px] pt-[1px] font-medium">{{ props.cardData.courier_mode }}</span>
                    </div>
                </div>
                <div class="progress-bar flex items-center justify-between mt-3">
                    <ProgressBar :value="props.cardData.logistics_rating_percentage" class="w-[82%] mt-[2px]">{{ '' }}</ProgressBar>
                    <span class="text-[14px] font-semibold text-[#3c4249] dark:text-[#dfdfdf]">{{ props.cardData.logistics_rating_percentage }}%</span>
                </div>
            </template>
            <template #content>
                <div class="px-[1.25rem] py-[16px]">
                    <span class="inline-block text-[16px] font-semibold text-[#4c545d] dark:text-[#dfdfdf]">₹{{ props.cardData.itl_bill_with_gst }}</span>
                    <div class="flex items-center justify-between mt-4 text-[13px]">
                        <span class="text-[#656f7d] dark:text-[#dfdfdf]">Freight charges</span>
                        <span class="text-[#3c4249] dark:text-[#dfdfdf] font-semibold">₹{{ props.cardData.freight_charges }}</span>
                    </div>
                    <div class="flex items-center justify-between mt-2 text-[13px]">
                        <span class="text-[#656f7d] dark:text-[#dfdfdf]">COD charges</span>
                        <span class="text-[#3c4249] dark:text-[#dfdfdf] font-semibold">₹{{ props.cardData.cod_charge }}</span>
                    </div>
                    <div class="flex items-center justify-between text-center mt-[24px]">
                        <div class="w-[56px] h-[56px]">
                            <CircleProgress :percent="props.cardData.pickup_performance_rating" :size="56" :border-width="2" :border-bg-width="2" :transition="2000" :show-percent="true" fill-color="#62b78d" empty-color="#e9ebef" />
                            <span class="text-center text-[12px] text-[#656f7d] dark:text-[#dfdfdf] mt-2">Pickup</span>
                        </div>
                        <div class="w-[56px] h-[56px]">
                            <CircleProgress :percent="props.cardData.delivery_performance_rating" :size="56" :border-width="2" :border-bg-width="2" :transition="2000" :show-percent="true" fill-color="#62b78d" empty-color="#e9ebef" />
                            <span class="text-center text-[12px] text-[#656f7d] dark:text-[#dfdfdf] mt-2">Delivery</span>
                        </div>
                        <div class="w-[56px] h-[56px]">
                            <CircleProgress :percent="props.cardData.ontime_rating" :size="56" :border-width="2" :border-bg-width="2" :transition="2000" :show-percent="true" fill-color="#62b78d" empty-color="#e9ebef" />
                            <span class="text-center text-[12px] text-[#656f7d] dark:text-[#dfdfdf] mt-2">On time</span>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="flex items-center justify-center bg-[#e2f8e1] text-[#178713] mt-3" :class="props.cardData.same_day_pickup == 0 ? 'courier-disable-strip' : ''">
                    <div class="flex items-center text-center gap-[5px] py-[6px]">
                        <img v-if="props.cardData.same_day_pickup == 1" :src="getImg('select-courier-modal-card-check')" alt="check" />
                        <img v-else :src="getImg('select-courier-modal-card-cross')" alt="check" />
                        <span class="text-[12px] font-semibold pt-[1px]">Same Day Pickup</span>
                    </div>
                </div>
                <div class="flex items-center justify-between text-[13px] px-[1.25rem] py-[8px]">
                    <span class="text-[#656f7d] dark:text-[#dfdfdf]">Est. delivery time</span>
                    <span class="text-[#3c4249] font-semibold dark:text-[#dfdfdf]">{{ props.cardData.estimated_delivery_time }}</span>
                </div>
            </template>
        </Card>
    </div>
</template>

<style lang="scss">
@import '../../assets/itl-common-css/common-css.scss';

#select-courier-modal-card {
    .p-card {
        border-radius: 4px !important;
    }

    .p-card-header {
        padding: 16px 1.25rem !important;
        @include theme() {
            border-bottom: 1px solid theme-get('modal-border-bottom') !important;
        }
    }

    .p-card-footer {
        font-family: $interRegular !important;
        padding: 0px !important;
    }

    .p-card-body {
        padding: 0px !important;
    }

    .p-progressbar {
        height: 4px !important;
    }

    .p-progressbar .p-progressbar-value {
        background: #62b78d !important;
    }

    .current-counter {
        @include theme() {
            color: theme-get('topBar-menu-black');
        }
        font-size: 13px;
        font-weight: 600;

        &::after {
            content: '%';
        }
    }
}
.activeCard {
    border-color: #1279ff;
    border-width: 2px;
}
</style>
