# CheckBoxComponent

`CheckBoxComponent` is a Vue 3 component written in TypeScript. It provides a customizable checkbox with support for disabling and handling checkbox state changes.

## Preview

![alt text](https://snipboard.io/B6vAO4.jpg)

## Props

`disabled`

-   **Type**: `Boolean`
-   **Required**: `false`
-   **Description**: Determines if the checkbox is disabled.

`data`

-   **Type**: `Object`
-   **Required**: `true`
-   **Description**: An object representing the checkbox data, which includes id (number), value (string), and is_checked (boolean).

```
{
    id: 1,
    value: 'Accept Terms and Conditions',
    is_checked: false
}
```

## Events

`listenCheckboxChange`

-   **Type**: `CheckBox`
-   **Default**: `'Submit'`
-   **Description**: Emitted when the checkbox state changes. The event carries the updated CheckBox object.

## Usage

-   Import the Component: Import CheckBoxComponent into the parent component where you want to use it.

-   Pass the Props: Pass the desired props to CheckBoxComponent.

-   Listen for Events: Listen for the listenCheckboxChange event to handle checkbox state changes.

### Example

#### ParentComponent.vue

```
<script setup lang="ts">
import { ref } from 'vue';
import CheckBoxComponent from './components/CheckBoxComponent.vue';

interface CheckBox {
    id: number,
    value: string,
    is_checked: boolean
}

const checkBoxData = ref<CheckBox>({
    id: 1,
    value: 'Accept Terms and Conditions',
    is_checked: false
});

const handleCheckboxChange = (val: CheckBox) => {
    checkBoxData.value = val;
    console.log('Checkbox changed:', val);
};
</script>

<template>
  <div>
    <CheckBoxComponent :data="checkBoxData" @listenCheckboxChange="handleCheckboxChange" />
  </div>
</template>


```

#### CheckBoxComponent.vue

```
<script setup lang="ts">
import { computed, ref } from 'vue';

interface CheckBox {
    id: number,
    value: string,
    is_checked: boolean
}

const emits = defineEmits<{
    listenCheckboxChange: [val: CheckBox]
}>();

const props = defineProps({
    disabled: { type: Boolean, required: false },
    data: { type: Object as () => CheckBox, required: true }
});

const checkBoxValue = ref<CheckBox>(props?.data || null);

const generateIdAndForHTML = computed(() => {
    let temp = (checkBoxValue.value.id + checkBoxValue.value.value).toLowerCase();
    return temp;
});
</script>

<template>
    <div class="flex items-center gap-2">
        <input :disabled="props.disabled" v-model="checkBoxValue.value.is_checked" :id="generateIdAndForHTML" type="checkbox"
            @change="() => $emit('listenCheckboxChange', checkBoxValue.value)" />
        <label :class="props.disabled ? 'text-[#8b8a8a] dark:text-[#8b8a8a]' : ''"
            class="text-[13px] text-[#1d252b] dark:text-[#dfdfdf]" :for="generateIdAndForHTML">{{ checkBoxValue.value.value }}</label>
    </div>
</template>

<style scoped>
input[type=checkbox] {
    width: 16px;
    height: 16px;
}
</style>

```
