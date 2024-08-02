<script setup lang="ts">
import dataTableLi from '../itl-dataTable-files/itl-dataTable-li/dataTableLi.vue';

</script>

<template>
    <div>
        <div class="filter-input">
            <label class="save-filter-label">Filter Name</label>
            <InputText id="save-filter-input" class="w-[352px] h-[32px]" placeholder="Filter name" />
        </div>
        <div class="filters-section">
            <h5 class="filters-heading pb-[8px]">Filters</h5>
            <dataTableLi :all-clear-button="false" />
        </div>
    </div>
</template>

<style lang="scss">
@import '../../assets/itl-common-css/common-css.scss';

#save-filter-modal .p-dialog-header-icons {
    display: none !important;
}

#save-filter-modal {
    .save-filter-label {
        display: block;
        width: 62px;
        height: 16px;
        font-size: 12px;
        line-height: 1.33;
        font-weight: normal;
        margin-bottom: 4px;
    }

    .p-dialog {
        border-radius: 8px !important;
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

    .p-inputtext {
        padding: 9px 12px !important;
        font-size: 14px;
    }

    .p-inputtext:enabled:hover {
        border: 1px solid #dfe3e6;
    }

    .p-inputtext:enabled:focus {
        box-shadow: none !important;
        border: 1px solid #dfe3e6;
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
</style>