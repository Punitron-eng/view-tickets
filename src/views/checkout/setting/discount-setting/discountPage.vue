<script setup>
import { ref, computed, onMounted } from 'vue'
import { CHECKOUTSETTING } from '../../../../store/checkout/checkout-setting/constant';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { discountVariables } from './discountPage';
import DiscountType from './DiscountType.vue';
import SidebarSetting from '../../../../views/checkout/setting/setting-sidebar/SidebarSetting.vue';
import Skeleton from 'primevue/skeleton';
import { DARKMODE } from '../../../../store/dark-mode/constants';
import VendorModal from '../../../../components/common-modal-files/VendorModal.vue';
const toast = useToast();
const loading = ref(false);
const skeletonShow = ref(false);
const showListData = ref(false);
const storeDropdownData = ref();
const dataVariable = discountVariables;
const store = useStore();
const getStoreId = computed(() => store.getters[`${CHECKOUTSETTING.NAME}/sendStoreId`]);
const topHeader = JSON.parse(localStorage.getItem('top_header'));
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const connectPlusAccess = JSON.parse(localStorage.getItem('connect_plus_access_right'));
import { checkAccessRight, deepCheckAccessRight } from '../../../../util/commonHandlers'
import { checkUserType } from '../../../../util/commonHandlers'; //checkUserType
onMounted(async () => {
    showListData.value = !checkUserType('vendor') ? false : true;
    checkAccessRight('settings') ? true : deepCheckAccessRight('checkout', 'settings', 'discount');
});
const getDiscountDetails = async () => {
    skeletonShow.value = true;
    await store.dispatch(`${CHECKOUTSETTING.NAME}/getDiscountDetails`, { storeId: getStoreId.value, vendor_id: vendorData.value[1] || '' });
    const discountDetails = await store.getters[`${CHECKOUTSETTING.NAME}/sendDiscountDetails`]
    dataVariable.value.tempDiscountArray = discountDetails;
    skeletonShow.value = false;

}
const getDiscountDetailsData = async () => {
    loading.value = true;
    skeletonShow.value = true;
    await store.dispatch(`${CHECKOUTSETTING.NAME}/getSyncDiscountDetails`, { storeId: getStoreId.value });
    const syncDiscountDetails = await store.getters[`${CHECKOUTSETTING.NAME}/sendSyncDiscountDetails`];
    console.log('syncDiscountDetails',syncDiscountDetails)
    if(syncDiscountDetails.status == 'success'){
        toast.add({ severity: 'success', summary: 'Success Message', detail: syncDiscountDetails.html_message, life: 1000 });
        await getDiscountDetails();
    } else {
        toast.add({ severity: 'error', summary: 'Error Message', detail: syncDiscountDetails.html_message, life: 1000 });
    }
   
    loading.value = false;
    skeletonShow.value = false;
}
const filterDiscounts = computed(() => {
    return dataVariable.value.tempDiscountArray.filter(discount => {
        if (dataVariable.value.isActiveDiscount === 'ACTIVE' && discount.status === 'ACTIVE') {
            return true;
        }
        if (dataVariable.value.isActiveDiscount === 'EXPIRED' && discount.status === 'EXPIRED') {
            return true
        }
        if (dataVariable.value.isActiveDiscount === 'SCHEDULED' && discount.status === 'SCHEDULED') {
            return true
        }
        if (dataVariable.value.isActiveDiscount === 'ALL') {
            return true
        }
        return false
    })
});


const getImg = (imageName) => {
    return new URL(`../../../../assets/images/${imageName}.svg`, import.meta.url).href;
};
const isAdmin = ref(false);
const vendorData = ref([]);
const showVendorModal = () => {
    isAdmin.value = true;
};
const applyVendorFilter = async (vendorName) => {
    vendorName.forEach(async (element) => {
        const tempData = element.split(',');
        console.log(tempData);
        isAdmin.value = false;
        const payload = {
            framework: '1',
            vendorID: tempData[1],
        };
        vendorData.value = tempData;
        const data = {
            vendor_id: vendorData.value[1] || '',
        };
        await store.dispatch(`${CHECKOUTSETTING.NAME}/getStoreDetails`, data);
        showListData.value = true;
        storeDropdownData.value = store.getters[`${CHECKOUTSETTING.NAME}/sendStoreDetails`];
    });

};
const resetVendorFilter = () => {
    vendorData.value = [];
    isAdmin.value = false;

};


</script>
<template>
    <section class="main-discount">
        <div class="main-page-title">
            <div class="main-page-first-div">
                <div class="title-page">Discount</div>
                <!-- //select vendor -->
                <div>
                    <div v-if="topHeader['user_type'] == 1 || topHeader['user_type'] == 2" style="font-size: 14px"
                        class="flex md:justify-center md:items-center md:space-between">
                        <div class="show-vendor" @click="showVendorModal()">
                            <span class="ml-[8px]" v-if="vendorData.length == 0"> ( Select
                                Vendor ) </span>
                            <span v-else class="vendorMargin">( {{ vendorData[0] }} )</span>
                            <button class="show-vendor-btn ">
                                <img v-if="!darkModeVal" :src="getImg('vendor_v3')" />
                                <img v-else src="../../../../assets/images/dark-mode/dark-vendor_v3.svg" alt="vendor" />
                            </button>
                        </div>
                        <VendorModal v-if="topHeader['user_type'] == 1 || topHeader['user_type'] == 2" v-show="isAdmin"
                            @close-modal="isAdmin = false" @applyVendor="applyVendorFilter"
                            @resetVendor="resetVendorFilter" />
                    </div>
                </div>
            </div>
            <div class="dropdown-section  discount-dropdown" v-if="showListData">
                <div class="dropdown-list">
                    <Dropdown class="discount-dropdown" v-model="dataVariable.isActiveDiscount"
                        :options="dataVariable.discountDropdown">
                        <template #option="{ option }">
                            <span @click="getDropDownValue(option)">{{ option }}</span>
                        </template>
                    </Dropdown>
                </div>
                <SidebarSetting :dropdownData="storeDropdownData" class="dropdown-for1"
                    @tracking-details="getDiscountDetails">
                </SidebarSetting>
                <button class="syc-btn" @click="getDiscountDetailsData()"
                    v-if="checkAccessRight('settings') ? true : deepCheckAccessRight('checkout', 'settings', 'action_discount')">
                    <div v-if="loading"><i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i></div>
                    <div v-else><img src="@/assets/images/Vector.svg" class="syc-img">Sync</div>
                </button>
            </div>
        </div>
        <div v-if="(topHeader['user_type'] == 1 || topHeader['user_type'] == 2) && !showListData"
            class="no-record-outer flex flex-col justify-center items-center gap-1 h-[60vh] py-[50px] ">
            <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" class="w-[75px]" />
            <div class="head text-[#9CA3AF] text-[16px] p-[50px]">No Records Found</div>
        </div>
        <div v-else>
            <div class="discount-box-skeleton" v-if="skeletonShow">
                <div v-for="discount in filterDiscounts">
                    <div class="discount-box">
                        <Skeleton width="100%" height="100px" borderRadius="4px" />
                    </div>
                </div>
            </div>
            <div class="Discount-dropdown-section" v-else>
                <div v-if="filterDiscounts != ''">
                    <DiscountType v-for="discount in filterDiscounts" :discount-price="discount.title"
                        :is-active="discount.status" :start-date="discount.shopify_starts_at"
                        :create-date="discount.shopify_created_at" :end-date="discount.shopify_ends_at"
                        :type="discount.discount_type" :total-count="discount.coupon_used_count"
                        :summary="discount.summary" />
                </div>
                <div v-else class="no-record-outer flex flex-col justify-center items-center gap-1 h-[60vh] py-[50px] ">
                    <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" class="w-[75px]" />
                    <div class="head text-[#9CA3AF] text-[16px] p-[50px]">No Records Found</div>
                </div>
            </div>
        </div>
        <!-- <div class="main-section">
        <div class="discount-switch">
          <div class="discount-section">
            <div class="discount-price">FLAT500</div>
            <button class="active-btn">Active</button>
          </div>
          <hr> 
          <div class="discount-outer">
          <div class="discount-details">
            <div class="discount">
                <div class="discounts-info">
                    <div class="discount-content">Start data & date :</div>
                    <div class="discount-data">12/10/2023 - 15.00</div>
                </div>
                <div class="discounts-info">
                    <div class="discount-content">Created on :</div>
                    <div class="discount-data">12/10/2023</div>                 
                </div>             
                <div v-if="dataVariable.isShowMore" class="discounts-info">
                    <div class="discount-content">Discount :</div>
                    <div class="discount-data">$500.00</div>                 
                </div>             
                <div v-if="dataVariable.isShowMore"  class="discounts-info">
                    <div class="discount-content">Customer eligible :</div>
                    <div class="discount-data">All customer</div>                 
                </div>             
            </div>           
            <div class="discount">
                <div class="discount">
                    <div class="discounts-info">
                        <div class="discount-content">End date and time :</div>
                         <div class="discount-data">12/10/2023 - 15:00</div>
                    </div>
                    <div class="discounts-info">
                        <div class="discount-content">Type :</div>
                        <div class="discount-data">buy_x_get_y</div>
                    </div>   
                    <div v-if="dataVariable.isShowMore" class="discounts-info">
                        <div class="discount-content">Total Redeedmend count :</div>
                        <div class="discount-data">15</div>
                    </div>   
                    <div v-if="dataVariable.isShowMore" class="discounts-info">
                        <div class="discount-content">Combination :</div>
                        <div class="discount-data">Shopping Discount</div>
                    </div>   
                </div>
            </div>           
          </div> 
          <div class="show-details" @click="showMoreDetails()">Show {{dataVariable.showText}} details <img class="ic-bottom" src="@/assets/images/ic_bottom.svg" /></div>
        </div> 
        </div>
    </div>  

    <div class="main-section">
        <div class="discount-switch">
          <div class="discount-section">
            <div class="discount-price">FLAT500</div>
            <button class="inactive-btn">Inactive</button>
          </div>
          <hr> 
          <div class="discount-outer">
          <div class="discount-details">
            <div class="discount">
                <div class="discounts-info">
                    <div class="discount-content">Start data & date :</div>
                    <div class="discount-data">12/10/2023 - 15.00</div>
                </div>
                <div class="discounts-info">
                    <div class="discount-content">Created on :</div>
                    <div class="discount-data">12/10/2023</div>                 
                </div>             
                <div v-if="dataVariable.isShowMore" class="discounts-info">
                    <div class="discount-content">Discount :</div>
                    <div class="discount-data">$500.00</div>                 
                </div>             
                <div v-if="dataVariable.isShowMore"  class="discounts-info">
                    <div class="discount-content">Customer eligible :</div>
                    <div class="discount-data">All customer</div>                 
                </div>             
            </div>           
            <div class="discount">
                <div class="discount">
                    <div class="discounts-info">
                        <div class="discount-content">End date and time :</div>
                         <div class="discount-data">12/10/2023 - 15:00</div>
                    </div>
                    <div class="discounts-info">
                        <div class="discount-content">Type :</div>
                        <div class="discount-data">buy_x_get_y</div>
                    </div>   
                    <div v-if="dataVariable.isShowMore" class="discounts-info">
                        <div class="discount-content">Total Redeedmend count :</div>
                        <div class="discount-data">15</div>
                    </div>   
                    <div v-if="dataVariable.isShowMore" class="discounts-info">
                        <div class="discount-content">Combination :</div>
                        <div class="discount-data">Shopping Discount</div>
                    </div>   
                </div>
            </div>           
          </div> 
          <div class="show-details" @click="showMoreDetails()">Show {{dataVariable.showText}} details <img class="ic-bottom" src="@/assets/images/ic_bottom.svg" /></div>
        </div> 
        </div>
    </div>   -->

        <!-- <div v-for="discount in filterDiscounts" class="main-section">
        <div class="discount-switch">
         <div class="discount-section">
            <div class="discount-price">{{ discount.discountPrice }}</div>
            <button :class="discount.class">{{ discount.isActive }}</button>
         </div>
         <hr>
         <div class="discount-outer">
         <div class="discount-details">
            <div class="discount">
                <div class="discounts-info">
                    <div class="discount-content">Start data & date :</div>
                    <div class="discount-data">{{ discount.startDate }}</div>
                </div>
                <div class="discounts-info">
                    <div class="discount-content">Created on :</div>
                    <div class="discount-data">{{ discount.createDate }}</div>                
                </div>            
                <div v-if="dataVariable.isShowMore" class="discounts-info">
                    <div class="discount-content">Discount :</div>
                    <div class="discount-data">{{ discount.discountAmount }}</div>                
                </div>            
                <div v-if="dataVariable.isShowMore" class="discounts-info">
                    <div class="discount-content">Customer eligible :</div>
                    <div class="discount-data">{{ discount.cutomerType }}</div>                
                </div>            
            </div>        
            <div class="discount">
                <div class="discount">
                    <div class="discounts-info">
                        <div class="discount-content">End date and time :</div>
                         <div class="discount-data">{{ discount.endDate }}</div>
                    </div>
                    <div class="discounts-info">
                        <div class="discount-content">Type :</div>
                        <div class="discount-data">{{ discount.typeValue }}</div>
                    </div>
                    <div v-if="dataVariable.isShowMore" class="discounts-info">
                        <div class="discount-content">Total Redeedmend count :</div>
                        <div class="discount-data">{{ discount.totalCount }}</div>
                    </div>
                    <div v-if="dataVariable.isShowMore" class="discounts-info">
                        <div class="discount-content">Combination :</div>
                        <div class="discount-data">{{ discount.combinations }}</div>
                    </div>
                </div>
            </div>        
         </div>
         <div class="show-details" @click="showMoreDetails()">Show {{dataVariable.showText}} details <img class="ic-bottom" src="@/assets/images/ic_bottom.svg" /></div>
        </div>
        </div>
    </div>
      -->

    </section>

</template>
<style lang="scss">
@import './discountPage.scss';
</style>