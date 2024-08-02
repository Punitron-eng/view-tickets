# SwitchComponent

SwitchComponent is a reusable Vue 3 component for toggling between different states (e.g., tabs). It allows you to display a list of items and toggle their active state by clicking on them. The active state of an item is indicated by a visual style change.

![alt text](https://snipboard.io/QPe8O9.jpg)

## Props

**switchData**

-   **Type**: Array
-   **Required**: true
-   **Description**: An array of objects representing the items to be toggled. Each object should have a label (string) and isActive (boolean) property.
    Example:

```
[
  { label: 'Summary', isActive: true },
  { label: 'Chat', isActive: false }
]
```

## Events

**update:switchData**

-   **Type**: Array
-   **Description**: Emitted when an item is clicked. The event carries the updated switchData array.

## Usage

### Example

#### ParentComponent.vue

```
<script setup>
import { ref } from 'vue';
import SwitchComponent from './SwitchComponent.vue';

const switchData = ref([
  { label: 'Summary', isActive: true },
  { label: 'Chat', isActive: false }
]);

const updateSwitchData = (newData) => {
  switchData.value = newData;
};
</script>

<template>
  <SwitchComponent :switchData="switchData" @update:switchData="updateSwitchData" />
</template>
```

#### SwitchComponent.vue

```
<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['switchData']);
const emit = defineEmits(['update:switchData']);

const handleClick = (event) => {
  const isActiveValue = event.target.textContent.trim();
  // Emit an event to the parent component with the updated data
  const updatedData = props.switchData.map(item => ({
    ...item,
    isActive: item.label === isActiveValue
  }));
  emit('update:switchData', updatedData);
};
</script>

<template>
  <div class="flex justify-between items-center">
    <button @click="handleClick($event)" class="capitalize" v-for="ele in switchData" :key="ele.label"
            :class="ele.isActive ? 'mb-[0px] font-interSemiBold' : 'mb-[5px]'">
      {{ ele.label }}
      <div class="h-[5px] w-full bg-itl-primary rounded-t-itl-sm" :class="ele.isActive ? 'block' : 'hidden'" />
    </button>
  </div>
</template>
```
