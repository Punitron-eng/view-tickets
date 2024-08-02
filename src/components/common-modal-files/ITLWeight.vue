<script setup>
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { RETURN } from '@/store/domestic/return-flow/constants';
import { useEmitter } from '@nguyenshort/vue3-mitt';
import { defineProps, ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
const emitter = useEmitter();
const store = useStore();
const toast = useToast();
const route = useRoute();
const { weightData, rowId, haveAccessParcel, weightUpdateAvail } = defineProps(['weightData', 'rowId', 'haveAccessParcel', 'weightUpdateAvail']);
const isLoading = ref(false);
const newState = ref({
    length: '',
    width: '',
    height: '',
    volumetric: '',
    weight: '',
});
onMounted(() => {
    emitter.on('isloading', (data) => {
        isLoading.value = data;
    });
    newState.value.length = weightData?.length || '';
    newState.value.width = weightData?.breadth || '';
    newState.value.height = weightData?.height || '';
    newState.value.volumetric = weightData?.volume_kg || '';
    newState.value.weight = weightData?.entered_kg || '';
});

// watch(() => weightData, () => {
//     console.log('WEIGHT', weightData)
// })
const SubmitApi = async () => {
    isLoading.value = true;
    try {
        const payload = {
            row_id: rowId,
            tab_name: 'rev_return_request',
            module_name: 'reverse_order',
            ...newState.value,
        };
        emitter.emit('updateWeightData', payload);
    } catch (error) {
        console.error('Error in updating Data :', error);
        isLoading.value = false;
        toast.add({ severity: 'error', detail: error.message || 'An error occurred, please try again later.', life: 3000 });
    }
};

const updateValue = (key, value) => {
    const regex = /^\d{0,3}(\.\d{0,2})?$/;
    if (!regex.test(value)) {
        newState.value[key] = value.slice(0, -1);
    }
    // newState.value[key] = value;
    const newResult = (Number(newState.value.length) * Number(newState.value.width) * Number(newState.value.height)) / 5000;
    newState.value.volumetric = parseFloat(newResult).toFixed(2);
};
const handlePaste = (event, field) => {
    event.preventDefault();
    const pastedText = (event.clipboardData || window.clipboardData).getData('text');
    // Round the pasted value to one decimal place
    newState.value[field] = parseFloat(pastedText).toFixed(1);
    // Trigger the isFloat function to perform further processing
    updateValue(field, newState.value[field]);
};
</script>

<template>
    <div class="weight-box border-b-[1px] dark:border-[#545454] border-[#d3cfcf]">
        <h6 class="helvetica-medium gray-800">Weight</h6>
        <div class="weight-size">
            <div class="length weight-width" :class="weightUpdateAvail && haveAccessParcel ? '' : 'pointer-events-none'">
                <label class="helvetica-regular gray-500">Length</label>
                <input
                    type="number"
                    class="form-control"
                    v-model="newState['length']"
                    :class="weightUpdateAvail && haveAccessParcel ? '!bg-[#fff] dark:!bg-[#6d6d6d]' : ''"
                    @input="updateValue('length', $event.target.value)"
                    @paste="handlePaste($event, 'length')"
                />
            </div>
            <div class="breadth weight-width" :class="weightUpdateAvail && haveAccessParcel ? '' : 'pointer-events-none'">
                <label class="helvetica-regular gray-500">Width</label>
                <input
                    type="number"
                    class="form-control"
                    v-model="newState.width"
                    :class="weightUpdateAvail && haveAccessParcel ? '!bg-[#fff] dark:!bg-[#6d6d6d]' : ''"
                    @input="updateValue('width', $event.target.value)"
                    @paste="handlePaste($event, 'width')"
                />
            </div>
            <div class="height weight-width" :class="weightUpdateAvail && haveAccessParcel ? '' : 'pointer-events-none'">
                <label class="helvetica-regular gray-500">Height</label>
                <input
                    type="number"
                    class="form-control"
                    v-model="newState.height"
                    :class="weightUpdateAvail && haveAccessParcel ? '!bg-[#fff] dark:!bg-[#6d6d6d]' : ''"
                    @input="updateValue('height', $event.target.value)"
                    @paste="handlePaste($event, 'height')"
                />
            </div>
        </div>
        <div class="volumn-entered-kg">
            <div class="vloumn-size pointer-events-none">
                <label class="helvetica-regular gray-500">Volume (KG)</label>
                <input type="number" class="form-control gray-500 w-100" :value="newState.volumetric" />
            </div>
            <div class="entered-size" :class="weightUpdateAvail ? '' && haveAccessParcel : 'pointer-events-none'">
                <label class="helvetica-regular gray-500">Entered (KG)</label>
                <input
                    type="number"
                    class="form-control gray-500 w-100"
                    v-model="newState.weight"
                    :class="weightUpdateAvail && haveAccessParcel ? '!bg-[#fff] dark:!bg-[#6d6d6d]' : ''"
                    @input="updateValue('weight', $event.target.value)"
                    @paste="handlePaste($event, 'weight')"
                />
            </div>
        </div>
    </div>
    <!-- v-if="route.params.tabs =='rev-return-request'" -->
    <div v-if="weightUpdateAvail && haveAccessParcel" class="flex justify-end p-3 items-start">
        <button @click="SubmitApi" :disabled="isLoading" class="bg-[#0052CC] px-2 w-[72px] text-[#fff] text-center h-[28px] rounded-[50px]">
            <div v-if="isLoading"><i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i></div>
            <span v-else> Update </span>
        </button>
    </div>
</template>

<style lang="scss" scoped>
@import '../../assets/itl-common-css/common-css.scss';

.weight-box {
    padding: 8px;
    // pointer-events: none;

    .weight-size {
        display: flex;
        justify-content: space-around;

        .length,
        .breadth {
            margin-right: 8px;
        }
    }

    .volumn-entered-kg {
        display: flex;
        margin-top: 14px;
        margin-bottom: 8px;
        justify-content: space-around;

        .vloumn-size {
            pointer-events: none;
            width: 100px;
            // margin-right: 8px;
        }

        .entered-size {
            width: 100px;
        }
    }

    label {
        display: inline-block;
        margin-bottom: 0.5rem;
    }

    .w-100 {
        width: 100% !important;
    }

    .form-control {
        display: block;
        border-color: #d1d5db;
        height: 32px;
        width: 56px;
        border-radius: 4px;
        font-size: 13px;

        @include theme() {
            background-color: theme-get('input-background');
            border: solid 1px theme-get('cancel-button-border');
            color: theme-get('input-text-clr');
        }

        background-clip: border-box;
        padding: 0.4375rem 0.875rem;
        font-weight: 400;
        line-height: 1.5385;
        outline: 0;
        margin: 0;
        font-family: inherit;
    }
}
</style>
