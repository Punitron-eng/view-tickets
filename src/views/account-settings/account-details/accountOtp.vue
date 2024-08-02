<script setup>
import { onMounted, ref, computed, watch, onBeforeMount, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { useCookies } from 'vue3-cookies';
import { useToast } from 'primevue/usetoast';
import { ACCOUNTSETTINGS } from '../../../store/account-settings/constants';

const store = useStore();
const toast = useToast();
const { cookies } = useCookies();

const visible = ref(false);
const topHeader = ref(JSON.parse(localStorage.getItem('top_header')));
const otp1 = ref();
const otp2 = ref();
const otp3 = ref();
const otp4 = ref();
const minutes = ref(2);
const seconds = ref(0);
const isTimerRunning = ref(false);
const isLoading = ref(false);

const isSendOtp = computed(() => store.getters[`${ACCOUNTSETTINGS.NAME}/getIsSendOtp`]);
const getMobile = computed(() => store.getters[`${ACCOUNTSETTINGS.NAME}/getMobile`]);
onBeforeMount(() => {
    document.body.classList.add('rate-chart-parent-class');
    document.body.classList.add('verify-otp-modal');
});

onBeforeUnmount(() => {
    document.body.classList.remove('rate-chart-parent-class');
    document.body.classList.remove('verify-otp-modal');
});
onMounted(async () => {
    if (topHeader.value.user_type == 3) {
        visible.value = true;
        document.body.classList.add('verify-otp-modal');

        if (isSendOtp.value == '1') {
            await store.dispatch(`${ACCOUNTSETTINGS.NAME}/sendOtp`);
            visible.value = false;
        } else {
            visible.value = true;
        }
    }
});

const verifyOtp = async () => {
    if (isAllOtpFields.value) {
        isLoading.value = true;
        // debugger;
        const res = await store.dispatch(`${ACCOUNTSETTINGS.NAME}/verifyOtp`, { otp_1: otp1.value, otp_2: otp2.value, otp_3: otp3.value, otp_4: otp4.value, mobile_token: cookies.get('mobile_token') });

        if (res.status == 'error') {
            toast.add({ severity: 'error', summary: 'Error Message', detail: res.html_message, life: 3000 });
            otp1.value = '';
            otp2.value = '';
            otp3.value = '';
            otp4.value = '';
        } else {
            toast.add({ severity: 'success', summary: 'Success Message', detail: res.html_message, life: 3000 });
            visible.value = false;
            document.body.classList.remove('verify-otp-modal');
            otp1.value = '';
            otp2.value = '';
            otp3.value = '';
            otp4.value = '';

            if (res.replace_mobile_token == 1) {
                cookies.set('mobile_token', res.mobile_token);
            }
            store.dispatch(`${ACCOUNTSETTINGS.NAME}/setIsSendOtp`, 1);
            const res1 = await store.dispatch(`${ACCOUNTSETTINGS.NAME}/fetchDefaultData`, { mobile_token: cookies.get('mobile_token') });
        }
        isLoading.value = false;
    }

    // its for submit button 
    store.dispatch(`${ACCOUNTSETTINGS.NAME}/setIsSendOtp`, 1);
    visible.value = false;
};

const resendOtp = async () => {
    // shouldResendOtp.value = false;
    otp1.value = '';
    otp2.value = '';
    otp3.value = '';
    otp4.value = '';
    minutes.value = 2;
    seconds.value = 0;
    const res = await store.dispatch(`${ACCOUNTSETTINGS.NAME}/sendOtp`, { mobile_token: cookies.get('mobile_token') });
    if (res.status == 'success') {
        toast.add({ severity: 'success', summary: 'Success Message', detail: res.html_message, life: 3000 });
        cookies.set('mobile_token', res.mobile_token);
    } else {
        toast.add({ severity: 'error', summary: 'Error Message', detail: res.html_message, life: 3000 });
    }

    if (res.replace_mobile_token == 1) {
        cookies.set('mobile_token', res.mobile_token);
    }

    isTimerRunning.value = true;
    const timerInterval = setInterval(() => {
        if (minutes.value === 0 && seconds.value === 0) {
            clearInterval(timerInterval);
            isTimerRunning.value = false;
            return;
        }

        if (seconds.value === 0) {
            minutes.value--;
            seconds.value = 59;
        } else {
            seconds.value--;
        }
    }, 1000);
};

const focusNextInput = (e, id) => {
    if (e.data == null) {
        document.getElementById('inp-' + id).focus();
    } else {
        if (id != 4) {
            document.getElementById('inp-' + (id + 1)).focus();
        } else {
            console.log(document.getElementById('other').focus());
        }
    }

    if (id == 1) otp1.value = e.data;
    if (id == 2) otp2.value = e.data;
    if (id == 3) otp3.value = e.data;
    if (id == 4) otp4.value = e.data;
};

// const setValues = (e, id) => {
//     console.log(e.key)
//     if (id == 0) {
//         otp1.value = e.key;
//     } else if (id == 1) {
//         otp2.value = e.key;
//     } else if (id == 2) {
//         otp3.value = e.key;
//     } else {
//         // otp4.value = e.key;
//         console.log(otp4.value[String(otp4.value).length])
//         // otp4.value = otp4.value % 10;
//     }
// }

const isAllOtpFields = computed(() => {
    if (otp1.value && otp2.value && otp3.value && otp4.value) return true;

    return false;
});

watch(
    () => isSendOtp.value,
    () => {
        visible.value = isSendOtp.value == '0' && topHeader.value.user_type == 3 ? true : false;
    }
);

const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
};
</script>

<template>
    <div class="verify-otp" id="verify-otp">
        <DialogView
            id="rcVerifyOtpModal"
            v-model:visible="visible"
            :closeOnEscape="false"
            modal
            :draggable="false"
            :style="{ width: '40rem', margin: 'auto 10px !important', height: 'auto !important' }"
            :breakpoints="{ '1199px': '75vw', '575px': '100vw' }"
        >
            <div class="m-0 modal-body">
                <div class="img">
                    <img src="../../../assets/images/logistics/kyc-modal-otp.svg" alt="Verify Otp Image" />
                </div>
                <div class="enter-otp-txt">Enter OTP</div>
                <div class="otp-sent-text">
                    OTP has been sent to <span class="mobile-number">{{ getMobile }}</span>
                </div>
                <div class="inputs-parent">
                    <!-- <input type="number" v-model="otp1" @keydown="focusNextInput($event, '2')" class="input" maxlength="1"
                        minlength="1" id="inp-1">
                    <input type="number" v-model="otp2" @keydown="focusNextInput($event, '3')" class="input" maxlength="1"
                        minlength="1" id="inp-2">
                    <input type="number" v-model="otp3" @keydown="focusNextInput($event, '4')" class="input" maxlength="1"
                        minlength="1" id="inp-3">
                    <input type="number" v-model="otp4" @keydown="focusNextInput($event, '4'); setValues($event, 3)" class="input" maxlength="1"
                        minlength="1" id="inp-4"> -->
                    <input type="number" class="input" v-model="otp1" maxlength="1" @input="focusNextInput($event, 1)" id="inp-1" />
                    <input type="number" class="input" v-model="otp2" maxlength="1" @input="focusNextInput($event, 2)" id="inp-2" />
                    <input type="number" class="input" v-model="otp3" maxlength="1" @input="focusNextInput($event, 3)" id="inp-3" />
                    <input type="number" class="input" v-model="otp4" maxlength="1" @input="focusNextInput($event, 4)" id="inp-4" />
                </div>
                <div class="not-received-text">Didn't receive yet? <span @click="resendOtp" :class="[isTimerRunning ? 'resend-text-disabled' : '']" class="resend-text">Resend</span></div>
                <div v-show="isTimerRunning" class="wait-text">
                    You can resend otp within <span class="timer-text">{{ formatTime(minutes) }} : {{ formatTime(seconds) }}</span> seconds.
                </div>
            </div>
            <template #footer>
                <div class="actions-btns">
                    <input class="w-[1px] h-[1px]" readonly id="other" />
                    <button class="submit-btn" @click="verifyOtp()" :class="[isLoading ? 'disable-pointer-events' : '']" autofocus>
                        <div v-if="isLoading">
                            <i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i>
                        </div>
                        <div v-else>Submit</div>
                    </button>
                </div>
            </template>
        </DialogView>
    </div>
    <ToastView />
</template>

<style lang="scss">
@import '../../../assets/itl-common-css/common-css.scss';

#rcVerifyOtpModal .p-dialog-header {
    @include theme() {
        background-color: theme-get('background');
        border-bottom: 1px solid theme-get('border-black-500');
    }
    .p-dialog-header-icon {
        display: none !important;
    }
}

#rcVerifyOtpModal .p-dialog-content {
    @include theme() {
        background-color: theme-get('background');
        border-bottom: 1px solid theme-get('border-black-500');
    }

    .modal-body {
        border: none !important;
    }
}

#rcVerifyOtpModal .p-dialog-footer {
    @include theme() {
        background-color: theme-get('background');
        border-bottom: 1px solid theme-get('border-black-500');
    }

    .submit-btn {
        
        @include theme() {
            border: 1px solid theme-get('submit-btn-border');
        }
    }
}
.p-dialog-header-icons {
    background: palegreen;
}
.verify-otp-modal {
    .p-dialog .p-dialog-header {
        border-bottom: none !important;
    }

    .p-dialog .p-dialog-footer {
        padding: 1rem;
    }

    .actions-btns {
        display: block;
        justify-content: space-between;
        align-items: center;
        margin-right: 0px;
        .submit-btn {
                background-color: $backgroundBlue;
                color: $whiteColor;
                outline: none;
                width: 80px;
                height: 32px;

                // border: 1px solid #d1d5db;

                border-radius: 50px;
                cursor: pointer;
                font-family: $helveticaRegular;
                padding: 2px 0px;
            }
    }

    .disable-pointer-events {
        pointer-events: none;
    }
}

.rate-chart-parent-class {
    .modal-body {
        .img {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .enter-otp-txt {
            font-size: 24px;
            line-height: 24px;
            font-weight: 600;
            font-family: $poppinsSemiBoldFont;

            // color: #505f79;
            @include theme() {
                color: theme-get('verify-otp-modal-heading');
            }

            text-align: center;
            margin-top: 18px;
        }

        .otp-sent-text {
            margin-top: 8px;

            // color: #374151;
            @include theme() {
                color: theme-get('verify-otp-modal-subheading');
            }

            font-family: $helveticaRegular;
            text-align: center;

            .mobile-number {
                font-weight: 800;
            }
        }

        .inputs-parent {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 38px 0px;
            gap: 16px;

            .input {
                width: 40px;
                height: 40px;
                // background: #FFFFFF;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                text-align: center;
                font-family: $helveticaRegular;
                font-size: 20px;
                line-height: 24px;

                // color: #374151;
                @include theme() {
                    color: theme-get('dark-500');
                    background-color: theme-get('thead-bg');
                    // border: 1px solid theme-get("border-black-400");
                }

                padding: 8px;
            }

            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }

            /* Firefox */
            input[type='number'] {
                -moz-appearance: textfield;
            }
        }

        .not-received-text {
            // color: #3d4249;
            @include theme() {
                color: theme-get('verify-otp-modal-subheading');
            }

            font-size: 14px;
            font-family: $helveticaMedium;
            text-align: center;
            line-height: 16px;
            font-weight: 500;

            .resend-text {
                cursor: pointer;
                color: #0052cc;

                &:hover {
                    @include theme() {
                        color: theme-get('black-500');
                    }
                }
            }

            .resend-text-disabled {
                color: gray;
                pointer-events: none;
            }
        }

        .wait-text {
            text-align: center;

            // color: #374151;
            @include theme() {
                color: theme-get('verify-otp-modal-subheading');
            }

            font-size: 13px;
            padding-top: 8px;

            .timer-text {
                color: red;
            }
        }

        .actions-btns {
            margin-right: 18px;
            .cancel-btn {
                background-color: $whiteColor;
                outline: none;
                width: 80px;
                height: 32px;
                border: 1px solid #d1d5db;
                border-radius: 50px;
                cursor: pointer;
                font-family: $helveticaRegular;
                padding: 2px 0px;
            }
        }
    }
    // .submit-btn {
    //     background-color: $backgroundBlue;
    //     color: $whiteColor;
    //     outline: none;
    //     width: 80px;
    //     height: 32px;

    //     // border: 1px solid #d1d5db;

    //     border-radius: 50px;
    //     cursor: pointer;
    //     font-family: $helveticaRegular;
    //     padding: 2px 0px;
    // }
}
</style>
