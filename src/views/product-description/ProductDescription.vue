<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';
import DropdownView from 'primevue/dropdown';
import ProductHeader from '../../components/product-description/ProductHeader.vue';
import { SetProductDescription } from '../../api/product-description/productDescriptionSubmit';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { productDescriptionVariables } from './productDescription';
import { useToast } from 'primevue/usetoast';
// Store Dark mode 
import { useStore } from 'vuex';
import { DARKMODE } from '../../store/dark-mode/constants';
const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
// Store Dark mode end here 

const toast = useToast();
const dataVariables = productDescriptionVariables;
const rules = computed(() => ({
    [dataVariables.value.productName]: { required: helpers.withMessage('This value is required.', required) }, // Matches this.productName
    [dataVariables.value.keywords]: { required: helpers.withMessage('This value is required.', required) }, // Matches this.keywords
    [dataVariables.value.toneType]: { required: helpers.withMessage('This value is required.', required) }, // Matches this.toneType
}));
onMounted(() => {
    document.body.classList.add('word-magic-outer');
});
onBeforeUnmount(() => {
    document.body.classList.remove('word-magic-outer');
});
// const $v = useVuelidate(rules, { [dataVariables.value.productName] [dataVariables.value.keywords], [dataVariables.value.toneType] });
const $v = useVuelidate({
    [dataVariables.value.productName]: rules,
    [dataVariables.value.keywords]: rules,
    [dataVariables.value.toneType]: rules,
});

const generateData = async () => {
    dataVariables.value.isLoading = true;
    const isFormCorrect = await $v.value.$validate();
    if (isFormCorrect) {
        dataVariables.value.disabledButton = true;
        const payloadData = {
            productName: dataVariables.value.productName,
            keyword: dataVariables.value.keywords,
            instruction: dataVariables.value.instruction,
            emojiData: dataVariables.value.emojiData,
            hashtagData: dataVariables.value.hashtagData,
            toneType: dataVariables.value.toneType,
        };

        const finalRes = await SetProductDescription(payloadData);
        if (finalRes.data.status == 200 || finalRes.data.ok == true) {
            dataVariables.value.isLoading = false;
            dataVariables.value.shows = false;
            dataVariables.value.generatedContent = finalRes.data.ok;
            dataVariables.value.productData = finalRes.data.response;
            dataVariables.value.disabledButton = false;
            toast.add({ severity: 'success', summary: 'Success', detail: 'Generated Successfully', life: 3000 });
        } else {
            dataVariables.value.isLoading = false;
            dataVariables.value.generatedContent = false;
            toast.add({ severity: 'error', summary: 'Error', detail: 'Error occurred ', life: 3000 });
            dataVariables.value.disabledButton = false;
        }
    } else {
        dataVariables.value.isLoading = false;
    }
};

const copyContent = (): void => {
    const pdfContent: HTMLElement | null = document.querySelector('.pdf-display');
    if (pdfContent) {
        const content: string = pdfContent.innerText;
        const formattedContent: string = ` ${content}`;
        const textarea: HTMLTextAreaElement = document.createElement('textarea');
        textarea.value = formattedContent;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        toast.add({ severity: 'success', summary: 'Success', detail: 'Copied', life: 3000 });
    }
};
</script>

<template>
    <div class="container-product">
        <ProductHeader />
        <div class="product-form">
            <div class="wrapper">
                <div class="form-box">
                    <form @submit.prevent="generateData" autocomplete="off">
                        <div class="input-container">
                            <div>
                                <label for="productname" class="helvetica-regular">Product Name<span class="dark-red">*</span></label>
                                <span class="helvetica-regular">{{ dataVariables.productName.length }} / 100</span>
                            </div>
                            <input type="text" required placeholder="Enter Product Name" id="productname" class="helvetica-regular" v-model.trim="dataVariables.productName" maxlength="100" />
                            <div v-if="dataVariables.productName == ''">
                                <div class="input-errors helvetica-regular" v-for="error of $v.$errors" :key="error.$uid">
                                    <div class="error-msg">{{ error.$message }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="input-container">
                            <div>
                                <label for="keywords" class="helvetica-regular">Keywords<span class="dark-red">*</span></label>
                                <span class="helvetica-regular">{{ dataVariables.keywords.length }} / 200</span>
                            </div>
                            <input type="text" required  placeholder="Enter keywords" id="keywords" class="helvetica-regular" v-model.trim="dataVariables.keywords" maxlength="200" />
                            <div v-if="dataVariables.keywords == ''">
                                <div class="input-errors helvetica-regular" v-for="error of $v.$errors" :key="error.$uid">
                                    <div class="error-msg">{{ error.$message }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="input-container">
                            <div>
                                <label for="instruction" class="helvetica-regular">Instruction</label>
                                <span class="helvetica-regular">{{ dataVariables.instruction.length }} / 2500</span>
                            </div>
                            <textarea id="instruction" placeholder="Enter Instruction" class="helvetica-regular" v-model.trim="dataVariables.instruction" maxlength="2500"></textarea>
                        </div>
                        <div class="input-container">
                            <label for="tone" class="helvetica-regular">Tone<span class="dark-red">*</span></label>
                            <DropdownView inputId="select"  class="form-control helvetica-medium" v-model="dataVariables.toneType" :options="dataVariables.toneTypeData" placeholder="Select Tone Type" optionLabel="name" optionValue="value" :autoOptionFocus="false">
                                <template #option="{ option }">
                                    <span>{{ option.name }}</span>
                                </template>
                            </DropdownView>
                            <div v-if="dataVariables.toneType == ''">
                                <div class="input-errors helvetica-regular" v-for="error of $v.$errors" :key="error.$uid">
                                    <div class="error-msg">{{ error.$message }}</div>
                                </div>
                            </div>
                        </div>
                        <span class="helvetica-regular">Include</span>
                        <div class="toggle-container">
                            <div class="toggle">
                                <span class="toggle-label">Emoji</span>
                                <label class="switch">
                                    <input type="checkbox" checked v-model="dataVariables.emojiData" />
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div class="toggle">
                                <span class="toggle-label">Hashtag </span>
                                <label class="switch">
                                    <input type="checkbox" v-model="dataVariables.hashtagData" />
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <button type="submit" class="btn helvetica-medium cursor-pointer" :disabled="dataVariables.disabledButton" id="btn">
                            <span v-if="dataVariables.isLoading"><i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i></span>
                            <span v-else>Generate Description</span>
                        </button>
                    </form>
                    <div class="chatgpt">
                        <img src="../../assets/images/Groups.svg" alt="chatgptlogo" />
                    </div>
                </div>

                <div v-if="dataVariables.shows" class="product-description">
                    <img  v-if="!darkModeVal" src="../../assets/images/Groupemoji.png" alt="men-emoji" />
                    <img v-else src="../../assets/images/dark-mode/dark-Groupemoji.png" alt="men-emoji" />
                    <h3>Let's create your product description !</h3>
                    <span>Fill in the details to get started.</span>
                </div>
                
                <div v-if="dataVariables.generatedContent" class="display-content">
                    <div class="pdf-display " v-html="dataVariables.productData" ></div>
                    <div class="copy-icon">
                        <img src="../../assets/images/fileicon.svg" @click="copyContent" alt="copyicon" class="copy-file" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ToastView />
</template>

<style lang="scss">
// @import '../../assets/sass/style.scss';
@import '../../assets/itl-common-css/common-css.scss';
@import '../product-description/productDescription.scss';

    .p-toast {
        @media screen and (max-width:370px) {
            width: 90vw !important;
        }
    }
.pdf-display{
    h1,h2,h3,h4,h5,h6,p,span,b{
        @include theme(){
            color:theme-get('black-800') !important;
        }
    }
}
.product-form .p-dropdown:not(.p-disabled):hover{
    @include theme(){
        border: 1px solid  theme-get('border-black-400') !important;
    }
}
.p-toast.p-toast-top-right{
    z-index: 99 !important;
}
.p-dropdown-panel{
    @include theme(){
        border: 1px solid  theme-get('border-black-400') !important;
    }
}
.p-dropdown-panel .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled):hover{
    // background-color: #3c4249 !important;
    @include theme(){
        background-color: theme-get('dropdown-hover') !important;
    }
}
.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight{
    font-weight: bold;
    @include theme(){
        background-color: theme-get('dropdown-hover-active') !important;
    }
}

.container-product{
    width: 100vw !important;
    @include theme() {
            background-color: theme-get('body-bg') !important;
        }

}
.p-dropdown-panel {
    .p-dropdown-items-wrapper{
        @include theme() {
            background-color: theme-get('body-bg') !important;
        }
    }
}
.pdf-display,
form {
    @include theme() {
        background-color: theme-get('card-bg');
    }
    @include theme() {
        border: 1px, solid, theme-get('card-bg');
    }
    border-radius: 12px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
span {
    font-size: 12px;
}
.toggle-label{

    @include theme(){
        color:theme-get('label-clr') !important;
    }
}
.product-description{
    h3,span{

        @include theme(){
            color:theme-get('label-clr') !important;
        }
    }
}
.form-box i.pi.pi-spin.pi-spinner.loading-icon {
    font-size: 1.4rem !important;
}
.product-form {
    display: flex;
    @include margin($top: 16px, $right: 0, $bottom: 16px, $left: 0);
    .wrapper {
        .form-box {
            @include media-query($tablet-screen) {
                @include flexbox($flex-direction: column, $justify-content: center, $align-items: center);
            }
            form {
                @include dimensions($width: 368px);
                @include padding($top: 24px, $right: 20px, $bottom: 20px, $left: 20px);
                @include margin($top: 0, $right: 16px, $bottom: 16px, $left: 0);
                gap: 7px;
                @include media-query($medium-screen) {
                    width: 280px;
                }
                @include media-query($tablet-screen) {
                    width: 400px;
                }
                @include media-query($mobile-screen) {
                    width: 285px;
                    margin-right: 0;
                }
                .input-container {
                    gap: 5px;
                    div {
                        @include flexbox($justify-content: space-between);
                        align-items: center;
                    }
                    textarea {
                        height: 96px;
                        resize: none;
                    }
                    select {
                        margin-top: 4px;
                        @include font-size-and-color($font-size: 14px, $color: #666);
                    }
                }
                .toggle-container {
                    width: 175px;
                    @include flexbox($justify-content: space-between, $flex-wrap: wrap);
                    .toggle {
                        display: flex;
                        gap: 8px;
                        img {
                            margin-top: 4px;
                            @include dimensions($width: 28px, $height: 20px);
                        }
                        span {
                            @include font-size-and-color($font-size: 14px, $color: #000);
                        }
                        .switch {
                            @include dimensions($width: 28px, $height: 16px);
                            @include position($position: relative, $top: 2px);
                            display: inline-block;
                            input {
                                opacity: 0;
                                @include dimensions($width: 0, $height: 0);
                                &:checked + .slider {
                                    background-color: #2196f3;
                                }
                                &:focus + .slider {
                                    box-shadow: 0 0 1px #2196f3;
                                }
                                &:checked + .slider:before {
                                    transform: translateX(11px);
                                }
                            }
                            .slider {
                                @include position($position: absolute, $top: 0, $right: 0, $bottom: 0, $left: 0);
                                cursor: pointer;
                                // background-color: #ccc;
                                @include theme(){
                                    background-color: theme-get('slider-bg');
                                }
                                transition: 0.4s;
                                &.round {
                                    border-radius: 34px;
                                    &::before {
                                        border-radius: 50px;
                                    }
                                }
                                &::before {
                                    @include position($position: absolute, $top: 1px, $right: 0, $bottom: 1px, $left: 1px);
                                    @include dimensions($width: 15px, $height: 14px);
                                    content: '';
                                    background-color: white;
                                    transition: 0.4s;
                                }
                            }
                        }
                    }
                }
                #btn {
                    height: 36px;
                    gap: 10px;
                    @include margin($top: 10px, $right: 0, $bottom: 8px, $left: 0);
                    @include padding($top: 8px, $right: 16px, $bottom: 10px, $left: 16px);
                    @include border(1px, solid, #0168ed, 4px);
                    @include bg-color-and-text-color($bg-color: #1279ff, $text-color: #fff);
                    cursor: pointer;
                    & span {
                        color: #fff;
                    }
                }
            }
        }
        .chatgpt {
            @include flexbox($justify-content: center);
        }
        .product-description {
            margin-bottom: 40px;
            padding-left: 172px;
            @include flexbox($flex-direction: column, $justify-content: center, $align-items: center);
            text-align: center;
            @include media-query($tablet-screen) {
                padding-left: 0;
                margin-top: 80px;
            }
            img {
                @include dimensions($width: 176px, $height: 176px);
                @include media-query($medium-screen) {
                    @include dimensions($width: 130px, $height: 130px);
                }
            }
            h3 {
                @include margin($top: 28px, $right: 6px, $bottom: 10px, $left: 6px);
                
                @include font-size-and-color($font-size: 20px, $color: #3c4249);
                font-weight: 600;
            }
            span {
                @include font-size-and-color($font-size: 13px, $color: #575f6c);
            }
        }
        .display-content {
            position: relative;
            @include flexbox($justify-content: center);
            @include media-query($tablet-screen) {
                @include margin($top: 15px, $right: 0, $bottom: 0, $left: 15px);
            }
            @include media-query($mobile-screen) {
                width: 288px;
                margin-left: 0;
            }
            .pdf-display {
                @include flexbox($flex-direction: column, $justify-content: space-between);
                @include padding($top:50px, $right: 96px, $bottom: 16px, $left: 96px);
                gap: 16px;
                @include media-query($medium-screen) {
                    @include padding($top: 35px, $right: 20px, $bottom: 16px, $left: 20px);
                }
                // @include media-query($tablet-screen) {
                //   @include padding($top: 35px, $right: 15px, $bottom: 0, $left: 40px);
                // }
                h2 {
                    @include font-size-and-color($font-size: 24px, $color: #1d252b);
                    @include text-styles($font-size: 24px, $font-weight: 600, $line-height: 0.83);
                }
                p {
                    padding-bottom: 20px;
                    @include text-styles($font-size: 14px, $font-weight: 600, $line-height: 1.43);
                }
                ul {
                    li {
                        margin-left: 25px;
                        @include text-styles($font-size: 14px, $font-weight: 400, $line-height: 1.43);
                    }
                    .head {
                        list-style: none;
                        margin-left: 0;
                        h3 {
                            padding-bottom: 20px;
                            @include text-styles($font-size: 18px, $font-weight: 600, $line-height: 0.83);
                        }
                    }
                }
            }
        }
        .copy-icon {
            @include media-query($mobile-screen) {
                @include position($position: absolute, $right: 5px);
                margin-top: 8px;
            }
            .copy-file {
                min-width: 50px;
                min-height: 50px;
                @include dimensions($width: 50px, $height: 50px);
                object-fit: contain;
                cursor: pointer;
            }
        }
    }
    .input-errors .error-msg {
        color: red;
        margin-top: 4px;
        font-family: 'HelveticaNowText-regular';
    }
    .p-dropdown:not(.p-disabled):hover {
        border-color: #d4d6d9;
    }
    .p-dropdown:not(.p-disabled).p-focus {
        outline: 0 none;
        outline-offset: 0;
        box-shadow: none;
        border-color: #d4d6d9;
    }
}
.dark-red {
    color: #ff5a3a !important;
}
.p-dropdown .p-dropdown-trigger {
    padding-right: 16px;
}
.p-dropdown-panel.p-component {
    z-index: 1 !important;
}
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
::-webkit-scrollbar-track {
    // background: #fff;
    @include theme(){
        background-color: theme-get('scroll-bar-track');
    }
}
::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
}
.p-dropdown-item {
    font-family: 'HelveticaNowText-Regular';
    font-size: 14px;
}

.p-dropdown-items-wrapper .p-dropdown-items:focus .p-dropdown-item:nth-child(1) ,.p-dropdown-items-wrapper .p-dropdown-items:focus .p-dropdown-item:nth-child(1), .p-dropdown-items:focus .p-dropdown-item:nth-child(1),.p-dropdown-item:focus {
    background: none !important;
    // background-color: #fff;  
    
}
.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight span {
    // color: #1222b9 !important;
    @include theme() {
        color: theme-get('black-900') !important;
    }
}
.word-magic-outer .p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
    color: #69707a;
}
.word-magic-outer .p-dropdown-panel .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled):hover {
    // color: #69707a;
    @include theme(){
        color:theme-get('dropdown-text-hover');
    }
}
.pdf-display {
    ul {
        margin-left: 16px;
    }
    h2 {
        font-family: 'Poppins-SemiBold';
        color: #1d252b;
        font-size: 24px;
        font-weight: 600;
        line-height: 1.21;
    }
}
.word-magic-outer {
    @include theme() {
        background-color: theme-get('body-bg');
    }
    // background-color: #f2f4f6 !important;
    .layout-content {
        padding: 0 !important;
        background-image: none !important;
        background-color: #f2f4f6 !important;
    }
}
@media (max-width: 767px) {
    .layout-wrapper.layout-custom-menu .layout-main {
        padding-left: 0 !important;
    }
}
</style>
