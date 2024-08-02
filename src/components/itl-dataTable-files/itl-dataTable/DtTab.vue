<script setup>
import { defineProps, defineEmits, onBeforeMount, ref, watch } from 'vue';
const emit = defineEmits(['getActiveTab']);
const props = defineProps(['scrollableTabs']);
import { useRoute } from 'vue-router';
const router = useRoute();
const getTabName = (tabName) => {
    emit('getActiveTab', tabName);
};
const routerId = ref('');
const index = ref(0);
watch(
    () => router.params.tabs,
    (newValue) => {
        routerId.value = newValue.replace(/-/g, '_');
        index.value = props.scrollableTabs.findIndex((res) => res.value == routerId.value);
    }
);
onBeforeMount(() => {
    routerId.value = router.params.tabs.replace(/-/g, '_');
    index.value = props.scrollableTabs.findIndex((res) => res.value == routerId.value);
});
</script>

<template>
    <div class="tabs-parent">
        <TabView id="dt-header-tabs" :scrollable="true" class="tab-outer" :activeIndex="index">
            <TabPanel v-for="tab in scrollableTabs" :key="tab.id">
                <template #header>
                    <div @click="getTabName(tab)">{{ tab.name }}</div>
                </template>
            </TabPanel>
        </TabView>
    </div>
</template>

<style lang="scss">
@import '../../../assets/itl-common-css/common-css.scss';

.tabs-parent {
    .tab-outer {
        height: 34px;
        margin-bottom: 12px;

        .p-tabview-nav-container {
            top: 0px !important;
            margin-left: 0px !important;
        }

        .tabview .p-tabview-nav {
            width: 100vw !important;
            overflow-x: scroll !important;
        }

        .p-tabview .p-tabview-nav-content {
            padding: 12px 0px !important;
        }

        .p-tabview-nav li.p-tabview-header {
            border: none !important;
        }

        .p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link:after {
            bottom: -10px !important;
        }

        .p-tabview-nav {
            @include theme() {
                background: theme-get('dtb-tabs-whole-background') !important;
            }
        }

        li.p-tabview-header .p-tabview-header-action {
            @include theme() {
                background: theme-get('dtb-tab-background');
            }
        }

        .p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
            @include theme() {
                background: theme-get('dtb-tab-background');
            }
        }
    }

    .p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
        @include theme() {
            color: theme-get('dtb-tab-text-color-active') !important;
        }

        font-weight: 600 !important;
    }

    .p-tabview .p-tabview-nav li .p-tabview-nav-link {
        @include theme() {
            color: theme-get('dtb-tab-text-color-text') !important;
        }

        @media (max-width: 767px) {
            width: max-content;
        }

        font-weight: 500 !important;
    }

    .p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link:after {
        height: 3px !important;
        border-top-left-radius: 120px !important;
        border-top-right-radius: 120px !important;
    }

    .p-tabview-nav-container {
        display: inline-block !important;
    }

    .p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link:after {
        bottom: -11px !important;
    }

    .p-tabview .p-tabview-nav li.p-tabview-header {
        padding: 14px 20px !important;

        @media (max-width: 767px) {
            padding: 14px 15px !important;
            width: max-content;
        }
    }

    .p-tabview .p-tabview-nav {
        overflow-x: scroll !important;

        @media screen and (max-width: 766px) {
            width: 100vw !important;
        }

        @media screen and (min-width: 767px) and (max-width: 820px) {
            width: 95vw !important;
        }
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    .p-tabview .p-tabview-nav::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .p-tabview .p-tabview-nav {
        -ms-overflow-style: none;
        /* IE and Edge */
        scrollbar-width: none;
        /* Firefox */
    }

    .p-tabview .p-tabview-nav li.p-tabview-header .p-tabview-header-action {
        div {
            min-width: max-content;
        }
    }
}

.p-tabview .p-tabview-nav li:not(.p-highlight):not(.p-disabled):hover .p-tabview-nav-link {
    background-color: transparent;
}
</style>
