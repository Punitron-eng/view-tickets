<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import { useEmitter } from '@nguyenshort/vue3-mitt';
import { useLayout } from '@/layout/composables/layout';
import { updateMenuType } from '../api/menu-api/getMenuData';
import AppSidebar from '@/layout/AppSidebar.vue';
import config from '../util/config';
import { DARKMODE } from '../store/dark-mode/constants';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const { onMenuToggle, showConfigSidebar, showSidebar, layoutConfig } = useLayout();
const { layoutState } = useLayout();
const store = useStore();
const route = useRoute();
const emitter = useEmitter();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const topHeader = ref(JSON.parse(localStorage.getItem('top_header')));
const isResponsiveTab = ref(false);
const isSettingVisible = ref(true);
const walletAmount = ref(topHeader.value['wallet_amount']);

const menuType = JSON.parse(localStorage.getItem('is_menu_domestic'));
const itlAddOns = JSON.parse(localStorage.getItem('all_final_itl_add_ons_data_array'));
// const store = useStore();
let settingMenuHeaderData;
let accountMenuHeaderData;
let otherMenuHeaderData = [];
let accountSettingMenu = ref(JSON.parse(localStorage.getItem('all_final_menu_header_data_array')));
let key = ref(0);
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
if (topHeader.value['user_type'] != 4) {
    settingMenuHeaderData = accountSettingMenu.value.setting;
    accountMenuHeaderData = accountSettingMenu.value.account;
    otherMenuHeaderData = accountSettingMenu.value?.others || [];
}

watch(accountSettingMenu, () => {
    if (topHeader.value['user_type'] != 4) {
        settingMenuHeaderData = accountSettingMenu.value.setting;
        accountMenuHeaderData = accountSettingMenu.value.account;
        otherMenuHeaderData = accountSettingMenu.value?.others || [];
    }
}, { deep: true })

const getSelectedMenuName = computed(() => {
    let selectedMenu = '';
    if (menuType == 0) {
        selectedMenu = 'International';
    } else if (menuType == 2) {
        selectedMenu = 'ITL Connect+';
    } else if (menuType == 3) {
        selectedMenu = 'Checkout';
    } else {
        selectedMenu = 'Domestic';
    }
    return selectedMenu;
});
const colorScheme = ref(layoutConfig.colorScheme.value);

onMounted(() => {
    emitter.on('vendor_changed', () => {
        // setTimeout(() => {
            key.value = key.value + 1;
            accountSettingMenu.value = JSON.parse(localStorage.getItem('all_final_menu_header_data_array'));
        // }, 500)

    })
    // changes added
    if (topHeader['user_type'] == 4) {
        localStorage.setItem('isDarkMode', false);
        colorScheme.value = false;
        changeColorScheme('light');
    }
    else if (localStorage.getItem('isDarkMode') == 'true') {
        colorScheme.value = true;
        changeColorScheme('dark');

    }

    //  end here
    bindOutsideClickListener();
    const updateResponsiveTab = () => {
        isResponsiveTab.value = window.innerWidth < 767;
    };
    window.addEventListener('resize', updateResponsiveTab);
    updateResponsiveTab();

    onBeforeUnmount(() => {
        window.removeEventListener('resize', updateResponsiveTab);
    });
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const toggleDropdown = () => {
    isSettingVisible.value = !isSettingVisible.value;
    // console.log('isSettingVisible', isSettingVisible.value);
};
const isToggleSetting = () => {
    isSettingVisible.value = true;
};

const anchor = () => {
    layoutState.anchored.value = !layoutState.anchored.value;
    if (layoutState.sidebarActive.value == true) {
        layoutState.sidebarActive.value = false;
    } else {
        layoutState.sidebarActive.value = true;
    }
};

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
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
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
const onMenuButtonClick = () => {
    onMenuToggle();
};

const onConfigButtonClick = () => {
    showConfigSidebar();
};
const onSidebarButtonClick = () => {
    showSidebar();
};
const menuChangeDomIntl = async (selectedType) => {
    // await store.dispatch(`${MENU.NAME}/getMenuType`, selectedType);
    localStorage.setItem('is_menu_domestic', selectedType);
    const menuUpdatedData = await updateMenuType(selectedType);
    if (menuUpdatedData.status == 'success') {
        if (selectedType == 1 || selectedType == 0) {
            window.location.href = config.baseUrlPanel;
        } else if (selectedType == 3) {
            window.location.href = config.baseUrlPanel + 'v4/checkout/dashboard';
        } else {
            window.location.href = config.baseUrlPanel + 'itl-connect-dashboard-v3';
        }
    }
};
const getIcons = (iconName) => {
    if (iconName) {
        if (darkModeVal.value) {
            return new URL(`../assets/images/dark-mode/dark-${iconName}.svg`, import.meta.url).href;
        } else {
            return new URL(`../assets/images/${iconName}.svg`, import.meta.url).href;
        }
    } else {
        return null;
    }
};
// changes added for Dark Mode
const toggleColorScheme = () => {
    const selectedScheme = colorScheme.value ? 'dark' : 'light';
    changeColorScheme(selectedScheme);
};
const changeColorScheme = (colorScheme) => {

    //
    const themeLink = document.getElementById('theme-link');
    const themeLinkHref = themeLink.getAttribute('href');
    const currentColorScheme = 'theme-' + layoutConfig.colorScheme.value.toString();
    const newColorScheme = 'theme-' + colorScheme;
    const newHref = themeLinkHref.replace(currentColorScheme, newColorScheme);

    const isDarkMode = colorScheme === 'dark';
    const element = document.querySelector('body');
    store.dispatch(`${DARKMODE.NAME}/getDarkModeVal`, isDarkMode);
    if (isDarkMode) {
        localStorage.setItem('isDarkMode', true);
        element.classList.toggle('darkTheme');
        element.classList.toggle('lightTheme');
        element.classList.toggle('dark');
        // document.documentElement.setAttribute('data-theme', 'dark')

        // const images = document.querySelectorAll('img');

        // for (let i = 0; i < images.length; i++) {
        // const image = images[i];
        // const srcLightMode = image.getAttribute('src');
        // // Get the last part after the last slash
        // const lastPart = srcLightMode.substring(srcLightMode.lastIndexOf('/') + 1);
        // // Extract the image name without extension
        // const imgName = srcLightMode.substring(srcLightMode.lastIndexOf('/') + 1).split('.')[0];
        // // Remove the last part from the image name (before the dot)
        // const NewImgName = imgName.split('-').slice(0, -1);
        // // Join the parts back together with a hyphen
        // const finalImgName = NewImgName.join('-') + '.' + srcLightMode.substring(srcLightMode.lastIndexOf('/') + 1).split('.')[1];
        // // Add "dark-" to the final image name
        // const newLastPart = "dark-" + finalImgName;
        // // Reconstruct the full path with the original path and the new image name
        // const fullPath = srcLightMode.substring(0, srcLightMode.lastIndexOf('/') + 1) + newLastPart;
        // image.src = fullPath;
        // }
    } else {
        localStorage.setItem('isDarkMode', false);
        element.classList.toggle('darkTheme');
        element.classList.toggle('lightTheme');
        element.classList.toggle('dark');
        // const images = document.querySelectorAll('img');

        // for (let i = 0; i < images.length; i++) {
        //     const image = images[i];
        //     const srcDarkMode = image.getAttribute('src');
        //     // const srcLightMode = srcDarkMode.replace('/src/assets/images/dark-mode', '/src/assets/images');
        //     // Remove "-dark" from the last part for light mode
        // const srcLightMode = srcDarkMode.replace(/dark-/, '');
        //     image.src = srcLightMode;
        // }
    }

    replaceLink(themeLink, newHref, () => {
        layoutConfig.colorScheme.value = colorScheme;
        layoutConfig.menuTheme.value = colorScheme;
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
const getUpdatedWalletAmount = async () => {
    await store.dispatch(`${DARKMODE.NAME}/getWalletAmount`);
    const updatedWalletAmount = store.getters[`${DARKMODE.NAME}/sendWalletAmount`];
    if (updatedWalletAmount.status === 'success') {
        walletAmount.value = updatedWalletAmount.total_credit_amount;
    } else {
        return;
    }
};
// ends here
</script>

<template>
    <div class="layout-topbar"
        :class="[topHeader['is_show_important_update'] === 1 ? 'hidden' : '', menuType === 2 ? 'header-right-admin' : '']"
        >
        <div class="topbar-start-sec">
            <div class="side-nav-outer flex align-items-center">
                <div class="side-nav">
                    <div class="icon-menu">
                        <a data-toggle="sidebar-colapse" @click="anchor()"
                            class="cursor-pointer sidebar-normal-section">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <path d="M6 12h12M6 8h12M6 16h12" stroke="#3C4249" stroke-width="1.2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </a>
                        <a data-toggle="sidebar-colapse" @click="onMenuButtonClick()"
                            class="cursor-pointer sidebar-mobile-section">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <path d="M6 12h12M6 8h12M6 16h12" stroke="#3C4249" stroke-width="1.2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="custom-logo">
                    <a
                        :href="topHeader['user_type'] == 4 ? config.baseUrlPanel + 'v4/channel-partner/channel-partner-dashboard' : config.baseUrlPanel + 'index'">
                        <img v-if="!darkModeVal" class="custom-logo-img" src="../assets/images/itl-logo.svg" />
                        <img v-else class="custom-logo-img" src="../assets/images/dark-mode/dark-itl-logo.svg" />
                        <img class="custom-logo-mobile-img"
                            src="https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/itl-logo-mobile.svg" />
                    </a>
                </div>
                <!--dropdown menu-->
                <div class="product-dropdown-outer" v-if="topHeader['user_type'] != 4">
                    <div v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'px-scalein', leaveToClass: 'hidden', leaveActiveClass: 'px-fadeout', hideOnOutsideClick: 'true' }"
                        class="product-dropdown-inner flex items-center">
                        <span class="dropdown-items">{{ getSelectedMenuName }}</span>
                        <img v-if="!darkModeVal" class="dropdown-arrow" src="../assets/images/drodown-arrow.svg" />
                        <img v-else class="dropdown-arrow" src="../assets/images/dark-mode/dark-drodown-arrow.svg" />
                    </div>
                    <div :class="'dropdown-menu hidden'">
                        <span class="dropdown-products">Products</span>
                        <a class="dropdown-item helvetica-medium color-1f2937 domestic-item"
                            :class="menuType == 1 ? 'active' : ''" @click="menuChangeDomIntl(1)">
                            <img src="@/assets/images/domestic.svg" />
                            <span class="dropdown-checkbox">Domestic</span>
                        </a>
                        <a class="dropdown-item helvetica-medium color-1f2937 international-item"
                            :class="menuType == 0 ? 'active' : ''" @click="menuChangeDomIntl(0)">
                            <img src="@/assets/images/international.svg" />
                            <span class="dropdown-checkbox">International</span>
                        </a>
                        <a class="dropdown-item helvetica-medium color-1f2937 connect-itl-item"
                            :class="menuType == 2 ? 'active' : ''" @click="menuChangeDomIntl(2)">
                            <img src="@/assets/images/connect.svg" />
                            <span class="dropdown-checkbox">ITL Connect+</span>
                        </a>
                        <a class="dropdown-item helvetica-medium color-1f2937 connect-itl-item"
                            :class="menuType == 3 ? 'active' : ''" @click="menuChangeDomIntl(3)">
                            <img src="@/assets/images/menu-checkout-icon.svg" />
                            <span class="dropdown-checkbox">Checkout</span>
                        </a>
                    </div>
                </div>
                <div :class="'dropdown-menu hidden'" v-if="topHeader['user_type'] != 4"
                    aria-labelledby="helpDropdownMenu">
                    <div class="help-dropdown-details-section">
                        <div class="help-head-txt helvetica-regular">Help</div>
                        <div class="grid">
                            <div class="col-12 pl-0">
                                <div v-for="item in otherMenuHeaderData" :key="item">
                                    <a :href="item.url">
                                        <div class="help-menu-li-section">
                                            <img :src="getIcons(item.icon)" alt="" />
                                            <div class="help-menu-li-text helvetica-regular">{{ item.label }}</div>
                                        </div>
                                    </a>
                                </div>
                                <!-- <a :href="config.baseUrlPanel + 'support-tickets-v3/1'">
                                    <div class="help-menu-li-section">
                                        <img src="../assets/images/ic-ticket.svg" alt="" />
                                        <div class="help-menu-li-text helvetica-regular">Create new tickets</div>
                                    </div>
                                </a>
                                <a :href="config.baseUrlPanel + 'support-tickets-v3/1'">
                                    <div class="help-menu-li-section">
                                        <img src="../assets/images/ticket-menu-icon.svg" alt="" />
                                        <div class="help-menu-li-text helvetica-regular">View all tickets</div>
                                    </div>
                                </a> -->
                                <!-- <a href="">
                                    <div class="help-menu-li-section">
                                        <img src="../assets/images/ic-training.svg" alt="" />
                                        <div class="help-menu-li-text helvetica-regular">Training session</div>
                                    </div>
                                </a> -->
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <div class="product-dropdown-outer">
                    <div v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'px-scalein', leaveToClass: 'hidden', leaveActiveClass: 'px-fadeout', hideOnOutsideClick: 'true' }" class="product-dropdown-inner">
                        <span class="dropdown-items">{{ selectedValue }}</span>
                        <img class="dropdown-arrow" src="../assets/images/drodown-arrow.svg">
                    </div>
                    <div :class="'dropdown-menu hidden'">
                            <span class="dropdown-products">Products</span>
                            <a href="https://my.ithinklogistics.net/" class="dropdown-item helvetica-medium color-1f2937 domestic-item" onclick="menu_change_dom_intl(1)">
                                <img src="@/assets/images/domestic.svg" />
                                <span class="dropdown-checkbox">Domestic</span>
                            </a>
                            <a href="https://my.ithinklogistics.net/" class="dropdown-item helvetica-medium color-1f2937 international-item active" onclick="menu_change_dom_intl(0)">
                                <img src="@/assets/images/international.svg" />
                                <span class="dropdown-checkbox">International</span>
                            </a>
                            <a href="https://my.ithinklogistics.net/itl-connect-dashboard-v3" class="dropdown-item helvetica-medium color-1f2937 connect-itl-item" onclick="menu_change_dom_intl(2)">
                                <img src="@/assets/images/connect.svg" />
                                <span class="dropdown-checkbox">Connect+</span>
                            </a>
                        </div>
                 </div>
                <div :class="'dropdown-menu hidden'" aria-labelledby="helpDropdownMenu">
                        <div class="help-dropdown-details-section">
                            <div class="help-head-txt helvetica-regular">Help</div>
                            <div class="grid">
                                <div class="col-12 pl-0">
                                    <a href="https://my.ithinklogistics.net/support-tickets-v3/1">
                                        <div class="help-menu-li-section">
                                            <img src="../assets/images/ic-ticket.svg" alt="" />
                                            <div class="help-menu-li-text helvetica-regular">Create new tickets</div>
                                        </div>
                                    </a>
                                    <a href="https://my.ithinklogistics.net/support-tickets-v3/1">
                                        <div class="help-menu-li-section">
                                            <img src="../assets/images/ticket-menu-icon.svg" alt="" />
                                            <div class="help-menu-li-text helvetica-regular">View all tickets</div>
                                        </div>
                                    </a>
                                    <a href="">
                                        <div class="help-menu-li-section">
                                            <img src="../assets/images/ic-training.svg" alt="" />
                                            <div class="help-menu-li-text helvetica-regular">Training session</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                 </div> -->
            </div>
        </div>
        <!-- <div class="master-search-inner-section" v-if="topHeader['user_type'] != 4">
            <img src="https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/store-order-search.svg" alt="search-img-section" class="search-icon" />
            <input type="text" class="master-search-input helvetica-regular" placeholder="Search anything....." />
        </div> -->
        <div class="layout-topbar-menu-section">
            <app-sidebar></app-sidebar>
        </div>
        <div class="topbar-end">
            <ul class="topbar-menu"
                :class="topHeader['user_type'] == 1 || topHeader['user_type'] == 2 ? 'header-right-admin' : ''">
                <!--create order button-->
                <!-- <div class="master-search-inner-section-mobile" v-if="topHeader['user_type'] != 4">
                    <img src="https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/store-order-search.svg" alt="search-img-section" class="search-icon" />
                </div> -->
                <div class="layout-topbar-createorder-btn" v-if="topHeader['user_type'] == 3 && menuType != 2">
                    <a :href="config.baseUrlPanel + 'create-order-intl-v3'">
                        <button class="createorder-btn"><span class="createorder-plus">+</span>&nbsp;Create
                            Order</button>
                        <img src="../assets/images/createorder-btnmobile.svg" alt="create-orderbtn-mobile"
                            class="createorder-btn-mobile" />
                    </a>
                </div>
                <div class="early-cod-wallet-section" v-if="topHeader['user_type'] == 3">
                    <a class="top-wallet-reacharge" :href="config.baseUrlPanel + 'view-credit-wallet-v3/1'">
                        <img v-if="!darkModeVal" src="@/assets/images/wallet-icon.svg"
                            class="wallet-recharge-desktop" />
                        <img v-else src="@/assets/images/dark-mode/dark-wallet-icon.svg"
                            class="wallet-recharge-desktop" />
                        <span class="helvetica-regular gray-700 header_user_total_credit_amount">₹ {{ walletAmount
                            }}</span>
                        <img v-if="!darkModeVal" src="@/assets/images/wallet-icon.svg" class="wallet-recharge-mobile" />
                        <img v-else src="@/assets/images/dark-mode/dark-wallet-icon.svg"
                            class="wallet-recharge-mobile" />
                    </a>
                    <div class="wallet-refresh-div" @click="getUpdatedWalletAmount()">
                        <img v-if="!darkModeVal" src="@/assets/images/wallet-refresh.svg" alt="" class="img-refresh" />
                        <img v-else src="@/assets/images/dark-mode/dark-wallet-refresh.svg" alt=""
                            class="img-refresh" />
                    </div>
                </div>

                <!-- <div class="master-search-inner-section-mob" v-if="topHeader['user_type'] != 4">
                    <div class="master-search-inner-section">
                        <img src="https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/store-order-search.svg" alt="search-img-section" class="search-icon" />
                        <input type="text" class="master-search-input helvetica-regular" placeholder="Search anything....." />
                    </div>
                </div> -->
                <div class="help-main-outer-section" v-if="topHeader['user_type'] != 4 && otherMenuHeaderData.length">
                    <div class="help-inner-section" id="helpDropdownMenu"
                        v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'px-scalein', leaveToClass: 'hidden', leaveActiveClass: 'px-fadeout', hideOnOutsideClick: 'true' }">
                        <img v-if="!darkModeVal" src="@/assets/images/menu-support-icon.svg" class="menu-help-img"
                            data-toggle="tooltip" data-placement="bottom" title=""
                            data-original-title="Support Ticket" />
                        <img v-else src="@/assets/images/dark-mode/dark-menu-support-icon.svg" class="menu-help-img"
                            data-toggle="tooltip" data-placement="bottom" title=""
                            data-original-title="Support Ticket" />
                    </div>
                    <div :class="'dropdown-menu hidden'" aria-labelledby="helpDropdownMenu">
                        <div class="help-dropdown-details-section">
                            <div class="help-head-txt helvetica-regular">Help</div>
                            <div class="grid">
                                <div class="col-12 pl-0">
                                    <div v-for="item in otherMenuHeaderData" :key="item">
                                        <a :href="item.url">
                                            <div class="help-menu-li-section">
                                                <img :src="getIcons(item.icon)" alt="" />
                                                <div class="help-menu-li-text helvetica-regular">{{ item.label }}</div>
                                            </div>
                                        </a>
                                    </div>
                                    <!-- <a :href="config.baseUrlPanel + 'support-tickets-v3/1'">
                                        <div class="help-menu-li-section">
                                            <img src="../assets/images/ticket-menu-icon.svg" alt="" />
                                            <div class="help-menu-li-text helvetica-regular">View all tickets</div>
                                        </div>
                                    </a> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="setting-main-outer"
                    v-if="(topHeader['user_type'] == 1 || topHeader['user_type'] == 2 || topHeader['user_type'] == 3) && menuType != 2">
                    <div class="setting-detail-inner-sec">
                        <div v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'px-scalein', leaveToClass: 'hidden', leaveActiveClass: 'px-fadeout', hideOnOutsideClick: 'true' }"
                            class="setting-detail-dropdown cursor-pointer" @click="isToggleSetting()"
                            id="settingDropdownMenu" data-toggle="dropdown">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <path
                                    d="M9.5 4.836A1 1 0 0 1 10.487 4h2.304a1 1 0 0 1 .987.836l.19 1.138c.056.333.278.61.573.774.066.035.13.073.195.112.288.175.64.229.956.11l1.082-.405a1 1 0 0 1 1.217.436l1.152 1.997a1 1 0 0 1-.23 1.272l-.892.735c-.26.214-.39.545-.383.882a5.71 5.71 0 0 1 0 .227c-.007.336.122.666.382.88l.893.736a1 1 0 0 1 .231 1.27l-1.153 1.998a1 1 0 0 1-1.217.437l-1.082-.406a1.108 1.108 0 0 0-.957.11c-.064.04-.13.078-.195.114-.294.163-.516.44-.572.773l-.19 1.138a1 1 0 0 1-.987.836h-2.305a1 1 0 0 1-.987-.836l-.19-1.138a1.107 1.107 0 0 0-.572-.774 5.688 5.688 0 0 1-.195-.112 1.107 1.107 0 0 0-.957-.11l-1.081.405a1 1 0 0 1-1.217-.436l-1.153-1.997a1 1 0 0 1 .23-1.272l.893-.735c.26-.214.389-.545.383-.882a6.163 6.163 0 0 1 0-.227 1.103 1.103 0 0 0-.383-.88l-.892-.736A1 1 0 0 1 4.134 9l1.153-1.998a1 1 0 0 1 1.217-.437l1.081.406c.317.118.668.064.957-.11.064-.04.13-.078.195-.114.295-.163.518-.44.573-.773l.19-1.138z"
                                    stroke="#3C4249" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                                </path>
                                <path d="M14.306 12a2.667 2.667 0 1 1-5.333 0 2.667 2.667 0 0 1 5.333 0z"
                                    stroke="#3C4249" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                                </path>
                            </svg>
                        </div>
                        <div :class="'dropdown-menu hidden ' + isSettingVisible" aria-labelledby="settingDropdownMenu">
                            <div class="setting-dropdown-details-section">
                                <div class="setting-head-txt helvetica-regular">Setting</div>
                                <div class="close-icon-outer-sec close-btn" @click="toggleDropdown($event)"
                                    v-if="isResponsiveTab">
                                    <img v-if="!darkModeVal" src="@/assets/images/close-icon.svg" alt="" />
                                    <img v-else src="@/assets/images/dark-mode/dark-close-icon.svg" alt="" />
                                </div>
                                <div class="grid" :key="key">
                                    <div class="col-6 pl-0">
                                        <!-- {{ settingMenuHeaderData[0]['label'] }} -->
                                        <div v-for="item in settingMenuHeaderData" :key="item">
                                            <a :href="config.baseUrlPanel + (item?.to ? ('v4/' + item?.to) : item?.url)">
                                                <div class="setting-menu-li-section">
                                                    <img :src="getIcons(item.icon)" alt="" />
                                                    <div class="setting-menu-li-text helvetica-regular">{{ item.label }}
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="col-6 setting-dropdown-mob-sec">
                                        <div v-for="item in accountMenuHeaderData" :key="item">
                                            <a :href="config.baseUrlPanel + (item?.to ? ('v4/' + item?.to) : item?.url)">
                                                <div class="setting-menu-li-section">
                                                    <img :src="getIcons(item.icon)" alt="" />
                                                    <div class="setting-menu-li-text helvetica-regular">{{ item.label }}
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="menu-header-outer-section" v-if="topHeader['user_type'] != 4">
                    <div class="menu-header-inner-section">
                        <div class="overlaybg"></div>
                        <a v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'px-scalein', leaveToClass: 'hidden', leaveActiveClass: 'px-fadeout', hideOnOutsideClick: 'true' }"
                            class="cursor-pointer">
                            <img v-if="!darkModeVal" src="@/assets/images/dashboard-header-icon.svg"
                                alt="dashboard-menu-icon" data-toggle="dropdown" />
                            <img v-else src="@/assets/images/dark-mode/dark-dashboard-header-icon.svg"
                                alt="dashboard-menu-icon" data-toggle="dropdown" />
                        </a>
                        <!-- <div class="menu-dropdown-outer hidden"> -->
                        <div :class="'dropdown-menu hidden'">
                            <div class="dropdown-text">ITL Add-ons</div>
                            <!-- <a href="https://my.ithinklogistics.net/" class="dropdown-item helvetica-medium color-1f2937 domestic-item" onclick="menu_change_dom_intl(1)">
                                <img src="@/assets/images/domestic.svg" />
                                <span>Domestic</span>
                            </a>
                            <a href="https://my.ithinklogistics.net/" class="dropdown-item helvetica-medium color-1f2937 international-item active" onclick="menu_change_dom_intl(0)">
                                <img src="@/assets/images/international.svg" />
                                <span>International</span>
                            </a>
                            <a href="https://my.ithinklogistics.net/itl-connect-dashboard-v3" class="dropdown-item helvetica-medium color-1f2937 connect-itl-item" onclick="menu_change_dom_intl(2)">
                                <img src="@/assets/images/connect.svg" />
                                <span>ITL Connect+</span>
                            </a> -->
                            <div v-for="addOn in itlAddOns" :key="addOn.title" class="add-on-outer">
                                <router-link v-if="addOn.to" :to="{ path: `/${addOn.to}` }"
                                    class="early-code-main-outer-section" target="_blank">
                                    <img :src="getIcons(addOn.image)" alt="" class="early-code-img" />
                                    <div class="early-cod-text-outer-section">
                                        <div class="early-cod-text">{{ addOn.title }}</div>
                                        <div class="detailed-cod-text">{{ addOn.content }}</div>
                                    </div>
                                </router-link>
                                <a v-else :href="addOn.link" class="early-code-main-outer-section" target="_blank">
                                    <img :src="getIcons(addOn.image)" alt="" class="early-code-img" />
                                    <div class="early-cod-text-outer-section">
                                        <div class="early-cod-text">{{ addOn.title }}</div>
                                        <div class="detailed-cod-text">{{ addOn.content }}</div>
                                    </div>
                                </a>
                            </div>
                            <!-- <a v-for="addOn in itlAddOns" :key="addOn.title" :href="addOn.link" class="early-code-main-outer-section">
                                <div class="early-code-image-section">
                                    <img :src="getIcons(addOn.image)" alt="" />
                                </div>
                                <div class="early-cod-text-outer-section">
                                    <div class="early-cod-text">{{ addOn.title }}</div>
                                    <div class="detailed-cod-text">{{ addOn.content }}</div>
                                    <div class="early-cod-text">Early COD</div>
                                    <div class="detailed-cod-text">Select a plan and activate your daily COD remittance today!</div>
                                </div>
                            </a> -->
                            <!-- <a href="https://my.ithinklogistics.net/view-insurance-v3" class="early-code-main-outer-section">
                                <div class="early-code-image-section">
                                    <img src="https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/itl_insurance.svg" />
                                </div>
                                <div class="early-cod-text-outer-section">
                                    <span class="early-cod-text">Insurance</span>
                                    <p class="detailed-cod-text">Ensuring safety and coverage for lost or damaged goods.</p>
                                </div>
                            </a>
                            <a href="https://my.ithinklogistics.net/dt-v7/#/itl-capital" class="early-code-main-outer-section">
                                <div class="early-code-image-section">
                                    <img src="https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/itl_captial.svg" />
                                </div>
                                <div class="early-cod-text-outer-section">
                                    <span class="early-cod-text">ITL Capital</span>
                                    <p class="detailed-cod-text">Your key to accelerated growth. Access the funds you need, hassle-free.</p>
                                </div>
                            </a> -->
                        </div>
                        <!-- </div> -->
                    </div>
                </div>
                <!-- create order btn section start -->
                <!-- <div class="create-order-main-outer-section">
                    <div class="create-order-inner-section">
                        <a href="https://my.ithinklogistics.net/create-order-intl-v3">
                            <img src="../assets/images/create-order-v3-icon.svg" alt="create-order" />
                        </a>
                    </div>
                </div> -->
                <!-- create order btn section end -->
                <li ref="profile" class="topbar-item user-profile">
                    <a
                        v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'px-scalein', leaveToClass: 'hidden', leaveActiveClass: 'px-fadeout', hideOnOutsideClick: 'true' }">
                        <div class="user-detail-dropdown">
                            <button class="dropdown-toggle user-icon-initials" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{
            topHeader['short_user_name'] }}</button>
                        </div>
                    </a>
                    <ul :class="'fadeInDown hidden'">
                        <li>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <div class="user-details-inner">
                                    <div class="user-detail-inner-icon">
                                        <div class="user-detail-inner-icon-inner">{{ topHeader['short_user_name'] }}
                                        </div>
                                    </div>
                                    <div class="user-detail-inner-content">
                                        <div class="inner-user-name helvetica-medium gray-700">{{ topHeader['user_name']
                                            }}
                                        </div>
                                        <div class="inner-email-id gray-500 helvetica-regular">{{
            topHeader['user_email_id']
        }}</div>
                                    </div>
                                </div>
                                <div class="manager-details"
                                    v-if="topHeader['is_subadmin'] == 0 && topHeader['user_type'] != 4">
                                    <div v-if="topHeader['is_account_manager'] == 1">
                                        <div class="manager-heading helvetica-regular">Account Manager</div>
                                        <div class="user-details">
                                            <div class="manager-details-info">
                                                <div class="manager-detail-inner m-b-8">
                                                    <label class="helvetica-regular gray-700">Name</label>
                                                    <div class="helvetica-regular gray-600 user-name">{{
            topHeader['account_manager_name'] }}</div>
                                                </div>
                                                <div class="manager-detail-inner">
                                                    <label class="helvetica-regular gray-700">Phone</label>
                                                    <div class="user-number helvetica-regular gray-600">{{
            topHeader['account_manager_phone_no'] }}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a class="dropdown-item" :href="'/' + topHeader['rate_us']['url']">
                                        <div class="dropdown-icon">
                                            <img v-if="!darkModeVal" src="../assets/images/menu-rate-us.svg" />
                                            <img v-else src="../assets/images/dark-mode/dark-menu-rate-us.svg" />
                                            <span class="helvetica-regular gray-600">{{ topHeader['rate_us']['name']
                                                }}</span>
                                        </div>
                                    </a>
                                    <a class="dropdown-item" :href="'/' + topHeader['book_a_training']['url']">
                                        <div class="dropdown-icon">
                                            <img v-if="!darkModeVal" src="../assets/images/menu-book-training.svg" />
                                            <img v-else src="../assets/images/dark-mode/dark-menu-book-training.svg" />
                                            <span class="helvetica-regular gray-600">{{
            topHeader['book_a_training']['name']
        }}</span>
                                        </div>
                                    </a>
                                </div>
                                <div class="dropdown-menu-footer">
                                    <div v-if="topHeader['user_type'] != 4" class="dark-mode-switch">
                                        <div class="title">
                                            <img v-if="!darkModeVal" class="dark-mode-icon"
                                                src="../assets/images/dark-mode-icon.svg" alt="dark-mode-icon" />
                                            <img v-else class="dark-mode-icon"
                                                src="../assets/images/dark-mode/dark-mode-icon.svg"
                                                alt="dark-mode-icon" />
                                            <span class="dark-mode-text">Dark Color Theme</span>
                                        </div>
                                        <InputSwitch v-model="colorScheme" type="checkbox" id="switch"
                                            @change="toggleColorScheme('light', 'dark')" />
                                    </div>

                                    <a class="dropdown-item" :href="'/' + topHeader['logout']['url']"
                                        @click="userLogout()">
                                        <div class="dropdown-icon">
                                            <img v-if="!darkModeVal" src="../assets/images/menu-logout.svg" />
                                            <img v-else src="../assets/images/dark-mode/dark-menu-logout.svg" />
                                            <span class="helvetica-regular gray-600 red-color">{{
                                                topHeader['logout']['name'] }}</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss">
@import '../assets/itl-common-css/common-css.scss';

.wallet-refresh-div {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    @include theme() {
        border-right: 1px solid theme-get('topbar-menu-straightLine');
    }

    @media (max-width: 767px) {
        border-right: none !important;
    }

    padding-right: 11px;
    margin-right: 12px;

    .img-refresh {
        max-width: 14px;
        max-height: 14px;
        margin-right: 0px !important;

        @media screen and (max-width: 767px) {
            margin-left: 8px !important;
        }
    }
}

body {
    @include theme() {
        background-color: theme-get('card-bg') !important;
    }
}

.setting-detail-dropdown svg path {
    @include theme() {
        stroke: theme-get('background-topBar-svg');
    }
}

.icon-menu a svg path {
    @include theme() {
        stroke: theme-get('background-topBar-svg');
    }
}

.layout-container.layout-transparent-topbar.layout-drawer.layout-sidebar-active.layout-sidebar-anchored .layout-content-wrapper {
    /* margin-left: 244px !important; */
    margin-left: 268px !important;
}

// .layout-container.layout-light.layout-light-menu.layout-transparent-topbar.layout-drawer.layout-sidebar-active.layout-sidebar-anchored .layout-content-wrapper {
//     /* margin-left: 244px !important; */
//     margin-left: 268px !important;
// }
.user-detail-inner-icon-inner,
.user-name,
.user-number {
    @include theme() {
        color: theme-get('topBar-menu-black');
    }
}

.inner-user-name {
    font-weight: 500;
    font-family: Inter-Medium;

    // color: #374151;
    @include theme() {
        color: theme-get('topBar-menu-black');
    }

    font-size: 14px;
    line-height: 20px;
}

.inner-email-id {
    font-size: 12px;
    word-break: break-all;

    // color: #6b7280;
    @include theme() {
        color: theme-get('topBar-menu-black');
    }

    line-height: 16px;
    font-family: Inter-Regular;
}

.add-on-outer {
    margin-bottom: 8px;
}

.early-code-main-outer-section {
    border-radius: 8px;

    // background-color: #f4f7f9;
    @include theme() {
        background-color: theme-get('background-top-active');
    }

    padding: 12px;
    display: flex;
    gap: 12px;
    cursor: pointer;
    width: 248px;
    height: 68px;
    margin-bottom: 8px;
}

.early-code-img {
    width: 24px;
    height: 24px;
    border-radius: 0px !important;
}

.early-code-main-outer-section:last-child {
    margin-bottom: 0;
}

.early-cod-text {
    font-family: 'Inter-Medium';
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;

    // color: #0c0c0d;
    @include theme() {
        color: theme-get('black-900');
    }
}

.detailed-cod-text {
    font-family: 'Inter-Regular';
    font-size: 10px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;

    // color: #575f6c;
    @include theme() {
        color: theme-get('black-700');
    }
}

.early-code-main-outer-section .early-code-image-section img {
    width: 24px;
    height: 24px;
}

.early-code-img {
    width: 24px;
    height: 24px;
    border-radius: 0px !important;
}

.early-code-image-section {
    display: inline-block;
}

.early-cod-text-outer-section {
    display: inline-block;
    vertical-align: text-top;
}

.early-cod-wallet-section {
    display: flex;
    align-items: center;
}

.sidebar-mobile-section {
    display: none;
}

.sidebar-normal-section {
    display: block;
}

.master-search-inner-section-mob {
    display: none;
}

.master-search-inner-section {
    display: block;
}

.layout-container.layout-drawer.layout-drawer .layout-content-wrapper {
    /* margin-top: 140px !important; */
    margin-left: 0 !important;
}

.product-dropdown-outer {
    padding-left: 30px;
}

.product-dropdown-outer .product-dropdown-inner .dropdown-items {
    width: auto;
    height: 16px;
    margin: 0 8px 0 0;
    font-family: 'Inter-Medium';
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: normal;
    text-align: left;

    // color: #1d252b;
    @include theme() {
        color: theme-get('black-800');
    }
}

.product-dropdown-inner {
    position: relative;
    cursor: pointer;
}

.product-dropdown-outer .product-dropdown-inner .dropdown-arrow {
    // position: absolute;
    // top: 4px;
    // height: 12px;
}

.product-dropdown-outer .dropdown-menu {
    position: absolute;
    left: auto;
    right: auto;
    border-radius: 8px;
    box-shadow: 0 25px 50px #00000040;

    @include theme() {
        background-color: theme-get('background');
        border: 1px solid theme-get('border-black-400');
    }

    color: #333;
    width: 190px;
    height: auto;
    float: left;
    min-width: 11.25rem;
    padding: 16px 4px;
    margin: 0.125rem 0 0;
    text-align: left;
    list-style: none;
    background-clip: padding-box;
    top: 22px;
    z-index: 9999;
    /* top: 39px; */
}

.product-dropdown-outer .dropdown-menu .dropdown-products {
    padding-left: 14px;
    font-size: 11px;
    position: relative;
    bottom: 7px;

    // color: #3c4249;
    @include theme() {
        color: theme-get('black-700');
    }

    font-weight: normal;
    font-family: 'Inter-Medium';
}

/* .product-dropdown-outer .dropdown-menu .dropdown-products::after {
    content: '';
    display: inline-block;
    height: 5px;
    width: 10px;
    border-radius: 2px;
    border-left: 2px solid #575f6c;
    border-bottom: 2px solid #575f6c;
    transform: rotate(-45deg);
    position: absolute;
    top: 28px;
    left: 155px;
} */
.product-dropdown-outer .dropdown-menu .dropdown-item {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
    outline: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    margin-bottom: 1px;
    /* margin-bottom: 0; */
    transition: background-color ease-in-out 0.15s, color ease-in-out 0.15s;
    width: 100%;
    padding: 5px 1rem;
    clear: both;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
}

.product-dropdown-outer .dropdown-menu .dropdown-item.active::after {
    content: '';
    display: inline-block;
    height: 5px;
    width: 10px;
    border-radius: 2px;

    @include theme() {
        border-left: 2px solid theme-get('topBar-menu-border-tick');
        border-bottom: 2px solid theme-get('topBar-menu-border-tick');
    }

    transform: rotate(-45deg);
    position: absolute;
    top: 10px;
    left: 155px;
}

.product-dropdown-outer .dropdown-menu .dropdown-item.active {
    @include theme() {
        background-color: theme-get('background-top-active');
    }
}

.product-dropdown-outer .dropdown-menu .dropdown-item:hover {

    // background-color: #f5f5f5 !important;
    @include theme() {
        background-color: theme-get('background-active');
    }
}

.product-dropdown-outer .dropdown-menu .dropdown-item .dropdown-checkbox {
    font-size: 12px;
    font-weight: 500;
    font-family: 'Inter-Medium';
    line-height: 1.33;

    // color: #0c0c0d;
    @include theme() {
        color: theme-get('black-900');
    }
}

.product-dropdown-outer .dropdown-menu .dropdown-item img {
    margin-right: 8px;
    width: 20px;
    height: 20px;
}

.layout-topbar .topbar-menu .menu-header-inner-section .dropdown-menu .dropdown-item img {
    margin-right: 1rem;
}

.layout-topbar .topbar-menu .menu-header-inner-section .dropdown-menu {
    padding-left: 16px !important;
    padding-right: 16px !important;
}

.layout-topbar .topbar-menu .menu-header-inner-section .dropdown-menu {
    height: auto !important;
    right: 45px !important;
}

.menu-header-inner-section .dropdown-menu .dropdown-text {
    padding-bottom: 12px;
    padding-left: 8px;
    padding-top: 8px;
    font-family: 'Inter-Regular';
    font-size: 11px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.09;
    letter-spacing: normal;

    // color: #3c4249;
    @include theme() {
        color: theme-get('black-700');
    }
}

.layout-topbar .topbar-menu .top-wallet-reacharge .wallet-recharge-mobile {
    display: none !important;
}

/* .product-dropdown-outer .dropdown-menu .dropdown-item .dropdown-checkbox{
    content: "";
    display: inline-block;
    height: 5px;
    width: 10px;
    border-radius: 2px;
    border-left: 2px solid #0065ff;
    border-bottom: 2px solid #0065ff;
    transform: rotate(-45deg);
    position: absolute;
    right: 20px;
    top: 12px;
} */
.product-dropdown-outer {
    position: relative;
}

.product-dropdown-outer::before {
    content: '';
    position: absolute;
    border-right: 1px solid #a3aebb;
    /* width: 50px; */
    height: 16px;
    left: 13px;
    top: 2px;
}

/* create order button */
.layout-topbar-createorder-btn .createorder-btn {
    width: 112px;
    height: 28px;
    flex-grow: 0;
    margin: 0 23px 0 0;
    padding: 0;
    border-radius: 6px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
    border: solid 1px #0168ed;
    background-color: #0168ed;
    font-size: 12px;
    font-weight: 400;
    color: #fff;
    position: relative;
    cursor: pointer;
    font-family: Inter-Medium;
    display: flex;
    align-items: center;
    justify-content: center;
}

.layout-topbar-createorder-btn .createorder-btn-mobile {
    display: none;
}

.layout-topbar-createorder-btn .createorder-btn .createorder-plus {
    /* position: absolute;
    top: 3px;
    left: 9px;
    font-size: 18px; */
    font-size: 18px;
    line-height: 18px;
}

.topbar-menu .master-search-inner-section-mobile {
    display: none;
}

/* .custom-logo{
    position: relative !important;
}

.custom-logo::after{
    content: '';
    position: absolute;
    border-right: 1px solid #a3aebb;
    width: 50px;
    height: 16px;
    left: 95px;
    top: 4px;
} */
.setting-menu-li-section:hover {
    border-radius: 4px;
    background-color: #f1f3f5;
}

.darkTheme .setting-menu-li-section:hover {
    background-color: #313131;
}

@media (max-width: 1250px) {
    .layout-topbar .master-search-inner-section {
        left: 30px !important;
    }
}

@media (min-width: 768px) and (max-width: 1023px) {
    .early-cod-wallet-section {
        display: flex;
        align-items: center;
    }

    .layout-topbar .topbar-menu .early-cod-div-inner {
        border-right: none;
        padding-right: 15px;
        margin-right: 0;
    }

    .layout-topbar .master-search-inner-section {
        /* position: relative; */
        display: none;
    }

    .layout-sidebar {
        height: 100% !important;
        top: 42px !important;
        transition: width 0.3s cubic-bezier(0, 0, 0.2, 1) !important;
        width: 2.938rem !important;
        z-index: 999 !important;
    }

    .layout-container.layout-drawer .layout-sidebar {
        width: 45px !important;
    }

    .layout-container .layout-sidebar {
        transform: translateX(0%) !important;
    }

    .layout-container.layout-drawer.layout-sidebar-anchored .layout-content-wrapper {
        margin-left: 0 !important;
    }

    .layout-sidebar {
        left: -99px !important;
    }

    .layout-container.layout-drawer.layout-sidebar-active .layout-sidebar {
        left: 0 !important;
    }

    .layout-topbar .master-search-inner-section .master-search-input {
        width: 235px !important;
    }

    .layout-container.layout-transparent-topbar.layout-drawer.layout-sidebar-active.layout-sidebar-anchored .layout-content-wrapper {
        margin-left: 0 !important;
    }

    // .layout-container.layout-light.layout-light-menu.layout-transparent-topbar.layout-drawer.layout-sidebar-active.layout-sidebar-anchored .layout-content-wrapper {
    //     margin-left: 0 !important;
    // }

    .layout-container.layout-light.layout-light-menu.layout-transparent-topbar.layout-drawer.layout-sidebar-active.layout-sidebar-anchored .layout-sidebar {
        width: 244px !important;
    }
}

@media (max-width: 767px) {
    .product-dropdown-outer::before {
        display: none;
        content: '';
        position: absolute;
        border-right: 1px solid #a3aebb;
        /* width: 50px; */
        height: 16px;
        left: 13px;
        top: 2px;
    }

    .sidebar-normal-section {
        display: none;
    }

    .sidebar-mobile-section {
        display: block;
    }

    .layout-topbar {
        display: block !important;
        /* height: auto !important; */
        height: 100px !important;
        padding: 12px 0 0 !important;
    }

    .setting-dropdown-details-section .col-6 {
        width: 100% !important;
    }

    .layout-topbar .custom-logo::after {
        display: none !important;
    }

    .layout-topbar .topbar-menu {
        padding: 0 !important;
        display: block !important;
    }

    .topbar-menu .master-search-inner-section-mobile {
        display: inline;
        position: absolute;
        top: 17px;
        right: 205px;
    }

    .topbar-menu .master-search-inner-section-mobile img {
        height: 18px;
    }

    .layout-topbar .topbar-menu .early-cod-wallet-section {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 14px 30px 16px;
    }

    .topbar-start-sec {
        padding-left: 16px;
        padding-right: 16px;
        padding-bottom: 13px;
        border-bottom: 1px solid #e5e7eb;
    }

    .layout-topbar .topbar-menu .help-main-outer-section .dropdown-menu {
        right: 150px !important;
        top: 48px !important;
    }

    .product-dropdown-outer .dropdown-menu {
        top: 29px !important;
    }

    .layout-topbar .topbar-menu .setting-main-outer .setting-detail-inner-sec .dropdown-menu {
        position: fixed !important;
        width: 100% !important;
        top: 0 !important;
        bottom: 0 !important;
        left: 0 !important;
        z-index: 1 !important;
        overflow: hidden !important;
    }

    .grid {
        display: block !important;
    }

    .col-6.setting-dropdown-mob-sec {
        padding-left: 0;
    }

    img.menu-help-img {
        position: absolute;
        top: 14px;
        right: 173px;
    }

    .header-right-admin img.menu-help-img {
        right: 90px;
    }

    .setting-main-outer {
        position: absolute;
        top: 14px;
        right: 133px;
    }

    .menu-header-inner-section {
        position: absolute;
        top: 14px;
        right: 110px;
        padding-top: 0 !important;
    }

    .header-right-admin .menu-header-inner-section {
        right: 60px;
    }

    .create-order-inner-section {
        position: absolute;
        top: 14px;
        right: 80px;
    }

    li.topbar-item.user-profile {
        margin-left: 0 !important;
        position: absolute !important;
        top: 14px !important;
        right: 30px !important;
    }

    .layout-topbar .topbar-menu .early-cod-div-inner {
        border-right: none !important;
        padding-right: 0 !important;
        margin-right: 0 !important;
    }

    .layout-topbar .topbar-menu .top-wallet-reacharge {
        border-right: none !important;
        padding-right: 0 !important;
        margin-right: 0 !important;
        display: flex !important;
        justify-content: flex-end !important;
        align-items: center !important;
        /* position: relative !important;
        left: 81% !important; */
    }

    .layout-topbar .topbar-menu .top-wallet-reacharge .wallet-recharge-desktop {
        display: none !important;
    }

    .layout-topbar .topbar-menu .top-wallet-reacharge .wallet-recharge-mobile {
        display: block !important;
        margin-right: 0 !important;
        /* position: relative !important; */
        /* left: 107px  !important;
        top: 1px !important; */
    }

    .master-search-inner-section-mob {
        padding-left: 16px;
        padding-right: 16px;
        display: block !important;
    }

    .master-search-inner-section-mob .master-search-inner-section {
        display: none !important;
    }

    .master-search-inner-section-mob .master-search-inner-section .master-search-input {
        width: 100% !important;
    }

    /* .layout-topbar .master-search-inner-section img {
        position: absolute !important;
        top: auto !important;
        bottom: 62px !important;
        left: 51.3% !important;
        height: 17px !important;
    } */
    .layout-topbar .topbar-menu .help-main-outer-section .help-inner-section {
        padding-top: 0 !important;
    }

    .product-dropdown-outer {
        padding-left: 0 !important;
        position: relative;
        top: 49px;
        right: 60px;
    }

    .master-search-inner-section {
        display: none;
    }

    .layout-container.layout-drawer.layout-drawer .layout-content-wrapper {
        margin-top: 100px !important;
        margin-left: 0 !important;
    }

    .setting-dropdown-details-section {
        position: relative;
    }

    .close-btn {
        position: absolute;
        top: 29px;
        right: 5%;
    }

    /* .menu-header-inner-section .overlaybg {
        position: fixed;
        width: 100%;
        height: 100%;
        background: #0000003b;
        top: 0;
        left: 0;
        z-index: 9;
    }
    .menu-header-inner-section .dropdown-menu {
        position: fixed;
        left: 0;
        right: 0;
        margin: 0 auto;
        bottom: 17px;
        top: auto;
        z-index: 99;
    } */
    .layout-topbar .topbar-menu .menu-header-inner-section .dropdown-menu {
        position: absolute !important;
        right: -45px !important;
        top: 36px;
        /* width: 226px !important; */
        margin: 0 !important;
    }

    .layout-topbar .custom-logo {
        margin-left: 16px !important;
    }

    .layout-topbar-createorder-btn .createorder-btn {
        display: none;
    }

    .layout-topbar-createorder-btn .createorder-btn-mobile {
        display: inline;
        position: absolute;
        top: 12px;
        right: 67px;
    }
}

@media (min-width: 1023px) and (max-width: 1024px) {
    .layout-topbar .master-search-inner-section .master-search-input {
        width: 235px !important;
    }
}

.border-radius-50 {
    border-radius: 50%;
}

/*  changes added for dark mode */

.dark-mode-switch {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .p-inputswitch {
        width: 37px;
        height: 20px;
    }

    .p-inputswitch .p-inputswitch-slider {
        background-color: rgb(193, 199, 208) !important;
    }

    .p-inputswitch .p-inputswitch-slider:before {
        background: #ffffff;
        width: 14px !important;
        height: 14px !important;
        left: 2px;
        margin-top: -6.5px;
        border-radius: 50%;
        transition-duration: 0.2s;
    }

    .p-inputswitch.p-inputswitch-checked:not(.p-disabled):hover .p-inputswitch-slider {
        border-color: rgb(0, 82, 204) !important;
        background-color: rgb(0, 82, 204) !important;
    }

    .p-inputswitch.p-inputswitch-checked .p-inputswitch-slider {
        border-color: rgb(0, 82, 204) !important;
        background-color: rgb(0, 82, 204) !important;
    }

    .p-inputswitch.p-focus .p-inputswitch-slider {
        box-shadow: none !important;
    }

    .title {
        display: flex;
        justify-content: baseline;
        align-items: center;

        .dark-mode-icon {
            width: 1.2rem !important;
            height: 1.2rem !important;
            margin-top: 2px !important;
        }

        .dark-mode-text {
            padding-left: 16px !important;
        }
    }
}

.lightTheme .product-dropdown-outer .dropdown-menu {
    background-color: #fff;
    border: 1px solid #e9ecef;
}

/* ends here  */

/* @media (max-width: 600px) {
    .layout-topbar .topbar-menu .menu-header-inner-section .dropdown-menu {
        right: 20px !important;
    }
}

@media (max-width: 480px) {
    .layout-topbar .topbar-menu .menu-header-inner-section .dropdown-menu {
        position: absolute !important;
        right: -73px !important;
        top: 410px;
        padding-left: 0 !important;
        padding-right: 0 !important;
    }
}

@media (max-width: 360px) {
    .layout-topbar .topbar-menu .menu-header-inner-section .dropdown-menu {
        right: -66px !important;
        width: 210px !important;
    }
}

@media (max-width: 290px) {
    .layout-topbar .topbar-menu .menu-header-inner-section .dropdown-menu {
        right: -88px !important;
        width: 210px !important;
    }
} */

/* @media screen and (min-width: 992px){
.layout-container.layout-drawer .layout-sidebar {
    left: -99px !important;
}
.layout-container.layout-drawer.layout-sidebar-active .layout-sidebar{
    left: 0 !important;
}
} */
</style>
