<script setup>
import { ref, onBeforeUnmount, watch } from 'vue'
import { viewNdrVariables } from '../viewNdr'
import BaseButton from '../../../../components/base/BaseButton.vue';
import AwbNumber from '../../../../components/awbNumber/AwbNumber.vue';
import EscalateUpperSection from '../components/EscalateUpperSection.vue';
import EscalateLowerSection from '../components/EscalateLowerSection.vue';
import ResponsiveSwitch from '../../../../components/responsiveSwitch/ResponsiveSwitch.vue';

const dataVariables = viewNdrVariables;
watch(
    () => dataVariables.value.isEscalateModalVisible,
    (newValue) => {
        console.log('newValue', newValue);
        if (newValue) {
            document.body.classList.add('escalate-modal');
        } else {
            document.body.classList.remove('escalate-modal');
        }
    }
);
onBeforeUnmount(() => {
    document.body.classList.remove('escalate-modal');
});

const switchData = ref([
    {
        label: 'Summary',
        isActive: true
    },
    {
        label: 'Action',
        isActive: false
    },
]);
const updateSwitchData = (newData) => {
    switchData.value = newData;
};
</script>

<template>
    <button class="p-button-secondary p-button-sm" @click="() => (dataVariables.isEscalateModalVisible = true)">Open
        Escalate Modal</button>
    <DialogView v-model:visible="dataVariables.isEscalateModalVisible" :modal="true" :draggable="false" dismissableMask>
        <template #header>
            <div class="flex flex-col md:flex-row justify-between w-full gap-[8px]">
                <div class="flex justify-between w-full">
                    <div class="text-light-1200 font-[600] flex md:items-center flex-col md:flex-row">
                        <span class="text-h4 mr-4">Escalate</span>
                        <AwbNumber logisticNumber="1234567890" logisticLogo="awb" />
                    </div>
                    <div class="flex items-center">
                        <BaseButton name="Close" @click="dataVariables.isEscalateModalVisible = false"
                            class="mr-[8px] m-[0px]" />
                    </div>
                </div>
                <div class="flex md:hidden items-center">
                    <ResponsiveSwitch :switchData="switchData" @update:switchData="updateSwitchData" />
                </div>
            </div>
        </template>
        <div
            class="w-screen md:!w-[95vw] min-h-[80vh] mx-auto flex flex-col  items-center bg-bi-gray gap-[16px] px-[8px] py-[16px] md:p-[32px]">

            <EscalateUpperSection />
            <EscalateLowerSection />

        </div>
    </DialogView>
</template>

<style lang="scss">
.escalate-modal {
    .p-dialog-header {
        @media (max-width: 767px) {
            padding: 16px 16px 0px 16px !important;
        }
    }

    .p-dialog-header-icon {
        @media (max-width: 767px) {
            top: -18px !important;
        }
    }

    .p-dialog-content {
        padding: 0px !important;
    }

    .dp__input_icons {
        padding: 0px !important;
        left: 8px !important;
    }
}
</style>
