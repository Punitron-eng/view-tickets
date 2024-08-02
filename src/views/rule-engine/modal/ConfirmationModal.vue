<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
const { showModal, text, confirmBtnText } = defineProps(['showModal', 'text', 'confirmBtnText'])
const emit = defineEmits(['SaveConfimation', 'cancleConfimation'])
const visible = ref(showModal)
onMounted(() => {
    document.body.classList.add('confirmation-modal');
});
onBeforeUnmount(() => {
    document.body.classList.remove('confirmation-modal');
});
const getConfimation = () => {
    emit('SaveConfimation', true)
    visible.value = false
}
const cancleConfimation = () => {
    emit('cancleConfimation')
    visible.value = false
}
watch(() => showModal, () => {
    visible.value = showModal
})
</script>
<template>
    <DialogView v-model:visible="visible" modal header="Are you sure you want to proceed" class="w-[25rem] md:w-[27rem]"
        id="confirmation-modal" @update:visible="cancleConfimation" :draggable="false">
        <div class="text-md text-black dark:text-white pb-5 dark:border-[#868585] border-b-2 px-4 pt-2">
            <div v-if="!text">Are you sure you want to deactivate this shipping rule?</div>
            <div v-if="!text">Deactivating it will stop its automation process.</div>
            <div v-if="text">
                {{ text }}
            </div>
        </div>
        <div class="flex justify-content-end gap-2  px-4 py-3">
            <Button type="button" label="Cancel" severity="secondary" @click="cancleConfimation"
                class="border-2 dark:border-[#868585] p-2 w-20 rounded-xl text-black dark:text-white">Cancel</Button>
            <Button type="button" label="Save" @click="getConfimation"
                class="bg-[#DE350B] text-white w-32 rounded-xl p-2">
                {{confirmBtnText}}</Button>
        </div>
    </DialogView>
</template>

<style lang="scss">
@import '../../../assets/itl-common-css/common-css.scss';

.confirmation-modal .p-dialog .p-dialog-header .p-dialog-header-icon:enabled:hover,
.confirmation-modal .p-dialog .p-dialog-header .p-dialog-header-icon:focus {

    // background-color: transparent !important;

    box-shadow: none !important;
    @include theme() {
        color: theme-get("black-900") !important;
    }
}

#confirmation-modal .p-dialog-header,
#confirmation-modal .p-dialog-content {

    @include theme() {
        color: theme-get("black-900") !important;
        background-color: theme-get('background') !important;
    }

    .p-dialog-header-icon{
        @include theme() {
            color: theme-get("black-900") !important;
        }
    }

    padding: 1rem;
}

.confirmation-modal .p-dialog-content {
    padding: 0px !important;
}
</style>