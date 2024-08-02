<script setup lang="ts">
import { ref, onBeforeMount, onBeforeUnmount, watch, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { DARKMODE } from '../../store/dark-mode/constants';

interface SelectedValue {
    id: number;
    value: string;
}

const store = useStore();
const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

const defaultClasses: string = 'w-14rem';

const props = defineProps({
    defaultValue: { type: Number, required: false },
    twClasses: { type: String, required: false },
    anotherVal: { type: Boolean, required: false },
    options: { type: Array<SelectedValue | null>, required: true },
    placeholder: { type: String, required: true },
    virtualScrollerOptions: { type: Object, required: false },
});

// const selectedValue = ref<SelectedValue | null>(props.defaultValue !== undefined && props.options && props.options[props.defaultValue] ? props.options[props.defaultValue] : null);

// const selectedValue = ref<null>(props.defaultValue != '' ?props.options.find((option) => option.id === props.defaultValue): null);
const selectedValue = ref<null | SelectedValue>(props.defaultValue !== null ? props.options.find((option) => option?.id == props.defaultValue) || null : null);
const emits = defineEmits<{
    listenDropdownChange: [val: SelectedValue];
}>();

onBeforeMount(() => {
    document.body.classList.add('base-dropdown');
});
onMounted(() => {
    listenDropdownChange();
});
onBeforeUnmount(() => {
    document.body.classList.remove('base-dropdown');
});
const applyCss = (type: string) => {
    if (type != 'onClose') {
        setTimeout(() => {
            const elem = document.querySelector('.p-dropdown-items-wrapper');
            elem?.classList.add(defaultClasses);
        }, 10);
    } else {
        setTimeout(() => {
            const elem = document.querySelector('.p-dropdown-items-wrapper');
            elem?.classList.add(defaultClasses);
        }, 130);
    }
};

const listenDropdownChange = () => {
    // console.log('selectedValue.value', selectedValue.value)
    if (selectedValue.value) emits('listenDropdownChange', selectedValue.value);
};

watch(
    () => props.defaultValue,
    (value) => {
        // if (props.options) selectedValue.value = null;
        if (value) selectedValue.value = props.options.find((option) => option?.id == value) || null;
    }
);
watch(
    () => props.options,
    (options) => {
        // if (props.options) selectedValue.value = null;
        if (options) selectedValue.value = options.find((option) => option?.id == props.defaultValue) || null;
    }
);
</script>

<template>
    <Dropdown @change="listenDropdownChange()" id="baseDropdown" :auto-option-focus="false" @click="applyCss"
        @hide="applyCss('onClose')" v-model="selectedValue" :options="props.options" :autoOptionFocus="false"
        optionLabel="value" :appendTo="'self'" :placeholder="props.placeholder"
        :class="props?.twClasses || defaultClasses" class="base-dropdown "
        :virtualScrollerOptions="props?.virtualScrollerOptions">
        <template #value="slotProps">
            <div v-if="slotProps.value">
                <div class="truncate">{{ slotProps.value.value }}</div>
            </div>
        </template>
        <template #option="slotProps">
            <div class="flex items-center justify-between option-item">
                <div class="truncate">{{ slotProps.option.value }}</div>
                <img v-if="!darkModeVal" v-show="selectedValue?.id == slotProps.option.id" class="check-sign"
                    src="../../assets/images/IcOutlineCheck.svg" width="14" height="14" alt="Check Sign" />
                <img v-else v-show="selectedValue?.id == slotProps.option.id" class="check-sign"
                    src="../../assets/images/dark-mode/dark-IcOutlineCheck.svg" width="14" height="14"
                    alt="Check Sign" />
            </div>
        </template>
    </Dropdown>
</template>

<style lang="scss">
@import '../../assets/itl-common-css/common-css.scss';

#baseDropdown.p-dropdown {
    line-height: normal;

    @include theme() {
        border: 1px solid theme-get('border-black-500');
    }
}
// filter section
.base-dropdown .p-dropdown-filter {
    border-radius: 5px !important;
}

.p-inputtext:enabled:hover {
    @include theme() {
        border: 1px solid theme-get('border-black-500');
    }
}

#baseDropdown.p-dropdown-label.p-placeholder {
    @include theme() {
        color: theme-get('black-900');
    }
}

#baseDropdown_list {
    @include theme() {
        background-color: theme-get('background');
    }

    .p-dropdown-item.p-highlight {
        // background-color: transparent !important;

        @include theme() {
            color: theme-get('dt-filter-custom-range-text');
            background-color: theme-get('border-black-600') !important;
        }
    }

    // border: 1px solid rgb(108, 107, 107);
}

// .base-dropdown .p-dropdown-panel {
//     z-index: 98 !important;
// }

.lightTheme.base-dropdown .p-dropdown-panel .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled):hover {
    background: #dfe3e6 !important;
}

.darkTheme .p-dropdown-panel .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled):hover {
    background: #6d6d6d !important;
}

.base-dropdown {
    .p-dropdown-items-wrapper {
        width: 100% !important; // confirmed by tejas - to be added
        border: none !important;
    }

    .p-dropdown {
        border-radius: 4px;
        height: 32px;
        box-shadow: none;

        .p-inputtext {
            padding: 6px 12px !important;
        }
    }

    .p-dropdown-panel {
        // z-index: 95 !important;
        border: none !important;

        .p-dropdown-header {
            @include theme() {
                background-color: theme-get('background') !important;
            }
        }
    }

    .p-dropdown:not(.p-disabled).p-focus {
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
        border-color: #dfe1e4;
    }

    .p-dropdown:not(.p-disabled):hover {
        border-color: #dfe1e4;
    }

    .p-dropdown-panel .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled):hover {
        background-color: rgb(179, 177, 177);
    }

    // .p-dropdown-label.p-placeholder {
    //   color: #3c4249;
    //}

    .p-dropdown-item {
        .check-sign {
            margin-right: 7px;
        }
    }

    .p-component span {
        max-width: 100% !important;
    }
}
</style>
