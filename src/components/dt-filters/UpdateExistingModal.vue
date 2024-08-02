<script setup lang="ts">
import { ref } from 'vue'
import dataTableLi from '../itl-dataTable-files/itl-dataTable-li/dataTableLi.vue';

const dropdownValue = ref<Object>({ id: 0, value: '51172' });
const filtersArray = ref<Array<Object>>([
    {
        id: 0,
        value: '51172'
    },
    {
        id: 1,
        value: '87878'
    },
    {
        id: 2,
        value: '98667'
    },
    {
        id: 3,
        value: '77850'
    },
    {
        id: 4,
        value: '78420'
    },
    {
        id: 5,
        value: '33358'
    },
])
</script>

<template>
    <div>
        <div class="filter-dropdown-parent">
            <label class="save-filter-label">Filter to update</label>
            <Dropdown id="save-filter-dropdown" v-model="dropdownValue" :options="filtersArray">
                <template #value="slotProps">
                    <div v-if="slotProps.value" class="flex align-items-center">
                        <div>{{ slotProps.value.value }}</div>
                    </div>
                    <span v-else>
                        {{ slotProps.value }}
                    </span>
                </template>
                <template #option="slotProps">
                    <div class="flex align-items-center">
                        <div>{{ slotProps.option.value }}</div>
                    </div>
                </template>
            </Dropdown>
        </div>
        <div class="filters-section">
            <h5 class="filters-heading pb-[8px]">Filters</h5>
            <dataTableLi :all-clear-button="false" />
        </div>
    </div>
</template>

<style lang="scss">
@import '../../assets/itl-common-css/common-css.scss';

#update-existing-filter-modal .p-dialog-header-icons {
    display: none !important;
}

#update-existing-filter-modal {
    .save-filter-label {
        display: block;
        width: auto;
        height: 16px;
        font-size: 12px;
        line-height: 1.33;
        font-weight: normal;
        margin-bottom: 4px;
    }

    .p-dialog {
        border-radius: 8px !important;
    }

    .p-dropdown {
        width: 352px !important;
        height: 32px !important;
        margin: 4px 0 0;
        padding: 2px 12px;
        border-radius: 4px;
        border: solid 1px #dfe3e6;
    }

    .p-dropdown .p-dropdown-trigger {
        width: auto !important;
    }

    .p-dropdown:not(.p-disabled).p-focus {
        box-shadow: none !important;
        // border: none !important;
    }

    .p-focus {
        background-color: transparent !important;
    }

    .p-dialog-header {
        @include theme() {
            background: theme-get('filter-header-background') !important;
        }
    }

    .p-dialog-footer {
        height: 52px;
        border-top: 1px solid #F1F2F5 !important;
        padding: 12px 1.5rem !important;
        @include theme() {
            background: theme-get('filter-footer-background') !important;
        }
    }

    .p-dialog-content {
        margin: -2px 0 0 0 !important;
        @include theme() {
            background: theme-get('filter-content-background') !important;
        }
    }


    .filters-section {
        margin-top: 24px;
    }

    .filters-heading {
        font-size: 14px;
        margin: 0 !important;
    }

    .action-btn {
        width: 58px;
        height: 28px;
        font-size: 12px;
        border-radius: 4px;
        font-family: $interRegular;
    }

    .save-btn-modal-footer {
        color: #fff;
        background: #1279ff;
        border: solid 1px #0168ed;
    }

    .close-btn-modal-footer {
        color: #000;
        @include theme() {
            background: theme-get('filter-modal-close-btn') !important;
        }
        border: solid 1px #dfe3e6;
    }
}

.p-dropdown-panel .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled):hover {
    background: transparent !important;
}

</style>