<script setup>
import { onBeforeUnmount, watch } from 'vue';
import BaseButton from '../../../../components/base/BaseButton.vue';
import { viewNdrVariables } from '../viewNdr';
import AwbNumber from '../../../../components/awbNumber/AwbNumber.vue';
import AttemptHistoryCard from '../components/AttemptHistoryCard.vue';
import { staticAttemptHistoryData } from '../viewNdr';

const modalData = staticAttemptHistoryData;

const dataVariables = viewNdrVariables;

const addRtoOrder = () => {
    const headerContent = document.querySelector('.p-dialog-header');

    if (modalData.isRtoOrder) {
        headerContent.classList.add('rto-order');
    } else {
        headerContent.classList.remove('rto-order');
    }
};

watch(
    () => dataVariables.value.isAttemptHistoryModalVisible,
    (newValue) => {
        if (newValue) {
            document.body.classList.add('attempt-history-modal');
            setTimeout(() => {
                addRtoOrder();
            }, 100);
        } else {
            document.body.classList.remove('attempt-history-modal');
        }
    }
);

onBeforeUnmount(() => {
    document.body.classList.remove('attempt-history-modal');
});
</script>

<template>
    <BaseButton class="p-button-secondary p-button-sm" name="Attempt History Modal" @click="() => (dataVariables.isAttemptHistoryModalVisible = true)">Open Attempt History Modal</BaseButton>
    <DialogView id="attempt_history_modal" v-model:visible="dataVariables.isAttemptHistoryModalVisible" :modal="true" :draggable="false" dismissableMask class="w-full">
        <template #header>
            <div v-if="modalData.isRtoOrder" class="flex items-center justify-center w-full h-[20px] absolute left-0 top-0 text-[12px] py-[2px] font-bold text-white bg-[#eb5532]">RTO ORDER</div>
            <div class="flex flex-col md:flex-row justify-between w-full">
                <div class="text-light-1200 font-[600] flex md:items-center flex-col md:flex-row">
                    <span class="text-h5 md:text-h4 mr-4 py-[6px] md:py-0 dark:text-dark-1000">{{ modalData.modalTitle }}</span>
                    <AwbNumber :logisticNumber="modalData.awbNo" logisticLogo="awb" />
                </div>
            </div>
        </template>
        <div class="flex justify-center items-center w-full">
            <AttemptHistoryCard :data="modalData.attemptHistoryCardData" />
        </div>
    </DialogView>
</template>

<style lang="scss">
@import '../../../../assets/itl-common-css/common-css.scss';
.attempt-history-modal {
    .p-dialog .p-dialog-header {
        border-top-right-radius: 0px;
        border-top-left-radius: 0px;
    }
    .p-dialog-header {
        height: 63px;
        @media (max-width: 768px) {
            padding: 16px 16px 0px 16px !important;
        }
    }

    .p-dialog-header-icon {
        @media (max-width: 768px) {
            top: -10px !important;
        }
    }

    .p-dialog-content {
        padding: 0px !important;
        height: 100vh !important;
    }

    .dp__input_icons {
        padding: 0px !important;
        left: 8px !important;
    }
    .p-dialog-header-icons {
        border: 1px solid #a9a9a9;
        border-radius: 4px;
    }
    .p-dialog .p-dialog-header .p-dialog-header-icon:enabled:hover {
        background: transparent;
    }
    .p-dialog .p-dialog-header .p-dialog-header-icon:focus {
        box-shadow: none;
    }
    .p-dialog {
        max-height: 100% !important;
        border-radius: 0px;
    }
    @media (min-width: 320px) and (max-width: 1024px) {
        .p-dialog-header {
            // display: flex;
            // align-items: flex-start;
            // justify-content: flex-start;
            // flex-direction: column-reverse;
            height: 96px;
            padding: 16px 16px 16px 16px !important;
        }
        .p-dialog-header-icons {
            border: transparent;
            border-radius: 0px;
        }
        .p-dialog-header-icon {
            top: 0px !important;
        }
        .p-icon {
            width: 20px;
            height: 20px;
        }
        .rto-order {
            margin-top: 10px;
        }
    }
}

// .lightTheme .p-dialog .p-dialog-content {
//     background-color: #f1f3f5 !important;
// }
.attempt-history-modal .p-dialog {
    max-height: 100%;
}
.attempt-history-modal .p-dialog .p-dialog-header {
    @include theme() {
        background-color: theme-get('dark-100');
    }
}
#attempt_history_modal {
    .p-panel .p-panel-header {
        background-color: #fff;
        border-radius: 4px 4px 0px 0;
    }
    .p-panel .p-panel-content:last-child {
        border-radius: 0 0 4px 4px;
        padding: 24px;
    }
}
.rto-order {
    margin-top: 20px;
}
.darkTheme {
    .p-dialog .p-dialog-header {
        background-color: var(--dark-100) !important;
    }
    .p-dialog .p-dialog-content {
        background-color: var(--dark-0) !important;
    }
}
.lightTheme {
    .p-dialog .p-dialog-content {
        background-color: var(--light-200) !important;
    }
}
</style>
