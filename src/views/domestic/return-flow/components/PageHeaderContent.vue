<script setup>
import ExportCount from './ExportCount.vue';
import BulkUpload from '../modal/BulkUploadModal.vue';
import BulkUpdateModal from '../modal/BulkUpdateModal.vue';
</script>

<template>
    <div class="flex gap-2">
        <ExportCount />
        <BulkUpload />
        <BulkUpdateModal />
    </div>
</template>
