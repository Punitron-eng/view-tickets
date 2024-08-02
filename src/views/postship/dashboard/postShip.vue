<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { DARKMODE } from '../../../store/dark-mode/constants';
const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const getImg = (imageName) => {
    return new URL(`../../../assets/images/${imageName}.svg`, import.meta.url).href;
};
const cards = [
    { title: 'Configure Menu', image: 'config_menu', alt: 'config menu' },
    { title: 'NPS (Net Promoter Score)', image: 'nps_img', alt: 'NPS' },
    { title: 'Configure Domain', image: 'config_domain', alt: 'config domain' },
    { title: 'Configure Track Page', image: 'config-track-page-img', alt: 'config track page' }
];
</script>

<template>
  <div class="postship-container flex flex-column">
     <div class="section section--one flex flex-column justify-content-center align-items-center">
        <img src="../../../assets/images/post-ship-main.svg" alt="post ship">
        <h2>Keep 2 steps ahead</h2>
        <p>Deadlines, delays, deliveries, deadends, and diversions: we won’t let those get in your way.</p>
     </div>
     <div class="section section--two flex flex-column justify-content-center align-items-center md:flex-row">
        <div v-for="(card, index) in cards" :key="index" class="section--two__card flex flex-column justify-content-center align-items-center">
            <img :src="getImg(card.image)" :alt="card.alt">
            <a href="" class="section--two__card__content flex"><span>{{ card.title }}</span>
                <img v-if="!darkModeVal" :src="getImg('rightarrow')"/>
                <img v-else src="../../../assets/images/dark-mode/rightarrow.svg" />
            </a>
        </div>
     </div>
  </div>
</template>
<style lang="scss">
@import './postShip.scss';
</style>
