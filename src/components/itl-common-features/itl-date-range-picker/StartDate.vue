<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { format } from 'date-fns';
import { defineProps, defineEmits, ref, watch } from 'vue';
const props = defineProps({
    disabledInput: {
        type: Boolean,
    },
    defaultDate: {
        default: new Date(),
    },
});

const emits = defineEmits(['startDate']);

const dateVariable = ref({
    date: props.defaultDate,
    minDate: new Date(2017, 0, 1),
});

watch(
    () => props.defaultDate,
    (val) => (dateVariable.value.date = val)
);

const formatDate = (date) => format(new Date(date), 'dd-MM-yyyy');

const setDate = (date) => emits('startDate', date);
</script>

<template>
    <div class="scroll-prevent">
        <VueDatePicker
            v-model="dateVariable.date"
            auto-apply
            :enable-time-picker="false"
            :disabled="props.disabledInput"
            @update:model-value="setDate"
            :format="formatDate"
            :min-date="dateVariable.minDate"
            prevent-min-max-navigation
            :monthChangeOnScroll="false"
            placeholder="Select Start date"
        ></VueDatePicker>
    </div>
</template>

<style  lang="scss">
@import '../../../assets/itl-common-css/common-css.scss';
.dp__month_year_select:hover{
    &:hover{
        @include theme(){
            color: black;
        }
    }
}
.darkTheme .dp--year-select:hover, .darkTheme .dp__month_year_select:hover{
    background:#2d2d2d;
    color:#fff!important;
}
.dp__icon .dp__clear_icon .dp__input_icons {
    display: none !important;
}
.dp__input {
    @include theme(){
        background-color: theme-get('background');
        border:1px solid  theme-get('border-black-400');
        color: theme-get('black-700') !important;
    }
}
.dp__input_wrap{
    input::placeholder{
        @include theme(){
            color:theme-get('black-700')
        }
    }
}
.dp__inner_nav:hover {
    @include theme(){
        background-color: theme-get('background');
    }
}
.darkTheme .dp__overlay_cell_disabled{
    @include theme(){
        background-color: theme-get('daterange-disable-cell') !important;
    }
}
.dp__menu_inner {
        @include theme(){
        background-color: theme-get('background');
    }
}
// .darkTheme .dp__menu{
//     border: 1px solid #4d4d4d;
// }
.darkTheme .dp__arrow_bottom{
    background-color: #3d3d3d;
    border-inline-end: 1px solid #4d4d4d;
    border-bottom: 1px solid #4d4d4d;
}
.darkTheme .dp--year-select:hover, .darkTheme .dp__month_year_select:hover{
    background: #212121;
}
.darkTheme .dp__arrow_top{
    background-color: #3d3d3d;
    border-inline-end: 1px solid #4d4d4d;
    border-top: 1px solid #4d4d4d;
}
.darkTheme .dp__date_hover_end:hover, .darkTheme .dp__date_hover_start:hover, .darkTheme .dp__date_hover:hover {
    background: #212121;
    color: #ffffff;
}
.darkTheme .dp__calendar_header_separator {
    background: #4d4d4d;
}
</style>
