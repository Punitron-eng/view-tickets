<!-- eslint-disable prettier/prettier -->
<script setup>
import { ref, onBeforeMount, watch, nextTick, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useLayout } from '@/layout/composables/layout';
import { DomHandler } from 'primevue/utils';
import config from '../util/config';
import { useStore } from 'vuex';
import { RETURN } from '@/store/domestic/return-flow/constants';
const store = useStore();
import { DARKMODE } from '@/store/dark-mode/constants';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const route = useRoute();

const { layoutConfig, layoutState, setActiveMenuItem, onMenuToggle, isHorizontal, isSlim, isSlimPlus, isDesktop, isOverlay, isStatic } = useLayout();

const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
    index: {
        type: Number,
        default: 0,
    },
    root: {
        type: Boolean,
        default: true,
    },
    parentItemKey: {
        type: String,
        default: null,
    },
});

const isActiveMenu = ref(false);
const itemKey = ref(null);
const subMenuRef = ref(null);
const menuItemRef = ref(null);

onBeforeMount(() => {
    itemKey.value = props.parentItemKey ? props.parentItemKey + '-' + props.index : String(props.index);
    const activeItem = layoutState.activeMenuItem.value;
    isActiveMenu.value = activeItem === itemKey.value || activeItem ? activeItem.startsWith(itemKey.value + '-') : false;
});

watch(
    () => isActiveMenu.value,
    () => {
        const rootIndex = props.root ? props.index : parseInt(`${props.parentItemKey}`[0], 10);
        const overlay = document.querySelectorAll('.layout-root-submenulist')[rootIndex];
        const target = document.querySelectorAll('.layout-root-menuitem')[rootIndex];

        if ((isSlim.value || isSlimPlus.value || isHorizontal.value) && isDesktop) {
            nextTick(() => {
                calculatePosition(overlay, target);
            });
        }
    }
);
watch(
    () => layoutState.activeMenuItem.value,
    (newVal) => {
        isActiveMenu.value = newVal === itemKey.value || newVal.startsWith(itemKey.value + '-');
    }
);
watch(
    () => layoutConfig.menuMode.value,
    () => {
        isActiveMenu.value = false;
    }
);
watch(
    () => layoutState.overlaySubmenuActive.value,
    (newValue) => {
        if (!newValue) {
            isActiveMenu.value = false;
        }
    }
);
watch(
    () => route.path,
    (newPath) => {
        if (!(isSlim.value || isSlimPlus.value || isHorizontal.value) && props.item.to && props.item.to === newPath) {
            setActiveMenuItem(itemKey);
        } else if (isSlim.value || isSlimPlus.value || isHorizontal.value) {
            isActiveMenu.value = false;
        }
    }
);
const itemClick = async (event, item) => {
    if (item.disabled) {
        event.preventDefault();
        return;
    }
    const { overlayMenuActive, staticMenuMobileActive } = layoutState;
    if ((item.to || item.url) && (staticMenuMobileActive.value || overlayMenuActive.value)) {
        onMenuToggle();
    }
    if (item.command) {
        item.command({ originalEvent: event, item: item });
    }
    if (item.items) {
        if (props.root && isActiveMenu.value && (isSlim.value || isSlimPlus.value || isHorizontal.value)) {
            layoutState.overlaySubmenuActive.value = false;
            layoutState.menuHoverActive.value = false;

            return;
        }
        setActiveMenuItem(isActiveMenu.value ? props.parentItemKey : itemKey);
        if (props.root && !isActiveMenu.value && (isSlim.value || isSlimPlus.value || isHorizontal.value)) {
            layoutState.overlaySubmenuActive.value = true;
            layoutState.menuHoverActive.value = true;
            isActiveMenu.value = true;
            removeAllTooltips();
        }
    } else {
        if (!isDesktop) {
            layoutState.staticMenuMobileActive.value = !layoutState.staticMenuMobileActive.value;
        }
        if (isSlim.value || isSlimPlus.value || isHorizontal.value) {
            layoutState.overlaySubmenuActive.value = false;
            layoutState.menuHoverActive.value = false;
            return;
        }
        setActiveMenuItem(itemKey);
    }
};
const onMouseEnter = () => {
    if (props.root && (isSlim.value || isSlimPlus.value || isHorizontal.value) && isDesktop) {
        if (!isActiveMenu.value && layoutState.menuHoverActive.value) {
            setActiveMenuItem(itemKey);
        }
    }
};
const removeAllTooltips = () => {
    const tooltips = document.querySelectorAll('.p-tooltip');
    tooltips.forEach((tooltip) => {
        tooltip.remove();
    });
};
const handleTabCheck = (tab) => {
    if (tab == 'return-flow/rev-return-request' || tab == 'return-flow/rev-manifest' || tab == 'return-flow/rev-intransit' || tab == 'return-flow/rev-delivered' || tab == 'return-flow/rev-all') {
        store.commit(`${RETURN.NAME}/changeDtTab`, true);
    }
};
const calculatePosition = (overlay, target) => {
    if (overlay) {
        const { left, top } = target.getBoundingClientRect();
        const [vWidth, vHeight] = [window.innerWidth, window.innerHeight];
        const [oWidth, oHeight] = [overlay.offsetWidth, overlay.offsetHeight];
        const scrollbarWidth = DomHandler.calculateScrollbarWidth();

        overlay.style.top = overlay.style.left = '';

        if (isHorizontal.value) {
            const width = left + oWidth + scrollbarWidth;
            overlay.style.left = vWidth < width ? `${left - (width - vWidth)}px` : `${left}px`;
        } else if (isSlim.value || isSlimPlus.value) {
            const height = top + oHeight;
            overlay.style.top = vHeight < height ? `${top - (height - vHeight)}px` : `${top}px`;
        }
    }
};
const checkActiveRoute = (item) => {
    const routPath = route.path.split('/')[1];
    if (item.to && routPath === item.to) {
        return true; // If the current item is active, return true
    }
    if (item.items) {
        // If the item has child items, recursively check each child item
        return item.items.some((childItem) => checkActiveRoute(childItem));
    }
    return false; // If none of the conditions are met, return false
    // const routPath = route.path.split('/')[1];
    // return routPath === item.to;
};
const getIcons = (icons) => {
    let imagePath = '';
    if (darkModeVal.value) {
        imagePath = new URL(`../assets/images/dark-mode/dark-${icons}.svg`, import.meta.url).href;
    } else {
        imagePath = new URL(`../assets/images/${icons}.svg`, import.meta.url).href;
    }
    const iconPath = imagePath.split('/');
    const iconLastPart = iconPath[iconPath.length - 1];
    if (iconLastPart == 'undefined') {
        const defaultImagePath = new URL(`../assets/images/`, import.meta.url).href;
        return defaultImagePath;
    } else {
        return imagePath;
    }
};
const isActiveSubMenu = (child) => {
    // Compare the current route with the route associated with the submenu item
    return route.path === '/' + child.to; // Assuming your routes follow the pattern '/'
};
const isActiveChild = (child) => {
    if (route.matched.length > 1) {
        const currentPath = route.matched[1].path; // Accessing the path of the child route
        return currentPath === '/' + child.to;
    }
    return false;
};
// the below function is define to remove /dt-v7/ from .net let check it can be working?
// const generateHref = (url) => {
//     // Modify the logic to generate the desired href
//     if (url && url.includes('/dt-v7/')) {
//         return url.replace('/dt-v7/', '/');
//     }
//     return url;
// };
</script>

<template>
    <li ref="menuItemRef" :class="{ 'layout-root-menuitem': root, 'active-menuitem': isStatic || isOverlay ? !root && isActiveMenu : isActiveMenu || isActiveChild(item) || checkActiveRoute(item) }">
        <a
            v-if="!item.to || item.items"
            :href="item.items ? 'javascript:void(0)' : item.url ? config.baseUrlPanel + item.url : config.baseUrlPanel"
            @click="itemClick($event, item, index)"
            :class="item.class"
            :target="item.target"
            tabindex="0"
            @mouseenter="onMouseEnter"
            v-tooltip.hover="isSlim && root && !isActiveMenu ? item.label : null"
        >
            <img v-if="item.icon" :src="getIcons(item.icon)" alt="" />
            <span class="layout-menuitem-text">{{ item.label }}</span>
            <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items"></i>
        </a>
        <router-link
            class=""
            v-if="item.to && !item.items"
            @click="itemClick($event, item, index), handleTabCheck(item.to)"
            :class="[item.class, { 'active-route': checkActiveRoute(item) }]"
            tabindex="0"
            :to="'/' + item.to"
            @mouseenter="onMouseEnter"
            v-tooltip.hover="(isSlim || isSlimPlus) && root && !isActiveMenu ? item.label : null"
        >
            <img :src="getIcons(item.icon)" alt="" />
            <span class="layout-menuitem-text">{{ item.label }}</span>
            <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items"></i>
        </router-link>
        <ul ref="subMenuRef" :class="{ 'layout-root-submenulist': root }">
            <app-menu-item v-for="(child, i) in item.items" :key="child" :index="i" :item="child" :parentItemKey="itemKey" :root="false" :class="{ 'active-submenu-item': isActiveSubMenu(child) }"></app-menu-item>
        </ul>
    </li>
</template>
