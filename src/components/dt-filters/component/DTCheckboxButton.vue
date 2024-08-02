<template>
    <div id="status" class="flex flex-wrap gap-2 custom-checkox-outer">
        <div v-for="(index, k) in id.values" :key="k" class="w-[235px] md:w-[246px] flex">
            <input type="checkbox" :id="index.id + '_' + id.field" :value="index.id + ',' + index.value"
                v-model="modalRefs[index.id + ',' + index.value]" class="w-[16px] h-[16px]" :name="index.value" />
            <label :for="index.id + '_' + id.field" class="ml-2 flex gap-1 hover:cursor-pointer">
                <img v-if="id.isIconAvail" :src="getLogisticIcon(index.logistics_logo)" />
                {{ index.value }}</label>
        </div>
    </div>
</template>
<script setup>
const { modalRefs, id } = defineProps(['modalRefs', 'id']);
const getLogisticIcon = (logisticLogo) => {
    const imagePath = new URL(`../../../assets/images/logistics/${logisticLogo}.svg`, import.meta.url).href;
    const logisticLogoPath = imagePath.split('/');
    const logisticLogoLastPart = logisticLogoPath[logisticLogoPath.length - 1];
    if (logisticLogoLastPart == 'undefined') {
        const defaultImagePath = new URL(`../../../assets/images/default_logics_2.svg`, import.meta.url).href;
        return defaultImagePath;
    } else {
        return imagePath;
    }
};
</script>
<style lang="scss">
// #filter-modal{
//     .custom-checkox-outer{
//         input {
//             padding: 0;
//             height: initial;
//             width: initial;
//             margin-bottom: 0;
//             display: none;
//             cursor: pointer;
//             &:checked + label{
//                 &:after {
//                     content: "";
//                     display: block;
//                     position: absolute;
//                     top: 1px;
//                     left: 5.5px;
//                     width: 5.5px;
//                     height: 10px;
//                     border: solid #ffffff;
//                     border-width: 0 2px 2px 0;
//                     transform: rotate(45deg);
//                 }
//                 &:before{
//                     border: solid 1px #0168ed;
//                     background-color: #1279ff;
//                 }
//             }
//         }
//         label{
//             position: relative;
//             cursor: pointer;
//             &:before {
//                 content: '';
//                 -webkit-appearance: none;
//                 background-color: transparent;
//                 border: 1px solid #a3aebb;
//                 box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
//                 width:16px;
//                 height: 16px;
//                 display: inline-block;
//                 position: relative;
//                 vertical-align: middle;
//                 cursor: pointer;
//                 margin-right: 5px;
//                 border-radius: 2px;
//             }
//         }
//     }
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

</style>