<script setup>
import { ref, watch } from 'vue';
const props = defineProps(['isVisible']);
const visible = ref(false);
const emits = defineEmits(['close-confirmation-modal']);
watch(
    () => props.isVisible,
    (newValue) => {
        visible.value = newValue;
        // if (newValue) {
        //     document.body.classList.add('confirmation-modal');
        // } else {
        //     document.body.classList.remove('confirmation-modal');
        // }
    }
);

const handleChange = () => {
    visible.value = false;
    emits('close-confirmation-modal');
};
</script>

<template>
    <DialogView v-model:visible="visible" :draggable="false" :modal="true" dismissableMask @hide="handleChange"
        id="confirmation-modal">

        <template #header>
            <div class="w-full p-3 font-interSemiBold text-h4">
                <slot name="header"></slot>
            </div>
        </template>
        <div class="p-5 bg-[#ffffff] dark:bg-[#313131] font-interRegular">
            <slot name="body"></slot>
        </div>
        <template #footer>
            <slot name="footer"></slot>
        </template>
    </DialogView>
</template>

<style lang="scss">
@import '../../assets/itl-common-css/common-css.scss';

// .confirmation-modal .p-dialog-mask {
//     backdrop-filter: blur(4px);
//     background: rgba(0, 0, 0, 0.431372549);
// }

#confirmation-modal {
    .p-dialog-header-icons {
        margin-right: 10px !important;
    }

    .p-dialog-content {
        padding: 0px !important;
    }

    .p-dialog-footer {
        padding: 16px 10px !important;

        @include theme() {
            border-top: 1px solid theme-get('modal-header-border-bottom');
        }
    }

    .p-dialog-header {
        padding: 0px !important;

        @include theme() {
            border-bottom: 1px solid theme-get('modal-header-border-bottom');
            background-color: theme-get('background') !important;
        }
    }
}
</style>
