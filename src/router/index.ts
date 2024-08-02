import { createRouter, createWebHistory } from 'vue-router'; // changes createWebHashHistory to createWebHistory
import AppLayout from '@/layout/AppLayout.vue';
import config from '../util/config';
import { useCookies } from 'vue3-cookies'; //install cookies: https://www.npmjs.com/package/vue3-cookies
const { cookies } = useCookies();
const accessToken = cookies.get('request_token');
import { setLocalStorageItems, setRequestToken } from '../util/localStorageItemsUpdate';
let topHeader = JSON.parse(localStorage.getItem('top_header'));
function checkLoginChannelPartner() {
    if (topHeader['user_type'] != 4) {
        return (window.location.href = config.baseUrlPanel + 'logout');
    }
}
function checkLogin(to, from, next) {
    if (accessToken === null || accessToken === 'undefined' || accessToken === '' || topHeader['user_type'] == 4) {
        // return next(config.baseUrlPanel + '/logout');
        return (window.location.href = config.baseUrlPanel + 'logout');
    }
    if (to !== undefined && to.path !== '/important-updates') {
        if (topHeader['is_show_important_update'] == 1) {
            return next('/important-updates');
        }
    }
    next();
}
function checkUserForEarlyCODAndInsurance() {
    if (topHeader['user_type'] != 3) {
        return (window.location.href = config.baseUrlPanel + 'logout');
    }
}
async function handleRouteVisit() {
    await setLocalStorageItems();
}
async function handleRequestToken(token) {
    await setRequestToken(token);
}

const routes = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/vendor-localstorage',
                name: 'VendorLocalstorage',
                beforeEnter: async (_to, _from, next) => {
                    await handleRouteVisit();
                    next({ path: '/' });
                },
            },
            {
                path: '/admin-localstorage',
                name: 'AdminLocalstorage',
                beforeEnter: async (_to, _from, next) => {
                    await handleRouteVisit();
                    next({ path: '/' });
                },
            },
            {
                path: '/subadmin-localstorage',
                name: 'SubAdminLocalstorage',
                beforeEnter: async (_to, _from, next) => {
                    await handleRouteVisit();
                    next({ path: '/' });
                },
            },
            {
                path: '/request-token',
                name: 'RequestToken',
                beforeEnter: async (to, _from, next) => {
                    const token = to.query.token;
                    await handleRequestToken(token);
                    next({ path: '/' });
                },
            },
            {
                path: '/wismo',
                name: 'Wismo',
                meta: {
                    title: 'Wismo',
                },
                component: () => import('../views/wismo/wismo.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/notification-billing/:id?',
                name: 'ViewBilling',
                meta: {
                    title: 'Billing',
                },
                component: () => import('../views/connect-plus/notification-billing/NotificationBilling.vue'),

                beforeEnter: [checkLogin],
            },
            // {
            //     path: '/velocity',
            //     name: 'VelocityPage',
            //     meta: {
            //         title: 'Velocity',
            //     },
            //     component: () => import('../views/velocity-module/VelocityPage.vue'),
            //     beforeEnter: [checkLogin],
            // },
            {
                path: '/channel-partner/channel-partner-dashboard',
                name: 'ChannelPartnerDashboard',
                meta: {
                    title: 'Channel Partner Dashboard',
                },
                component: () => import('../views/channel-partner/channel-partner-dashboard/ChannelPartnerDashboard.vue'),
                beforeEnter: [checkLoginChannelPartner],
            },
            {
                path: '/channel-partner/view-order/:id?',
                name: 'ViewOrder',
                meta: {
                    title: 'View Order',
                },
                component: () => import('../views/channel-partner/view-order/ViewOrder.vue'),
                beforeEnter: [checkLoginChannelPartner],
            },
            {
                path: '/channel-partner/view-user/:id?',
                name: 'ViewUser1',
                meta: {
                    title: 'View User',
                },
                component: () => import('../views/channel-partner/view-user/ViewUser.vue'),
                beforeEnter: [checkLoginChannelPartner],
            },
            {
                path: '/admin/remittance-plan/:id?',
                name: 'RemittancePlan',
                meta: {
                    title: 'Remittance Plan',
                },
                component: () => import('../views/domestic/admin-pages/remittance-plan/RemittancePlan.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/admin/view-user/:id?',
                name: 'ViewUser',
                meta: {
                    title: 'View User',
                },
                component: () => import('../views/domestic/admin-pages/view-user/ViewUser.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/admin/order/:tabs?/:id?',
                name: 'CancelRtoPodRequest',
                meta: {
                    title: 'Cancel Rto Pod Request',
                },
                component: () => import('../views/domestic/admin-pages/cancel-rto-pod-request/CancelRtoPodRequest.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/orders/international/cancel-request/:id?',
                name: 'CancelRtoPodRequestIntl',
                meta: {
                    title: 'Cancel Rto Pod Request INTL',
                },
                component: () => import('../views/domestic/admin-pages/cancel-rto-pod-request-intl/CancelRtoPodRequestIntl.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/admin/view-user/:id?',
                name: 'ViewUser',
                meta: {
                    title: 'View User',
                },
                component: () => import('../views/domestic/admin-pages/view-user/ViewUser.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/admin/order/:tabs?/:id?',
                name: 'CancelRtoPodRequest',
                meta: {
                    title: 'Cancel Rto Pod Request',
                },
                component: () => import('../views/domestic/admin-pages/cancel-rto-pod-request/CancelRtoPodRequest.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/admin/order/address-update',
                name: 'OrderManagementChangeReq',
                meta: {
                    title: 'Order Management Change Request',
                },
                component: () => import('../views/domestic/admin-pages/order-management-change-request/OrderManagementChangeReq.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/rise',
                name: 'Rise',
                meta: {
                    title: 'Rise',
                },
                component: () => import('../views/rise/rise.vue'),
                beforeEnter: [checkLogin],
            },

            {
                path: '/word-magic',
                name: 'ProductDescription',
                meta: {
                    title: 'Word Magic',
                },
                component: () => import('../views/product-description/ProductDescription.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/early-cod',
                name: 'EarlyCod',
                meta: {
                    title: 'Early Cod',
                },
                component: () => import('../views/early-cod/earlycodChannelpartner.vue'),
                beforeEnter: [checkUserForEarlyCODAndInsurance],
            },
            {
                path: '/insurance',
                name: 'insuranceChannelpartner',
                meta: {
                    title: 'insurance',
                },
                component: () => import('../views/insurance/insuranceChannelpartner.vue'),
                beforeEnter: [checkUserForEarlyCODAndInsurance],
            },
            {
                path: '/checkout/store-order/:id?',
                name: 'StoreOrder',
                meta: {
                    title: 'Order',
                },
                component: () => import('../views/checkout/store-order/StoreOrder.vue'),

                beforeEnter: [checkLogin],
            },
            {
                path: '/ndr/:tabs?/:id?',
                name: 'ViewNdr',
                meta: {
                    title: 'Ndr',
                },
                component: () => import('../views/domestic/view-ndr/ViewNdr.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/checkout/general',
                name: 'general',
                meta: {
                    title: 'General',
                },
                component: () => import('../views/checkout/setting/maincheckout-setting/MainCheckout.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/checkout/payment',
                name: 'payment',
                meta: {
                    title: 'Payment',
                },
                component: () => import('../views/checkout/setting/payment-setting/paymentPage.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/checkout/tracking-info',
                name: 'TrackingInfo',
                meta: {
                    title: 'Tracking Info',
                },
                component: () => import('../views/checkout/setting/trackinginfo-setting/TrackingInfoSetting.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/checkout/discount',
                name: 'Discount',
                meta: {
                    title: 'Discount',
                },
                component: () => import('../views/checkout/setting/discount-setting/discountPage.vue'),
                // beforeEnter: [checkLogin],
            },
            {
                path: '/checkout/dashboard',
                name: 'Dashboard',
                meta: {
                    title: 'Dashboard',
                },
                component: () => import('../views/checkout/dashboard/CheckoutDashboard.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/checkout/abandoned-cart/:id?',
                name: 'AbandonedCart',
                meta: {
                    title: 'Abandoned Cart',
                },
                // component: () => import('../views/abandoned-cart/AbandonedCart.vue'),
                component: () => import('../views/checkout/abandoned-cart/AbandonedCart.vue'),

                beforeEnter: [checkLogin],
            },
            {
                path: '/weight-discrepancy/:id?',
                name: 'weightDiscrepancy',
                meta: {
                    title: 'Weight Descrepancy',
                },
                component: () => import('../views/domestic/weight-discrepancy/weightDiscrepancy.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/ndr-call-details/:id?',
                name: 'Ndr_CallDetail',
                meta: {
                    title: 'NDR Call Detail',
                },
                component: () => import('../views/domestic/admin-pages/ndr-call-details/ndrCallDetail.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/orders/cod-amount-update/:id?',
                name: 'updateCodAmount',
                meta: {
                    title: 'update Cod Amount',
                },
                component: () => import('../views/domestic/admin-pages/update-cod-amount/updateCodAmount.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/non-ndr-call-details/:id?',
                name: 'nonNdrCallDetail',
                meta: {
                    title: 'NDR Call Detail',
                },
                component: () => import('../views/domestic/admin-pages/non-ndr-call-detail/nonNdrCallDetail.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/new-ndr-call-detail/:id?',
                name: 'NdrCallDetail',
                meta: {
                    title: 'NDR Call Detail',
                },
                component: () => import('../views/domestic/admin-pages/ndr-call-details/ndrCallDetail.vue'),
                // beforeEnter: [checkLogin],
            },
            {
                path: '/tickets/:tabs?/:id?',
                name: 'viewTicket',
                meta: {
                    title: 'View Ticket',
                },
                component: () => import('../views/domestic/admin-pages/view-ticket/viewTicket.vue'),
                // beforeEnter: [checkLogin],
            },
            {
                path: '/connect-plus',
                name: 'connectplus',
                meta: {
                    title: 'Connect Plus',
                },
                component: () => import('../views/connect-plus/home-page/ConnectPlusonboard.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/post-ship',
                name: 'postship',
                meta: {
                    title: 'postship',
                },
                component: () => import('../views/postship/dashboard/postShip.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/configure-menu',
                name: 'configuremenu',
                meta: {
                    title: 'configuremenu',
                },
                component: () => import('../views/postship/configureMenu/configureMenu.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/net-promoter-score',
                name: 'netpromoterscore',
                meta: {
                    title: 'netpromoterscore',
                },
                component: () => import('../views/postship/nps/netPromoterScore.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/configure-domain',
                name: 'configuredomain',
                meta: {
                    title: 'configuredomain',
                },
                component: () => import('../views/postship/configureDomain/configureDomain.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/configure-track-page',
                name: 'configuretrackpage',
                meta: {
                    title: 'configuretrackpage',
                },
                component: () => import('../views/postship/configureTrackPage/configureTrackPage.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/bulk-print-shipment-v3/1',
                name: 'bulkprintManifest/1',
                meta: {
                    title: 'Bulk Print Shipment Manifest',
                },
                component: () => import('../views/bulk-print-Shipment/bulkprintManifest.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/bulk-print-shipment-v3/2',
                name: 'bulkprintManifest/2',
                meta: {
                    title: 'Bulk Print Shipment Label',
                },
                component: () => import('../views/bulk-print-Shipment/bulkprintManifest.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/bulk-print-shipment-v3/3',
                name: 'bulkprintManifest/3',
                meta: {
                    title: 'Bulk Print Shipment Invoice',
                },
                component: () => import('../views/bulk-print-Shipment/bulkprintManifest.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/rate-chart/:id?',
                name: 'RateChart',
                meta: {
                    title: 'Rate Chart',
                },
                component: () => import('../views/rate-chart/RateChart.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/return-flow/:tabs?/:id?',
                name: 'ReturnFlow',
                meta: {
                    title: 'Return Flow',
                },
                component: () => import('../views/domestic/return-flow/ReturnFlow.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/check-pincode-serviceability',
                name: 'checkPincodeServiceability',
                meta: {
                    title: 'check Pincode Serviceability',
                },
                component: () => import('../views/check-Pincode-Serviceability/checkPincodeServiceability.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/account-setting/1',
                name: 'accountsetting/1',
                meta: {
                    title: 'account-setting',
                },
                component: () => import('../views/account-settings/account-details/accountDetails.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/account-setting/2',
                name: 'accountsetting/2',
                meta: {
                    title: 'account-setting',
                },
                component: () => import('../views/account-settings/account-kyc/accountKyc.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/important-updates',
                name: 'importantUpdates',
                meta: {
                    title: 'Important Updates',
                },
                component: () => import('../views/important-updates/importantUpdates.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/add-new-rule/:id?/:vendorId?',
                name: 'addRuleEngine',
                meta: {
                    title: 'Add Rule Engine ',
                },
                component: () => import('../views/rule-engine/RuleEngineLogisticTable.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/order/:tabs?/:id?',
                name: 'view-order-domestic',
                meta: {
                    title: 'View Order',
                },
                component: () => import('../views/domestic/view-order/ViewOrder.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/order/international/:tabs?/:id?',
                name: 'viewOrderInternational',
                meta: {
                    title: 'View Order',
                },
                component: () => import('../views/international/view-order/ViewOrder.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/billing/international/:tabs?/:id?',
                name: 'billingIntl',
                meta: {
                    title: 'Billing',
                },
                component: () => import('../views/international/billing-intl/BillingIntl.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/credit/:id?',
                name: 'AdminCredit',
                meta: {
                    title: 'Credit Transactions',
                },
                component: () => import('../views/domestic/admin-pages/credit-wallet/CreditWallet.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/wallet',
                name: 'AdminWallet',
                meta: {
                    title: 'Wallet Transactions',
                },
                component: () => import('../views/domestic/admin-pages/credit-wallet/CreditWallet.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/rule-engine',
                name: 'ruleEngine',
                meta: {
                    title: 'Rule Engine',
                },
                component: () => import('../views/rule-engine/rule-engine-list/ruleEngineList.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/account-setting/6',
                name: 'accountsetting/6',
                meta: {
                    title: 'account-setting',
                },
                component: () => import('../views/account-settings/pickup-Address/pickupAddress.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/configure-return-rule',
                name: 'configureReturnRule',
                meta: {
                    title: 'Configure Return Rule',
                },
                component: () => import('../views/configure-return-rule/ConfigureReturnRule.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/check-pincode-serviceability',
                name: 'checkPincodeServiceability',
                meta: {
                    title: 'check Pincode Serviceability',
                },
                component: () => import('../views/check-Pincode-Serviceability/checkPincodeServiceability.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/product-catalogue/:id?',
                name: 'productCatalogue',
                meta: {
                    title: 'Product Catalogue',
                },
                component: () => import('../views/domestic/product-catalogue/ProductCatalogue.vue'),
            },
            {
                path: '/postship/nps/:id?',
                name: 'postship-nps',
                meta: {
                    title: 'NPS',
                },
                component: () => import('../views/domestic/post-ship/nps/Nps.vue'),
            },
            {
                path: '/billing/:tabs?/:id?',
                name: 'billing',
                meta: {
                    title: 'Billing',
                },
                component: () => import('../views/domestic/billing/Billing.vue'),
            },
            {
                path: '/staff-account/:id?',
                name: 'staff-account',
                meta: {
                    title: 'Staff Account',
                },
                component: () => import('../views/domestic/admin-pages/staff-account/StaffAccount.vue'),
            },
            {
                path: '/push-pull-scan-list/:id?',
                name: 'push-pull-scan-list',
                meta: {
                    title: 'Push Pull Scan List',
                },
                component: () => import('../views/domestic/admin-pages/push-pull-scan-list/PushPullScanList.vue'),
            },
            {
                path: '/pincode/:id?',
                name: 'pincode',
                meta: {
                    title: 'View Pincode',
                },
                component: () => import('../views/domestic/admin-pages/pincode/viewPincode.vue'),
            },
            {
                path: '/onboard-user',
                name: 'OnboardUser',
                meta: {
                    title: 'View Onboard User',
                },
                component: () => import('../views/domestic/admin-pages/onboard-user/OnboardUser.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/view-pickup',
                name: 'ViewPickup',
                meta: {
                    title: 'View Pickup',
                },
                component: () => import('../views/domestic/admin-pages/view-pickup/ViewPickup.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/view-store',
                name: 'ViewStore',
                meta: {
                    title: 'View Store',
                },
                component: () => import('../views/view-store/ViewStore.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/edit-store/:id?',
                name: 'EditStore',
                meta: {
                    title: 'Edit Store',
                },
                component: () => import('../views/view-store/edit-store/EditStore.vue'),
            },
            {
                path: '/channel-integration',
                name: 'ChannelIntegration',
                meta: {
                    title: 'Channel Integration',
                },
                component: () => import('../views/view-store/channel-integration/ChannelIntegration.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/cod-to-prepaid',
                name: 'CodToPrepaid',
                meta: {
                    title: 'Cod to Prepaid',
                },
                component: () => import('../views/connect-plus/cod-to-prepaid/CodToPrepaid.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/coupons',
                name: 'Coupons',
                meta: {
                    title: 'Coupons',
                },
                component: () => import('../views/connect-plus/coupons/Coupons.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/bg-process',
                name: 'BgProcess',
                meta: {
                    title: 'Order Process',
                },
                component: () => import('../views/bg-process/BgProcess.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/store-settings',
                name: 'StoreSettings',
                meta: {
                    title: 'Store Settings',
                },
                component: () => import('../views/store-pages/store-settings/storeSettings.vue'),
                beforeEnter: [checkLogin],
            },
            {
                path: '/vendor-modal',
                name: 'VendorModal',
                meta: {
                    title: 'Vendor Modal',
                },
                component: () => import('../components/common-modal-files/vendor-modal/VendorModal.vue'),
                beforeEnter: [checkLogin],
            },
        ],
    },
    {
        path: '/:notFound(.*)*',
        name: 'pageError',
        meta: {
            title: 'Page Not Found',
        },
        component: () => import('../views/page-not-found/pagenotfound.vue'),
        beforeEnter: [checkLogin],
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_API_BASE_URL),
    base: '/dt-v5',
    // history: createWebHistory(import.meta.env.VITE_API_BASE_URL),
    routes,
    scrollBehavior() {
        return { left: 0, top: 0 };
    },
});
export const getParams = () => {
    return router;
};
router.beforeEach((to, from, next) => {
    if (to.path.endsWith('//')) {
        const correctPath = to.path.replace(/\/+$/, '/');
        next(correctPath);
        return;
    }
    const tabTitles = {
        'rev-return-request': 'Return Requested',
        'rev-manifest': 'Manifested',
        'rev-intransit': 'In Transit',
        'rev-delivered': 'Delivered',
        'rev-all': 'All',
    };
    if (to.name === 'ReturnFlow' && to.params.tabs && tabTitles.hasOwnProperty(to.params.tabs)) {
        document.title = `${import.meta.env.VITE_APP_TITLE} - ${tabTitles[to.params.tabs]}`;
    } else {
        document.title = `${import.meta.env.VITE_APP_TITLE} - ${to.meta.title}`;
    }
    // document.title = `${import.meta.env.VITE_APP_TITLE} - ${to.meta.title}`; //process.env.VUE_APP_TITLE
    next();
    if (sessionStorage.getItem('accessToken') === '') {
        //return { name: 'LoginPage' };
    }
    return true;
});
export default router;
