<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { raiseDescrepancy, raiseDescrepancyData } from './viewDetail.js';
const dataVariables = raiseDescrepancy;
const expData = ref(raiseDescrepancyData.data1);
import { useStore } from 'vuex';
import ProductData from '../product-tabel/productTabel.vue';
import { WEIGHTDISCREPANCY } from '@/store/domestic/weight-discrepancy/constants';
const store = useStore();
const allActivityData = computed(() => store.getters[`${WEIGHTDISCREPANCY.NAME}/sendStoreDetails`]);
const iskeleton = computed(() => store.getters[`${WEIGHTDISCREPANCY.NAME}/sendSkeleton`]);
const handleResize = () => {
    if (window.matchMedia('(max-width: 767px)').matches) {
        dataVariables.value.isSummary = true;
        dataVariables.value.isActive = false;
    } else {
        dataVariables.value.isSummary = true;
        dataVariables.value.isActive = true;
    }
};
onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    document.body.classList.add('raise_modal');
});
onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
    document.body.classList.remove('raise_modal');
});

//weightDescripancy-nav
const currentTab = (tabName) => {
    if (tabName == 'summary') {
        dataVariables.value.isSummary = true;
        dataVariables.value.isActive = false;
    } else if (tabName == 'active') {
        dataVariables.value.isSummary = false;
        dataVariables.value.isActive = true;
    }
};
const tempIcon = (icon) => {
    if (icon) {
        return new URL(`../../../../../assets/images/${icon}.svg`, import.meta.url).href;
    } else {
        return null;
    }
};
const getLogisticIcon = (logisticLogo) => {
    const imagePath = new URL(`../../../../../assets/images/${logisticLogo}-v2.svg`, import.meta.url).href;
    const logisticLogoPath = imagePath.split('/');
    const logisticLogoLastPart = logisticLogoPath[logisticLogoPath.length - 1];
    if (logisticLogoLastPart == 'undefined') {
        const defaultImagePath = new URL(`../../../../../assets/images/default_logics_2.svg`, import.meta.url).href;
        return defaultImagePath;
    } else {
        return imagePath;
    }
};
</script>
<template>
    <div class="main-section">
        <section class="weightDescripancy-nav">
            <div class="main-nav">
                <div class="left-nav">
                    <div class="raise-discrepancy">
                        <div class="weightDescripancy-heading">View Details</div>
                    </div>
                    <div class="main-nav">
                        <nav>
                            <div class="weight-details-info">
                                <div class="logo-weight-details">
                                    <div class="skeleton-div flex align-item-center" v-if="iskeleton">
                                        <skeletonView width="20px" height="20px" class="border-radius"></skeletonView>
                                        <div class="aws-li flex align-item-center">
                                            AWB:
                                            <span>
                                                <skeletonView width="100px" height="8px"></skeletonView>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="logo-details-div flex align-item-center" v-if="!iskeleton">
                                        <img :src="getLogisticIcon(allActivityData.dispute_data.loop_logistics_svg_logo)" />
                                        <div class="aws-li flex align-item-center">
                                            AWB: <span>{{ allActivityData.dispute_data.airway_bill_no }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="weightamount" v-if="!iskeleton">
                                    <div class="cn-no" v-if="allActivityData.dispute_data.cn_amount != ''">
                                        CN No: <span>{{ allActivityData.dispute_data.cn_amount }}</span>
                                    </div>
                                    <div class="cn-no" v-if="allActivityData.dispute_data.cn_no != ''">
                                        CN Amount: <span>{{ allActivityData.dispute_data.cn_no }}</span>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
                <div class="right-nav hidden"></div>
            </div>
            <div class="hidden-selector">
                <div>
                    <button @click="currentTab('summary')" class="summary">
                        Summary
                        <div :class="dataVariables.isSummary ? 'active-button' : ''" />
                    </button>
                    <button @click="currentTab('active')" class="active">
                        Activity
                        <div :class="dataVariables.isActive ? 'active-button' : ''" />
                    </button>
                </div>
            </div>
        </section>
        <section class="weightDescripancy">
            <div class="products">
                <div>
                    <ProductData :showProducts="dataVariables.isSummary" :Data="expData" />
                </div>
                <div v-if="dataVariables.isActive" class="product-active">
                    <div class="main-info">
                        <div class="main-section">
                            <div class="header-activity">
                                <span class="header-name activity"> Activity </span>
                                <div class="shipment-more-details"></div>
                            </div>
                            <div class="wrapper">
                                <div class="stepper">
                                    <div class="skeleton-outer" v-if="iskeleton">
                                        <div class="stepper__item">
                                            <span class="stepper__step">
                                                <skeletonView width="40px" height="40px" class="border-radius"> </skeletonView>
                                                <div class="add-vertical"></div>
                                            </span>
                                            <div class="stepper__content">
                                                <div class="product-status">
                                                    <h3 class="stepper__title">
                                                        <skeletonView width="100px" height="16px"></skeletonView>
                                                    </h3>
                                                    <p>
                                                        <skeletonView width="50px" height="16px"></skeletonView>
                                                    </p>
                                                </div>
                                                <div class="product-weight">
                                                    <skeletonView width="100px" height="16px"></skeletonView>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="stepper__item">
                                            <span class="stepper__step">
                                                <skeletonView width="40px" height="40px" class="border-radius"> </skeletonView>
                                                <div class="add-vertical"></div>
                                            </span>
                                            <div class="stepper__content">
                                                <div class="product-status">
                                                    <h3 class="stepper__title">
                                                        <skeletonView width="100px" height="16px"></skeletonView>
                                                    </h3>
                                                    <p>
                                                        <skeletonView width="50px" height="16px"></skeletonView>
                                                    </p>
                                                </div>
                                                <div class="product-weight">
                                                    <skeletonView width="100px" height="16px"></skeletonView>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="stepper__item">
                                            <span class="stepper__step">
                                                <skeletonView width="40px" height="40px" class="border-radius"> </skeletonView>
                                                <div class="add-vertical"></div>
                                            </span>
                                            <div class="stepper__content">
                                                <div class="product-status">
                                                    <h3 class="stepper__title">
                                                        <skeletonView width="100px" height="16px"></skeletonView>
                                                    </h3>
                                                    <p>
                                                        <skeletonView width="50px" height="16px"></skeletonView>
                                                    </p>
                                                </div>
                                                <div class="product-weight">
                                                    <skeletonView width="100px" height="16px"></skeletonView>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="!iskeleton">
                                        <div class="stepper__item" v-for="(activityData, index) in allActivityData.data" :key="index">
                                            <span class="stepper__step">
                                                <img :src="tempIcon(activityData.icon_name)" alt="Step 1" />
                                                <div class="add-vertical"></div>
                                            </span>
                                            <div class="stepper__content">
                                                <div class="product-status">
                                                    <h3 class="stepper__title">{{ activityData.name }}</h3>
                                                    <p>{{ activityData.current_date_time }}</p>
                                                </div>
                                                <p class="stepper__desc" v-if="activityData?.remark">Remark: {{ activityData.remark }}</p>
                                                <div class="product-weight">
                                                    <img class="product-weight" src="@/assets/images/productweight.svg" alt="Product Weight" />
                                                    <p class="stepper__desc product">
                                                        Latest Product Weight: <span>{{ activityData.unbilled_weight_in_kg }} kg</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<style lang="scss" scoped>
@import './viewDetail.scss';
</style>
<style>
.product-info .p-dropdown-label {
    cursor: unset !important;
}

svg.p-icon.p-dropdown-trigger-icon {
    width: 11px !important;
    height: 11px !important;
}

#store-action.p-dialog .p-dialog-content {
    padding: 0px !important;
    background: #f1f3f5 !important;
}

.raise_modal .p-dialog-header-icon {
    top: -10px !important;

    svg {
        width: 16px !important;
        height: 16px !important;
    }
}
</style>
