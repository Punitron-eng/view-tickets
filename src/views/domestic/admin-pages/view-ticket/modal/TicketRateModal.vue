<template>
    <DialogView id="ticket-rate-modal" v-model:visible="dataVariables.isTicketRateModalVisible" :modal="true" :draggable="false" dismissableMask>
        <template #header>
            <div v-if="!isConfettiVisible" class="text-[16px] font-[inter-semibold] text-[#0c0c0d] dark:text-[#ffffff]">Rate Ticket {{ dataVariables.selectedTicketId }}</div>
            <div v-else class="text-[16px] font-[inter-semibold] text-[#0c0c0d] dark:text-[#ffffff]">Thank you for your rating!</div>
            <ConfettiExplosion :particleCount="200" :force="1" @click="submitTicketRating" v-if="isConfettiVisible" />
        </template>
        <div class="px-10 md:w-[560px] flex justify-center items-center border-t border-[#e9ebef] dark:border-[#383b40]">
            <div class="flex justify-center items-center h-[31vh]">
                <div v-for="(star, index) in stars" :key="index" @click="toggleStar(index)" @mouseover="hoverStar(index)" @mouseleave="resetHoveredStars" class="cursor-pointer">
                    <span>
                        <img :src="hoveredStars[index] || stars[index] ? getImg('ticket-rate-star-filled') : getImg('ticket-rate-star')" height="56" width="56 " class="mx-[8px]" />
                    </span>
                </div>
            </div>
        </div>
        <div class="border-t border-[#e9ebef] dark:border-[#383b40] flex flex-row-reverse items-center py-[7px] px-[16px] gap-2">
            <baseButton name="Submit" type="primary" @click="submitTicketRating" :isLoading="isLoading" class="text-[12px] font-[inter-semibold] text-[#ffffff] h-[28px] flex items-center justify-center w-[68px]" />
            <baseButton name="Cancel" type="secondary" @click="dataVariables.isTicketRateModalVisible = false" class="text-[12px] font-[inter-semibold] text-[#ffffff] h-[28px] flex items-center justify-center w-[68px]" />
        </div>
    </DialogView>
</template>

<script setup>
import { ref } from 'vue';
import getImg from '@/util/getImg';
import { useToast } from 'primevue/usetoast';
import baseButton from '@/components/base/BaseButton.vue';
import { reviewTicketApi } from '@/api/domestic/view-ticket/viewTicketApi';
import { viewTicketVariables as dataVariables } from '../viewTicketVariables';
import ConfettiExplosion from 'vue-confetti-explosion';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';

const toast = useToast();
const isLoading = ref(false);
const isConfettiVisible = ref(false);

const stars = ref([false, false, false, false, false]);
const hoveredStars = ref([false, false, false, false, false]);

const toggleStar = (index) => {
    const selectedStars = stars.value.filter(Boolean).length;

    if (selectedStars === 1 && stars.value[index]) {
        stars.value = stars.value.map((_, i) => i <= index - 1);
    } else if (selectedStars === 2 && stars.value[index]) {
        stars.value = stars.value.map((_, i) => i <= index);
        stars.value[index] = false;
    } else if (selectedStars === 3 && stars.value[index]) {
        stars.value = stars.value.map((_, i) => i <= index);
        stars.value[index] = false;
    } else if (selectedStars === 4 && stars.value[index]) {
        stars.value = stars.value.map((_, i) => i <= index);
        stars.value[index] = false;
    } else if (selectedStars === 5 && stars.value[index]) {
        stars.value = stars.value.map((_, i) => i <= index);
        stars.value[index] = false;
    } else {
        stars.value = stars.value.map((_, i) => i <= index);
    }
};

const hoverStar = (index) => {
    hoveredStars.value = hoveredStars.value.map((_, i) => i <= index);
};

const resetHoveredStars = () => {
    hoveredStars.value = hoveredStars.value.map((_, i) => false);
};

const submitTicketRating = async () => {
    if (stars.value.filter(Boolean).length > 3) {
        isConfettiVisible.value = true;
    }
    setTimeout(async () => {
        isConfettiVisible.value = false;
    }, 2000);
    isLoading.value = true;
    const selectedStars = stars.value.filter(Boolean).length;
    const selectedTicketId = dataVariables.value.selectedTicketId;
    try {
        if (selectedStars == 0) {
            toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please select atleast one star', life: 1000 });
            isLoading.value = false;
            return;
        }
        const result = await reviewTicketApi(selectedTicketId, selectedStars);
        if (result.status != 'success') {
            throw new Error(result.message);
        }
        toast.add({ severity: 'success', summary: 'Success Message', detail: result.message, life: 1000 });
        dataVariables.value.isTicketRateModalVisible = false;
        await dataTableFncs.getDataTableData();
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: error, life: 1000 });
    } finally {
        setTimeout(() => {
            isLoading.value = false;
        }, 2000);
    }
};
</script>

<style>
.p-rating .p-rating-item.p-focus {
    box-shadow: none !important;
    border-color: transparent !important;
}

#ticket-rate-modal .p-dialog-content {
    padding-bottom: 0px !important;
}

.darkTheme .p-dialog .p-dialog-content {
    background-color: #313131 !important;
}

.darkTheme .p-dialog .p-dialog-header {
    background-color: #313131 !important;
}
</style>
