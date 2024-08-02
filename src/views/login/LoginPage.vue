<template>
    <div class="content">
        <div class="row sign-in-form grid">
            <div class="md:col-6 xl:col-6 flex-order-2 order-2 md:flex-order-0 p-0 m-0 login-form-outer-1">
                <div class="logistics-logo hidden md:block">
                    <img src="@/assets/images/ithinklogistics-logo.svg" alt="" class="logo-img" />
                </div>
                <div class="login-form-innerdiv">
                    <form method="POST" @submit.prevent="submitForm" id="login_form" class="form-start helvetica-regular">
                        <div class="login-heading-font poppins-semibold">Sign in</div>
                        <div class="form-group relative input-icon">
                            <img :src="config.baseUrlImages + 'input-email-icon.svg'" class="input-email" />
                            <input type="email" name="email" v-model="email" class="form-control input-field helvetica-regular" placeholder="Email ID" />
                        </div>
                        <div class="form-group relative helvetica-medium has-feedback has-feedback-left">
                            <img :src="config.baseUrlImages + 'input-password-icon.svg'" class="input-password" />
                            <input type="password" name="password" v-model="password" class="form-control input-field helvetica-regular" placeholder="Password" />
                            <img :src="config.baseUrlImages + 'input-password-hide-icon.svg'" class="input-password-hide-view login-toggle-pass" />
                            <img :src="config.baseUrlImages + 'input-password-view-icon.svg'" toggle="#password" class="input-password-view login-toggle-pass" />
                        </div>
                        <div class="form-group sign-btn">
                            <button type="submit" class="submit-btn btn-block helvetica-regular cursor-pointer">Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="md:col-6 xl:col-6 order-1 md:flex-order-2 p-0 m-0 login-form-outer-2">
                <div class="logistics-logo-md d-block d-md-none md:hidden">
                    <img :src="config.baseUrlImages + 'ithinklogistics-logo.svg'" class="logo-img" />
                </div>
                <div class="login-form-innerdiv">
                    <div class="login-form-right-content">
                        <img :src="config.baseUrlImages + 'login-page-img.svg'" class="image-sign-up" />
                        <div class="sign-in-text helvetica-regular">
                            <div class="login-discrip-heading">Get started for FREE</div>
                            <span>Sign up for free and start shipping with your<br />preferred courier partner.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { getUser } from '../../api/LoginSubmit';
import { Md5 } from 'ts-md5';
import { GetUserResponse } from '../../type';
import { mapMutations } from 'vuex';
import { LOGIN } from '../../store/login/constants';
import config from '../../util/config';

export default defineComponent({
    name: 'LoginPage',
    components: {},
    data() {
        return {
            email: '',
            password: '',
            formIsValid: true,
            config: config,
        };
    },
    methods: {
        ...mapMutations(LOGIN.NAME, ['updateLoginStatus']),
        async submitForm() {
            this.validateForm();
            if (this.formIsValid) {
                const encryptPassword = this.encryptToMD5();
                const responseData: GetUserResponse = await getUser(this.email, encryptPassword);
                if (responseData.request_token) {
                    sessionStorage.setItem('accessToken', responseData.request_token);
                    this.updateLoginStatus(true);
                    this.$router.push({ name: 'ViewPickUp' });
                }
            }
        },
        encryptToMD5() {
            return Md5.hashStr(this.password);
        },
        validateForm() {
            this.formIsValid = true;
            if (this.email === '' || !this.email.includes('@') || this.password.length < 6) {
                this.formIsValid = false;
            }
        },
    },
    mounted() {
        if (this.$route.name === 'LoginPage') {
            (document.body as HTMLElement).classList.add('login-page');
        } else {
            (document.body as HTMLElement).classList.remove('login-page');
        }
    },
});
</script>
<style lang="scss">
@import './public/layout/css/common-css.scss';
.login-page .layout-main {
    padding: 0 !important;
}
.content {
    min-height: 100vh;
    padding: 0px;
    overflow: hidden;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
}
.sign-in-form {
    height: 102vh;
    .login-form-outer-1 {
        background: #e8effb;
    }
    .login-form-outer-2 {
        background: #ffff;
    }
    .logistics-logo {
        position: absolute;
        padding-left: 40px;
        padding-top: 40px;
        z-index: 1;
    }
    .login-form-innerdiv {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .login-heading-font {
        font-weight: $fontWeight600;
        line-height: 40px;
        font-size: 40px;
        color: #1f2937;
        margin-bottom: 54px;
    }
    .form-start {
        text-align: center;
    }
    .input-icon {
        padding-bottom: 40px;
    }
    .input-email {
        width: 20px;
    }
    .input-password,
    .input-email,
    .input-password-view {
        position: absolute;
        top: 19px;
        left: 22px;
    }
    input.input-field {
        width: 100%;
        height: 60px;
        border-radius: 32px;
        padding: 8px 56px;
        background-color: #fff;
        border: none;
    }
    .form-control {
        line-height: 16px;
        font-size: 16px;
    }
    .input-password-hide-view {
        position: absolute;
        cursor: pointer;
        left: auto;
        right: 22px;
        top: 19px;
        display: inline-block;
        z-index: 2;
    }
    .input-password-view {
        cursor: pointer;
        left: auto;
        right: 22px;
        top: 19px;
        position: absolute;
        display: none;
        z-index: 2;
    }
    .sign-btn {
        padding-bottom: 32px;
        padding-top: 32px;
    }
    .submit-btn {
        border-radius: 50px;
        width: 100%;
        padding: 8px;
        background-color: #0052cc;
        color: #fff !important;
        border: none;
        height: 60px;
        line-height: 16px;
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
    }
    .sign-in-text {
        text-align: center;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #6b7280;
    }
    .login-discrip-heading {
        padding-top: 43px;
        padding-bottom: 24px;
        margin-bottom: 0px;
        color: #172b4d;
        font-family: Poppins-SemiBold;
        font-weight: 600;
        line-height: 40px;
        font-size: 32px;
    }
    @media (min-width: 1023px) and (max-width: 1199px) {
        .image-sign-up {
            width: 357px;
        }
        .login-form-outer-2 {
            background: #fff;
        }
        .input-icon {
            padding-bottom: 24px;
        }
        img.logo-img {
            height: 32px;
        }
    }
    @media (min-width: 768px) and (max-width: 1023px) {
        .image-sign-up {
            width: 375px;
        }
        .login-heading-font {
            padding-top: 80px;
        }
        .input-icon {
            padding-bottom: 24px;
        }
        .content {
            background: #e8effb;
        }
        .login-form-outer-2 {
            background: #fff;
        }
        img.logo-img {
            height: 32px;
        }
    }
    @media (max-width: 767px) {
        .login-form-outer-1,
        .login-form-outer-2 {
            width: 100%;
            position: relative;
        }
        .sign-in-text {
            display: none;
        }
        .image-sign-up {
            margin: 0 auto;
            display: block;
            width: 255.68px;
            margin-top: 56px;
            margin-bottom: 15px;
        }
        .logo-img {
            height: 24px;
        }
        .logistics-logo-md {
            position: absolute;
            padding-left: 40px;
            z-index: 1;
            top: 22px;
        }
        .login-form-outer-2 {
            background: #fff;
            margin-top: 0px;
        }
        .login-heading-font {
            margin-bottom: 32px;
            padding-top: 40px;
            line-height: 24px;
            font-size: 28px;
        }
        .helvetica-regular {
            line-height: 16px;
            font-size: 13px;
        }
        input.input-field {
            height: 40px;
            padding-left: 50px;
            padding-right: 50px;
        }
        .submit-btn {
            height: 40px;
        }
        .input-email,
        .input-password,
        .input-password-hide-view,
        .input-password-view {
            width: 16px;
            height: 16px;
        }
        .input-password,
        .input-email,
        .input-password-hide-view,
        .input-password-view {
            position: absolute;
            top: 12px;
            left: 22px;
        }
        .input-password-hide-view,
        .input-password-view {
            left: auto;
            right: 22px;
            top: 14px;
        }
        .input-icon {
            padding-bottom: 16px;
        }
        .rem-forgot {
            padding-top: 24px;
            padding-bottom: 24px;
        }
        .input-password {
            width: 11.64px;
        }
        height: auto;
    }
    @media (min-width: 1200px) {
        .logo-img {
            height: 32px;
        }
        .input-icon {
            padding-bottom: 24px;
        }
        form#login_form {
            width: 434px;
        }
    }
}
@media (max-width: 767px) {
    .content {
        background: #e8effb;
    }
}
</style>
