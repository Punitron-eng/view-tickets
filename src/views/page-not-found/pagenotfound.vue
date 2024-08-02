<script setup lang="ts">
import BaseButton from '../../components/base/BaseButton.vue';
import getImg from '../../util/getImg';
import config from '../../util/config';
import { useStore } from 'vuex';
import { DARKMODE } from '../../store/dark-mode/constants';
import { computed } from 'vue';
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);
const store = useStore();
const getsubmit = () => {
     window.open(config.baseUrlPanel, '_self');
};
</script>
<template>
<div class="page-not-found">
    <div class="itl-main">
        <div class="itl-main-card">
            <div class="itl-card-logo">
                <img :src="getImg('itl-logo', darkModeVal)" />
            </div>
            <div class="itl-heading">
                Error 404
            </div>
            <div class="itl-main-heading">
                Page not found...
            </div>
            <div class="itl-main-para">
                Sorry, the page you are looking for doesn't exist or has been moved.
                Click the button above to go back to the Dashboard.
            </div>
             <div class="card-btn">
                <BaseButton type="primary" size="medium" name="Back to Dashboard" class="w-[368px] md:w-[300px]" @click="getsubmit()"/>
            </div>
        </div>
        <div class="itl-error-img">
            <img :src="getImg('Error-icon', darkModeVal)" />
        </div>
    </div>
</div>
</template>

<style lang="scss">
@import './pagenotfound.scss';
</style>
