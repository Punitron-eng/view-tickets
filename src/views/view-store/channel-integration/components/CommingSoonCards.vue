<script setup lang="ts">
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
        class="coming-soon-channel-card w-[100%] sm:w-[100%] md:w-[14%] lg:w-[14.65%] rounded-itl-md shadow-itl-sm border border-borde-color my-4 md:my-0">
        <template #content>
            <div class="flex items-center justify-center">
                <img :src="channel.image" />
            </div>
        </template>
    </Card>
</template>

<style lang="scss">
@import '../channelIntegration.scss';

.coming-soon-channel-card {
    @include theme() {
        background: theme-get('light-200') !important;
    }

    .p-card-body {
        padding: 1.25rem !important;
    }
}
</style>
