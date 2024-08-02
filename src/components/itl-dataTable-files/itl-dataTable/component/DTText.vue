<template>
    <div v-if="col.field === 'tracking_status' || col.field === 'tracking_status_intl'">
        <div class="parent customer-outer" v-if="typeof data.tracking_status == 'object'">
            <div class="mr-[8px]">{{ data.tracking_status?.name || 'N/A' }}</div>
            <img src="@/assets/images/dt-exclam.svg" alt="" v-tooltip.bottom="data.tracking_status.last_scan_date" />
        </div>
        <div v-else>
            <div class="mr-[8px]">{{ data.tracking_status }}</div>
        </div>
    </div>
    <div v-if="col.field === 'unactionable_by_itl'">
        <span :class="data.unactionable_by_itl != 'N/A' ? 'text-[#bc3285] bg-[#ffedf7]  rounded-sm font-interSemiBold leading-[16px] px-2 text-[10px]' : ''"> {{ data.unactionable_by_itl }} </span>
    </div>
    <div v-if="col.field === 'ticket_assign_by'">
        <div>
            <div class="mr-[8px]">{{ data.ticket_assign_by || 'N/A' }}</div>
        </div>
    </div>

    <div v-if="col.field === 'order_type'" :class="data.order_type">
        <div :class="data.order_type == 'Prepaid' ? 'prepaid-content' : 'cod-content'">
            {{ data.order_type }}
        </div>
    </div>
    <div v-if="col.field === 'weight_discrepancy_status'" class="dt-status" :class="data.weight_discrepancy_status.class">
        <!-- <div :class="data.status"> -->
        <!-- {{  data.status.name ? data.status.name : data.status}} -->
        {{ data.weight_discrepancy_status?.name || data.weight_discrepancy_status }}
        <!-- </div> -->
    </div>

    <div v-if="col.field === 'order_tags'" class="tags-flex">
        <div v-for="(tag, index) in data.order_tags" :key="index" :class="data.order_tags != '' ? 'tags-outer' : ''">
            <div :class="data.order_tags != '' ? 'tags-content' : ''">
                {{ tag }}
            </div>
        </div>
    </div>

    <div v-if="col.field === 'awb_no_logistics'">
        <div v-if="data.awb_no_logistics" class="shipping-div">
            <div class="logistic-icon">
                <img :src="getLogisticIcon(data.logistic_logo)" alt="Logistic Image" class="w-[16px]" />
            </div>
            <a v-if="data?.tracking_url" :href="data?.tracking_url" target="_blank" class="hover:text-[#0065FF] flex">
                {{ data.awb_no_logistics }}
                <img class="ml-3 awb-hover-icon" :src="getFilterIconSrc('awb-hover-icon')" />
            </a>
            <div class="awb-detail" v-else>
                {{ data.awb_no_logistics }}
            </div>
        </div>
        <div v-else class="shipping-div">N/A</div>
    </div>

    <div v-if="col.field === 'product_category'">
        <div class="parent customer-outer">
            <div
                class="mr-[8px]"
                v-tooltip.right="{
                    value: data.product_category,
                    pt: {
                        arrow: {
                            style: {
                                borderRightColor: 'var(--gray-900)',
                            },
                        },
                        text: 'text-sm bg-gray-900 text-primary-contrast !font-xs !py-1 !px-3 !rounded-md',
                        root: '!max-w-96',
                    },
                }"
            >
                {{ data.product_category || 'N/A' }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { DARKMODE } from '@/store/dark-mode/constants';
const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const { data, col } = defineProps(['data', 'col']);

const getFilterIconSrc = (iconName) => {
    if (iconName) {
        if (darkModeVal.value) {
            return new URL(`../../../../assets/images/dark-mode/dark-${iconName}.svg`, import.meta.url).href;
        } else {
            return new URL(`../../../../assets/images/${iconName}.svg`, import.meta.url).href;
        }
    } else {
        return null;
    }
};
const getLogisticIcon = (logisticLogo) => {
    const imagePath = new URL(`../../../../assets/images/logistics/${logisticLogo}.svg`, import.meta.url).href;
    const logisticLogoPath = imagePath.split('/');
    const logisticLogoLastPart = logisticLogoPath[logisticLogoPath.length - 1];
    if (logisticLogoLastPart == 'undefined') {
        const defaultImagePath = new URL(`../../../../assets/images/default_logics_2.svg`, import.meta.url).href;
        return defaultImagePath;
    } else {
        return imagePath;
    }
};
</script>
