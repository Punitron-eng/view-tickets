<template>
    <div class="flex flex-wrap gap-2 items-center custom-radio-outer">
        <div v-for="(index, k) in id.values" :key="k" class="lg:w-[246px] w-[140px] flex gap-3">
            <input type="radio" :id="index.id + '_' + id.field" :value="index.value" v-model="model[id.field]"
                name="items" />
            <label :for="index.id + '_' + id.field" class="hover:cursor-pointer">{{ index.value }}</label>
        </div>
    </div>
</template>

<script setup>
import { defineModel } from 'vue';
const model = defineModel();
const { id } = defineProps(['id']);
</script>

<style lang="scss">
#filter-modal{
    // .custom-radio-outer{
    //     [type="radio"]:checked,
    //     [type="radio"]:not(:checked) {
    //         position: absolute;
    //         left: -9999px;
    //     }
    //     [type="radio"]:checked + label,
    //     [type="radio"]:not(:checked) + label
    //     {
    //         position: relative;
    //         padding-left: 28px;
    //         cursor: pointer;
    //         line-height: 20px;
    //         display: inline-block;
    //         color: #666;
    //     }
    //     [type="radio"]:checked + label:before,
    //     [type="radio"]:not(:checked) + label:before {
    //         content: '';
    //         position: absolute;
    //         left: 0;
    //         top: 0;
    //         width: 16px;
    //         height: 16px;
    //         border: 1px solid #8e929b;
    //         border-radius: 100%;
    //         background: #fff;
    //     }
    //     [type="radio"]:checked + label:before{
    //         border: 1px solid #0168ed;
    //     }
    //     [type="radio"]:checked + label:after,
    //     [type="radio"]:not(:checked) + label:after {
    //         content: "";
    //         width: 11px;
    //         height: 11px;
    //         background: #0168ed;
    //         position: absolute;
    //         top: 2.5px;
    //         left: 2.5px;
    //         border-radius: 100%;
    //         transition: all 0.2s ease;
    //     }
    //     [type="radio"]:not(:checked) + label:after {
    //         opacity: 0;
    //         -webkit-transform: scale(0);
    //         transform: scale(0);
    //     }
    //     [type="radio"]:checked + label:after {
    //         opacity: 1;
    //         -webkit-transform: scale(0.9);
    //         transform: scale(0.9);
    //     }
    // }
}

</style>