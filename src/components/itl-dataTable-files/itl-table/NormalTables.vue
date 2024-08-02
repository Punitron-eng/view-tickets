<template>
    <DataTable :value="props.Datas" :class="{ 'no-border': props.borderClass === 'noBorder' }"
        class="datatable-header-bg normal-dt">
        <ColumnView v-for="id in props.coloumData" :key="id.field" :field="id.field" :header="id.header">
            <template v-if="id.field === 'loop_product_title'" #body="{ data }">
                <div class="flex gap-2 md:gap-3 align-items-center md:max-w-12rem text-left product-data">
                    <div class="imageDiv border-round-sm p-1 flex align-items-center justify-content-center">
                        <img :src="getImg('placeholder-products', darkModeVal)" class="image" />
                    </div>
                    <div class="product-title">
                        {{ data.loop_product_title }}
                    </div>
                </div>
            </template>
            <template v-if="id.field === 'loop_product_price'" #body="{ data }">
                <div class="product-price">
                    {{ data.loop_product_price }}
                </div>
            </template>
            <!-- for Checkout Date  -->
            <template v-if="id.field === 'date'" #body="{ data }">
                <div class="product-date">
                    {{ data.date }}
                </div>
            </template>
            <template v-if="id.field === 'amount'" #body="{ data }">
                <div class="product-date" v-tooltip.top="data.amount.tooltip" placeholder="Right">
                    {{ data.amount.value }}
                </div>
            </template>
            <template v-if="id.field === 'product'" #body="{ data }">
                <div class="product-date" v-tooltip.top="data.product" placeholder="Right">
                    {{ formatSelectedData(data.product) }}
                </div>
            </template>
        </ColumnView>
        <template #empty>
            <div>
                <div class="no-record-outer flex flex-col gap-2 justify-center items-center">
                    <img src="@/assets/images/no-recored-v2.svg" alt="Not Found" />
                    <div class="head">No Records Found</div>
                    <div class="sub-head">Try changing the filters or search term.</div>
                    <slot name="viewAllApiData"></slot>
                </div>
            </div>
        </template>
    </DataTable>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { useStore } from 'vuex';
import getImg from '../../../util/getImg.ts';
const store = useStore();
const props = defineProps(['Datas', 'coloumData', 'borderClass']);
import { DARKMODE } from '@/store/dark-mode/constants';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const formatSelectedData = (value) => {
    return value.slice(0, 9) + '...';
};
</script>

<style lang="scss">
@import '../../../assets/itl-common-css/common-css.scss';

.no-record-outer {
    // text-align: center;
    // padding: 75px 0;
    text-align: center;
    padding-top: 30px;

    @media (max-width: 767px) {
        position: relative !important;
        left: 0;
        right: 0;
    }

    .head {
        font-family: Inter-Regular;
        font-size: 14px;
        line-height: 16px;
        margin-bottom: 4px;

        @include theme() {
            color: theme-get('input-text-clr');
        }

        font-weight: 700;
    }

    .sub-head {
        font-family: Inter-Regular;
        line-height: 16px;

        @include theme() {
            color: theme-get('dt-empty-text-sub-heading');
        }

        font-size: 13px;
    }
}

.p-datatable-tbody tr td:first-child .product-data {
    width: 200px;

    @include theme() {
        color: theme-get('check-value');
    }
}

// .p-datatable-tbody td{
//     @include theme() {
//             color: theme-get("check-value");
//         }
// }

.checkout-dashboard {
    .p-datatable-tbody tr td .product-date {
        min-width: 100px;
    }
}

.checkout-dashboard {

    .p-datatable-tbody tr td .product-date {
        min-width: 100px;
    }
}

.p-datatable .p-datatable-tbody>tr:focus {
    outline: none !important;
}

.datatable-header-bg .p-datatable-thead>tr>th {
    @include theme() {
        background-color: theme-get('normal-table-th');
        color: theme-get('daterange-header-item');
    }
}

.image {
    max-width: 30px;
    max-height: 30px;
}

tr {
    border-radius: 4px !important;
}

th {
    font-size: 12px;
    padding: 4px 16px !important;
    border: none !important;
}

td {
    padding: 6px 16px !important;
}

.imageDiv {
    @include theme() {
        border: 1px solid theme-get('border-black-500');
    }
}

// .p-column-header-content .p-column-title{
//          @include theme() {
//             color: theme-get("check-value");
//         }
//     }</style>
