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
    <div class="block md:flex items-center justify-between">
        <div class="flex items-center justify-start gap-4 mb-4 md:mb-2 lg:mb-0">
            <h4 class="m-0 p-0 text-h3 tracking-wide mb-2 md:mb-0">Channel Integration</h4>
        </div>
    </div>
</template>

<style lang="scss">
@import '../channelIntegration.scss';
</style>
