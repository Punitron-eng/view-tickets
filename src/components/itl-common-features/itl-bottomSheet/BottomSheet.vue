<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
import { defineProps, defineEmits } from 'vue';
import { DARKMODE } from '@/store/dark-mode/constants';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const props = defineProps(['linkName', 'imageName']);
const emit = defineEmits(['bottomExport']);
const getFilterIconSrc = (iconName) => {
    if (iconName) {
        if (darkModeVal.value) {
            return new URL(`../../../assets/images/dark-mode/dark-${iconName}.svg`, import.meta.url).href;
        } else {
            return new URL(`../../../assets/images/${iconName}.svg`, import.meta.url).href;
        }
    } else {
        return null;
    }
};
const getExportValues = () => {
    emit('bottomExport');
};
</script>
<template>
    <li>
        <div @click="getExportValues()">
            <img :src="getFilterIconSrc(props.imageName)" class="w-[12px]" />
            <span>{{ props.linkName }}</span>
        </div>
    </li>
</template>
<style lang="scss">
@import '../../../assets/itl-common-css/common-css.scss';

.bottomsheet-outer {
    position: fixed;
    left: 0;
    background: transparent;
    transition: all 0.2s ease-in-out;
    left: 50%;
    transform: translateX(-50%);
    bottom: -110%;
    width: 100%;
    top: auto;

    .bottom-sheet {
        padding: 24px 16px;

        // background-color: #fff;
        @include theme() {
            background-color: theme-get('background');
        }

        width: 100%;
        position: absolute;
        width: 100%;
        min-height: 200px;
        z-index: 2;
        bottom: 0;
    }

    &.modal-show-div {
        bottom: 0px;
        // bottom: 5px;
        top: 0;
        z-index: 9;

        .backdrop {
            opacity: 1;
            pointer-events: all;
        }
    }

    .backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(60, 66, 73, 0.24);
        transition: all 0.2s ease-in-out;

        //     initially it will be hidden
        opacity: 0;
        pointer-events: none;
    }

    .close {
        position: relative;
        width: 20px;
        height: 20px;
        float: right;
        margin: 10px;
        cursor: pointer;

        span {
            display: block;
            width: 100%;
            height: 2px;
            border-radius: 2px;
            background: red;
            transform: rotate(45deg);

            &::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 2px;
                border-radius: 2px;
                background: red;
                transform: rotate(90deg);
            }
        }
    }

    .bottomsheet-title {
        font-size: 13px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.54;
        letter-spacing: normal;
        text-align: left;

        // color: #656f7d;
        @include theme() {
            color: theme-get('black-700');
        }

        font-family: $segoeUISemiBoldFont;
        text-transform: uppercase;
        margin-bottom: 12px;
    }

    .bottomsheet-list {
        ul {
            display: flex;
            flex-flow: wrap;
            gap: 0 12px;
            list-style: none;
            padding: 0;
            margin: 0;

            li {
                width: 48%;
                min-width: 48%;

                // border: 1px solid #dfe3e6;
                @include theme() {
                    border: 1px solid theme-get('border-black-400')
                }

                border-radius: 4px;
                padding: 9px 10px;
                margin-bottom: 8px;

                div {
                    display: flex;
                    align-items: center;
                    gap: 0 8px;

                    // color: #3c4249;
                    @include theme() {
                        color: theme-get('black-700');
                    }

                    font-family: $segoeUIRegularFont;
                    font-size: 12px;
                    line-height: 1.17;
                }
            }
        }
    }
}
</style>
