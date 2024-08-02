<script setup>
import { defineProps } from 'vue';
const { getWidgetTitle, getWidgetValues, isWidgetSekeleton } = defineProps(['getWidgetTitle', 'getWidgetValues', 'isWidgetSekeleton']);
</script>

<template>
    <div class="widget-outer-sec responsive-div">
        <div class="widget-outer">
            <div class="widget-box" v-for="(widget, index) in getWidgetTitle" :key="index">
                <div class="widget-label">{{ widget.name }}</div>
                <div v-if="getWidgetValues" class="growth-main-outer-sec">
                    <div v-if="isWidgetSekeleton">
                        <skeletonView width="3rem" height="16px"></skeletonView>
                    </div>
                    <div v-else class="widget-count">{{ getWidgetValues[index].value }}</div>
                    <div v-if="getWidgetValues[index].percentage" class="widget-growth-rate-outer">
                        <div v-if="isWidgetSekeleton">
                            <skeletonView width="3rem" height="16px"></skeletonView>
                        </div>
                        <div v-else class="widget-percentage-outer">
                            <div class="widget-growth-rate-text">{{ getWidgetValues[index].percentage }}</div>
                            <div class="widget-growth-rate-img">
                                <img v-if="getWidgetValues[index].isWidgetUpArrow" src="../../assets/images/high-growth-rate.svg" alt="" class="mr-[8px]" />
                                <img v-else-if="getWidgetValues[index].isWidgetUpArrow !== '' && getWidgetValues[index].isWidgetUpArrow == false" src="../../assets/images/low-growth-rate.svg" alt="" class="mr-[8px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
