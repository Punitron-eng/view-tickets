<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
        <div class="custom-modal" @click.stop>
            <div class="modal-body">
                <div class="delete-outer-section">
                    <!-- <div class="model-message-1 poppins-semibold">Delete Data? </div> -->
                    <div class="model-message-1 poppins-semibold">{{ deleteHeading }}</div>
                    <img v-if="darkModeVal != true" class="cursor-pointer close-icon" src="../../assets/images/modal-close-icon.svg" alt="close-icon" @click="$emit('close-modal')" />
                    <img v-else class="cursor-pointer close-icon" src="../../assets/images/dark-mode/dark-modal-close-icon.svg" alt="close-icon" @click="$emit('close-modal')" />
                </div>
                <div class="helvetica-regular gray-700">{{ modalDescription }}</div>
                <slot name="body"></slot>
            </div>
            <div class="modal-footer">
                <button class="btn activation-close-btn helvetica-medium ml-auto cursor-pointer" @click="$emit('close-modal')">No</button>
                <!-- <slot name="deletebtn"></slot> -->
                <button class="cancel-yes-btn helvetica-medium gray-700" :class="loading ? 'pointer-events-none' : ''" @click="props.actionBtnHandler">
                    <div v-if="loading"><i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i></div>
                    <div v-else>{{ actionBtnText }}</div>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, defineEmits, defineProps } from 'vue';
import { DARKMODE } from '../../store/dark-mode/constants';
const store = useStore();
import { useStore } from 'vuex';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const emit = defineEmits(['close-modal']);
const props = defineProps(['deleteHeading', 'modalDescription', 'actionBtnHandler', 'actionBtnText', 'loading']);
</script>

<style lang="scss">
@import '../../assets/itl-common-css/common-css.scss';

.cancel-yes-btn {
    width: 128px;
    height: 32px;
    background: #de350b;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    border-radius: 50px;
    font-weight: 500;
    border: none;
    cursor: pointer;
}

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
    // backdrop-filter: blur(11px);
    // backdrop-filter: brightness(0.5);
    background: rgb(0 0 0 / 17%);
    display: flex;
    align-items: center;
    justify-content: center;

    .custom-modal {
        @include theme() {
            background-color: theme-get('background');
        }

        max-width: 464px;
        position: relative;

        .close-icon {
            position: absolute;
            top: 16px;
            right: 16px;
        }

        @media (max-width: 767px) {
            width: 288px;
        }

        border-radius: 12px;
        margin: 1.73rem auto;
        box-shadow: 0 0.25rem 0.5rem rgb(0 0 0 / 10%);
        transform: none;

        .modal-body {
            padding: 2rem 2rem 2.5rem;

            @media (max-width: 767px) {
                padding: 2.0625rem 1.5rem 2.5rem;
            }

            .delete-outer-section {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .model-message-1 {
                font-size: 24px;
                font-weight: 500;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.33;

                @include theme() {
                    color: theme-get('wismo-modal-color');
                }

                margin-bottom: 8px;
            }

            .cursor-pointer {
                cursor: pointer;
            }

            .model-message-2 {
                font-size: $fontSize14;
                font-weight: normal;
                line-height: 1.5;
                color: #374151;
            }
        }

        .modal-footer {
            padding: 1rem 2rem;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            .activation-close-btn {
                width: 88px;
                height: 32px;
                display: flex;
                justify-content: center;
                align-items: center;

                @include theme() {
                    background: theme-get('background');
                    color: theme-get('input-text-clr');
                    border: 1px solid theme-get('cancel-button-border');
                }

                border-radius: 50px;
                margin-right: 8px;
                font-size: 13px;
                cursor: pointer;

                font-weight: 500;
            }

            .activation-delete-btn {
                width: 128px;
                height: 32px;
                background: #de350b;
                color: #fff;
                display: flex;
                border: none;
                justify-content: center;
                align-items: center;
                font-size: 13px;
                border-radius: 50px;
                font-weight: 500;
            }
        }
    }
}
</style>
