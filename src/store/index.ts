import { createStore } from 'vuex';

//common pages start //
import { LOGIN } from './login/constants';
import { MENU } from './menu/constants';
import { DARKMODE } from './dark-mode/constants';
import { BGPROCESS } from './bg-process/constants';
import login from './login/module';
import createMenu from './menu/module';
import createDarkMode from './dark-mode/module';
import bgProcess from './bg-process/module';
//common pages end //

// channel partners pages start //
import { CHANNELPARTNER } from './channel-partner/channel-partner-dashboard/constants';
import { CPVIEWORDER } from './channel-partner/view-order/constants';
import { CPVIEWUSER } from './channel-partner/view-user/constants';
import createChannelPartnerDashboard from './channel-partner/channel-partner-dashboard/module';
import cpViewOrder from './channel-partner/view-order/module';
import cpViewUser from './channel-partner/view-user/module';
// channel partners pages end //

// checkout pages start //
import { CHECKOUTSETTING } from './checkout/checkout-setting/constant';
import { PAYMENTSETTING } from './checkout/payment-setting/constant';
import { TRACKINGINFOSETTING } from './checkout/trackinginfo-setting/constant';
import { GENERALSETTING } from './checkout/general-setting/constant';
import { ABANDONEDCART } from './checkout/abandoned-cart/constants';
import { STOREORDER } from './checkout/store-order/constants';
import checkoutSetting from './checkout/checkout-setting/module';
import paymentSetting from './checkout/payment-setting/module';
import trackingSetting from './checkout/trackinginfo-setting/module';
import generalSetting from './checkout/general-setting/module';
import abandonedCart from './checkout/abandoned-cart/module';
import storeOrder from './checkout/store-order/module';
// checkout pages end //

//connect plus pages start //
import { CODTOPREPAID } from './connect-plus/cod-to-prepaid/constants';
import { COUPONS } from './connect-plus/coupons/constants';
import { NOTIFICATIONBILLING } from './connect-plus/notification-billing/constants';
import codToPrepaid from './connect-plus/cod-to-prepaid/module';
import coupons from './connect-plus/coupons/module';
import notificationBilling from './connect-plus/notification-billing/module';
//connect plus pages end //

// domestic pages start //
import { BILLING } from './domestic/billing/constants';
import { VIEWNDR } from './domestic/view-ndr/constants';
import { CREDITWALLET } from './domestic/admin-pages/credit-wallet/constants';
import { ONBOARDUSER } from './domestic/admin-pages/onboard-user/constants';
import { STAFFACCOUNT } from './domestic/admin-pages/staff-account/constants';
import { NPS } from './domestic/postship/constants';
import { REMITTANCEPLAN } from './domestic/admin-pages/remittance-plan/constants';
import { PUSHPULLSCANLIST } from './domestic/admin-pages/push-pull-scan-list/constants';
import { PINCODE } from './domestic/admin-pages/pincode/constants';
import { VIEWPICKUP } from './domestic/admin-pages/view-pickup/constants';
import { ADMINVIEWUSER } from './domestic/admin-pages/view-user/constants';
import { CANCELRTOPODREQ } from './domestic/admin-pages/cancel-rto-pod-request/constants';
import { CANCELRTOPODREQINTL } from './domestic/admin-pages/cancel-rto-pod-request-intl/constants';
import { ORDERMANAGEMENTREQ } from './domestic/admin-pages/order-management-change-request/constants';
import { NEWVIEWTICKET } from './domestic/admin-pages/view-ticket/constants';
import { NDRCALLDETAILS } from './domestic/admin-pages/ndr-call-details/constants';
import { NONNDRCALLDETAILS } from './domestic/admin-pages/non-ndr-call-details/constants';
import { UPDATECODDETAILS } from './domestic/admin-pages/update-cod-amount/constants';
import { RETURN } from './domestic/return-flow/constants';
import { WEIGHTDISCREPANCY } from './domestic/weight-discrepancy/constants';
import { PRODUCTCATALOGUE } from './domestic/product-catalogue/constants';
import { VIEWORDER as VIEWORDER } from './domestic/view-order/constants';
import viewOrder from './domestic/view-order/module';
import createBilling from './domestic/billing/module';
import viewNdr from './domestic/view-ndr/module';
import creditWallet from './domestic/admin-pages/credit-wallet/module';
import onboardUser from './domestic/admin-pages/onboard-user/module';
import staffAccount from './domestic/admin-pages/staff-account/module';
import nps from './domestic/postship/module';
import remittancePlan from './domestic/admin-pages/remittance-plan/module';
import pushPullScanList from './domestic/admin-pages/push-pull-scan-list/module';
import pincode from './domestic/admin-pages/pincode/module';
import viewPickup from './domestic/admin-pages/view-pickup/module';
import adminViewUser from './domestic/admin-pages/view-user/module';
import viewCancelRtoPodReq from './domestic/admin-pages/cancel-rto-pod-request/module';
import cancelRtoPodReqIntl from './domestic/admin-pages/cancel-rto-pod-request-intl/module';
import orderManagementReq from './domestic/admin-pages/order-management-change-request/module';
import newViewTicket from './domestic/admin-pages/view-ticket/module';
import ndrCallDetails from './domestic/admin-pages/ndr-call-details/module';
import nonNdrCallDetails from './domestic/admin-pages/non-ndr-call-details/module';
import updateCodDetails from './domestic/admin-pages/update-cod-amount/module';
import createReturnFlow from './domestic/return-flow/module';
import weightDiscrepancy from './domestic/weight-discrepancy/module';
import createProductCatalogue from './domestic/product-catalogue/module';
//domestic pages start //

//international pages start //
import { VIEWORDERINTL } from './international/view-order/constants';
import { BILLINGINTL } from './international/billing-intl/constants';
import viewOrderIntl from './international/view-order/module';
import createBillingIntl from './international/billing-intl/module';
//international pages start //

//other pages start //
import { VELOCITY } from './velocity-page/constants';
import { RATECHART } from './rate-chart/constants';
import { BULKPRINTSHIPMENT } from './bulk-print-shipment/constants';
import { ACCOUNTSETTINGS } from './account-settings/constants';
import { RULEENGINE } from './rule-engine/constants';
import createVelocity from './velocity-page/module';
import createRateChart from './rate-chart/module';
import createbulkprintshipment from './bulk-print-shipment/module';
import createaccountData from './account-settings/module';
import createRuleEngine from './rule-engine/module';
import dataTableState from './dataTable/module';
//other pages end //

export default createStore({
    state: {
        isLogin: false,
    },

    mutations: {},
    modules: {
        // common pages start //
        [LOGIN.NAME]: login(),
        [MENU.NAME]: createMenu(),
        [DARKMODE.NAME]: createDarkMode(),
        [BGPROCESS.NAME]: bgProcess(),
        //common pages end //

        //channel partners pages start //
        [CHANNELPARTNER.NAME]: createChannelPartnerDashboard(),
        [CPVIEWORDER.NAME]: cpViewOrder(),
        [CPVIEWUSER.NAME]: cpViewUser(),
        // channel partners pages end //

        //checkout pages start //
        [CHECKOUTSETTING.NAME]: checkoutSetting(),
        [PAYMENTSETTING.NAME]: paymentSetting(),
        [TRACKINGINFOSETTING.NAME]: trackingSetting(),
        [GENERALSETTING.NAME]: generalSetting(),
        [STOREORDER.NAME]: storeOrder(),
        [ABANDONEDCART.NAME]: abandonedCart(),
        //checkout pages end //

        //connect plus pages start //
        [CODTOPREPAID.NAME]: codToPrepaid(),
        [COUPONS.NAME]: coupons(),
        [NOTIFICATIONBILLING.NAME]: notificationBilling(),
        //connect plus pages end //

        //domestic pages start //
        [BILLING.NAME]: createBilling(),
        [VIEWNDR.NAME]: viewNdr(),
        [CREDITWALLET.NAME]: creditWallet(),
        [ONBOARDUSER.NAME]: onboardUser(),
        [STAFFACCOUNT.NAME]: staffAccount(),
        [NPS.NAME]: nps(),
        [REMITTANCEPLAN.NAME]: remittancePlan(),
        [PUSHPULLSCANLIST.NAME]: pushPullScanList(),
        [PINCODE.NAME]: pincode(),
        [VIEWPICKUP.NAME]: viewPickup(),
        [ADMINVIEWUSER.NAME]: adminViewUser(),
        [CANCELRTOPODREQ.NAME]: viewCancelRtoPodReq(),
        [CANCELRTOPODREQINTL.NAME]: cancelRtoPodReqIntl(),
        [ORDERMANAGEMENTREQ.NAME]: orderManagementReq(),
        [NEWVIEWTICKET.NAME]: newViewTicket(),
        [NDRCALLDETAILS.NAME]: ndrCallDetails(),
        [NONNDRCALLDETAILS.NAME]: nonNdrCallDetails(),
        [UPDATECODDETAILS.NAME]: updateCodDetails(),
        [RETURN.NAME]: createReturnFlow(),
        [WEIGHTDISCREPANCY.NAME]: weightDiscrepancy(),
        [PRODUCTCATALOGUE.NAME]: createProductCatalogue(),
        [VIEWORDER.NAME]: viewOrder(),
        //domestic pages end //

        //international pages start //
        [VIEWORDERINTL.NAME]: viewOrderIntl(),
        [BILLINGINTL.NAME]: createBillingIntl(),
        //international pages end //

        //other pages start //
        [VELOCITY.NAME]: createVelocity(),
        [RATECHART.NAME]: createRateChart(),
        [BULKPRINTSHIPMENT.NAME]: createbulkprintshipment(),
        [ACCOUNTSETTINGS.NAME]: createaccountData(),
        [RULEENGINE.NAME]: createRuleEngine(),
        dataTableState: dataTableState(),
        //other pages end //
    },
});
