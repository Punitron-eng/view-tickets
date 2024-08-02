import { ref } from "vue";
export const mainCheckoutVariables = ref({
buttonLoading : false,
 domainUrl : null,
 storeName : null,
 appName :'ITL Checkout',
 prepaidenabled :false,
 isPaymentMode: false,
 codenabled :true,
 whatsappenabled :true,
 smsenabled :true,
 emailenabled :true,
 selectedDays : null,
 generalDropDown :[],
 communicationBrandName :null,
 vendorCode :null,
 companyName :null,
 accessToken :'',
 apiSecretKey :'',
 apiKey :'',
 storefontAccessToken :'',
 sendOrderConfirmation :true,
 checkoutEnabled :false,
 isDeleted:'',
 isStatus:'',
 isSkeleton :true,
 tempCompanyName :null,
 tempAccessToken :'',
 tempApiSecretKey :'',
 tempApiKey :'',
 tempStorefontAccessToken :'',
 userStoreCheckoutid :null,
 storeLogo :null,
 headingTitle :null,
 showViewTemplate :false,
 emailViewImg :null,
 smsViewImg :null,
 whatsAppViewImg :null,
 isStorefontAccessToken: false,
 isApiKey: false,
 isApiSecretKey: false,
 isAccessToken: false,
 isUpdate: false,
 impageUploadData:'',
 numbericValue:'',
 ischeckoutdata:false,
 prepaidAccess:'',//prepaid 
 codAccess:'',//cod
 retainedAccess:'',//Retained
 billingDate: '',//datapicker
 pastdatedisable:false,//pastdatedisable
 isbillingDate: false,
 isprepaidAccess:false,
 iscodAccess:false,
 isretainedAccess:false,

 inputDynamicValue :{
    domainLabel:{
        forLabel:'domainurl',
        class: 'input-label',
        lableName: 'Domain URL'
    },
    // domainInput: {
    //     type : 'text',
    //     id : 'domainurl',
    //     placeholder : '',
    //     name : 'domainurl',
    //     class : 'input-text'
    // },
    communicationBrandLabel :{
        forLabel:'communicationbrand',
        class: 'input-label',
        lableName: 'Communication Brand'
    },
    // communicationBrandInput : {
    //     type : 'text',
    //     id : 'communicationbrand',
    //     name : 'communicationbrand',
    //     class : 'input-text'
    // },
    // prepaidchargesInput : {
    //     type :'text',
    //     id :'numbericValue',
    //     class :'main-input-div',
    // },
    // codchargesInput : {
    //     type :'text',
    //     id :'numbericValue',
    //     class :'main-input-div',
    // },
    // RetainedchargesInput : {
    //     type :'text',
    //     id :'numbericValue',
    //     class :'main-input-div',
    // },
    startBillLabel : {
        forLabel:'DateLabel',
        class:'input-heading',
        lableName:'Start Date for Billing'
    },
    storeLabel : {
        forLabel:'storename',
        class: 'input-label',
        lableName: 'Store Name'
    },
    // storeInput: {
    //     type : 'text',
    //     id : 'storename',
    //     name : 'storename',
    //     class : 'input-text'
    // },
    apiLabel: {
        forLabel:'apiLabel',
        class: 'input-label',
        lableName: 'Key UP'
    },
    // apiTextInput :{
    //         type : 'text',
    //         id : 'communicationbrand',
    //         placeholder : 'Enter',
    //         name : 'communicationbrand',
    //         class : 'input-text'
    // },    
    generallistLabel:{
            forLabel :'generallist',
            class : 'input-label',
            lableName: 'Estimated delivery'
    },
   storeurlLabel:{
            forLabel:'StoreURL',
            class: 'input-label',
            lableName: 'Storefont Access Token'
        },
    // storeurlInput:{
    //         type : 'text',
    //         id : 'storeurl',
    //         name : 'storeurl',
    //         class : 'input-text',
    // },
    accessTokenLabel:{
            forLabel:'Store URL',
            class: 'input-label',
            lableName: 'Access Token'
    },
    // accessTokenInput:{
    //             type : 'text',
    //             id : 'storeurl',
    //             name : 'accessToken',
    //             class : 'input-text',
    // },
    ScretKeyLabel:{
                forLabel:'ScretKey',
                class: 'input-label',
                lableName: 'Secret Key'
    },
    // ScretKeyInput:{
    //             type : 'text',
    //             id : 'comapany',
    //             name : 'ScretKey',
    //             class : 'input-text',
    // },
    keyUpLabel:{
                forLabel:'APIkey',
                class: 'input-label',
                lableName: 'API Key'
    },
    // keyUpInput:{
    //             type : 'text',
    //             id : 'keyup',
    //             name : 'keyup',
    //             class : 'input-text',
    // },
    comapnyLabel:{
                forLabel:'comapny',
                class: 'input-label',
                lableName: 'Company Name'
        },
    // comapnyInput: {
    //             type : 'text',
    //             id : 'comapany',
    //             name : 'comapany',
    //             class : 'input-text',
    //     }, 
    vendorLabel:{
                forLabel:'vendor',
                class: 'input-label',
                lableName: 'Vendor ID'
        },
    // vendorInput: {
    //             type : 'text',
    //             id : 'vendor',
    //             name : 'vendor',
    //             class : 'input-text',
    //     },  
    imgUploadLabel: {
                forLabel:'forvendor',
                class: 'input-label',
                lableName: 'Upload Logo (100 x 100 px)' 
        },
    imgUploadInput: { 
                text : 'text',
                placeholder: 'upload Image',
                class: 'upload-img'
        },
    returnpolicyLabel :{
                forLabel:'retrunpolicy',
                class: 'input-label',
                lableName: 'Return Policy Link'
        },  
    returnpolicyInput : {
                type : 'text',
                id : 'retrunpolicy',
                placeholder : 'Enter URL',
                name : 'retrunpolicy',
                class : 'input-text'
        },
    privacypolicyLabel : {
                forLabel:'privacypolicy',
                class: 'input-label',
                lableName: 'Privacy Policy Link'
        },
    privacypolicyInput : {
                type : 'text',
                id : 'privacypolicy',
                placeholder : 'Enter URL',
                name : 'privacypolicy',
                class : 'input-text'
        },
    termConditionLabel : {
                forLabel:'termcondition',
                class: 'input-label',
                lableName: 'Terms and Condition Link'
        },
    termConditionInput : {
                type : 'text',
                id : 'termcondition',
                placeholder : 'Enter URL',
                name : 'termcondition',
                class : 'input-text'
        },

    // saveBtn : {
    //             type: 'submit',
    //             class: 'save-btn',
    //             text: 'Save'
    //     },
    // prepaedOption : {
    //             type:"checkbox",
    //             id:"prepaid",
    //             name:"prepaepoption",
    //             change:"handleChange" 
    //     },
    // codOptions : {
    //         type:"checkbox",
    //         id:"cod",
    //         name:"codoptions",
    //         change:"handleChange" 
    //      },
    // whatsupOption :{
    //         type:"checkbox",
    //         id:"whatsupoption",
    //         name:"whatsupoption",
    //         value: "whatsupoption"
    //     },
    // whatsupLabel : {
    //         forLabel:'whatsupoption',
    //         class: 'input-label',
    //         lableName: 'WhatsApp'
    //     },
    // smsOption : {
    //         type:"checkbox",
    //         id:"smsoption",
    //         name:"smsoption",
    //         value: "smsoption"
    //     },
    // smsLabel : {
    //         forLabel:'smsoption',
    //         class: 'input-label',
    //         lableName: 'SMS'
    //     },
    // emailOption : {
    //         type:"checkbox",
    //         id:"emailoption",
    //         name:"emailoption",
    //         value: "emailoption"
    //     },
    // emailLabel : {
    //         forLabel:'emailoption',
    //         class: 'input-label',
    //         lableName: 'Email'
    //     },  
}
})