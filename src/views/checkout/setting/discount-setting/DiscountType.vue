<script setup>
import { defineProps, defineEmits, ref } from 'vue';
const props = defineProps(['discountPrice', 'isActive', 'startDate', 'createDate', 'endDate', 'type', 'totalCount', 'summary']);
const emit = defineEmits(['selectedFilter']);
const showMore = ref(false);
const showText = ref('more');
const imgPath = ref('@/assets/images/ic_bottom.svg');
const showMoreDetails = () => {
    let iconName = ''
    showMore.value = !showMore.value;
    imgPath.value = showMore.value;
    imgPath.value = showMore.value ? '@/assets/images/ic_bottom.svg' : '@/assets/images/ic_bottom.svg';
    if (showMore.value) {
        showText.value = 'less';
        iconName= 'ic_top'
    } else {
        showText.value = 'more';
        iconName= 'ic_bottom'
    } 
 
};
const tempIcon = (icon) =>{
   if (icon) {
        return new URL(`../../../../assets/images/${icon}.svg`, import.meta.url).href;
    } else {
        return null;
    }
}
</script>
<template>
    <div class="col-12 p-0 mb-3">
        <div class="main-section-discount">
            <div class="test">
                <div class="discount-switch">
                    <div class="discount-section">
                        <div class="flatcoupan"> 
                            <div class="discount-price">{{ props.discountPrice }}</div>
                            <button :class="props.isActive">{{ props.isActive }}</button>
                        </div>
                        <div class="date-info">
                            <div class="date">Created On: </div>
                            <div class="discount-data">{{ props.createDate }}</div>
                        </div>
                    </div>
                    <div class="orders-purches">
                        <div class="purched-amount">
                            <div>{{ props.summary }}</div>
                        </div>
                    </div>
                    <div v-if="showMore" class="discount-outer">
                        <div class="discount-details">
                            <div class="discount">
                                <div class="discounts-info">
                                    <div class="discount-content">Start Date & Time :</div>
                                    <div class="discount-data">{{ props.startDate }}</div>
                                </div>
                                <div v-if="showMore" class="discounts-info">
                                    <div class="discount-content">End Date & Time :</div>
                                    <div class="discount-data">{{ props.endDate }}</div>
                                </div>
                            </div>
                            <div v-if="showMore" class="discount">
                                    <div class="discounts-info">
                                        <div class="discount-content">Total Redeemed Count :</div>
                                        <div class="discount-data">{{ props.totalCount }}</div>
                                    </div>
                                    <div class="discounts-info">
                                        <div class="discount-content">Type :</div>
                                        <div class="discount-data">{{ props.type }}</div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="showDiscount-data">
                            <div class="show-details" @click="showMoreDetails()">View {{ showText }} details<img class="showmoreimg" :src=" tempIcon(showText == 'more'? 'ic_bottom' : 'ic_top')" /></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
