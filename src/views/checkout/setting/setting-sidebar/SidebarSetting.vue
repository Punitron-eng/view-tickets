<script setup>
import { ref, onMounted, computed, onBeforeMount, defineEmits, onBeforeUnmount, defineProps, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { CHECKOUTSETTING } from '../../../../store/checkout/checkout-setting/constant';
import { checkUserType } from '../../../../util/commonHandlers'; //checkUserType
const props = defineProps(['dropdownData'])
const emit = defineEmits(['tracking-details'])
// const props = defineProps(['vendorId'])
const selectedSetting = ref(props.dropdownData);
const settingDropdown = ref([]);
const store = useStore();
const loading = ref(true);
const storeId = ref(null);
const dropdownStoreDetails = computed(() => store.getters[`${CHECKOUTSETTING.NAME}/sendStoreDetails`]);
const route = useRoute();

watch(() => props.dropdownData, () => {
  if(props.dropdownData != undefined){
    selectedSetting.value = props.dropdownData[0].id;
    if (selectedSetting.value != null) {
      getStoreId(selectedSetting.value)
    }
  } else{
    getStoreId('')
  }
  
})

onMounted(async () => {
   if (dropdownStoreDetails.value.length > 0 && dropdownStoreDetails.value != undefined ) {
      selectedSetting.value = dropdownStoreDetails.value[0].id;
      storeId.value = selectedSetting.value;
  }
  loading.value = false;
  if (checkUserType('vendor')) {
    await store.dispatch(`${CHECKOUTSETTING.NAME}/getStoreDetails`);
    if (dropdownStoreDetails.value.length > 0) {
      selectedSetting.value = dropdownStoreDetails.value[0].id;
      storeId.value = selectedSetting.value;
    }
  } else {
    if (props.dropdownData.length > 0) {
      selectedSetting.value = props.dropdownData[0].id;
    }
  }
  if (selectedSetting.value != null) {
    getStoreId(selectedSetting.value)
  }

});
const getStoreId = async (tempStoreId) => {
  storeId.value = tempStoreId;
  await store.dispatch(`${CHECKOUTSETTING.NAME}/getStoreId`, storeId.value);
  emit('tracking-details');
};

onMounted(async () => {
  document.body.classList.add('dropdown-outer');

});
onBeforeUnmount(() => {
  document.body.classList.remove('dropdown-outer');
});

const selectedCountry = ref();
const countries = ref([
  { name: 'Australia', code: 'AU' },
  { name: 'Brazil', code: 'BR' },
  { name: 'China', code: 'CN' },
  { name: 'Egypt', code: 'EG' },
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'India', code: 'IN' },
  { name: 'Japan', code: 'JP' },
  { name: 'Spain', code: 'ES' },
  { name: 'United States', code: 'US' }
]);

const error = ref(dropdownStoreDetails.store_name='' ? true : false)
</script>
<template>
  
  <div class="sidebar-wrapper">
    <div class="dropdown-list">
      <Dropdown v-model="selectedSetting" :options="dropdownStoreDetails" optionLabel="store_name" optionValue="id"
        placeholder="Select an option" class="setting-dropdown" :appendTo="'self'" :autoOptionFocus="false" >
        <template #value="slotProps">
          <div v-if="value" class="flex align-items-center">
            <div>
              <img alt="store-icon" src="../../../../assets/images/store-icon.png" class="mr-2" style="width: 18px" />
              {{ slotProps.value.store_name }}
            </div>
          </div>
        </template>
        <template #option="slotProps">
          <div class="option-item " @click="getStoreId(slotProps.option.id)">
            <div class="select-options">
              <div class="option-name"> {{ slotProps.option.store_name }}</div>
            </div>
          </div>
        </template>
      </Dropdown>
    </div>
  </div>
  <!-- <Dropdown v-model="selectedCountry" 
  :options="countries" optionLabel="name" placeholder="Select a Country" class="w-full md:w-14rem">
    <template #value="slotProps">
        <div v-if="slotProps.value" class="flex align-items-center">
            <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" 
            :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" />
            <div>{{ slotProps.value.name }}</div>
        </div>
        <span v-else>
            {{ slotProps.placeholder }}
        </span>
    </template>
    <template #option="slotProps">
        <div class="flex align-items-center">
            <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" 
            :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
            <div>{{ slotProps.option.name }}</div>
        </div>
    </template>
</Dropdown> -->
</template>
<style lang="scss">
@import "./SidebarSetting.scss";
</style>