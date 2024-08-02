# BaseInput

`BaseInput` is a reusable Vue 3 component for creating customizable input fields. It supports various input types, custom styling, and other common input attributes.

## Preview

![alt text](https://snipboard.io/B6vAO4.jpg)

## Props

`inputType`

-   **Type**: `String`
-   **Required**: `true`
-   **Description**: The type of the input field (e.g., 'text', 'password', 'email').

`id`

-   **Type**: `String`
-   **Required**: `true`
-   **Description**: The id attribute for the input field.

`twClasses`

-   **Type**: `String`
-   **Required**: `true`
-   **Description**: Tailwind CSS classes for additional styling.

`placeholder`

-   **Type**: `String`
-   **Required**: `true`
-   **Description**: The placeholder text for the input field.

`maxLength`

-   **Type**: `String`
-   **Required**: `true`
-   **Description**: The maximum number of characters allowed in the input field.

## Usage

-   Import the Component: Import BaseInput into the parent component where you want to use it.

-   Pass the Props: Pass the desired props to BaseInput.

### Example

#### ParentComponent.vue

```
<script setup>
import { ref } from 'vue';
import BaseInput from './components/BaseInput.vue';

const inputModel = ref('');

</script>

<template>
  <div>
    <BaseInput
      inputType="text"
      id="example-input"
      twClasses="custom-tw-class"
      placeholder="Enter your text"
      :maxLength="50"
      v-model="inputModel"
    />
  </div>
</template>

```

#### BaseInput.vue

```
<template>
  <input
    :type="inputType"
    :id="id"
    :class="twClasses"
    :placeholder="placeholder"
    v-model="commonModel"
    :maxlength="maxLength"
    class="base-input px-3 py-2 border rounded dark:bg-transparent leading-5"
  />
</template>

<script setup>
  import { defineProps, defineModel } from 'vue';

  const { inputType, id, twClasses, placeholder, maxLength } = defineProps(['inputType', 'id', 'twClasses', 'placeholder', 'maxLength']);
  const commonModel = defineModel();
</script>

<style lang="scss" scoped>
@import '../../assets/itl-common-css/common-css.scss';

.base-input {
  height: 32px;

  @include theme() {
    border-color: theme-get('border-black-500');
  }
}
</style>


```
