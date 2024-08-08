<script setup>
import { useStore } from 'vuex';
import getImg from '@/util/getImg';
import { ref, nextTick, watch, computed, onMounted } from 'vue';
import { NEWVIEWTICKET } from '@/store/domestic/admin-pages/view-ticket/constants';
import { viewTicketVariables } from '../viewTicketVariables';
import { checkUserType } from '../../../../../util/commonHandlers';
const messages = ref([]);
const dataVariables = viewTicketVariables;

const store = useStore();
const { darkModeVal, chatData, isLoading, changeLoadingStatus } = defineProps(['darkModeVal', 'chatData', 'isLoading', 'changeLoadingStatus']);
const ticketModalComputed = computed(() => store.getters[`${NEWVIEWTICKET.NAME}/sendChatTicketModalData`] || []);
const currentChatCount = computed(() => store.getters[`${NEWVIEWTICKET.NAME}/sendCurrentChatCount`]);
const newChatMessageData = computed(() => store.getters[`${NEWVIEWTICKET.NAME}/sendChatMessageData`]);
watch(
    () => ticketModalComputed.value,
    (newValue) => {
        messages.value = newValue.chat?.status === 'success' ? newValue.chat?.data : [] || [];
    }
);

const isLoadingMessages = ref(false);
const isMoreMessagesAfterScroll = ref(false);
const imgPreview = ref(false);
const selectedImage = ref('');
// For Scrolling to the bottom
const chatContainer = ref(null);
const scrollToBottom = () => {
    nextTick(() => {
        if (chatContainer.value) {
            chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
        }
    });
};

const selectedFile = ref(null); // for the image preview
const imagePreviewUrl = ref(null); // for the image preview

// Adding the message to the messages array
const addMessage = (message, file, imageUrl) => {
    const lastChatId = messages.value.length > 0 ? messages.value[messages.value.length - 1].chat_id : 0;
    const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
    const chatCreatedAt = new Date().toLocaleString('en-GB', options).replace(',', '');
    messages.value.push({
        chat_id: lastChatId + 1,
        chat_attachment: file ? { file_path_large: imageUrl, type: imageUrl ? 'png' : file.name.split('.').pop() } : [],
        chat_message: message,
        chat_position: 'right',
        notification_type: '',
        chat_created_at: chatCreatedAt,
    });
    selectedFile.value = file;
    imagePreviewUrl.value = imageUrl;
    scrollToBottom();
};
// fetching the messages on scroll
const fetchMessages = async () => {
    if (isMoreMessagesAfterScroll.value) {
        return;
    }
    isLoadingMessages.value = true;
    store.commit(`${NEWVIEWTICKET.NAME}/setCurrentChatCount`, currentChatCount.value + 10);
    const payload = {
        selectedTicketId: dataVariables.value.selectedTicketId,
        currentChatCount: currentChatCount.value,
    };
    await store.dispatch(`${NEWVIEWTICKET.NAME}/getChatMessageData`, payload);
    if (newChatMessageData.value.status === 'success') {
        messages.value.unshift(...newChatMessageData.value.data);
        // store.commit(`${NEWVIEWTICKET.NAME}/setCurrentChatCount`, currentChatCount.value + 1);
        isLoadingMessages.value = false;
        return true;
    }
    isMoreMessagesAfterScroll.value = true;
    store.commit(`${NEWVIEWTICKET.NAME}/setCurrentChatCount`, currentChatCount.value - 10);
    isLoadingMessages.value = false;
    return false;
};
// fetching the messages on scroll
const fetchMessagesonScroll = async () => {
    if (chatContainer.value) {
        const scrollTop = chatContainer.value.scrollTop;
        if (scrollTop === 0) {
            const result = await fetchMessages();
            if (result) {
                // After fetching messages, adjust the scrollTop by adding 10 pixels
                chatContainer.value.scrollTop = scrollTop + 50;
            }
        }
    }
};

// for message loading only
const messageLoading = (newValue) => {
    isLoadingMessages.value = newValue;
};

// open the image preview modal
const openModal = (imageSrc, type) => {
    selectedImage.value = { type, src: imageSrc };
    imgPreview.value = !imgPreview.value;
};

// Exporting the addMessage function
defineExpose({
    addMessage,
    messageLoading,
});
</script>

<template>
    <div v-if="isLoading || isLoadingMessages" class="p-3 gap-3 flex flex-col chat-session-container overflow-y-auto md:h-full">
        <div class="flex gap-2">
            <SkeletonView width="30px" height="30px" shape="circle" />
            <SkeletonView width="340px" height="30px" class="message-loading" />
        </div>
        <div class="flex flex-row-reverse gap-2">
            <SkeletonView width="30px" height="30px" shape="circle" />
            <SkeletonView width="340px" height="30px" class="user-message-loading" />
        </div>
        <div class="flex gap-2">
            <SkeletonView width="30px" height="30px" shape="circle" />
            <SkeletonView width="340px" height="30px" class="message-loading" />
        </div>
        <div class="flex flex-row-reverse gap-2">
            <SkeletonView width="30px" height="30px" shape="circle" />
            <SkeletonView width="340px" height="30px" class="user-message-loading" />
        </div>
        <div class="flex gap-2">
            <SkeletonView width="30px" height="30px" shape="circle" />
            <SkeletonView width="340px" height="30px" class="message-loading" />
        </div>
        <div class="flex flex-row-reverse gap-2">
            <SkeletonView width="30px" height="30px" shape="circle" />
            <SkeletonView width="340px" height="30px" class="user-message-loading" />
        </div>
        <div class="flex gap-2">
            <SkeletonView width="30px" height="30px" shape="circle" />
            <SkeletonView width="340px" height="30px" class="message-loading" />
        </div>
        <div class="flex flex-row-reverse gap-2">
            <SkeletonView width="30px" height="30px" shape="circle" />
            <SkeletonView width="340px" height="30px" class="user-message-loading" />
        </div>
    </div>
    <div v-else ref="chatContainer" class="p-3 gap-3 flex flex-col chat-session-container overflow-y-auto h-full mb-[15px]" @scroll="fetchMessagesonScroll">
        <div v-for="(message, index) in messages" :key="index" :class="[message.chat_position === 'right' ? 'flex flex-row-reverse gap-2' : 'flex gap-2', message.notification_type === 'notification' ? 'justify-center' : '']">
            <img v-if="(message.chat_position !== 'right' || message.chat_position == '') && message.notification_type != 'notification' && checkUserType('vendor')" :src="getImg('itl-chat-logo', darkModeVal)" class="w-[33px]" />
            <img v-else-if="(message.chat_position !== 'right' || message.chat_position == '') && message.notification_type != 'notification'" :src="getImg('ticket-message-user', darkModeVal)" class="w-[33px]" />
            <div class="flex flex-col gap-1 text-[14px]" :class="message.notification_type === 'notification' ? 'w-full text-center' : message.chat_position === 'right' ? 'items-end' : 'items-start'">
                <div v-if="message.notification_type === 'notification'" class="flex justify-center items-center gap-2 min-w-full">
                    <!-- this is for the notification  -->
                    <div class="h-[1px] bg-[#f1f3f5] dark:bg-[#383B40] w-1/3"></div>
                    <div class="flex flex-col gap-1 text-center w-1/3 md:text-[10px] lg:text-[12px] text-light-700">
                        {{ message.chat_message }}
                        <br />
                        {{ message.chat_created_at }}
                    </div>
                    <div class="h-[1px] bg-[#f1f3f5] dark:bg-[#383B40] w-1/3"></div>
                </div>
                <!-- this is for the document attachment -->

                <div
                    v-else-if="message.chat_position === 'right' || message.chat_position === 'left'"
                    :class="message.is_show_pending_from === 2 ? 'border-b-2 border-[red] px-[18px] py-[10px] user-message' : message.chat_position === 'right' ? 'px-[18px] py-[10px] user-message' : 'px-[18px] py-[10px] message'"
                >
                    <div v-if="message.chat_attachment.length != 0" class="hover:cursor-pointer">
                        <a
                            :href="message.chat_attachment.file_path_large"
                            download
                            target="_blank"
                            class="hover:cursor-pointer max-w-[40px]"
                            v-if="message.chat_attachment.type === 'xls' || message.chat_attachment.type === 'xlsx' || message.chat_attachment.type === 'csv'"
                        >
                            <img :src="getImg('preview-excel')" class="" />
                        </a>
                        <a :href="message.chat_attachment.file_path_large" download target="_blank" class="hover:cursor-pointer max-w-[40px]" v-else-if="message.chat_attachment.type === 'pdf'">
                            <img :src="getImg('preview-pdf')" class="" />
                        </a>
                        <a :href="message.chat_attachment.file_path_large" download target="_blank" class="hover:cursor-pointer max-w-[40px]" v-else-if="message.chat_attachment.type === 'doc' || message.chat_attachment.type === 'docx'">
                            <img :src="getImg('preview-doc')" class="" />
                        </a>
                        <div v-else-if="message.chat_attachment.type === 'mp3' || message.chat_attachment.type === 'mp4' || message.chat_attachment.type === 'mpeg' || message.chat_attachment.type === 'wav'" class="">
                            <img
                                :src="getImg('music-icon')"
                                class=""
                                v-if="message.chat_attachment.type === 'mp3' || message.chat_attachment.type === 'mpeg' || message.chat_attachment.type === 'wav'"
                                @click="openModal(message.chat_attachment.file_path_large, 'audio')"
                            />
                            <!-- this is for the video message -->
                            <img :src="getImg('audio-icon')" class="" @click="openModal(message.chat_attachment.file_path_large, 'video')" v-else />
                        </div>
                        <img :src="getImg('image-preview')" v-else @click="openModal(message.chat_attachment.file_path_large, 'image')" class="hover:cursor-pointer max-w-[40px]" />
                    </div>
                    {{ message.chat_message }}
                </div>
                <!-- this is for the Image message -->
                <div v-else class="message" :class="message?.chat_message?.length > 0 ? 'px-[18px] py-[10px]' : ''">
                    <div v-if="message.chat_attachment != []">
                        <img :src="message.chat_attachment.file_path_large" class="object-contain max-w-[40px]" />
                    </div>
                    {{ message.chat_message }}
                </div>

                <!-- this is for the double tick and time  -->
                <div v-if="message.notification_type !== 'notification'" class="flex items-center gap-1 text-light-700 dark:text-dark-700 text-itl-note" :class="message.chat_position === 'right' ? 'flex-row-reverse' : ''">
                    <img v-if="message.chat_position === 'right'" :src="getImg('manifest-blue-tick', darkModeVal)" class="" />
                    {{ message.chat_created_at }}
                    <span class="mr-2 capitalize" v-if="checkUserType('admin') || checkUserType('subadmin')">{{ message.chat_created_by }}</span>
                </div>
            </div>
        </div>
    </div>
    <DialogView v-model:visible="imgPreview" :modal="true" :draggable="false" dismissableMask id="imgpreview-message-session">
        <div class="max-w-[50vw] object-contain px-[16px] min-w-[40vw] flex items-center justify-center min-h-[40vh]">
            <audio controls v-if="selectedImage.type === 'audio'">
                <source :src="selectedImage.src" type="audio/mpeg" />
            </audio>
            <video :src="selectedImage.src" controls v-else-if="selectedImage.type === 'video'"></video>
            <img :src="selectedImage.src" class="h-full object-contain" v-else />
        </div>
    </DialogView>
</template>

<style lang="scss">
#imgpreview-message-session {
    .p-icon {
        width: 16px !important;
        height: 16px !important;
    }
}

.chat-session-container {
    @media screen and (device-width: 1280px) and (device-height: 1366px) {
        max-height: calc(100vh - 270px) !important;
    }

    height: 100%;
    max-height: 70%;

    @media screen and (device-width: 768px) {
        max-height: calc(100vh - 60%);
    }

    @media screen and (max-width: 767px) {
        height: 100%;
        max-height: calc(100vh - 430px);
    }

    @media screen and (max-width: 380px) {
        max-height: 32vh !important;
    }
}

.message {
    max-width: 356px;

    @media screen and (max-width: 767px) {
        max-width: 290px;
    }

    word-wrap: break-word;
    @apply text-light-1000;
    background-color: #f1f3f5;
    border-radius: 16px 16px 16px 0px;
    width: fit-content;
}

.message-loading {
    border-radius: 16px 16px 16px 0px;
    width: fit-content;
}

.user-message-loading {
    border-radius: 16px 16px 0px 16px;
    width: fit-content;
}

.user-message {
    word-wrap: break-word;
    width: fit-content;
    @apply text-input-text-color;
    max-width: 390px;
    background-color: #d9e9ff;
    border-radius: 16px 16px 0px 16px;

    @media screen and (max-width: 767px) {
        max-width: 318px;
    }
}
</style>
