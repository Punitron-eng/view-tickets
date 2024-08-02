<script setup>
import { ref, computed, watch, onMounted , onBeforeUnmount} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import config from '@/util/config';
import { BULKPRINTSHIPMENT } from '../../store/bulk-print-Shipment/constants';
// const topHeader = JSON.parse(localStorage.getItem('top_header'));
import { useToast } from 'primevue/usetoast';

// Destructure the setup return values
const toast = useToast();
const router = useRouter();
const route = useRoute();
const store = useStore();


// refs use
const checked = ref('0');
const count = ref(0);
const selectedRadio = ref('0');
const textareaContent = ref('');
const lineNumbers = ref([]);
const isSubmitted = ref(false);

// radio option selected
const radioOptions = [
    { name: 'Order ID', value: '0', placeholder: 'Search by Order IDs. Multiple Order IDs should be entered separately' },
    { name: 'Tracking (AWB) Number', value: '1', placeholder: 'Search by waybill numbers. Multiple waybill numbers should be entered separately' },
];

// Coumputed property used for dyamic change headingtext
const headingText = computed(() => {
    if (route.name === 'bulkprintManifest/2') return 'Label';
    if (route.name === 'bulkprintManifest/3') return 'Invoice';
    return 'Manifest';
});

// coumpoted property used for dynamic change number
const numberChange = computed(() => {
    if (route.name === 'bulkprintManifest/2') return '250';
    if (route.name === 'bulkprintManifest/3') return '250';
    return '500';
})
// coumputed property used for dynamic change placeholders
const textareaPlaceholder = computed(() => {
    const selectedOption = radioOptions.find(option => option.value === checked.value);
    return selectedOption ? selectedOption.placeholder : '';
});

// computed property for displaying the total count based on the selected radio button
const awbCountText = computed(() => {
    return checked.value === '0' ? `Total Order Id: ${count.value}` : `Total AWB: ${count.value}`;
});

// coumputed property to determine if the submit button should be disabled
const isDisabled = computed(() => isSubmitted.value && !textareaContent.value);

// Method to get the form shipment type based on the current route
const getFormShipment = () => {
    if (route.name === 'bulkprintManifest/2') return 2;
    if (route.name === 'bulkprintManifest/3') return 3;
    return 1;
};

// Method to update line numbers when the textarea content changes
const updateLineNumbers = () => {
    const lines = textareaContent.value.split('\n');
    lineNumbers.value = lines.map((line, index) => ({
        value: line.trim() === '' ? 0 : index + 1,
    }));
    count.value = lineNumbers.value.filter(line => line.value !== 0).length;
};

// Watch for changes in the selected radio button
watch(() => checked.value, (newVal) => {
    const selectedOption = radioOptions.find(option => option.value === newVal);
    if (selectedOption) {
        selectedRadio.value = newVal;
        textareaContent.value = '';
        updateLineNumbers();
    }
});

// Watch for changes in the textarea content
watch(() => textareaContent.value, updateLineNumbers);

// Runs after the component is mounted
onMounted(() => {
    updateLineNumbers();
});

onMounted(async () => {
    document.body.classList.add('bulk-print-outer');
   
});
onBeforeUnmount(() => {
    document.body.classList.remove('bulk-print-outer');
});

// Method to submit the form data
const submitForm = async () => {
  
    isSubmitted.value = true;
    if (!textareaContent.value) {
        toast.add({ severity: 'error',  summary: checkStatus.html_message, life: 1000 });
        return;
    }
    const data = {
        printOption: 1,
        textContent: textareaContent.value,
        fromShipment: getFormShipment(),
    };

    await store.dispatch(`${BULKPRINTSHIPMENT.NAME}/getbulkprintshipmentData`, data);
    const checkStatus = store.getters[`${BULKPRINTSHIPMENT.NAME}/sendbulkprintshipmentData`];

    if (checkStatus.status === 'success') {
        toast.add({ severity: 'success', summary: 'Request Generated' , life:1000});

        setTimeout(() => {
            window.open(config.baseUrlPanel + 'view-bg-process-v3', '_blank');
        }, 1000);

    } else {
        toast.add({ severity: 'error', summary: checkStatus.html_message, life: 1000 });
    }

    // if (!textareaContent.value) {
    //     // Show validation error if textarea is empty
    //     // ('This value is required');
    //     return;
    // }
};
</script>
<template>
<div class="bluk-print-manifest">
    <ToastView />
    <form @submit.prevent="submitForm">

        <div class="form-content">

            <div class="panel-heading panel-heading_title ">
                Bulk Print Shipment {{ headingText }}
            </div>
        </div>

        <!-- ===========Panel start=== -->
        <div class="panel-default">
            <div class="form-group flex flex-wrap gap-3">
                <div class="flex align-items-center" v-for="item in radioOptions" :key="item.value">
                    <input type="radio" v-model="checked" :id="item.value" name="orderType" :value="item.value" class="custom-radio-gray custom-radio" />
                    <label :for="item.value" class="ml-2">{{ item.name }}</label>
                </div>
            </div>

            <!-- =================AWB number div===== -->
            <div class="form-group">
                <div class="form-group">
                    <label class="form-group-label ">
                        AWB number (Input AWB numbers separated with enter key):
                        <span class="text-denger">*</span>
                    </label>
                </div>

                <!-- =========text area======= -->

                <textarea v-model.trim="textareaContent" class="form-control-textarea inter-regular" :placeholder="textareaPlaceholder"></textarea>

                <p v-if="isSubmitted && !textareaContent" class="validation-error">
                    This value is required.
                </p>

            </div>

            <!-- ================outer-div==================== -->
            <div class="flex-div flex-outer-div">
                <div class="count-div inter-regular">
                    {{ awbCountText }}
                </div>
                <div class="text-div ml-auto inter-regular">
                    Only {{ numberChange }} AWB for the shipment is allowed.
                </div>
            </div>
            <!-- ================button====== -->
            <div class="text-left inter-medium ">
                <button type="submit" class="btn-style" :disabled="isDisabled">Submit</button>
            </div>
        </div>
    </form>
</div>
</template>

<style lang="scss">
@import './bulkprintManifest.scss';

.bulk-print-outer .p-toast {
    z-index: 100;
}

</style>
