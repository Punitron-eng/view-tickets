<script setup lang="ts">
import { ref, reactive } from 'vue';
const domesticInternational = ref('0');
const domesticInternationalOptions = reactive([
    {
        name: 'Domestic',
        value: '0',
        img: 'domestic_new',
    },
    {
        name: 'International',
        value: '1',
        img: 'international_new',
    },
]);
const getImgUrl = (val: string) => {
    return new URL(`../../assets/images/${val}.svg`, import.meta.url).href;
};
const getDeliveryTypeData = async (dataValue: string) => {
    console.log(dataValue);
};
</script>
<template>
    <div class="domestic-intl-section-outer">
        <img alt="store-icon" :src="getImgUrl(domesticInternational == '0' ? 'domestic_new' : 'international_new')" class="img-border-radius dropdown-outer-img" style="width: 18px" />
        <DropdownView v-model="domesticInternational" :options="domesticInternationalOptions" optionLabel="name" optionValue="value" optionImg="img" placeholder="Select an option" class="setting-dropdown">
            <template #value="slotProps">
                <div v-if="value" class="flex align-items-center">
                    <div>
                        {{ slotProps.value.name }}
                    </div>
                </div>
            </template>
            <template #option="slotProps">
                <div class="option-item">
                    <div class="select-options">
                        <img alt="store-icon pl-2" :src="getImgUrl(slotProps.option.img)" class="mr-2 img-border-radius" style="width: 18px" />
                        <div class="option-name " @click="getDeliveryTypeData(slotProps.option.value)">{{ slotProps.option.name }}</div>
                    </div>
                </div>
            </template>
        </DropdownView>
    </div>
</template>
<style lang="scss">
.domestic-intl-section-outer {
    margin-left: auto;
    background: #fff;
    border-radius: 6px !important;
    // box-shadow: 0 1px 6px 0 rgba(187, 224, 238, 0.1) !important;
    // border: solid 1px rgba(255, 255, 255, 0.7);
    position: relative;
    margin-bottom: 8px;
    .dropdown-outer-img {
        position: absolute;
        z-index: 98;
        top: 8px;
        left: 8px;
    }
    .p-dropdown {
        width: 140px;
        border-radius: 6px !important;
        // box-shadow: 0 1px 6px 0 rgba(187, 224, 238, 0.1) !important;
        // border: solid 1px rgba(255, 255, 255, 0.7);
        &:not(.p-disabled):hover {
            border-color: transparent !important;
        }
        &:not(.p-disabled).p-focus {
            border-color: transparent !important;
            box-shadow: none !important;
        }
        &:focus-visible {
            outline: none !important;
        }
    }
    .p-dropdown .p-inputtext {
        padding: 0.5rem 0px 0.5rem 1.2rem !important;
        font-size: 0.9rem;

        margin-left: 15px !important;
        // color: #000 !important;
        font-family: 'HelveticaNowText-Regular';
        span {
            font-size: 0.9rem;
            color: #000 !important;
            font-family: 'HelveticaNowText-Regular';
            margin: 0;
            padding: 0 !important;
        }
    }

    .drop-label {
        margin-left: 13px;
    }
    .p-dropdown:not(.p-disabled).p-focus {
        box-shadow: none;
    }
    .p-dropdown-panel .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled):hover {
        background: none;
    }
}
.p-dropdown-items-wrapper {
    height: auto !important;
    max-height: max-content !important;
}
.dropdown-panel-options-parent {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .check-sign {
        width: 13px;
        height: 13px;
    }
}
.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
 
    background: none !important;
    font-family: 'HelveticaNowText-regular';
    
}
.p-dropdown-panel .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled):hover {
    background: none;
}
.select-options {
    display: flex;

}
.img-border-radius {
    border-radius: 50%;
}


@media screen and (max-width: 767px){
.header .domestic-intl-section-outer {
        width: 25%!important;
        margin-left: 0px;
    }
}
</style>
