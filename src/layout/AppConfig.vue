<script setup>
import Sidebar from 'primevue/sidebar';
import { usePrimeVue } from 'primevue/config';

import { ref, watch } from 'vue';
import { useLayout } from '@/layout/composables/layout';

const PrimeVue = usePrimeVue();
const { setScale, layoutConfig, layoutState, onConfigSidebarToggle, isHorizontal } = useLayout();

const themes = ref([
    { name: 'avocado', color: '#AEC523' },
    { name: 'blue', color: '#5297FF' },
    { name: 'purple', color: '#464DF2' },
    { name: 'teal', color: '#14B8A6' },
    { name: 'green', color: '#34B56F' },
    { name: 'indigo', color: '#6366F1' },
    { name: 'orange', color: '#FF810E' },
    { name: 'red', color: '#FF9B7B' },
    { name: 'turquoise', color: '#58AED3' },
    { name: 'yellow', color: '#FFB340' },
]);

defineProps({
    simple: {
        type: Boolean,
        default: false,
    },
});
const scales = ref([12, 13, 14, 15, 16]);

watch(layoutConfig.menuMode, (newVal) => {
    if (newVal === 'static') {
        layoutState.staticMenuDesktopInactive.value = false;
    }
});

const colorScheme = ref(layoutConfig.colorScheme.value);

const changeColorScheme = (colorScheme) => {
    const themeLink = document.getElementById('theme-link');
    const themeLinkHref = themeLink.getAttribute('href');
    const currentColorScheme = 'theme-' + layoutConfig.colorScheme.value.toString();
    const newColorScheme = 'theme-' + colorScheme;
    const newHref = themeLinkHref.replace(currentColorScheme, newColorScheme);

    replaceLink(themeLink, newHref, () => {
        layoutConfig.colorScheme.value = colorScheme;
        layoutConfig.menuTheme.value = colorScheme;
    });
};

const changeTheme = (theme) => {
    const themeLink = document.getElementById('theme-link');
    const themeHref = themeLink.getAttribute('href');
    const newHref = themeHref.replace(layoutConfig.theme.value, theme);

    replaceLink(themeLink, newHref, () => {
        layoutConfig.theme.value = theme;
    });
};

const replaceLink = (linkElement, href, onComplete) => {
    if (!linkElement || !href) {
        return;
    }

    const id = linkElement.getAttribute('id');
    const cloneLinkElement = linkElement.cloneNode(true);

    cloneLinkElement.setAttribute('href', href);
    cloneLinkElement.setAttribute('id', id + '-clone');

    linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

    cloneLinkElement.addEventListener('load', () => {
        linkElement.remove();

        const element = document.getElementById(id);
        element && element.remove();

        cloneLinkElement.setAttribute('id', id);
        onComplete && onComplete();
    });
};
const decrementScale = () => {
    setScale(layoutConfig.scale.value - 1);
    applyScale();
};
const incrementScale = () => {
    setScale(layoutConfig.scale.value + 1);
    applyScale();
};

const applyScale = () => {
    document.documentElement.style.fontSize = layoutConfig.scale.value + 'px';
};

const onChangeRipple = () => {
    PrimeVue.config.ripple = !PrimeVue.config.ripple;
};

const changeInputStyle = (styleClass) => {
    PrimeVue.config.inputStyle = styleClass;
};
</script>

<template>
    <Button class="layout-config-button p-link" @click="onConfigSidebarToggle()" style="cursor: pointer">
        <i class="pi pi-cog"></i>
    </Button>
    <Sidebar v-model:visible="layoutState.configSidebarVisible.value" position="right" class="layout-config-sidebar w-18rem">
        <div class="px-2">
            <h5>Color Scheme</h5>
            <div class="flex">
                <div class="field-radiobutton flex-auto">
                    <RadioButton name="colorScheme" value="light" v-model="colorScheme" id="theme3" @change="changeColorScheme('light')"></RadioButton>
                    <label for="theme3">Light</label>
                </div>

                <div class="field-radiobutton flex-auto">
                    <RadioButton name="colorScheme" value="dark" v-model="colorScheme" id="theme1" @change="changeColorScheme('dark')"></RadioButton>
                    <label for="theme1">Dark</label>
                </div>
            </div>

            <h5>Themes</h5>
            <div class="flex flex-wrap row-gap-3">
                <div v-for="(theme, i) in themes" :key="i" class="w-3">
                    <Button
                        :autoFocus="layoutConfig.theme === theme.name"
                        class="cursor-pointer p-link w-2rem h-2rem border-circle flex-shrink-0 flex align-items-center justify-content-center"
                        @click="() => changeTheme(theme.name)"
                        :style="{ 'background-color': theme.color }"
                    >
                        <i v-if="theme.name === layoutConfig.theme.value" class="pi pi-check text-white"></i>
                    </Button>
                </div>
            </div>

            <h5>Scale</h5>
            <div class="flex align-items-center">
                <Button icon="pi pi-minus" type="button" @click="decrementScale()" class="p-button-text p-button-rounded w-2rem h-2rem mr-2" :disabled="layoutConfig.scale.value === scales[0]"></Button>
                <div class="flex gap-2 align-items-center">
                    <i class="pi pi-circle-fill text-300" v-for="s in scales" :key="s" :class="{ 'text-primary-500': s === layoutConfig.scale.value }"></i>
                </div>
                <Button icon="pi pi-plus" type="button" pButton @click="incrementScale()" class="p-button-text p-button-rounded w-2rem h-2rem ml-2" :disabled="layoutConfig.scale.value === scales[scales.length - 1]"></Button>
            </div>

            <template v-if="!simple">
                <h5>Menu Type</h5>
                <div class="flex flex-wrap row-gap-3">
                    <div class="flex align-items-center gap-2 w-6">
                        <RadioButton name="menuMode" value="static" v-model="layoutConfig.menuMode.value" inputId="mode1"></RadioButton>
                        <label for="mode1">Static</label>
                    </div>

                    <div class="flex align-items-center gap-2 w-6 pl-2">
                        <RadioButton name="menuMode" value="overlay" v-model="layoutConfig.menuMode.value" inputId="mode2"></RadioButton>
                        <label for="mode2">Overlay</label>
                    </div>
                    <div class="flex align-items-center gap-2 w-6">
                        <RadioButton name="menuMode" value="slim" v-model="layoutConfig.menuMode.value" inputId="mode3"></RadioButton>
                        <label for="mode3">Slim</label>
                    </div>
                    <div class="flex align-items-center gap-2 w-6 pl-2">
                        <RadioButton name="menuMode" value="slim-plus" v-model="layoutConfig.menuMode.value" inputId="mode4"></RadioButton>
                        <label for="mode4">Slim+</label>
                    </div>
                    <div class="flex align-items-center gap-2 w-6">
                        <RadioButton name="menuMode" value="horizontal" v-model="layoutConfig.menuMode.value" inputId="mode5"></RadioButton>
                        <label for="mode5">Horizontal</label>
                    </div>
                    <div class="flex align-items-center gap-2 w-6 pl-2">
                        <RadioButton name="menuMode" value="reveal" v-model="layoutConfig.menuMode.value" inputId="mode6"></RadioButton>
                        <label for="mode6">Reveal</label>
                    </div>
                    <div class="flex align-items-center gap-2 w-6">
                        <RadioButton name="menuMode" value="drawer" v-model="layoutConfig.menuMode.value" inputId="mode7"></RadioButton>
                        <label for="mode7">Drawer</label>
                    </div>
                </div>
            </template>

            <h5>Menu Theme</h5>
            <div class="flex flex-wrap row-gap-3">
                <div class="flex align-items-center gap-2 w-6">
                    <RadioButton name="menuTheme" value="light" v-model="layoutConfig.menuTheme.value" :disabled="layoutConfig.colorScheme.value == 'dark' || isHorizontal.value" inputId="menutheme-light"></RadioButton>
                    <label for="menutheme-light">Light</label>
                </div>
                <div class="flex align-items-center gap-2 w-6 pl-2">
                    <RadioButton name="menuTheme" value="dark" v-model="layoutConfig.menuTheme.value" :disabled="layoutConfig.colorScheme == 'dark' || isHorizontal.value" inputId="menutheme-dark"></RadioButton>
                    <label for="menutheme-dark">Dark</label>
                </div>
            </div>

            <h5>Topbar Theme</h5>
            <div class="flex flex-wrap row-gap-3">
                <div class="flex align-items-center gap-2 w-6">
                    <RadioButton name="topbarTheme" value="light" v-model="layoutConfig.topbarTheme.value" :disabled="layoutConfig.colorScheme.value == 'dark'" inputId="topbartheme-light"></RadioButton>
                    <label for="topbartheme-light">Light</label>
                </div>
                <div class="flex align-items-center gap-2 w-6 pl-2">
                    <RadioButton name="topbarTheme" value="dark" v-model="layoutConfig.topbarTheme.value" inputId="topbartheme-dark"></RadioButton>
                    <label for="topbartheme-dark">Dark</label>
                </div>
                <div class="flex align-items-center gap-2 w-6">
                    <RadioButton name="topbarTheme" value="transparent" v-model="layoutConfig.topbarTheme.value" inputId="topbartheme-transparent"></RadioButton>
                    <label for="topbartheme-transparent">Transparent</label>
                </div>
            </div>

            <template v-if="!simple">
                <h5>Input Style</h5>
                <div class="flex">
                    <div class="field-radiobutton flex-1">
                        <RadioButton name="inputStyle" value="outlined" v-model="layoutConfig.inputStyle.value" inputId="outlined_input" @change="changeInputStyle('outlined')"></RadioButton>
                        <label for="outlined_input">Outlined</label>
                    </div>
                    <div class="field-radiobutton flex-1">
                        <RadioButton name="inputStyle" value="filled" v-model="layoutConfig.inputStyle.value" @change="changeInputStyle('filled')" inputId="filled_input"></RadioButton>
                        <label for="filled_input">Filled</label>
                    </div>
                </div>

                <h5>Ripple Effect</h5>
                <InputSwitch v-model="layoutConfig.ripple.value" @change="onChangeRipple"></InputSwitch>
            </template>
        </div>
    </Sidebar>
</template>
