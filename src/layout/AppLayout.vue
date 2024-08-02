<script setup>
import { computed, watch, ref, onBeforeUnmount, onBeforeMount } from 'vue';
import AppTopbar from './AppTopbar.vue';
import config from '../util/config';
import { useRouter } from 'vue-router';
import { useLayout } from '@/layout/composables/layout';
// import { getMenuResponse } from '../api/menu-api/getMenuData';
const { layoutConfig, layoutState, isSidebarActive } = useLayout();
const router = useRouter();
const outsideClickListener = ref(null);
const topbarRef = ref(null);
// const allMenuDetails = ref([]);

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});
onBeforeMount(() => {
    if (router.currentRoute.value.path == '/') {
        window.location.href = config.baseUrlPanel;
    }
});

// const getMenuDataRespo = async () => {
//     const menuDetails = await getMenuResponse();
//     let tempMenuData = JSON.stringify(menuDetails.all_user_menu_data_array);
//     let tempMenuHeaderData = JSON.stringify(menuDetails.all_final_menu_header_data_array);
//     allMenuDetails.value = tempMenuData;
//     localStorage.setItem('all_user_menu_data_array', allMenuDetails.value);
//     localStorage.setItem('all_final_menu_header_data_array', tempMenuHeaderData);
// };

// onMounted(() => {
//     getMenuDataRespo();
// });

const containerClass = computed(() => {
    return [
        {
            'layout-light': layoutConfig.colorScheme.value === 'light',
            'layout-dark': layoutConfig.colorScheme.value === 'dark',
            'layout-light-menu': layoutConfig.menuTheme.value === 'light',
            'layout-dark-menu': layoutConfig.menuTheme.value === 'dark',
            'layout-light-topbar': layoutConfig.topbarTheme.value === 'light',
            'layout-dark-topbar': layoutConfig.topbarTheme.value === 'dark',
            'layout-transparent-topbar': layoutConfig.topbarTheme.value === 'transparent',
            'layout-overlay': layoutConfig.menuMode.value === 'overlay',
            'layout-static': layoutConfig.menuMode.value === 'static',
            'layout-slim': layoutConfig.menuMode.value === 'slim',
            'layout-slim-plus': layoutConfig.menuMode.value === 'slim-plus',
            'layout-horizontal': layoutConfig.menuMode.value === 'horizontal',
            'layout-reveal': layoutConfig.menuMode.value === 'reveal',
            'layout-drawer': layoutConfig.menuMode.value === 'drawer',
            'layout-static-inactive': layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
            'layout-overlay-active': layoutState.overlayMenuActive.value,
            'layout-mobile-active': layoutState.staticMenuMobileActive.value,
            'p-input-filled': layoutConfig.inputStyle.value === 'filled',
            'p-ripple-disabled': !layoutConfig.ripple.value,
            'layout-sidebar-active': layoutState.sidebarActive.value,
            'layout-sidebar-anchored': layoutState.anchored.value,
        },
    ];
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                layoutState.overlayMenuActive.value = false;
                layoutState.overlaySubmenuActive.value = false;
                layoutState.staticMenuMobileActive.value = false;
                layoutState.menuHoverActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarRef.value) return;

    const sidebarEl = topbarRef?.value.$el.querySelector('.layout-sidebar');
    const topbarEl = topbarRef?.value.$el.querySelector('.topbar-start > button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
</script>

<template>
    <div class="layout-container" :class="containerClass">
        <app-topbar ref="topbarRef"></app-topbar>
        <div class="layout-content-wrapper">
            <div class="layout-content">
                <router-view></router-view>
            </div>
        </div>
        <!-- <div class="layout-mask"></div> -->
    </div>
</template>

<style lang="scss">
@import '../assets/itl-common-css/common-css.scss';
.custom-logo-img {
    display: block;
}
.layout-content-wrapper {
    padding: 0 !important;
    @media screen and (max-width: 767px) {
        margin-top: 100px !important;
    }
}
// .layout-container.layout-light.layout-light-menu.layout-transparent-topbar.layout-drawer.layout-sidebar-active.layout-sidebar-anchored .layout-content-wrapper {
//     margin-left: 243px !important;
// }
.layout-content {
    padding: 16px;
    // min-height: 100vh;
    @include theme() {
        background-image: theme-get('background-image');
    }
}
.layout-container.layout-drawer.layout-drawer .layout-content-wrapper {
    margin-left: 55px !important;
    @media (max-width: 1022px) {
        margin-left: 0 !important;
    }
}
.layout-container.layout-drawer .layout-sidebar {
    width: 48px;
    @media (max-width: 767px) {
        display: none;
    }
}
.layout-container.layout-mobile-active .layout-sidebar {
    @media (max-width: 767px) {
        display: block !important;
        width: 100% !important;
    }
}
.layout-container.layout-drawer.layout-drawer .layout-content-wrapper {
    margin-left: 48px;
    @media (max-width: 767px) {
        margin-left: 0;
    }
}
@media (max-width: 767px) {
    .layout-container.layout-drawer.layout-sidebar-active .layout-sidebar {
        width: 100% !important;
    }
    .layout-sidebar {
        top: 0px !important;
        padding-top: 45px;
        overflow-y: auto;
    }
    .custom-logo-img {
        display: none;
    }
    .layout-topbar .custom-logo .custom-logo-mobile-img {
        display: block !important;
        width: 100% !important;
    }
}
</style>
