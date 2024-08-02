<script setup>
import { ref, defineProps } from 'vue';

const { visible } = defineProps(['visible']);
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <div class="modal-content">
        <div class="modal-headers">
          <slot name="header"></slot>
        </div>
        <div class="modal-bodys">
          <slot name="body"></slot>
        </div>
        <div class="modal-footers">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/itl-common-css/common-css.scss";
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  @include theme() {
     background-color: theme-get('background');
    }
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  max-width: 80%;
  overflow-y: auto;
}
</style>
