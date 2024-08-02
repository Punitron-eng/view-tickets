<script setup lang="ts">
import { onMounted, computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { apiHandlerWithFormData } from '../../../api/common/api';
import { DARKMODE } from '../../../store/dark-mode/constants';
import Header from './components/Header.vue';
import { variables as variable, VariablesType } from './editStore';
import FormCard from './components/FormCard.vue';
import StatusCard from './components/StatusCard.vue';

const store = useStore();
const toast = useToast();
const route = useRoute();

const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

onBeforeMount(async () => {
    variable.value.platformIdFromState = history.state.platform_id;
    const res = await apiHandlerWithFormData('store-v3/get-add-store-v3.json', {
        platform_id: variable.value.platformIdFromState,
        store_id: route.params.id
    })
    variable.value.data = res;
})

onMounted(async () => {
    document.body.classList.add('view-store-page');
})
</script>

<template>
    <main class="mx-[0px] xl:mx-[10%] my-4">
        <Header />
        <div class="block lg:flex items-start justify-between gap-3 mt-4">
            <FormCard />
            <StatusCard />
        </div>
    </main>
</template>

<style lang="scss">
@import '../viewStore.scss';
</style>