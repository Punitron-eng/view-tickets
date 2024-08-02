<!-- <script setup lang="ts">
import { apiHandlerWithFormData } from '../../../../api/common/api';
import BaseButton from '../../../../components/base/BaseButton.vue';
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { variables as variable, VariablesType } from '../channelIntegration';
import VendorModal from '../../../../components/common-modal-files/VendorModal.vue'
import { DARKMODE } from '../../../../store/dark-mode/constants';
import getImg from '../../../../util/getImg';

const store = useStore();
const toast = useToast();

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

</script>

<template>
    <Card v-for="(channel, i) in variable.channelCards" :key="i"
        class="channel-integration-card w-[23.62%] rounded-itl-md shadow-itl-sm border border-borde-color "
        @mouseover="(e) => console.log(e)">
        <template #content>
            <div class="flex items-center justify-center">
                <div>
                    <img :src="channel.image" />
                </div>
                <div class="hidden"></div>
            </div>
        </template>
    </Card>
</template>

<style lang="scss">
@import '../channelIntegration.scss';

.channel-integration-card {
    @include theme() {
        background: theme-get('light-200') !important;
    }

    .p-card-body {
        padding: 28px !important;
    }
}
</style> -->



<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import BaseButton from '../../../../components/base/BaseButton.vue';
import { variables as variable } from '../channelIntegration';
import { DARKMODE } from '../../../../store/dark-mode/constants';

const store = useStore();
const toast = useToast();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

// Create a ref to manage the hover state
const hoveredIndex = ref<number | null>(null);

const handleMouseEnter = (index: number) => {
    hoveredIndex.value = index;
};

const handleMouseLeave = () => {
    hoveredIndex.value = null;
};

</script>

<template>
    <Card v-for="(channel, i) in variable.channelCards" :key="i"
        class="channel-integration-card w-[100%] sm:w-[100%] md:w-[22.6%] lg:w-[23.1%] xl:w-[23.2%] 2xl:w-[23.62%] h-[122px] rounded-itl-md shadow-itl-sm border border-border-color transition-colors duration-300 my-4 md:my-0 flex items-center justify-center"
        :class="hoveredIndex !== i ? 'bg-light-200' : 'bg-[#172B4D]'" @mouseenter="handleMouseEnter(i)"
        @mouseleave="handleMouseLeave">
        <template #content>
            <div class="flex items-center justify-center h-full">
                <img v-if="hoveredIndex !== i" :src="channel.image" class="mx-auto" />
                <div class="flex flex-col -mt-2" v-else>
                    <p class="text-center text-h4 font-interMedium text-white">{{ channel.name }}</p>
                    <BaseButton v-if="channel.integrateAvailable" name="Integrate"
                        class="mx-auto text-sub-p px-5 bg-white hover:bg-slate-500 text-blue-700 font-semibold cursor-pointer" />
                </div>
            </div>
        </template>
    </Card>

</template>

<style lang="scss">
@import '../channelIntegration.scss';

.channel-integration-card {
    transition: background-color 0.3s ease;

    @include theme() {
        // background: theme-get('light-200') !important;
    }

    .p-card-body {
        padding: 28px !important;
    }
}
</style>
