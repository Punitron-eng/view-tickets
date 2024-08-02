<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BaseToggle from '../../components/base/BaseToggle.vue';
import BaseDropdownVue from '../../components/base/BaseDropdown.vue';

const test = ref<boolean>(false);

const options = ref<Array<object>>([
    {
        id: 1,
        value: false,
    },
    {
        id: 2,
        value: true,
    },
    {
        id: 3,
        value: true,
    },
]);

// import { useEmitter } from '@nguyenshort/vue3-mitt'

// const emitter = useEmitter<{
//     listenToggleChange: boolean
// }>();

onMounted(() => {
    // emitter.on('listenToggleChange', (val: boolean) =>{
    //     test.value = val;
    //     console.log(val)
    // });
});
</script>

<template>
    <button class="bg-red-200">{{ options }}</button>
    <!-- <BaseToggle :value="test" @listenToggleChange="(val: boolean) => test = val" /> -->

    <div v-for="(toggle, i) in options">
        <BaseToggle v-model="toggle.value" @listenToggleChange="(val: boolean) => toggle.value = val" />
    </div>

    <BaseDropdownVue :defaultValue="2" :options="options" placeholder="Select Dropdown" />
</template>

<style scoped></style>
