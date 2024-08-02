<script setup lang="ts">
import { ref } from 'vue';
import getImg from '../../util/getImg.ts';
import { DefineProps, computed } from 'vue';
import { useStore } from 'vuex';
import { DARKMODE } from '../../store/dark-mode/constants';
const store = useStore();
const skeletonItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const isLoading = ref(false);
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const props = defineProps(['tempData']);
const getLogisticIcon = (logisticLogo) => {
    const imagePath = new URL(`../../assets/images/${logisticLogo}-v2.svg`, import.meta.url).href;
    const logisticLogoPath = imagePath.split('/');
    const logisticLogoLastPart = logisticLogoPath[logisticLogoPath.length - 1];
    if (logisticLogoLastPart == 'undefined') {
        const defaultImagePath = new URL(`../../assets/images/default_logics_2.svg`, import.meta.url).href;
        return defaultImagePath;
    } else {
        return imagePath;
    }
};
// const getImg = (imageName) => {
//     return new URL(`../../assets/images/${imageName}.svg`, import.meta.url).href;
// };
</script>

<template>
    <div class="cardparent">
        <!-- Skeleton loading for card component
        <div v-if="isLoading" class="cardparent--child">
            <div v-for="n in skeletonItems" :key="n" class="checkCard skeleton">
                <div class="flex items-center gap-2 mb-[10px]">
                    <SkeletonView shape="circle" size="17px" height="17px" />
                    <SkeletonView width="55px" height="7px" />
                </div>
                <div class="flex  justify-between items-center mb-[10px]">
                    <SkeletonView width="9rem" height="7px" />
                    <SkeletonView shape="circle" size="17px" height="17px"  class="mb-1" />
                </div>
                <div class="flex justify-between items-center mb-[10px]">
                    <SkeletonView width="9rem" height="7px" />
                    <SkeletonView shape="circle" size="17px" height="17px"  class="mb-1" />
                </div>
                <div class="flex justify-between items-center mb-[10px]">
                    <SkeletonView width="9rem" height="7px" />
                    <SkeletonView shape="circle" size="17px" height="17px"  class="mb-1" />
                </div>
                <div class="flex justify-between items-center mb-[10px]">
                    <SkeletonView width="9rem" height="7px" />
                    <SkeletonView shape="circle" size="17px" height="17px"  class="mb-1" />
                </div>
            </div>
        </div> -->

        <!-- Actual content for card component -->

        <div  class="cardparent--child">
            <div class="checkCard" v-for="data in props.tempData.all_logistic_pincode_services_data_array" :key="data.id">
                <div class="checkCard-parent">
                    <div class="checkCard-parent--first">
                        <!-- -->
                        <div><img :src="getLogisticIcon(data.image_name)" alt="image" /></div>
                        <div class="checkCard-parent--first__para">{{ data.logistics_name }}</div>
                    </div>
                    <div class="checkCard-parent--first">
                        <div class="checkCard-parent--first__img">
                            <img :src="data.is_air ? getImg('air-fast', darkModeVal) : getImg('surface-fast', darkModeVal)" alt="image" />
                        </div>
                        <div class="checkCard-parent--first__paragraph">
                            {{ data.is_air ? 'Air' : 'Surface' }}
                        </div>
                    </div>
                </div>
                <div class="cardOuter--child">
                    <div class="cardOuter--child__first">
                        <p id="cardOuter--child__para">Pre-paid Delivery</p>

                        <img v-if="data.prepaid_available" :src="getImg('done-point', darkModeVal)" alt="donepoint" />
                        <img v-else :src="getImg('cross-point', darkModeVal)" alt="cross-point" />
                    </div>
                    <div class="cardOuter--child__first">
                        <p id="cardOuter--child__para">Cash on Delivery</p>
                        <!-- <img src="https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/done-point.svg" alt="" /> -->
                        <img v-if="data.cod_available" :src="getImg('done-point', darkModeVal)" alt="donepoint" />
                        <img v-else :src="getImg('cross-point', darkModeVal)" alt="cross-point" />
                    </div>
                    <div class="cardOuter--child__first">
                        <p id="cardOuter--child__para">Reverse Pickup</p>
                        <!-- <img src="https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/done-point.svg" alt="" /> -->
                        <img v-if="data.reverse_pickup" :src="getImg('done-point', darkModeVal)" alt="donepoint" />
                        <img v-else :src="getImg('cross-point', darkModeVal)" alt="cross-point" />
                    </div>
                    <div class="cardOuter--child__first">
                        <p id="cardOuter--child__para">Pickup</p>

                        <img v-if="data.pickup_available" :src="getImg('done-point', darkModeVal)" alt="donepoint" />
                        <img v-else :src="getImg('cross-point', darkModeVal)" alt="cross-point" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import './checkPincodeServiceability.scss';
</style>
