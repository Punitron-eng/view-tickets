<template>
    <div class="loading-order-outer" id="loading_orders">
        <div class="loading-order">
            <div class="loader-outer-sec">
                <svg class="circular" viewBox="25 25 50 50">
                    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10" />
                </svg>
            </div>
            <div class="loading-text helvetica-medium">Loading Data...</div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {};
    },
});
</script>
<style lang="scss">
@import '../../assets/itl-common-css/common-css.scss';
#loading_orders {
    position: absolute;
    top: 0;
    z-index: 9;
    width: 100%;
    left: 0;
}
.loading-order {
    // background: #eff4ee;
    @include theme(){
        background-color: theme-get('dt-loader-bg');
    }
    border-radius: 4px;
    height: 40px;
    display: flex;
    width: 100%;
    /* margin: 0 auto; */
    align-items: center;
    justify-content: center;
}
.loading-text {
    font-size: 14px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: left;
    // color: #208b02;
    @include theme(){
        color: theme-get('dt-loader-text');
    }
    font-family: 'SegoeUI-Semibold';
    padding-left: 16px;
}
.circular {
    -webkit-animation: rotate 2s linear infinite;
    animation: rotate 2s linear infinite;
    height: 16px;
    transform-origin: center center;
    width: 16px;
}
.path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    -webkit-animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    stroke-linecap: round;
}
@-webkit-keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}
@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}
@-webkit-keyframes dash {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
    }
    100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
    }
}
@keyframes dash {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
    }
    100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
    }
}
@-webkit-keyframes color {
    100%,
    0% {
        stroke: #00875a;
    }
}
@keyframes color {
    100%,
    0% {
        stroke: #00875a;
    }
}
#loading_orders.loading-order-outer.whiteheader-onloaddata {
    position: fixed;
    top: 64px;
    width: 100%;
    background: #fff;
    padding: 4px 40px;
    z-index: 2;
    box-shadow: 0 8px 6px -6px #ccc;
    left: 0;
}
</style>
