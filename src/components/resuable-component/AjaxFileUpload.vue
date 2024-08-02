<script setup>
import { ref, defineProps, defineEmits, onUpdated, watch } from 'vue';
import { useStore } from 'vuex';
import config from '../../util/config';
import { GENERALSETTING } from '../../store/checkout/general-setting/constant';
import { CHECKOUTSETTING } from '../../store/checkout/checkout-setting/constant';
const props = defineProps(['uploadImg', 'imageData', 'abc']);
const emit = defineEmits(['uploadedImage', 'fileBig', 'removeImg'])

const imageuploadData = ref(props.imageData);
const configVal = ref(config);
watch(() => props.imageData, (val) => {
  const storeLogoUrl = val.store_logo;
  previewImage.value = storeLogoUrl == '' ? '' : configVal.value.baseUrlImagesMyAlpha + val.store_logo;
  if (storeLogoUrl != '') {
    isBrowseButton.value = false;
  } else {
    isBrowseButton.value = true;
  }
})
const store = useStore();
const previewImage = ref(null);
const isBrowseButton = ref(true);
//  onUpdated(() => {
//   previewImage.value = configVal.value.baseUrlImagesMyAlpha+imageuploadData.value;
//   isBrowseButton.value = false;
//   console.log(previewImage.value,'previewImage.value');
// });
const uploadImage = async (e) => {
  previewImage.value = null;
  const image = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(image);
  emit('fileBig', false);

  if (image.size > 2 * 1024 * 1024) {
    emit('fileBig', true)
  } else {
    reader.onload = (e) => {
      previewImage.value = e.target.result;
      isBrowseButton.value = false;
    };
    const data = {
      storeId: props.storeId,
      previewImage: image
    }
    await store.dispatch(`${GENERALSETTING.NAME}/updateImage`, data)
    const uploadimageStatus = store.getters[`${GENERALSETTING.NAME}/sendImageSuccess`];
    emit('uploadedImage', image, uploadimageStatus);
    emit('fileBig', false);
  }
};


//  updateImage
const browseImage = () => {
  const fileInput = document.querySelector('input[type="file"]');
  fileInput.click();
};
const clearImage = () => {
  previewImage.value = null;
  isBrowseButton.value = true;
  emit('removeImg');
};
const getImage = () => {
  isBrowseButton.value = false;
};
</script>
<template>
  <div>
    <button @click="browseImage" class="select-img-btn" v-if="isBrowseButton">Browse</button>
    <div :class="'uploading'" v-show="previewImage">

      <!-- <img :src="configVal.baseUrlImagesMyAlpha+imageuploadData['store_logo']" v-if="configVal.baseUrlImagesMyAlpha+imageuploadData['store_logo'] != ''" class="uploading-image"  /> -->
      <img :src="previewImage" class="uploading-image" />
      <label class="custom-file-input-label">
        <input type="file" accept="image/jpeg" ref="fileInput" @change="uploadImage" style="display: none" />
      </label>
      <div class="close-img-btn">
        <img @click="clearImage" v-if="previewImage" src="@/assets/images/close-img.svg">
      </div>
    </div>
  </div>
</template>
<style>
@import '../../assets/itl-common-css/common-css.scss';
.general.inactive-dashbaord .close-img-btn {
  display: none;
}

.uploading {

  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e9ecef;
  width: 124px;
  height: 68px;
  overflow: hidden;
}

.uploading-image {
  padding: 16px;
  width: 92px;
  height: auto;
}

.custom-file-input-label {
  position: relative;
  display: inline-block;
}

.select-img-btn {

  position: relative;
  width: 68px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid #dfe3e6;
  color: #575f6c;
  background-color: transparent;
}
.lightTheme .select-img-btn {
  border-color:#d4d6d9;
  color:#0c0c0d;

}
.lightTheme .uploading{
  border-color:#d4d6d9;
}
.darkTheme .select-img-btn {
  border-color:#545b67;
  color:#fff;
}
.darkTheme .uploading{
  border-color:#545b67;
}
.close-img-btn {
  position: absolute;
  margin-left: 120px;
  margin-top: -60px;
}

@media only screen and (max-width:786px) and (min-width: 320px) {
  .select-img-btn {
    width: 35%;
  }
}
</style>
    
