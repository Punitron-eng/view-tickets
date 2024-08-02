<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
        <div class="custom-modal" @click.stop>
            <div class="modal-header" v-if="isHeaderShow == true">
                <div class="modal-heading">{{ headerTitle }}</div>
            </div>
            <img v-if="darkModeVal != true" class="close" src="../../assets/images/modal-close-icon.svg" alt="close-svg" @click="$emit('close-modal')" v-if="closeIcon == true" />
            <img v-else class="close" src="../../assets/images/dark-mode/dark-modal-close-icon.svg" alt="close-svg" @click="$emit('close-modal')" v-if="closeIcon == true" />
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,ref, computed, } from 'vue';
import { useStore } from 'vuex';
import { DARKMODE } from '../../store/dark-mode/constants';
const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
export default defineComponent({
    name: 'CustomModal',
    data() {
        return {};
    },
    props: {
        headerTitle: {
            type: String,
        },
        closeIcon: {
            type: Boolean,
        },
        isHeaderShow: {
            type: Boolean,
        },
    },
});
</script>

<style lang="scss">
@import './public/layout/css/common-css.scss';
.modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: center;
    z-index: 9999;
    overflow-y: auto;
    overflow-x: hidden;
    transition: opacity 0.15s linear 0s;
    backdrop-filter: blur(11px);
    display: flex;
    align-items: center;
    .custom-modal {
        @include theme(){
            background-color: theme-get('background');
        }
        max-width: 560px;
        border-radius: 12px;
        margin: 1.73rem auto;
        box-shadow: 0 0.25rem 0.5rem rgb(0 0 0 / 10%);
        transform: none;
        border: none;
        position: relative;
    }
    .close {
        position: absolute;
        right: 18px;
        top: 18px;
        cursor: pointer;
    }
    .modal-heading {
        font-family: $poppinsSemiBoldFont;
        font-style: normal;
        font-weight: $fontWeight600;
        line-height: 1.2;
        font-size: $fontSize20;
        color: $primaryFontColor;
    }
    .modal-header {
        padding: 24px 36px 23px 40px;
        border-bottom: 1px solid #e5e7eb;
        position: relative;
    }
    .modal-body-cont {
        padding: 40px 35px;
        @media (max-width: 767px) {
            padding: 20px;
        }
    }
    .modal-footer {
        border-top: 1px solid #e5e7eb;
        padding: 16px 32px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    p {
        font-family: $helveticaRegular;
        line-height: $lineHight16;
        font-weight: normal;
        color: $labelColor;
    }
    .cancel-no-btn,
    .cancel-yes-btn {
        @include buttonFormat(true);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 32px;
        font-size: 13px;
        cursor: pointer;
    }
    .cancel-no-btn {
        width: 88px;
        border: 1px solid #d1d5db;
        color: #374151;
        font-weight: 500;
    }
    .cancel-yes-btn {
        background: #de350b;
        width: 190px;
        margin-left: 8px;
    }
}
.modal-open .p-toast {
    z-index: 9999 !important;
}
@media (max-width: 767px) {
    .modal-overlay {
        .custom-modal {
            width: 95%;
            max-width: 95%;
            min-width: 95%;
        }
    }
    .flex {
        display: block !important;
    }
}
</style>
