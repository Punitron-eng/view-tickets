
<template>
    <router-view />
</template>
<style lang="scss">
@import './assets/itl-common-css/common-css.scss';
::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}
::-webkit-scrollbar-thumb {
    background: #f4f7f9;
    border-radius: 16px;
}
::-webkit-scrollbar-track {
    // background: #a3aebb;
    @include theme(){
        background-color: theme-get('scroll-bar-track');
    }
}
.ml-16 {
    margin-left: 16px;
}
.router-link-active.router-link-exact-active img {
    @include theme() {
        background-color: theme-get('background-sideBar-img');
    }
    border-radius: 8px;
}
.active-menuitem img {
    /* background-color: #f3f4f6; */
    @include theme() {
        background-color: theme-get('background-sideBar-img');
    }
    border-radius: 8px;
}
.layout-container.layout-transparent-topbar.layout-drawer.layout-sidebar-active.layout-sidebar-anchored .layout-content-wrapper {
    margin-left: 268px !important;
}
// .layout-container.layout-light.layout-light-menu.layout-transparent-topbar.layout-drawer.layout-sidebar-active.layout-sidebar-anchored .layout-content-wrapper {
//     margin-left: 268px !important;
// }
@media (min-width: 768px) and (max-width: 1024px) {
    .layout-container.layout-transparent-topbar.layout-drawer.layout-sidebar-active.layout-sidebar-anchored .layout-content-wrapper {
        margin-left: 55px !important;
    }
}
// @media (min-width: 768px) and (max-width: 1024px) {
//     .layout-container.layout-light.layout-light-menu.layout-transparent-topbar.layout-drawer.layout-sidebar-active.layout-sidebar-anchored .layout-content-wrapper {
//         margin-left: 55px !important;
//     }
// }
@media (max-width: 767px) {
    .datatable-card {
        position: relative;
    }
}
.ml-16 {
    margin-left: 16px;
}
.router-link-active.router-link-exact-active img {
    @include theme() {
        background-color: theme-get('background-sideBar-img');
    }
    border-radius: 8px;
}
.active-menuitem img {
    /* background-color: #f3f4f6; */
    @include theme() {
        background-color: theme-get('background-sideBar-img');
    }
    border-radius: 8px;
}
.layout-container.layout-transparent-topbar.layout-drawer.layout-sidebar-active.layout-sidebar-anchored .layout-content-wrapper {
    margin-left: 268px !important;
}
// .layout-container.layout-light.layout-light-menu.layout-transparent-topbar.layout-drawer.layout-sidebar-active.layout-sidebar-anchored .layout-content-wrapper {
//     margin-left: 268px !important;
// }
@media (min-width: 768px) and (max-width: 1024px) {
    .layout-container.layout-transparent-topbar.layout-drawer.layout-sidebar-active.layout-sidebar-anchored .layout-content-wrapper {
        margin-left: 55px !important;
    }
}
// @media (min-width: 768px) and (max-width: 1024px) {
//     .layout-container.layout-light.layout-light-menu.layout-transparent-topbar.layout-drawer.layout-sidebar-active.layout-sidebar-anchored .layout-content-wrapper {
//         margin-left: 55px !important;
//     }
// }
@media (max-width: 767px) {
    .datatable-card {
        position: relative;
    }
}
.layout-container {
    @include theme(){
        background-image:theme-get('important-bg')
    }
    // background-image:
}
</style>
