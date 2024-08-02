<script setup>
import AppMenu from './AppMenu.vue';
import { ref, computed } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { DARKMODE } from '@/store/dark-mode/constants';
const router = useRouter();
const store = useStore();
const navigateToDashboard = () => {
    router.push('/');
};
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const { layoutState } = useLayout();

let timeout = null;

const onMouseEnter = () => {
    if (!layoutState.anchored.value) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        layoutState.sidebarActive.value = true;
    }
};

const onMouseLeave = () => {
    if (!layoutState.anchored.value) {
        if (!timeout) {
            timeout = setTimeout(() => (layoutState.sidebarActive.value = false), 300);
        }
    }
};

const anchor = () => {
    layoutState.staticMenuMobileActive.value = false;
};
</script>

<template>
    <div class="layout-sidebar" @mouseenter="onMouseEnter()" @mouseleave="onMouseLeave()">
        <div class="close-icon-outer-sec" @click="anchor">
            <img v-if="darkModeVal != true" src="@/assets/images/dark-close-icon.svg" alt="">
            <img v-else src="../assets/images/dark-mode/dark-close-icon.svg" alt="">
        </div>

        <div ref="menuContainer" class="layout-menu-container">
            <app-menu></app-menu>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.close-icon-outer-sec {
    display: none;
}

@media (max-width: 767px) {
    .close-icon-outer-sec {
        display: block;
        position: fixed;
        top: 10px;
        right: 10px;
    }
}
</style>
