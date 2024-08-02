<script setup>
import { ref, defineEmits } from 'vue';
import config from '@/util/config';
const isWhatsappActive = ref(true);
const isSmsActive = ref(false);
const isEmailActive = ref(false);
const emit = defineEmits(['close-modal']);
const closeModal = () => {
    emit('close-modal');
};

const tabChanges = (tab) => {
    isWhatsappActive.value = tab === 'whatsapp';
    isSmsActive.value = tab === 'sms';
    isEmailActive.value = tab === 'email';
};

const getFilterIconSrc = (iconName) => {
    return iconName ? require(`@/assets/images/${iconName}.png`) : null;
};
</script>

<template>
    <div class="modal-overlay" @click="closeModal">
        <div class="view-template-custom-modal" @click.stop>
            <div class="modal-header">
                <span class="model-heading">Preview</span>
            </div>
            <div class="modal-body">
                <div class="outer">
                    <div class="left-side-tab-section">
                        <div class="whatsapp-main-outer-section helvetica-regular"
                            :class="{ 'show-whatsapp-active': isWhatsappActive }" @click="tabChanges('whatsapp')">
                            WhatsApp</div>
                        <div class="sms-main-outer-section helvetica-regular"
                            :class="{ 'show-sms-active': isSmsActive }" @click="tabChanges('sms')">SMS</div>
                        <div class="email-main-outer-section helvetica-regular"
                            :class="{ 'show-email-active': isEmailActive }" @click="tabChanges('email')">Email</div>
                    </div>
                    <div class="image-section">
                        <img v-if="isWhatsappActive" src="../../assets/images/OS-whatsapp.png"
                            class="whatsapp-view-template-img" alt="whatsapp-template-icon" />
                        <img v-if="isSmsActive" src="../../assets/images/os-sms-view-img.png"
                            class="sms-view-template-img" alt="sms-template-icon" />
                        <img v-if="isEmailActive" src="../../assets/images/os-email-view-img.png"
                            alt="email-template-icon" class="email-template-img" />
                    </div>
                </div>
                <hr />
                <div class="view-close">
                    <button class="view-close-btn" @click="closeModal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../../assets/itl-common-css/common-css.scss';

.modal-header {
    @include theme() {
        border-bottom: 1px solid theme-get('border-bottom');
    }

    padding: 20px 0px 19px 24px !important;
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid #f1f3f5;
}

.whatsapp-view-template-img {
    width: 300px;
}

.outer {
    display: flex;

    @media (max-width: 767px) {
        display: block;
    }
}

.image-section {
    display: flex;
    align-items: center;
    margin: 0 auto;
    padding-top: 38px;
    padding-bottom: 56px;

    @media (max-width: 767px) {
        justify-content: center;
    }
}

.modal-footer {
    padding: 0.938rem 1.25rem 1.25rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .filter-button-apply,
    .filter-button-apply:hover,
    .filter-button-apply:focus,
    .filter-button-apply:active {
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        box-shadow: none !important;
        border-radius: 16px;
        background-image: linear-gradient(to bottom, #1ea2fa, #168afc 97%, #0e6fff);
        padding: 8px 28px;
        height: 34px;
        border: none;
        color: #fff;
        cursor: pointer;
    }

    .apply-reset-btn {
        padding-top: 0;
        padding-bottom: 0;
    }

    .filter-button-reset,
    .filter-button-reset:hover,
    .filter-button-reset:focus,
    .filter-button-reset:active {
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #0052cc;
        box-shadow: none !important;
        background: #fff !important;
        border: none;
        color: #0052cc;
        padding-top: 8px;
        cursor: pointer;
    }
}

.pi {
    font-weight: bold;
    font-size: 16px;
}

[type='button']:not(:disabled),
[type='reset']:not(:disabled),
[type='submit']:not(:disabled),
button:not(:disabled) {
    cursor: pointer;
}

.w-100 {
    width: 100%;
}

.heading-text {
    font-size: 1.25rem;
}

#modal_lazyload_content_div {
    padding-top: 16px;
    max-height: 230px;
    overflow: auto;
}

.modal-body {
    .left-side-tab-section {
        @include theme() {
            background-color: theme-get('wismo-modal-bg');
        }

        background-color: #f2f4f7;
        width: 178px;

        @media (max-width: 767px) {
            display: flex;
            width: auto;
            border-bottom-left-radius: 0;
        }

        .whatsapp-main-outer-section {
            @include theme() {
                color: theme-get('black-900');
            }

            padding: 16px 24px;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.14;
            letter-spacing: normal;
            color: #1f2937;
            cursor: pointer;
        }

        .show-whatsapp-active {
            @include theme() {
                color: theme-get('black-900');
                background-color: theme-get('card-bg');
            }

            color: #1f2937;
            position: relative;
            background-color: #fff;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.14;
            letter-spacing: normal;

            font-family: $interRegular;

            @media (max-width: 767px) {
                background: transparent;
            }

            &::after {
                content: '';
                height: 100%;
                position: absolute;
                background: #1d2939;
                width: 2px;
                top: 0;
                left: 0;

                @media (max-width: 767px) {
                    left: 63px;
                    top: auto;
                    height: 79px;
                    bottom: -38px;
                    transform: rotate(90deg);
                }
            }
        }

        .email-main-outer-section {
            @include theme() {
                color: theme-get('black-900');
            }

            padding: 16px 24px;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.14;
            letter-spacing: normal;
            color: #1f2937;
            cursor: pointer;
        }

        .show-email-active {
            @include theme() {
                color: theme-get(' black-900');
                background-color: theme-get('card-bg');
            }

            position: relative;
            background-color: #fff;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.14;
            letter-spacing: normal;
            color: #1f2937;
            font-family: $interRegular;

            @media (max-width: 767px) {
                background: transparent;
            }

            &::after {
                content: '';
                height: 100%;
                position: absolute;
                background: #1d2939;
                width: 2px;
                top: 0;
                left: 0;

                @media (max-width: 767px) {
                    top: auto;
                    left: 47px;
                    transform: rotate(90deg);
                    bottom: -23px;
                }
            }
        }

        .show-sms-active {
            @include theme() {
                color: theme-get(' black-900');
                background-color: theme-get('card-bg');
            }

            position: relative;
            background-color: #fff;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.14;
            letter-spacing: normal;
            color: #1f2937;
            font-family: $interRegular;

            @media (max-width: 767px) {
                background: transparent;
            }

            &::after {
                content: '';
                height: 100%;
                position: absolute;
                background: #1d2939;
                width: 2px;
                top: 0;
                left: 0;

                @media (max-width: 767px) {
                    top: auto;
                    left: 45px;
                    bottom: -23px;
                    transform: rotate(90deg);
                }
            }
        }

        .sms-main-outer-section {
            @include theme() {
                color: theme-get('black-900');
            }

            padding: 16px 24px;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.14;
            letter-spacing: normal;
            color: #1f2937;

            cursor: pointer;
        }
    }
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
    backdrop-filter: blur(11px);
}

.view-template-custom-modal {
    @include theme() {
        background-color: theme-get('card-bg');
    }

    max-width: 752px;
    margin: 1.73rem auto;
    border-radius: 12px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    background-color: #fff;

    .modal-body {
        border-radius: 12px;
    }

    @media (max-width: 767px) {
        margin-left: 8px !important;
        margin-right: 8px !important;
        width: 96% !important;
    }
}

.close-img {
    width: 25px;
}

.close {
    cursor: pointer;
    margin-left: auto;
}

.email-template-img {
    width: 100%;
    border-radius: 12.8px;
    // box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    // border-style: solid;
    // border-width: 1px;
    border-image-source: linear-gradient(to bottom, #ccc 0%, rgba(210, 214, 219, 0) 100%);
    border-image-slice: 1;
    background-image: linear-gradient(to bottom, #fff, #fff), linear-gradient(to bottom, #ccc 0%, rgba(210, 214, 219, 0) 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
}

.view-close {
    text-align: end;
}

hr {
    margin: unset;
}

.view-close-btn {
    width: 80px;
    height: 32px;
    color: white;
    margin: 12px 16px;
    padding: 8px 16px 10px;
    background-color: #1279ff;
    border-radius: 4px;
    font-size: 12px;
    border-color: #1279ff;
    border: 1px solid #1279ff;
    font-family: $interSemiBold;
}

.sms-view-template-img {
    height: 480px;
    width: 240px;
}

img.whatsapp-view-template-img {
    height: 480px;
    width: 240px;
}

img.email-template-img {
    height: 480px;
    width: 240px;
}
</style>
