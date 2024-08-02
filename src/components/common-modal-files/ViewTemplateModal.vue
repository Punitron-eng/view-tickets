<script setup>
import { ref, defineProps, computed } from 'vue';
import config from '../../util/config';
import { useStore } from 'vuex';
import { DARKMODE } from '../../store/dark-mode/constants';
const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const dataVariables = ref({
    isShowDiv: false,
    responseText: '',
    config: config,
    isWhatsappActive: true,
    isSmsActive: false,
    isEmailActive: false,
});
const props = defineProps({
    headerTitle: {
        type: String,
    },
    whatsAppViewImg: {
        type: String,
    },
    smsViewImg: {
        type: String,
    },
    emailViewImg: {
        type: String,
    },
});
const tabChanges = (tabData) => {
    if (tabData.srcElement.classList[0] === 'whatsapp-main-outer-section') {
        dataVariables.value.isWhatsappActive = true;
    } else {
        dataVariables.value.isWhatsappActive = false;
    }
    if (tabData.srcElement.classList[0] === 'email-main-outer-section') {
        dataVariables.value.isEmailActive = true;
    } else {
        dataVariables.value.isEmailActive = false;
    }
    if (tabData.srcElement.classList[0] === 'sms-main-outer-section') {
        dataVariables.value.isSmsActive = true;
    } else {
        dataVariables.value.isSmsActive = false;
    }
};
const getFilterIconSrc = (iconName) => {
    if (iconName) {
        return new URL(`../../assets/images/${iconName}.png`, import.meta.url).href;
    } else {
        return null; // or provide a default image path here
    }
};
</script>
<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
        <div class="view-template-custom-modal" @click.stop>
            <div class="modal-header">
                <div class="heading-text poppins-semibold gray-800">{{ props.headerTitle }}</div>
                <img v-if="darkModeVal != true" class="close" src='../../assets/images/modal-close-icon.svg'
                    alt="close-svg" @click="$emit('close-modal')" />
                <img v-else class="close" src='../../assets/images/dark-mode/dark-modal-close-icon.svg' alt="close-svg"
                    @click="$emit('close-modal')" />
            </div>
            <div class="modal-body">
                <div class="outer">
                    <div class="left-side-tab-section">
                        <div class="whatsapp-main-outer-section helvetica-regular"
                            :class="dataVariables.isWhatsappActive ? 'show-whatsapp-active' : ''"
                            @click="tabChanges($event)">WhatsApp</div>
                        <div class="sms-main-outer-section helvetica-regular"
                            :class="dataVariables.isSmsActive ? 'show-sms-active' : ''" @click="tabChanges($event)">SMS
                        </div>
                        <div class="email-main-outer-section helvetica-regular"
                            :class="dataVariables.isEmailActive ? 'show-email-active' : ''" @click="tabChanges($event)">
                            Email</div>
                    </div>
                    <div class="image-section">
                        <img v-if="dataVariables.isWhatsappActive" :src="getFilterIconSrc(whatsAppViewImg)"
                            class="whatsapp-view-template-img" alt="whatsapp-template-icon" />
                        <img v-if="dataVariables.isSmsActive" :src="getFilterIconSrc(smsViewImg)"
                            class="sms-view-template-img" alt="sms-template-icon" />
                        <img v-if="dataVariables.isEmailActive" :src="getFilterIconSrc(emailViewImg)"
                            alt="email-template-icon" class="email-template-img" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
@import '../../assets/itl-common-css/common-css.scss';

.modal-header {
    padding: 24px 36px 23px 40px;
    border-bottom: 1px solid #e5e7eb;
    position: relative;
    border-top-left-radius: 0.1875rem;
    border-top-right-radius: 0.1875rem;
    display: flex;

    @include theme() {
        border-bottom: 1px solid theme-get('wismo-modal-border');
    }
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
    width: 100%;

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

        // color: #fff;
        @include theme() {
            background-color: theme-get('wismo-modal-bg');
        }

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
        box-shadow: none !important;

        // background: #fff !important;
        @include theme() {
            background-color: theme-get('background') !important;
            color: theme-get('checkbox-color');
        }

        border: none;
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

        // background-color: #f2f4f7;
        @include theme() {
            background-color: theme-get('wismo-modal-bg');
        }

        width: 178px;
        border-bottom-left-radius: 12px;

        @media (max-width: 767px) {
            display: flex;
            width: auto;
            border-bottom-left-radius: 0;
        }

        .whatsapp-main-outer-section {
            padding: 16px 30px;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.14;
            letter-spacing: normal;
            // color: #1f2937;
            cursor: pointer;
        }

        .show-whatsapp-active {
            position: relative;

            // background: #ffff;
            @include theme() {
                background-color: theme-get('background');
                color: theme-get('wismo-modal-color');
            }

            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.14;
            letter-spacing: normal;
            // color: #1f2937;
            font-family: 'HelveticaNowText-Medium';

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
            padding: 16px 30px;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.14;
            letter-spacing: normal;
            // color: #1f2937;
            cursor: pointer;
        }

        .show-email-active {
            position: relative;

            // background: #ffff;
            @include theme() {
                background-color: theme-get('background');
                color: theme-get('wismo-modal-color');
            }

            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.14;
            letter-spacing: normal;
            // color: #1f2937;
            font-family: 'HelveticaNowText-Medium';

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
            position: relative;

            // background: #ffff;
            @include theme() {
                background-color: theme-get('background');
                color: theme-get('wismo-modal-color');
            }

            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.14;
            letter-spacing: normal;
            // color: #1f2937;
            font-family: 'HelveticaNowText-Medium';

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
            padding: 16px 30px;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.14;
            letter-spacing: normal;
            // color: #1f2937;
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
    max-width: 752px;
    margin: 1.73rem auto;
    border-radius: 12px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

    // background-color: #fff;
    @include theme() {
        background-color: theme-get('wismo-modal-bg');
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
</style>