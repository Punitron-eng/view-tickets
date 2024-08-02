<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
        <div class="custom-modal" @click.stop>
            <div class="modal-body activation-modal-body">
                <div class="connect-activate-img-section">
                    <img src="@/assets/images/connect-activate-icon.svg" alt="connect-activate-icon" />
                </div>
                <div class="model-message-1 poppins-semibold">Thank you for Choosing Connect+</div>
                <div class="model-message-2 helvetica-medium">Your <b>Connect+ </b> activation request has been received! Our dedicated team will be reaching out to you shortly to assist you with the next steps.</div>
            </div>
            <div class="modal-footer">
                <button class="btn activation-close-btn helvetica-medium ml-auto cursor-pointer" @click="$emit('close-modal')">OK</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'ConnectPlusActivationModel',
    data() {
        return {};
    },
});
</script>

<style lang="scss">
@import '../../assets/itl-common-css/common-css.scss';
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
    .custom-modal {
        @include theme(){
            background-color: theme-get('background');
        }
        max-width: 464px;
        @media (max-width: 767px) {
            width: 288px;
        }
        border-radius: 12px;
        margin: 1.73rem auto;
        box-shadow: 0 0.25rem 0.5rem rgb(0 0 0 / 10%);
        transform: none;
        .activation-modal-body {
            padding: 4rem 4rem 2.5rem;
            @media (max-width: 767px) {
                padding: 2.0625rem 1.5rem 2.5rem;
            }
            @include theme(){
                border-bottom: 1px solid theme-get('wismo-border');
            }
            
            .connect-activate-img-section {
                display: flex;
                justify-content: center;
                align-items: center;
                padding-bottom: 24px;
            }
            .model-message-1 {
                text-align: center;
                font-size: 24px;
                font-weight: 500;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.33;
                padding-bottom: 32px;
                @include theme(){
                    color: theme-get('wismo-modal-color');
                }
            }
            .model-message-2 {
                font-size: $fontSize16;
                font-weight: normal;
                line-height: 1.5;
                @include theme(){
                    color: theme-get('input-text-clr');
                }
            }
        }
        .modal-footer {
            padding: 1rem 2rem;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .activation-close-btn {
                width: 104px;
                height: 32px;
                flex-grow: 0;
                padding: 0 42px;
                border-radius: 50px;
                border: solid 1px #0049b0;
                background-color: #0052cc;
                color: #ffff;
                font-size: $fontSize13;
                font-weight: $fontWeight500;
                line-height: 1.23;
            }
        }
    }
}
</style>
