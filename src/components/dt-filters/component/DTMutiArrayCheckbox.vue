<template>
    <!-- <div class="flex gap-2">
        <div class="w-[235px] md:w-[246px] flex flex-col gap-2 px-[13px] py-[8px] border border-transparent"
            v-for="(item, index) in id.values" :key="index" :id="getClassName(item.heading)">
            <div class="flex text-[#656f7d] dark:text-[#dfdfdf] text-[12px] font-[600] uppercase ">
                {{ item.heading }}
            </div>
            <div class="flex gap-2" v-for="(checkboxs, subIndex) in item.checkboxArray" :key="subIndex">
                <input type="checkbox" class="checkbox" :id="'checkbox-' + index + '-' + subIndex"
                    v-model="checkboxData[id.field][checkboxs.id + ',' + checkboxs.value + ',' + index + '-' + item.heading]"
                    :value="checkboxs.id + ',' + checkboxs.value + ',' + index + '-' + item.heading">
                <label class="label hover:cursor-pointer" :for="'checkbox-' + index + '-' + subIndex">
                    {{ checkboxs.value }}
                </label>
            </div>
        </div>
    </div> -->
    <div class="flex gap-2">
        <div class="w-[235px] md:w-[246px] flex flex-col gap-2 px-[13px] py-[8px] border border-transparent" v-for="(item, index) in groupCheckboxData" :key="index" :id="getClassName(item.heading)">
            <div class="flex text-[#656f7d] dark:text-[#dfdfdf] text-[12px] font-[600] uppercase">
                {{ item.heading }}
            </div>
            <div class="flex gap-2" v-for="(checkbox, subIndex) in item.checkboxArray" :key="subIndex">
                <input type="checkbox" class="checkbox" :id="'checkbox-' + index + '-' + subIndex" v-model="checkbox.checked" :value="checkbox.id + ',' + checkbox.value" @change="tempGroupCheckbox(getGroupFilterName(item.heading), checkbox)" />
                <label class="label hover:cursor-pointer" :for="'checkbox-' + index + '-' + subIndex">
                    {{ checkbox.value }}
                </label>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, defineEmits, onMounted, watch } from 'vue';
const buyer_intent = ref({});
const groupCheckboxData = ref([]);
const checkboxData = defineModel();
const emit = defineEmits(['getGroupCheckboxData']);
const { id } = defineProps(['id']);
onMounted(() => {
    buyer_intent.value = checkboxData.value;
    groupCheckboxData.value = id.values.map((group) => ({
        ...group,
        checkboxArray: group.checkboxArray.map((checkbox) => ({
            ...checkbox,
            checked: isChecked(getGroupFilterName(group.heading), checkbox, buyer_intent.value),
        })),
    }));
});
watch(
    () => checkboxData.value,
    (value) => {
        console.log('watch running');
        buyer_intent.value = value;
        groupCheckboxData.value = id.values.map((group) => ({
            ...group,
            checkboxArray: group.checkboxArray.map((checkbox) => ({
                ...checkbox,
                checked: isChecked(getGroupFilterName(group.heading), checkbox, buyer_intent.value),
            })),
        }));
    }
);
const isChecked = (heading, checkbox, values) => heading && values[heading] && values[heading].includes(`${checkbox.id},${checkbox.value}`);

const getClassName = (heading) => {
    return heading.toLowerCase().replace(/\s/g, '-');
};
const getGroupFilterName = (heading) => {
    return heading.toLowerCase().replace(/\s/g, '_');
};
const tempGroupCheckbox = (heading, checkbox) => {
    if (!buyer_intent.value[heading]) {
        buyer_intent.value[heading] = [];
    }
    const checkboxValue = `${checkbox.id},${checkbox.value}`;
    if (checkbox.checked) {
        if (!buyer_intent.value[heading].includes(checkboxValue)) {
            buyer_intent.value[heading].push(checkboxValue);
        }
    } else {
        const index = buyer_intent.value[heading].indexOf(checkboxValue);
        if (index > -1) {
            buyer_intent.value[heading].splice(index, 1);
        }
    }
    emit('getGroupCheckboxData', buyer_intent.value, id.field);
};
</script>

<style lang="scss">
@import '../../../assets/itl-common-css/common-css.scss';

.checkbox {
    width: 16px;
    height: 16px;
}

.label {
    font-size: 13px;
}

.active-filterType-9 {
    border: 1px solid #cde2fd !important;
    border-radius: 4px;
    margin-bottom: 10px;
}
</style>
