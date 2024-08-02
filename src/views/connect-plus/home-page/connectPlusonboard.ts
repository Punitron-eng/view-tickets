import config from '../../../util/config';
import { ref } from 'vue';
export const connectPlusonboard = ref({
    isLoading: false,
    isActivateLoading: false,
    showModal: false,
    vendorName: '',
    showVendorModal: false,
    config: config,
    activateStatus: 'Activate',
    activateDisabled: false,
    postshipChargesDisabled: false,
    // totalAmountCount: '3.16',
    totalSmsAmount: 0,
    totalWhatsAppAmount: 0,
    userId: 7214,
    perOrderAmount: '',
    totalAmount: '',
    vendorNameData: '',
    vendorId: '',
    selectedVendorId: [],

    btnDisabled: '',
    pointerEvent: '',
    connectPlusActivation: '',
    isVisibleNotificationCharges: 'hidden',
    activationDetail: '',

    isSkeleton: true,
    submitClass: '',
    isSubmitLoading: false,

    editAccessRight: 0,
    submitAccessRight: 0,
    billingDate: '',
    datepickerDisabled: false,
    submitDisabled: false,

    storeDataValue: 'Select Store',
    storePlaceholder: 'Select Store',
    platformDataValue: '',
    platformsData: [],
    storesData: [],
    storeDisabled: true,
    isShowOrderDeliverdModal: false,
    showViewTemplate: false,
    headingTitle: '',
    whatsAppViewImg: '',
    smsViewImg: '',
    emailViewImg: '',
    whatsAppCheckboxValueAll: '',
    smsCheckboxValueAll: '',
    emailCheckboxValueAll: '',
    platformIdData: '',
    tempWhatsapp: [],
    tempSms: [],
    tempEmail: [],
    isWhatsappSelectAll: false,
    isEmailSelectAll: false,
    isSmsSelectAll: false,
    vendoridData: '',
    tempSelectedSmsCount: [],
    selectAllTempSmsLength: '',
    selectAllTempWhatsAppLength: '',
    selectAllTempEmailLength: '',
});
