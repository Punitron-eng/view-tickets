<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { apiHandlerWithFormData } from '../../../api/common/api';
import { DARKMODE } from '../../../store/dark-mode/constants';
import Header from './components/Header.vue';
import { variables as variable } from './storeSettings';
import BaseButton from '../../../components/base/BaseButton.vue';
import MainForm from './components/MainForm.vue'

const store = useStore();
const toast = useToast();

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

onMounted(() => {
    document.body.classList.add('store-settings-page');
})
</script>

<template>
    <main class="mx-[0px] xl:mx-[10%] my-4">
        <Header />
        <MainForm />
        <BaseButton name="Save" class="mt-3 px-6" />
    </main>
    <ToastView />
</template>

<style lang="scss">
@import './storeSettings.scss';
</style>