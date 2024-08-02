<template>
    <div class="modal-overlay" @click="$emit('close-doc-modal')">
        <div class="custom-modal" @click.stop>
            <div class="modal-header">
                <img class="close, modal-print-icon cursor-pointer" :src="$store.state.baseUrlImages + 'print-icon.png'" alt="close-svg" @click="printImage()" />
                <img  v-if="darkModeVal != true" class="close" src="../../assets/images/modal-close-icon.svg" alt="close-svg" @click="$emit('close-doc-modal')" />
                <img  v-else class="close" src="../../assets/images/dark-mode/dark-modal-close-icon.svg" alt="close-svg" @click="$emit('close-doc-modal')" />
            </div>
            <div class="modal-body">
                <div class="preview-img">
                    <img :src="previewImg" id="modal_image_preview" />
                    <div id="back_side_image" class="back-side-pre-img-div"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent,ref, computed } from 'vue';
import { useStore } from 'vuex';
import { DARKMODE } from '../../store/dark-mode/constants';
const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
export default defineComponent({
    name: 'DocPreviewmodal',
    props: {
        previewImg: {
            type: String,
        },
    },
    methods: {
        printImage() {
            window.print();
        },
    },
});
</script>
<style lang="scss" scoped>
.modal-header .close {
    margin-left: auto;
}
.modal-body {
    overflow: auto;
    background: #f3f4f6;
    max-height: 400px;
}
.preview-img #modal_image_preview {
    width: 100%;
}
.modal-print-icon {
    position: absolute;
    top: 19px;
    right: 87px;
}
</style>
