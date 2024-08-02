<script setup>
import AppMenuItem from './AppMenuItem.vue';

const model1 = localStorage.getItem('all_user_menu_data_array');
const isMenuArray = localStorage.getItem('is_menu_domestic');
const model1Data = JSON.parse(model1);
const topHeader = JSON.parse(localStorage.getItem('top_header'));
import { useRoute } from 'vue-router';
const route = useRoute();
// const modelDomesticData = model1Data.domestic;
let menuData;
if (topHeader['user_type'] == 4) {
    // eslint-disable-next-line no-unused-vars
    menuData = model1Data.channel_partner;
}
// debugger
if (isMenuArray == 0 && topHeader['user_type'] != 4) {
    // eslint-disable-next-line no-unused-vars
    menuData = model1Data.international;
}
if (isMenuArray == 1 && topHeader['user_type'] != 4) {
    // eslint-disable-next-line no-unused-vars
    menuData = model1Data.domestic;
}
if (isMenuArray == 2 && topHeader['user_type'] != 4) {
    // eslint-disable-next-line no-unused-vars
    menuData = model1Data.connect_plus;
}
if (isMenuArray == 3 && topHeader['user_type'] != 4) {
    // eslint-disable-next-line no-unused-vars
    menuData = model1Data.checkout;
}
const checkActiveRoute = (item) => {
    const routeSplit = route.path.split('/')[1];
    return routeSplit === item.to;
};
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in menuData" :key="item">
            <AppMenuItem :class="[{ bhavna: checkActiveRoute(item) }]" :item="item" root :index="i" />
        </template>
    </ul>
</template>

<style lang="scss">
@import '../assets/itl-common-css/common-css.scss';
.layout-container.layout-drawer.layout-drawer .layout-content-wrapper {
    margin-left: 41px !important;
    transition: margin-left 0.3s cubic-bezier(0, 0, 0.2, 1);
    overflow-x: hidden;
    margin-top: 47px;
    // margin-top: 42px;
}
.layout-container.layout-drawer .layout-sidebar .layout-menu {
    margin-top: 0;
}
.layout-container.layout-drawer .layout-sidebar .layout-menu ul a {
    // padding: 0 12px !important;
    padding: 8px 12.5px !important;
    height: 46px;
}
.layout-container.layout-drawer .layout-sidebar .layout-menu ul a span {
    font-size: 13px !important;
    margin-left: 8px;
}
.layout-container.layout-drawer.layout-sidebar-active .layout-sidebar .layout-menu ul a span {
    margin-left: 13px !important;
}
.layout-container.layout-drawer.layout-sidebar-active .layout-sidebar .layout-menu ul a .layout-submenu-toggler {
    transform: rotate(-90deg);
    @include theme() {
        color: theme-get('black-500');
    }
    margin-right: 0;
}
.layout-sidebar .layout-menu ul a .layout-submenu-toggler {
    font-size: 12px !important;
}
.layout-sidebar .layout-menu li.active-menuitem > a .layout-submenu-toggler {
    transform: rotate(0) !important;
    @include theme() {
        color: theme-get('black-800');
    }
}
.layout-sidebar-active ul.layout-root-submenulist ul {
    display: block;
}
// .layout-root-submenulist li {
//     margin-bottom: 6px;
// }
ul.layout-root-submenulist ul {
    display: none;
}
ul.layout-root-submenulist li ul li {
    margin-bottom: 8px;
}
ul.layout-root-submenulist li ul li:hover {
    @include theme() {
        background: theme-get('dt-input-search-bg');
    }
}

.layout-root-submenulist .active-menuitem ul li.active-menuitem {
    background: #f3f4f6;
}
.darkTheme .layout-root-submenulist .active-menuitem ul li.active-menuitem {
    background: #212121;
}
.layout-container.layout-drawer.layout-sidebar-active .layout-sidebar .layout-menu ul ul li a {
    padding-left: 43px !important;
    height: 32px;
}
.layout-container.layout-drawer.layout-sidebar-active .layout-sidebar .layout-menu ul a:hover span {
    @include theme() {
        color: theme-get('black-800');
    }
}
.layout-container.layout-drawer .layout-sidebar .layout-menu-container .layout-root-submenulist a img {
    position: relative !important;
    left: 0 !important;
    height: 30px;
}
.layout-container.layout-drawer .layout-sidebar {
    width: 55px !important;
}
.layout-container.layout-drawer.layout-sidebar-active .layout-sidebar {
    width: 266px !important;
}
.layout-topbar {
    padding: 7px 22px 7px 15px !important;
}
.layout-container.layout-drawer.layout-sidebar-anchored .layout-content-wrapper {
    margin-left: 17.438rem !important;
}
.layout-topbar .topbar-menu .setting-main-outer .setting-detail-inner-sec .dropdown-menu .setting-dropdown-details-section .setting-menu-li-section {
    padding: 4px 8px !important;
}
.menu-help-icon,
.menu-header-outer-section {
    // line-height: 0;
}
</style>
