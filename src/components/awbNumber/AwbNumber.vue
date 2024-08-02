<script setup>
const { logisticLogo, logisticNumber } = defineProps(['logisticLogo', 'logisticNumber'])
const getLogisticIcon = (logisticLogo) => {
    const imagePath = new URL(`@/assets/images/logistics/${logisticLogo}.svg`, import.meta.url).href;
    const logisticLogoPath = imagePath.split('/');
    const logisticLogoLastPart = logisticLogoPath[logisticLogoPath.length - 1];
    if (logisticLogoLastPart == 'undefined') {
        const defaultImagePath = new URL(`@/assets/images/default_logics_2.svg`, import.meta.url).href;
        return defaultImagePath;
    } else {
        return imagePath;
    }
};
</script>
<template>
    <div class="flex font-interRegular text-light-800 items-center mr-[8px] text-[12px] leading-[16px] font-normal"
        v-if="logisticNumber !== ''">
        <img :src="getLogisticIcon(logisticLogo || 'undefined')" class="mr-[8px] w-[24px]" />
        AWB:
        <p class="font-interSemiBold text-[12px] leading-[16px] mx-[4px]">
            {{ logisticNumber }}
        </p>
    </div>
</template>