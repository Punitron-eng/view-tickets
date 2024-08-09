<script setup>
import { useStore } from 'vuex';
import { format } from 'date-fns';
import getImg from '@/util/getImg';
import { useToast } from 'primevue/usetoast';
import { checkUserType } from '@/util/commonHandlers';
import { DARKMODE } from '@/store/dark-mode/constants';
import BaseButton from '@/components/base/BaseButton.vue';
import { viewTicketVariables } from '../viewTicketVariables';
import ChatModalHeader from '../components/ChatModalHeader.vue';
import { computed, onMounted, ref, watch } from 'vue';
import ChatImageCarousel from '../components/ChatImageCarousel.vue';
import ChatModalMessageSession from '../components/ChatModalMessageSession.vue';
import { NEWVIEWTICKET } from '@/store/domestic/admin-pages/view-ticket/constants';
import ConfirmationModal from '@/components/itl-common-features/ConfirmationModal.vue';
import * as dataTableFncs from '@/components/itl-dataTable-files/itl-dataTable/commonFunctions';
import SingleDatePicker from '@/components/itl-common-features/itl-date-range-picker/SingleDatePicker.vue';
import { getChatTicketModalChatData } from '@/api/domestic/view-ticket/viewTicketApi';
import { addCommentApi, confirmPendingApi, updateAssignMemberApi, uploadAttachmentApi, confirmUnactionbleItlApi } from '@/api/domestic/view-ticket/viewTicketApi';
import BaseTextarea from '@/components/base/BaseTextarea.vue';
import { checkAccessRight, deepCheckAccessRight } from '@/util/commonHandlers';
import BaseDropdown from '@/components/base/BaseDropdown.vue';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const ticketModalComputed = computed(() => store.getters[`${NEWVIEWTICKET.NAME}/sendChatTicketModalData`] || []);

const store = useStore();
const toast = useToast();
const isActive = ref({
    summary: true,
    chat: false,
});
const imgPreview = ref(false);
const isLoading = ref(false);
const modalImageSrc = ref({
    imageSrc: {
        type: '',
        image: '',
    },
    data: [],
    index: 0,
});
const ticketModalData = ref([]);
const attachmentData = ref([]);
const chatData = ref([]);
const isCheck = ref({
    pending_from: false,
    unactionble_itl: false,
});
const isVisibleConfirmation = ref(false);
const unactionbleItlConfirmation = ref(false);
const dataVariables = viewTicketVariables;
// For the file upload
const fileInputRef = ref(null); // for the file input
const selectedFile = ref(null); // for the selected file
const imagePreviewUrl = ref(null); // for the image preview
const messageInput = ref(null); // for the message input
const pendingForVendor = ref('');
watch(
    () => ticketModalComputed.value,
    (newValue) => {
        ticketModalData.value = newValue.ticketData?.status === 'success' ? newValue.ticketData.data : [];
        attachmentData.value = newValue.attachment?.status === 'success' ? newValue.attachment.data : [];
        chatData.value = newValue.chat?.status === 'success' ? newValue.chat.data : [];
    }
);

watch(
    () => dataVariables.value.isChatModalVisible,
    (newValue) => {
        if (newValue) {
            clearAllValue();
            isLoading.value = true;
            fetchTicketData();
            document.body.classList.add('chat-ticket-modal');
            document.body.classList.add('overflow-hidden');
            return;
        }
        document.body.classList.remove('chat-ticket-modal');
    }
);

// For the image preview
const openModal = (imageSrc, data, index) => {
    const previewableTypes = ['mp3', 'wav', 'mpeg', 'mp4', 'jpg', 'jpeg', 'png'];
    const updatedData = data.filter((item) => previewableTypes.includes(item.type));
    modalImageSrc.value = { imageSrc: showImage(data[index]), data: updatedData, index };
    imgPreview.value = true;
};
// for the file upload
const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const allowedExtensions = ['pdf', 'doc', 'docx', 'csv', 'xls', 'xlsx', 'mp3', 'wav', 'mpeg', 'mp4', 'jpg', 'jpeg', 'png'];

    if (!file) {
        return;
    }
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (allowedExtensions.includes(fileExtension)) {
        selectedFile.value = file;
        imagePreviewUrl.value = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
    } else {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Only PDF, DOC, DOCX, CSV, XLS, XLSX, WAV, MP3,MPEG, MP4, JPG, JPEG or PNG files are allowed.', life: 3000 });
    }

    fileInputRef.value.value = '';
    messageInput.value.focus();
};
// for the trigger file upload
const triggerFileUpload = () => {
    fileInputRef.value.click();
};
// for the assign options
const assignOptions = ref([]);
const selectedOptionsText = ref([]);
const chatTicketAssignMemberDate = ref('');
const singleSelectedDate = ref('');
const dateValue = (date) => {
    const tempDate = [format(new Date(date), 'yyyy-MM-dd')];
    chatTicketAssignMemberDate.value = tempDate[0];
    singleSelectedDate.value = tempDate[0];
};
const assignMemberUpdateIsLoading = ref(false);
const updateAssignMember = async () => {
    try {
        assignMemberUpdateIsLoading.value = true;
        const formattedDate = new Date(singleSelectedDate.value).toISOString().split('T')[0];
        const payload = {
            ticket_id: ticketModalData.value?.ticket_id,
            assign_member: selectedOptionsText.value.map((item) => item.id),
            due_date: formattedDate,
        };
        const result = await updateAssignMemberApi(payload);
        if (result.status === 'success') {
            toast.add({ severity: 'success', summary: 'Successfull Updated', detail: result.message, life: 3000 });
            assignMemberUpdateIsLoading.value = false;
        } else {
            toast.add({ severity: 'error', summary: 'Error Message', detail: result.message, life: 3000 });
        }
    } catch (error) {
        assignMemberUpdateIsLoading.value = false;
        toast.add({ severity: 'error', summary: 'Error Message', detail: error, life: 3000 });
    }
};

// for the dynamic ticket details
const ticketItems = ref([]);
const SubAdminticketItems = ref([]);

// for showing confirmation modal
const showConfirmationModal = (name) => {
    isCheck.value[name] = !isCheck.value[name];
    if (name === 'unactionble_itl') {
        unactionbleItlConfirmation.value = true;
    } else {
        isVisibleConfirmation.value = isCheck.value.pending_from ? true : false;
    }
};

// for fetching the ticket details
const fetchTicketData = async () => {
    try {
        await store.dispatch(`${NEWVIEWTICKET.NAME}/getChatTicketModalData`, dataVariables.value.selectedTicketId);
        if (ticketModalComputed.value.length > 0 && ticketModalComputed.value.status !== 'success') {
            throw new Error(ticketModalComputed.value.status);
        }
        chatData.value = ticketModalComputed.value.chat.data;
        attachmentData.value = ticketModalComputed.value.attachment.data;
        ticketItems.value = [
            // { label: 'Days Left', value: 0 },
            { label: 'Category', value: ticketModalData.value?.ticket_category || '-' },
            { label: 'Department', value: ticketModalData.value?.ticket_department || '-' },
            { label: 'Created Date', value: ticketModalData.value?.ticket_created_date || '-' },
            { label: 'Vendor Created Date', value: ticketModalData.value?.vendor_ticket_date || '-' },
            { label: 'Ageing', value: ticketModalData.value?.ticket_ageing || '-' },
            { label: 'Last Updated', value: ticketModalData.value?.ticket_last_updated_date || '-' },
            { label: 'Closed Date', value: ticketModalData.value?.ticket_closed_date || '-' },
        ];
        SubAdminticketItems.value = [
            { label: 'Close by', value: ticketModalData.value?.ticket_close_by },
            { label: 'Clone Ticket', value: ticketModalData.value?.cloned_from_ticket },
            { label: 'Clone Date', value: ticketModalData.value?.clone_date },
            { label: 'Tracking Status', value: ticketModalData.value?.tracking_status },
            { label: 'No of Attempt', value: ticketModalData.value?.no_of_attempts },
            { label: 'EDD', value: ticketModalData.value?.order_edd },
            { label: 'Last Attempt Date', value: ticketModalData.value?.last_attempt_date },
            { label: 'Assign By', value: ticketModalData.value?.ticket_assign_by },
            { label: 'CS Remark', value: ticketModalData.value?.ticket_cs_remark },
            // { label: 'LSP Remark', value: ticketModalData.value?.ticket_lsp_remark  },
            { label: 'Pending CS Remark', value: ticketModalData.value?.pending_cs_remark },
        ];
        singleSelectedDate.value = ticketModalData.value?.ticket_due_details?.date ? new Date(ticketModalData.value.ticket_due_details.date) : new Date(ticketModalData.value.ticket_created_date);
        assignOptions.value = ticketModalData.value.ticket_assign_member;
        const ticketAssignToIds = ticketModalData.value?.ticket_assign_to?.id || [];
        isCheck.value.unactionble_itl = ticketModalData.value.is_show_unactionable_by_itl == 1;
        // Filter assignOptions based on the ticketAssignToIds
        selectedOptionsText.value = assignOptions.value.filter((option) => ticketAssignToIds.includes(option.id));
        isLoading.value = false;
        // toast.add({ severity: 'success', summary: 'Success Message', detail: ticketModalComputed.value.status, life: 3000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: error, life: 3000 });
        isLoading.value = false;
    }
};

// for the change loading status
const changeLoadingStatus = (changeStatus) => {
    isLoading.value = changeStatus;
};
// for the mounted
onMounted(() => {
    if (dataVariables.value.isChatModalVisible) {
        document.body.classList.add('chat-ticket-modal');
    }
});
// for the clear all value
const clearAllValue = () => {
    ticketModalData.value = [];
    isLoading.value = true;
    ticketItems.value = [];
    SubAdminticketItems.value = [];
    store.commit(`${NEWVIEWTICKET.NAME}/setChatTicketModalData`, []);
    document.body.classList.remove('chat-ticket-modal');
    currentMessage.value = '';
    selectedFile.value = null;
    imagePreviewUrl.value = '';
    store.commit(`${NEWVIEWTICKET.NAME}/setCurrentChatCount`, 0);
};
const uploadAttachment = async (selectedFileValue) => {
    try {
        const payload = {
            upload_file: selectedFileValue,
        };
        const result = await uploadAttachmentApi(payload);
        if (result.status == 'success') {
            toast.add({ severity: 'success', summary: 'Success Message', detail: result.message, life: 3000 });
        }
        return result;
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: error, life: 3000 });
    }
};
// hiding muti select
const hideMultiSelect = () => {
    const multiSelect = document.querySelector('.p-multiselect-panel');
    multiSelect ? (multiSelect.style.display = 'none') : null;
};

// post comment api
const postComment = async (selectedFileValue, successFileUpload) => {
    try {
        const payload = {
            ticket_message: currentMessage.value,
        };
        if (selectedFileValue && successFileUpload) {
            payload.attachment = successFileUpload.file_name;
        }
        const result = await addCommentApi(ticketModalData.value?.ticket_id, payload);
        if (result.status !== 'success') {
            chatMessageSession.value.updateLastMessage(true, false);
            throw new Error(result.message);
        }
        chatMessageSession.value.updateLastMessage(false, false);
        currentMessage.value = '';
        selectedFile.value = null;
        imagePreviewUrl.value = '';
        store.commit(`${NEWVIEWTICKET.NAME}/setCurrentChatCount`, 0);
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: error, life: 3000 });
        currentMessage.value = '';
        selectedFile.value = null;
        imagePreviewUrl.value = '';
    }
};
// pending from vendor api btn loding
const pendingFromVendorLoading = ref(false);
// pending from vendor api
const confirmPendingFnc = async () => {
    pendingFromVendorLoading.value = true;
    try {
        const payload = {
            ticket_id: ticketModalData.value?.ticket_id,
            pending_from_vendor: 1,
            pending_from_vendor_remark: pendingForVendor.value,
        };
        const result = await confirmPendingApi(payload);
        if (result.status !== 'success') {
            throw new Error(result.message);
        }
        chatMessageSession.value.messageLoading(true);
        const chatResult = await getChatTicketModalChatData(ticketModalData.value?.ticket_id, 0);
        if (chatResult.status !== 'success') {
            throw new Error(chatResult.message);
        }

        const newTicketStore = { ...ticketModalComputed.value, chat: chatResult };
        store.commit(`${NEWVIEWTICKET.NAME}/setChatTicketModalData`, newTicketStore);
        // chatData.value = chatResult.data;
        chatMessageSession.value.messageLoading(false);
        isCheck.value.pending_from = true;
        dataTableFncs.getDataTableData();
        isVisibleConfirmation.value = false;
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: error, life: 3000 });
    } finally {
        chatMessageSession.value.messageLoading(false);
        pendingFromVendorLoading.value = false;
    }
};
// for the chat message session
const chatMessageSession = ref(null);
const currentMessage = ref('');
const disableInput = ref(false);
// sending message api
const sendMessage = async () => {
    disableInput.value = true;
    const currentMessageValue = currentMessage.value.trim();
    const selectedFileValue = selectedFile.value;
    const imagePreviewUrlValue = imagePreviewUrl.value;

    if (!currentMessageValue && !selectedFileValue && !imagePreviewUrlValue) {
        return;
    }

    try {
        chatMessageSession.value.addMessage(currentMessageValue, selectedFileValue, imagePreviewUrlValue);
        if (selectedFileValue) {
            const result = await uploadAttachment(selectedFileValue);
            if (result.status !== 'success') {
                chatMessageSession.value.updateLastMessage(true, false);
                throw new Error(result.message);
            }
            chatMessageSession.value.updateLastMessage(false, false);
            await postComment(selectedFileValue, result);
        } else {
            await postComment(currentMessageValue);
        }
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: error.message, life: 3000 });
    } finally {
        disableInput.value = false;
    }
};

const showImage = (image) => {
    switch (image.type) {
        // case 'csv':
        // case 'xlsx':
        // case 'xls':
        //     return { type: 'file', image: getImg('preview-excel'), file: image.file_path_large };
        // case 'doc':
        // case 'docx':
        //     return { type: 'file', image: getImg('preview-doc'), file: image.file_path_large };
        // case 'pdf':
        //     return { type: 'file', image: getImg('preview-pdf'), file: image.file_path_large };
        case 'mp3':
        case 'mpeg':
        case 'wav':
            return { type: 'audio', image: getImg('music-icon'), file: image.file_path_large };
        case 'mp4':
            return { type: 'video', image: getImg('audio-icon'), file: image.file_path_large };
        default:
            return { type: 'image', image: getImg('image-preview'), file: image.file_path_large };
    }
};
const nextImage = () => {
    if (modalImageSrc.value.index + 1 < modalImageSrc.value.data.length) {
        modalImageSrc.value.index += 1;
    } else {
        modalImageSrc.value.index = 0;
    }
    modalImageSrc.value.imageSrc = showImage(modalImageSrc.value.data[modalImageSrc.value.index]);
};
const prevImage = () => {
    if (modalImageSrc.value.index - 1 >= 0) {
        modalImageSrc.value.index -= 1;
    } else {
        modalImageSrc.value.index = modalImageSrc.value.data.length - 1;
    }
    modalImageSrc.value.imageSrc = showImage(modalImageSrc.value.data[modalImageSrc.value.index]);
};
const unactionbleItlOptions = [
    { id: 1, value: 'Maximum Attempts' },
    { id: 2, value: 'Lost' },
    { id: 3, value: 'Damage' },
    { id: 4, value: 'Shortage' },
];
const selectedUnactionbleItl = ref(null);
const unactionbleItlLoading = ref(false);
const confirmUnactionbleItlFnc = async () => {
    unactionbleItlLoading.value = true;
    try {
        if (selectedUnactionbleItl.value === null) {
            toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please select reason', life: 3000 });
            return;
        }
        const payload = {
            ticket_id: ticketModalData.value?.ticket_id,
            unactionable_by_itl: selectedUnactionbleItl.value.id,
        };
        const result = await confirmUnactionbleItlApi(payload);
        if (result.status !== 'success') {
            throw new Error(result.message);
        }
        chatMessageSession.value.messageLoading(true);
        const chatResult = await getChatTicketModalChatData(ticketModalData.value?.ticket_id, 0);
        if (chatResult.status !== 'success') {
            throw new Error(chatResult.message);
        }
        const newTicketStore = { ...ticketModalComputed.value, chat: chatResult };
        store.commit(`${NEWVIEWTICKET.NAME}/setChatTicketModalData`, newTicketStore);
        chatMessageSession.value.messageLoading(false);
        fetchTicketData();
        isCheck.value.unactionble_itl = true;
        unactionbleItlConfirmation.value = false;
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: error, life: 3000 });
    } finally {
        unactionbleItlLoading.value = false;
    }
};
</script>
<template>
    <DialogView id="chat-ticket-modal" v-model:visible="dataVariables.isChatModalVisible" :modal="true" :draggable="false" dismissableMask>
        <template #header>
            <ChatModalHeader :isLoading="isLoading" :ticketModalData="ticketModalData" :isActive="isActive" />
        </template>
        <div class="h-[75vh] lg:!w-[95vw] w-screen md:!w-auto mx-auto bg-[#f1f3f5] dark:bg-[#212121] px-2 md:px-4 py-3 flex justify-center gap-4 md:overflow-hidden">
            <div class="flex-col gap-4 max-h-[75vh] overflow-y-auto w-full md:!w-[53.8%] lg:!w-[50%] max-w-[368px] left-containter" :class="isActive.summary ? 'flex md:flex' : 'hidden md:flex'">
                <div class="left-chat-ticket-modal h-fit bg-[#ffffff] dark:bg-[#313131] rounded-sm shadow-xl">
                    <!-- header section -->
                    <div class="border-b border-[#f1f3f5] dark:border-[#383b40] p-3 w-full">
                        <div v-if="isLoading">
                            <SkeletonView width="150px" height="16px" class="mb-[8px]" />
                            <SkeletonView width="340px" height="16px" />
                        </div>
                        <div v-else>
                            <div class="font-interSemiBold text-[16px] mb-[8px] break-all">
                                {{ ticketModalData?.ticket_subject }}
                            </div>
                            <div class="break-all">
                                {{ ticketModalData?.ticket_description }}
                            </div>
                        </div>
                    </div>
                    <!-- Attachments section -->
                    <div class="py-[24px] lg:py-[32px] px-[24px] max-w-[360px]" v-if="attachmentData.length > 0">
                        <div v-if="isLoading">
                            <SkeletonView width="320px" height="131px" />
                        </div>
                        <div v-else>
                            <p class="font-interSemiBold text-light-1000 text-[13px] dark:text-[#ffffff]">ATTACHMENT</p>
                            <div class="flex gap-[8px]">
                                <ChatImageCarousel :imageCarousel="attachmentData" :Function="openModal" :isOpenModal="false" VisiableImage="3" />
                            </div>
                        </div>
                    </div>
                    <!-- Details section -->
                    <div class="pb-[32px] px-[24px] py-[24px] lg:py-[32px]">
                        <div v-if="isLoading">
                            <SkeletonView width="100%" height="200px" />
                        </div>
                        <div v-else>
                            <p class="font-interSemiBold text-light-1000 uppercase text-[13px] dark:text-[#ffffff]">Details</p>
                            <div v-for="(item, index) in ticketItems.filter((item) => item.value != '' && item.value != 'N/A')" :key="index" class="details-div-outer flex justify-between items-start leading-[16px] text-[13px] gap-[8px]">
                                <div class="details-heading text-light-1000 dark:text-[#9ca3af]">{{ item.label }}</div>
                                <div class="text-right details-content text-light-1400 dark:text-[#dfdfdf]">{{ item.value }}</div>
                            </div>
                            <div class="flex mt-[1rem] justify-between flex-col items-start leading-[16px] text-[13px] gap-[8px]">
                                <div class="details-heading font-interSemiBold text-light-1000 dark:text-[#ffffff]">Extended TurnAround Time:</div>
                                <div class="flex flex-wrap gap-[8px]">
                                    <div v-for="(item, index) in ticketModalData.extended_due_date" :key="index" class="text-right details-content text-light-1400 dark:text-[#dfdfdf] bg-[#f1f3f5] dark:bg-[#383b40] rounded-md px-2 py-1">
                                        {{ item }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="subadmin-left-chat-ticket-modal w-full h-fit bg-[#ffffff] dark:bg-[#313131] rounded-sm shadow-xl mb-[30px] md:mb-0" v-if="checkUserType('subadmin') || checkUserType('admin')">
                    <!-- Assign Ticket section -->
                    <div class="border-b p-[24px] dark:border-[#383b40]">
                        <div v-if="isLoading">
                            <SkeletonView width="340px" height="50px" />
                        </div>
                        <div v-else-if="(checkAccessRight() ? true : deepCheckAccessRight('domestic', 'support_ticket', 'edit')) && ticketModalData.ticket_status === 'Open'">
                            <div class="font-interSemiBold text-light-1000 dark:text-[#ffffff]">ASSIGN MEMBER</div>
                            <div class="flex flex-col md:flex-row gap-2 pt-[8px]">
                                <MultiSelect
                                    filter
                                    v-model="selectedOptionsText"
                                    :options="assignOptions"
                                    optionLabel="value"
                                    placeholder="Select Assign Option"
                                    :maxSelectedLabels="1"
                                    class="!max-w-[158px] w-[158px] h-[35px] chat-ticket-multiselect relative"
                                    appendTo="self"
                                >
                                    <template #option="slotProps">
                                        <div class="truncate">{{ slotProps.option.value }}</div>
                                    </template>
                                </MultiSelect>
                                <div class="flex flex-row md:!flex-col gap-2 relative !max-w-[158px] w-[158px]" @click="hideMultiSelect">
                                    <SingleDatePicker @date-value="dateValue" :min-date="new Date()" :defaultDate="singleSelectedDate" @open="hideMultiSelect" />
                                    <!-- class="py-2 border-[#0168ED] font-interSemiBold text- border rounded-md bg-itl-primary text-white w-full" -->
                                    <BaseButton name="Update" class="py-2 font-interSemiBold rounded-md text-white" @click="updateAssignMember" :isLoading="assignMemberUpdateIsLoading" />
                                </div>
                            </div>
                            <div class="pt-[16px] flex items-center">
                                <input type="checkbox" class="mr-2 w-[16px] h-[16px]" id="pending_from" v-model="isCheck.pending_from" name="pending_from" @click="showConfirmationModal('pending_from')" />
                                <label class="text-[12px] hover:cursor-pointer" for="pending_from">Mark as pending from Vendor</label>
                            </div>
                            <div class="pt-[16px] flex items-center">
                                <input
                                    type="checkbox"
                                    class="mr-2 w-[16px] h-[16px]"
                                    :class="{ 'cursor-not-allowed': isCheck.unactionble_itl }"
                                    id="unactionble_itl"
                                    v-model="isCheck.unactionble_itl"
                                    name="unactionble_itl"
                                    @click="showConfirmationModal('unactionble_itl')"
                                    :disabled="isCheck.unactionble_itl"
                                />
                                <label class="text-[12px] hover:cursor-pointer" :class="{ 'text-gray-400': isCheck.unactionble_itl }" for="unactionble_itl">Mark as Unactionable from ITL</label>
                            </div>
                        </div>

                        <!-- Details section -->
                        <div class="pt-[32px]">
                            <div v-if="isLoading">
                                <SkeletonView width="320px" height="256px" />
                            </div>
                            <div v-else>
                                <div v-for="(item, index) in SubAdminticketItems.filter((item) => item.value != '' && item.value != 'N/A')" :key="index" class="details-div-outer flex justify-between items-start leading-[16px] text-[13px] gap-[8px]">
                                    <div class="details-heading text-light-1000 dark:text-[#9ca3af]">{{ item.label }}</div>
                                    <div class="text-right details-content text-light-1400 dark:text-[#dfdfdf]">{{ item.value }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="right-chat-ticket-modal max-w-[752px] w-[752px] max-h-[1085px] h-max md:!h-[100%] md:w-[50%] lg:w-[70%] bg-[#ffffff] dark:bg-[#313131] rounded-sm shadow-xl overflow-hidden"
                :class="isActive.chat ? ' md:block' : 'hidden md:block'"
            >
                <!-- Header section -->
                <div class="border-b dark:border-[#383b40] p-3 gap-3 flex items-center sticky top-0">
                    <div v-if="isLoading" class="flex gap-2">
                        <SkeletonView width="30px" height="30px" shape="circle" />
                        <SkeletonView width="340px" height="30px" />
                    </div>
                    <div v-else class="flex gap-2 items-center">
                        <div class="flex gap-2 w-[20%] lg:w-fit">
                            <img v-if="ticketModalData?.ticket_assign_to?.id.length > 1 && (checkUserType('subadmin') || checkUserType('admin'))" :src="getImg('modal-muti-profile', darkModeVal)" />
                            <img v-else :src="getImg('modal-profile', darkModeVal)" />
                        </div>
                        <p v-if="checkUserType('subadmin') || checkUserType('admin')" class="font-interSemiBold text-[16px]">{{ ticketModalData?.ticket_assign_to?.text }}</p>
                        <p v-else class="font-interSemiBold text-[16px]">Ticket History</p>
                    </div>
                </div>
                <!-- Messages section -->
                <ChatModalMessageSession :darmModeVal="darkModeVal" ref="chatMessageSession" :chatData="chatData" :isLoading="isLoading" :changeLoadingStatus="changeLoadingStatus" :selectedId="ticketModalData.ticket_id" />
                <!-- message Footer section -->
                <div v-if="ticketModalData.ticket_status == 'Open' && (checkAccessRight() ? true : deepCheckAccessRight('domestic', 'support_ticket', 'edit'))" class="sticky bottom-0 bg-[#ffffff] dark:bg-[#313131]">
                    <div class="flex items-center gap-2 py-2 md:py-3 w-full border-t border-[#f1f3f5] dark:border-[#383b40] relative">
                        <div class="absolute left-5 -top-[80px] border p-3 bg-[#f1f3f5] dark:bg-[#383b40] dark:border-[#383b40]" v-if="selectedFile">
                            <template v-if="selectedFile.type === 'application/vnd.ms-excel' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || selectedFile.type === 'text/csv'">
                                <img :src="getImg('preview-excel')" />
                            </template>
                            <template v-else-if="selectedFile.type === 'application/pdf'">
                                <img :src="getImg('preview-pdf')" />
                            </template>
                            <template v-else-if="selectedFile.type === 'application/msword' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'">
                                <img :src="getImg('preview-doc')" />
                            </template>
                            <template v-else-if="selectedFile.type.startsWith('image/')">
                                <img :src="imagePreviewUrl" class="w-[38px] h-[38px] object-contain" />
                            </template>
                            <template v-else-if="selectedFile.type.startsWith('audio/')">
                                <img :src="getImg('music-icon')" />
                            </template>
                            <template v-else-if="selectedFile.type.startsWith('video/')">
                                <img :src="getImg('audio-icon')" />
                            </template>
                            <template v-else>
                                <img :src="getImg('default-file')" />
                            </template>
                            <div class="absolute top-[2px] right-[2px] hover:cursor-pointer">
                                <img :src="getImg('close_icon_mobile', darkModeVal)" @click="selectedFile = null" class="w-[12px]" />
                            </div>
                        </div>
                        <img :src="getImg('modal-attachment', darkModeVal)" @click="triggerFileUpload" class="mx-3 hover:cursor-pointer" />
                        <input type="file" ref="fileInputRef" @change="handleFileUpload" class="hidden" />
                        <input
                            type="text"
                            placeholder="Type your message here..."
                            v-model="currentMessage"
                            :disabled="disableInput"
                            @keypress.enter="sendMessage"
                            ref="messageInput"
                            class="w-full h-[40px] bg-[#F1F3F5] dark:bg-[#4d4d4d] px-4 rounded-[50px]"
                        />
                        <button class="pl-1 pr-4 py-2" @click="sendMessage" :disabled="disableInput">
                            <img :src="getImg('modal-send-message', darkModeVal)" class="mx-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <ConfirmationModal :isVisible="isVisibleConfirmation" @close-confirmation-modal="() => ((isVisibleConfirmation = false), (pendingForVendor = ''), (isCheck.pending_from = false))">
            <template #header>
                <span class="font-interRegular">Marked as <span class="font-interSemiBold">"Pending from Vendor"</span></span>
            </template>
            <template #body>
                <div class="mb-3">Are you sure you want to mark this ticket as 'Pending from Vendor.'?</div>
                <BaseTextarea rows="4" cols="50" v-model="pendingForVendor" placeholder="Remark" class="rounded-[4px] w-full py-4" />
            </template>
            <template #footer>
                <div class="flex justify-end">
                    <BaseButton type="secondary" size="small" name="Cancel" :isLoading="false" @click="() => ((isVisibleConfirmation = false), (isCheck.pending_from = false))" />
                    <BaseButton type="primary" size="medium" name="Submit" :isLoading="pendingFromVendorLoading" @click="confirmPendingFnc" />
                </div>
            </template>
        </ConfirmationModal>
        <ConfirmationModal :isVisible="unactionbleItlConfirmation" @close-confirmation-modal="() => ((unactionbleItlConfirmation = false), (selectedUnactionbleItl = null), (isCheck.unactionble_itl = false))">
            <template #header>
                <span class="font-interRegular">Marked as <span class="font-interSemiBold">"Unactionable from ITL"</span></span>
            </template>
            <template #body>
                <div class="min-h-[38vh] max-w-[50vw]">
                    <!-- <div class="flex gap-4 flex-wrap ">
                        <div v-for="(item, index) in unactionbleItlOptions" :key="index"
                            class="flex gap-2 items-center">
                            <input type="radio" :id="'maximum_attempts_' + index" name="unactionble_itl"
                                :value="item.value" />
                            <label class="text-[12px] hover:cursor-pointer" :for="'maximum_attempts_' + index">
                                {{ item.value }}
                            </label>
                        </div>
                    </div> -->
                    <BaseDropdown @listenDropdownChange="(val) => (selectedUnactionbleItl = val)" filter :options="unactionbleItlOptions" twClasses="w-[100%]" :placeholder="'Select Reason ...'" />
                </div>

                <!-- <BaseTextarea rows="4" cols="50" v-model="pendingForVendor" placeholder="Remark"
                    class="rounded-[4px] w-full py-4" /> -->
            </template>
            <template #footer>
                <div class="flex justify-end">
                    <BaseButton type="secondary" size="small" name="Cancel" :isLoading="false" @click="() => ((unactionbleItlConfirmation = false), (isCheck.unactionble_itl = false))" />
                    <BaseButton type="primary" size="medium" name="Submit" :isLoading="unactionbleItlLoading" @click="confirmUnactionbleItlFnc" />
                </div>
            </template>
        </ConfirmationModal>
    </DialogView>
    <!-- image PreView -->
    <DialogView v-model:visible="imgPreview" :modal="true" :draggable="false" dismissableMask id="imgpreview">
        <button @click="nextImage" class="absolute top-[50%] right-2 z-[9]"><img :src="getImg('filter-next-icon')" /></button>
        <div v-if="imgPreview" class="relative pb-6 px-6 max-h-[570px] h-full">
            
            <div v-if="modalImageSrc.imageSrc.type == 'audio' || modalImageSrc.imageSrc.type == 'video'" class="w-[30vw] h-[20vh] flex justify-center items-center">
                <audio controls v-if="modalImageSrc.imageSrc.type === 'audio'">
                    <source :src="modalImageSrc.imageSrc.file" type="audio/mpeg" />
                </audio>
                <video :src="modalImageSrc.imageSrc.file" controls v-else></video>
            </div>
            <img v-else :src="modalImageSrc.imageSrc.file" class="w-[40vw] object-contain hover:cursor-pointer" alt="Image Preview" />
            
        </div>
        <button @click="prevImage" class="absolute top-[50%] left-2 z-[9]">
            <img :src="getImg('filter-prev-icon')" />
        </button>
    </DialogView>
</template>

<style lang="scss">
@import '../../../../../assets/itl-common-css/common-css.scss';

.chat-ticket-multiselect {
    .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-focus {
        border-color: #1579ff !important;
        box-shadow: none !important;
    }
}

#chat-ticket-modal {
    .left-containter {
        @media screen and (max-width: 380px) {
            max-height: 60vh !important;
        }
    }

    font-family: $interRegular !important;

    .dp__input_icon_pad {
        padding: 6px 25px;
    }

    .dp--menu-wrapper {
        left: -110px !important;

        @media screen and (max-width: 767px) {
            left: 0px !important;
        }
    }

    .dp__input_icons {
        padding: 0px !important;
        left: 8px !important;
    }

    .dp__clear_icon {
        display: none !important;
        // right: 8px !important;
    }

    .danger {
        background-color: #ee596b;
        border: 1px solid #e13a4e;
        color: #fff;
    }

    .success {
        background-color: #25b81f;
        border: 1px solid #0f9409;
        color: #fff;
    }

    .tk_status_brown {
        background-color: #ffedb1;
        color: #b6684b;
    }

    .tk_status_red {
        background-color: #ffece1;
        color: #e35f18;
    }

    .tk_status_green {
        background-color: #e6f8ef;
        color: #0f9409;
    }

    .tk_status_purple {
        background-color: #ffedf7;
        color: #bc3285;
    }

    #imgpreview {
        .p-icon {
            width: 16px !important;
            height: 16px !important;
        }

        .p-dialog-header {
            display: none;
        }
    }

    .p-dialog-header {
        @media screen and (max-width: 767px) {
            padding-bottom: 0px !important;
        }
    }

    .p-dialog-header-icon:hover {
        background-color: transparent !important;
    }

    .p-dialog-header-icon:focus {
        box-shadow: none !important;
    }

    .p-dialog-header-icons {
        position: absolute;
        width: 16px;

        @media screen and (max-width: 767px) {
            .p-dialog-header-icon {
                top: -55px !important;
            }
        }
    }

    .p-dialog-content {
        padding: 0px !important;

        @media screen and (max-width: 767px) {
            overflow: hidden !important;
            height: 100% !important;
        }
    }

    .details-div-outer {
        margin-bottom: 8px;

        :last-child {
            margin-bottom: 0;
        }

        .details-heading {
            @media (min-width: 768px) {
                min-width: 130px;
                padding-right: 16px;
            }
        }
    }

    .p-multiselect .p-multiselect-label {
        padding: 0.45rem 0.65rem;
    }

    .p-multiselect {
        background: transparent;
        border: 1px solid #e9ecef;
        border-radius: 5px;
        @apply dark:border-[#383b40];
    }

    .p-multiselect:not(.p-disabled).p-focus {
        box-shadow: none;
    }
}

.chat-ticket-multiselect {
    svg {
        width: 12px !important;
        height: 12px !important;
    }
}

.chat-ticket-modal {
    .p-multiselect-panel .p-multiselect-header .p-multiselect-filter-container .p-multiselect-filter-icon {
        left: 0.75rem !important;
        right: 0 !important;
    }

    .p-multiselect-panel .p-multiselect-items {
        padding: 0px !important;
    }

    .p-multiselect-items-wrapper {
        border-radius: 8px;
    }

    .p-checkbox .p-checkbox-box {
        width: 18px;
        height: 18px;
    }

    .p-multiselect-panel .p-multiselect-items .p-multiselect-item {
        padding: 0.75rem 0.65rem;
        height: auto !important;
    }

    .darkTheme .p-multiselect-panel .p-multiselect-items .p-multiselect-item:not(.p-highlight):not(.p-disabled).p-focus {
        background-color: transparent !important;
    }

    .darkTheme .p-multiselect-panel .p-multiselect-items .p-multiselect-item:not(.p-highlight):not(.p-disabled):hover {
        background-color: #5d5d5d !important;
    }

    .p-multiselect-panel .p-multiselect-items .p-multiselect-item {
        font-size: 12px !important;
    }

    .p-multiselect-panel {
        max-width: 158px !important;
    }

    .p-multiselect-close {
        display: none !important;
    }

    .p-inputtext {
        padding: 2px 2px;
        padding-right: 0.75rem !important;
        padding-left: 32px !important;
        border-radius: 4px;
        display: flex;
        // flex-direction: row-reverse;
    }

    .p-multiselect-panel .p-multiselect-header {
        padding: 10px 10px;
        border-bottom: 1px solid #d4d6d9;
        color: #343a40;
        background: #fcfcfc;
        margin: 0;
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
    }

    .p-icon {
        width: 16px !important;
        height: 16px !important;
    }

    .p-inputtext:enabled:hover {
        border: 1px solid #d4d6d9;
    }
}

// for the filter input height
.base-dropdown .p-dropdown .p-inputtext {
    height: 40px !important;
}

.base-dropdown .p-dropdown-filter-container .p-dropdown-filter {
    padding-left: 32px !important;
    padding-right: 20px !important;
}
</style>
