<script setup>
import RtoTab from './RtoTab.vue';
import getImg from '@/util/getImg';
import SmsCallTab from './SmsCallTab.vue';
import ReattemptRequestTab from './ReattemptRequestTab.vue';
</script>
<template>
    <div class="modal-card font-interRegular">
        <div class="modal-card-head">
            <img :src="getImg('product')" class="w-[24px] mr-[8px]" />
            Action
        </div>
        <div class="py-[8px] px-[16px] modal-tabs-parent">
            <TabView>
                <TabPanel header="Reattempt Request">
                    <div class="flex justify-center my-[32px]">
                        <ReattemptRequestTab />
                    </div>
                </TabPanel>
                <TabPanel header="RTO">
                    <div class="flex justify-center my-[32px]">
                        <RtoTab />
                    </div>
                </TabPanel>
                <TabPanel header="SMS/Call">
                    <div class="flex justify-center my-[32px]">
                        <SmsCallTab />
                    </div>
                </TabPanel>
            </TabView>
        </div>
    </div>
</template>

<style lang="scss">
@import '../../../../assets/itl-common-css/common-css.scss';

.modal-tabs-parent {
    .p-tabview-nav-content {
        @media screen and (max-width: 767px) {
            margin: 0px !important;
        }

        border: none !important;
    }

    .p-tabview .p-tabview-nav {
        border: 0px !important;
        gap: 10px !important;
    }

    .p-tabview .p-tabview-nav li.p-tabview-header {
        padding: 0px !important;
    }

    .p-tabview-nav-link {
        padding: 8px !important;
    }

    .p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
        color: #1279ff;
        border-bottom: 4px solid #1279ff !important;
    }

    .p-tabview-nav-link {
        border: none !important;
    }

    .p-highlight {
        .p-tabview-nav-link {
            border-bottom: 4px solid #1279ff !important;
        }
    }
}
</style>
