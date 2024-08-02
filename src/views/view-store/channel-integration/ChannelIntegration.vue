<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import getImg from '../../../util/getImg';
import IntegrateStoreCard from './components/IntegrateStoreCard.vue';
import CommingSoonCards from './components/CommingSoonCards.vue';
import { apiHandlerWithFormData } from '../../../api/common/api';
import { DARKMODE } from '../../../store/dark-mode/constants';
import Header from './components/Header.vue';
import { variables as variable, VariablesType } from './channelIntegration';

const store = useStore();
const toast = useToast();

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

onMounted(() => {
    document.body.classList.add('channel-integration-page');
})

</script>

<template>
    <main class="mx-[0px] xl:mx-[8%] my-4">
        <Header />
        <Card class="parent-card my-3">
            <template #content>
                <div>
                    <div class="block md:flex items-start justify-between">
                        <div>
                            <div class="flex items-center justify-start gap-4">
                                <img @click="$router.go(-1)" :src="getImg('back-store-arrow', darkModeVal)"
                                    class="cursor-pointer" />
                                <p class="font-interMedium text-sub-p font-normal text-dark-300 dark:text-light-0">
                                    Integrate multiple channels to sync your orders.</p>
                            </div>
                            <div
                                class="hidden relative h-[32px] border-input-border-color dark:border-[#4d4d4d] md:flex items-center mb-3 md:mb-0 mt-4">
                                <img :src="getImg('store-order-search', darkModeVal)" alt="Search"
                                    class="w-[12px] absolute left-4">
                                <input id="search-input" type="text" placeholder="Search Store...."
                                    class="w-full h-itl-input border focus:border-2 focus:pl-[34px] focus:!border-input-focused-border pl-[34px] pr-itl-input-x py-itl-input-y rounded-itl-sm font-interRegular" />
                            </div>
                        </div>
                        <div>
                            <div class="flex items-center justify-center md:block my-5 md:my-0">
                                <img :src="getImg('channel-integration-ills', darkModeVal)" alt="image">
                            </div>
                            <div
                                class="relative h-[32px] border-input-border-color dark:border-[#4d4d4d] flex items-center md:hidden mb-3 md:mb-0 mt-4">
                                <img :src="getImg('store-order-search', darkModeVal)" alt="Search"
                                    class="w-[12px] absolute left-4">
                                <input id="search-input" type="text" placeholder="Search Store...."
                                    class="w-full h-itl-input border focus:border-2 focus:pl-[34px] focus:!border-input-focused-border pl-[34px] pr-itl-input-x py-itl-input-y rounded-itl-sm font-interRegular" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-h3 font-interSemiBold">Available Channels</h3>
                        <div class="block md:flex items-center justify-start flex-wrap gap-4 mt-3">
                            <IntegrateStoreCard />
                        </div>
                    </div>
                    <div class="mt-8">
                        <h3 class="text-h3 font-interSemiBold">Coming Soon.....</h3>
                        <div class="block md:flex items-center justify-start flex-wrap gap-4 mt-3">
                            <CommingSoonCards />
                        </div>
                    </div>
                </div>
            </template>
        </Card>
    </main>
    <ToastView />
</template>

<style lang="scss">
@import './channelIntegration.scss';
</style>