<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { apiHandlerWithFormData } from '../../../../api/common/api';
import { DARKMODE } from '../../../../store/dark-mode/constants';
import { variables as variable } from '../storeSettings';
import BaseButton from '../../../../components/base/BaseButton.vue';
import StoresDropdown from '../../../../components/base/StoresDropdown.vue';
import ChannelsDropdown from '../../../../components/base/ChannelsDropdown.vue';

const store = useStore();
const toast = useToast();

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

const storesOptions = ref(null);
const channelsOptions = ref(null);

onMounted(async () => {
    channelsOptions.value = await fetchChannels();
    storesOptions.value = await fetchStores();
})

const fetchStores = async () => {
    const res = await apiHandlerWithFormData('common_module_v3/get-user-platform-list-v3.php', {
        module: 1
    });
    return res.data;
}

const fetchChannels = async () => {
    const res = await apiHandlerWithFormData('common_module_v3/get-user-platform-list-v3.php', {
        module: 1
    });
    return res.data;
}
</script>

<template>
    <div class="block md:flex items-center justify-between gap-4 mb-4 md:mb-2 lg:mb-0">
        <h4 class="m-0 p-0 text-h3 tracking-wide mb-3 md:mb-0">Settings</h4>
        <div class="block md:flex items-center justify-end gap-3">
            <div>
                <ChannelsDropdown v-if="channelsOptions" :options="channelsOptions" twClasses="w-full md:w-14rem"
                    @listen-dropdown-change="(e) => console.log(e)" />
                <Skeleton v-else width="10rem" height="32px"></Skeleton>
            </div>
            <div class="mt-2 md:mt-0">
                <StoresDropdown v-if="storesOptions" :options="storesOptions" twClasses="w-full md:w-14rem"
                    @listen-dropdown-change="(e) => console.log(e)" />
                <Skeleton v-else width="10rem" height="32px"></Skeleton>
            </div>
        </div>
    </div>
    <div class="flex items-center justify-end mt-3">
        <p class="font-interRegular text-p">Last Updated Date: <span>12 May 2024</span></p>
    </div>
    <ToastView />
</template>

<style lang="scss">
@import '../storeSettings.scss';
</style>