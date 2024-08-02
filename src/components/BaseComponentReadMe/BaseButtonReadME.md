# BaseButton

`BaseButton` is a reusable Vue 3 component that provides a customizable button with support for different types, sizes, and loading states.

![alt text](https://snipboard.io/V4qUXR.jpg)

## Props

`type`

-   **Type**: `String`
-   **Default**: `primary`
-   **Validator**: Must be one of 'primary', 'secondary', 'danger'
-   **Description**: Specifies the button type, which determines the button's styling.

`size`

-   **Type**: `String`
-   **Default**: `medium`
-   **Validator**: Must be one of 'small', 'medium', 'big'
-   **Description**: Specifies the button type, which determines the button's styling.

`name`

-   **Type**: `String`
-   **Default**: `'Submit'`
-   **Description**: The text to be displayed inside the button.

`isLoading`

-   **Type**: `Boolean`
-   **Default**: `'false'`
-   **Description**: Indicates whether the button is in a loading state.

## Usage

-   Import the Component: Import BaseButton into the parent component where you want to use it.

-   Pass the Props: Pass the desired props to BaseButton.

### Example

#### ParentComponent.vue

```
<script setup>
import BaseButton from './components/BaseButton.vue';
</script>

<template>
  <div>
    <BaseButton type="primary" size="medium" name="Submit" :isLoading="false" />
    <BaseButton type="secondary" size="small" name="Cancel" :isLoading="true" />
  </div>
</template>

```

#### BaseButton.vue

```
<template>
  <button :class="buttonClasses" :name="name" :disabled="props.isLoading">
    <div class="flex items-center justify-center" v-if="props.isLoading">
      <i class="pi pi-spin pi-spinner loading-icon" aria-hidden="true"></i>
    </div>
    <div v-else>{{ name }}</div>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: value => ['small', 'medium', 'big'].includes(value)
  },
  name: {
    type: String,
    default: 'Submit'
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const buttonClasses = computed(() => {
  return [
    'btn',
    `btn-${props.type}`,
    `btn-${props.size}`
  ];
});
</script>
```
