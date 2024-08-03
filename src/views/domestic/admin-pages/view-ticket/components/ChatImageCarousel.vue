<script setup>
import { defineProps } from 'vue';
import getImg from '@/util/getImg';

// Define props
const { imageCarousel, Function, isOpenModal, VisiableImage } = defineProps(['imageCarousel', 'Function', 'isOpenModal', 'VisiableImage']);

// Function to determine the image source based on the file type
const showImage = (image) => {
    switch (image.type) {
        case 'csv':
        case 'xlsx':
        case 'xls':
            return getImg('bulk-csv-icon');
        case 'doc':
            return getImg('doc-icon');
        case 'docx':
            return getImg('doc-icon');
        case 'pdf':
            return getImg('pdf-icon');
        case 'mp3':
        case 'mpeg':
        case 'wav':
            return getImg('music-icon');
        case 'mp4':
            return getImg('audio-icon');
        default:
            return getImg('image-preview');
    }
};

// Function to check if the file type is previewable
const isPreviewable = (type) => {
    const previewableTypes = ['wav', 'mp3', 'mp4', 'jpg', 'jpeg', 'png'];
    return previewableTypes.includes(type);
};

// Handle click event
const handleClick = (data, index) => {
    const imageSrc = showImage(data);
    Function(imageSrc, imageCarousel, index);
};
</script>

<template>
    <Carousel :value="imageCarousel" :numVisible="isOpenModal ? 1 : imageCarousel.length > 3 ? 3 : 2" numScroll="1" circular>
        <template #item="slotProps">
            <div class="flex justify-center items-center">
                <img v-if="isPreviewable(slotProps.data.type)" :src="showImage(slotProps.data)" class="hover:cursor-pointer" :class="isOpenModal ? 'h-[70vh] ' : 'h-[50px] '" @click="handleClick(slotProps.data, slotProps.index)" />
                <a v-else :href="slotProps.data.file_path_small" download target="_blank" class="hover:cursor-pointer pr-2">
                    <img :src="showImage(slotProps.data)" class="hover:cursor-pointer pr-2" :class="isOpenModal ? 'h-[70vh]' : 'h-[50px]'" alt="Downloadable File" />
                </a>
            </div>
        </template>
    </Carousel>
</template>
<style lang="scss">
.chat-ticket-modal {
    .p-carousel-container {
        max-width: 340px !important;
    }
    .p-carousel-indicators {
        display: none !important;
    }

    .p-disabled {
        display: none !important;
    }

    .p-carousel .p-carousel-content .p-carousel-prev:enabled:hover,
    .p-carousel .p-carousel-content .p-carousel-next:enabled:hover {
        background-color: transparent;
    }

    .p-carousel .p-carousel-content .p-carousel-prev:focus,
    .p-carousel .p-carousel-content .p-carousel-next:focus {
        box-shadow: none;
    }
}
</style>
