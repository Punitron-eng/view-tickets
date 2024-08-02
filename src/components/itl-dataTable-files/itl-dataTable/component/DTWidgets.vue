<script setup>
import { dataTableVariables as dataVariables } from '../commonVariable';
</script>
<template>
    <div v-if="dataVariables.isWidgetAvail" class="widget-outer-sec responsive-div"
        :class="dataVariables.isDivVisible == true ? 'show-div' : ''">
        <!-- <div class="hidewidget" @click="showWidget()"></div> -->
        <div class="widget-outer">
            <div class="widget-box" v-for="(widget, index) in dataVariables.getWidgetTitle" :key="index">
                <div class="widget-label">{{ widget.name }}</div>
                <div v-if="dataVariables.getWidgetValues" class="growth-main-outer-sec">
                    <div v-if="dataVariables.isWidgetSekeleton">
                        <skeletonView width="3rem" height="16px"></skeletonView>
                    </div>
                    <div v-else class="widget-count">{{ dataVariables.getWidgetValues[index]?.value || 0 }}</div>
                    <div v-if="dataVariables.getWidgetValues[index]?.percentage" class="widget-growth-rate-outer">
                        <div v-if="dataVariables.isWidgetSekeleton">
                            <skeletonView width="3rem" height="16px"></skeletonView>
                        </div>
                        <div v-else class="widget-percentage-outer">
                            <div class="widget-growth-rate-text">{{ dataVariables.getWidgetValues[index].percentage }}
                            </div>
                            <div class="widget-growth-rate-img">
                                <img v-if="dataVariables.getWidgetValues[index].isWidgetUpArrow"
                                    src="@/assets/images/high-growth-rate.svg" alt="" class="mr-[8px]" />
                                <img v-else-if="dataVariables.getWidgetValues[index].isWidgetUpArrow !== '' && dataVariables.getWidgetValues[index].isWidgetUpArrow == false"
                                    src="@/assets/images/low-growth-rate.svg" alt="" class="mr-[8px]" />
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="growth-main-outer-sec">
                    <div>
                        <skeletonView width="3rem" height="16px"></skeletonView>
                    </div>
                    <div class="widget-growth-rate-outer">
                        <div>
                            <skeletonView width="3rem" height="16px"></skeletonView>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
@import '../../../../assets/itl-common-css/common-css.scss';

.widget-outer-sec {
    padding: 16px 0;

    @media (max-width: 1024px) {
        padding: 0px;
    }

    @media (max-width: 767px) {
        .hidewidget {
            width: 48px;
            height: 4px;
            border-radius: 100px;
            background-color: #d0d6dc;
            margin: 0 auto;
            margin-top: 8px;
        }

        &.responsive-div {

            // display: none;
            // animation: slideFromBottom 0.5s forwards;
            &.show-div {
                display: block;
                animation: slideFromBottom 0.5s forwards;
                border-radius: 12px 12px 0 0;
            }
        }
    }

    .widget-outer {
        display: flex;

        @media (max-width: 1024px) {
            margin: 20px 16px 22px 16px;
            overflow-x: auto;
            padding-bottom: 10px;
            border-bottom: none;
        }

        @media (min-width: 1025px) and (max-width: 1280px) {
            margin: 0px 16px 0px 16px;
            overflow-x: auto;
            padding-bottom: 10px;
            border-bottom: none;
        }

        // @media (max-width: 767px) {
        //     margin: 20px 16px 22px 16px;
        //     overflow-x: auto;
        //     padding-bottom: 10px;
        //     border-bottom: none;
        // }

        .widget-label {
            font-family: $interMedium;
            font-size: 11px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.2;
            letter-spacing: normal;
            text-align: left;

            // color: #1d252b;
            @include theme() {
                color: theme-get('black-800');
            }

            text-transform: capitalize;
            margin-bottom: 4px;
        }

        .widget-count {
            font-family: $interMedium;
            font-size: 16px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 1;
            letter-spacing: normal;
            text-align: left;

            @include theme() {
                color: theme-get('black-700');
            }
        }

        .widget-box {
            padding-right: 39px;
            border-radius: 8px;
            box-shadow: 0 1px 6px 0 rgba(187, 224, 238, 0.1);
            // background: #fff;
            position: relative;

            @include theme() {
                background-color: theme-get('background');
            }

            padding: 12px 20.5px 16px 16px;
            width: 296px;
            height: 64px;

            @media (max-width: 1280px) {
                padding-right: 16px;
                width: 50%;
                min-width: 168px;
            }
        }

        .widget-height {
            height: 32px;

            .mb-2 {
                margin-bottom: 4px !important;
            }
        }

        .widget-box {
            margin-right: 16px;
        }

        .widget-box:last-child {
            margin-right: 0;
        }

        .growth-main-outer-sec {
            display: flex;
            align-items: center;
            position: absolute;
            bottom: 8px;
            width: 90%;

            .widget-growth-rate-outer {
                display: flex;
                align-items: center;
                margin-left: auto;

                .widget-percentage-outer {
                    display: flex;
                    align-items: center;

                    .widget-growth-rate-text {
                        margin-right: 8px;
                        font-family: 'Inter-Regular';
                        font-size: 11px;
                        font-weight: normal;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 1.09;
                        letter-spacing: normal;

                        @include theme() {
                            color: theme-get('label-clr');
                        }
                    }
                }
            }
        }
    }
}

.widget-overlay {
    background: rgba(60, 66, 73, 0.24);
    content: '';
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    top: 0;
}

.widget-skeleton-outer {
    display: flex;
    padding: 16px;
    border-bottom: 1px solid #e9ebef;

    @media (max-width: 767px) {
        flex-flow: wrap;
        padding: 40px 24px 16px;
    }

    .widget-skeleton-box {
        width: 10rem !important;
        height: 3rem !important;
        margin-right: 32px !important;
    }
}
</style>