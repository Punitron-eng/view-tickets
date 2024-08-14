<template>
    <div :style="{ width: '100%' }">
        <VueDatePicker
            name="date-picker"
            :model-value="date"
            @update:model-value="setDate"
            auto-apply
            :close-on-auto-apply="true"
            :enable-time-picker="false"
            :month-change-on-scroll="false"
            :multi-static="true"
            keep-action-row
            multi-calendars
            multi-calendars-solo
            :menu-class-name="calenderClass"
            range
            :inline="inline"
            no-today
            position="center"
            ref="updateCalender"
            :min-date="minDate"
            prevent-min-max-navigation
            :monthChangeOnScroll="false"
            :format="formatDate"
            @closed="tempFunction"
        >
            <template #left-sidebar>
                <div class="custom-sort" :class="hideEmptySpace ? 'hidden' : 'block'">
                    <slot name="sort"></slot>
                </div>
                <!-- <div class="filter-text">FILTER</div> -->
                <!-- {{ pRanges }} -->
                <div class="left-sidebar" v-for="value in pRanges" :key="value.label" @click.self="setDateOption(value.range, value.label)" :class="[value.state ? 'sidebar-active' : '']">
                    {{ value.label }}
                    <span v-if="value.label == 'Custom Range'">{{ `(${cusomizedDateText})` }}</span>
                </div>
                <slot name="pin-column"></slot>
            </template>
        </VueDatePicker>
    </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { presetRanges } from './DateTimeRangePickerData';
import { format } from 'date-fns';
// import { computed } from 'vue';
// import { startOfMonth, subMonths, format } from 'date-fns';
// import { useStore } from 'vuex';
// import { DARKMODE } from '@/store/dark-mode/constants';
// const store = useStore();
// const darkModeVal = computed(() => store.getters[`${DARKMODE.NAME}/sendDarkModeVal`]);

export default {
    name: 'DateTimePicker',
    components: {
        VueDatePicker,
    },
    emits: ['formatDate', 'updateDate'],
    props: {
        startDate: {
            type: Array,
            // default: () => [startOfMonth(subMonths(new Date(), 6)), new Date()],
        },
        hideEmptySpace: {
            type: Boolean,
        },
        inline: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            date: null,
            dateLabel: '',
            cusomizedDateText: '',
            pRanges: presetRanges,
            length: presetRanges.length - 1,
            calenderClass: 'dp-custom-menu-hide',
            filterDate: '',
            minDate: new Date(2017, 0, 1),
        };
    },
    mounted() {
        // maxDate
        this.pRanges = this.pRanges.map((item) => ({ ...item, range: this.formatPayload(item.range) }));
        if (this.startDate === undefined) {
            const tempStartDate = [new Date('2017-01-01'), new Date()];
            // const tempStartDate = [startOfMonth(subMonths(new Date(), 6)), new Date()];
            this.findDefultRange(tempStartDate);
            this.date = tempStartDate;
            // this.dateLabel = [new Date(this.date[0]).toISOString().split('T')[0], new Date(this.date[1]).toISOString().split('T')[0]];
            const startDate = new Date(this.date[0]);
            const endDate = new Date(this.date[1]);
            const formattedStartDate = format(startDate, 'yyyy-MM-dd');
            const formattedEndDate = format(endDate, 'yyyy-MM-dd');
            this.dateLabel = [formattedStartDate, formattedEndDate];
        } else {
            this.findRange(this.startDate);
            this.date = this.startDate;
            // this.dateLabel = [new Date(this.date[0]).toISOString().split('T')[0], new Date(this.date[1]).toISOString().split('T')[0]];
            const startDate = new Date(this.date[0]);
            const endDate = new Date(this.date[1]);
            const formattedStartDate = format(startDate, 'yyyy-MM-dd');
            const formattedEndDate = format(endDate, 'yyyy-MM-dd');
            this.dateLabel = [formattedStartDate, formattedEndDate];
        }
    },
    watch: {
        startDate(date) {
            const label = this.findRange(date);
            if (label === 'Custom Range') {
                const filterElement = document.querySelector('.p-column-filter-overlay');
                if (filterElement) {
                    this.customizeDatePosition();
                } else {
                    this.calenderClass = 'dp-custom-menu-show';
                    // this.dashboardDatePosition()
                }
            }
            // else{
            //     const filterElement = document.querySelector('.p-column-filter-overlay');
            //     if (filterElement != null){
            //         const divElement = document.querySelector('.card.datatable-card');
            //         const dataTableWidth = divElement.clientWidth;
            //         const computedStyles = window.getComputedStyle(filterElement);
            //         const tempLeftValue = computedStyles.getPropertyValue('left');
            //         const leftValue = parseFloat(tempLeftValue);
            //         const rightValue = dataTableWidth - leftValue;
            //         if (rightValue < leftValue) {
            //             document.querySelector('.outer-dateranger-picker').classList.add('datepicker-outer-main');
            //         } else if(rightValue == 0){
            //             document.querySelector('.outer-dateranger-picker').classList.add('datepicker-outer-left');
            //         }
            //     }

            // }
            this.date = date;
        },
        date() {
            const startDate = new Date(this.date[0]);
            const endDate = new Date(this.date[1]);
            const formattedStartDate = format(startDate, 'yyyy-MM-dd');
            const formattedEndDate = format(endDate, 'yyyy-MM-dd');
            this.dateLabel = [formattedStartDate, formattedEndDate];
        },
        dateLabel() {
            this.cusomizedDateText = [format(new Date(this.dateLabel[0]), 'dd-MM-yyyy') + ' - ' + format(new Date(this.dateLabel[1]), 'dd-MM-yyyy')];
        },
    },
    methods: {
        setDate(date) {
            const label = this.findRange(date);
            this.setFilter(date, label);
        },
        // formatSelectedDate() {

        // }
        setDateOption(date, label) {
            if (label === 'Custom Range') {
                const filterElement = document.querySelector('.p-column-filter-overlay');
                const outerLeftDate = document.querySelector('.features-outer');
                if (filterElement) {
                    this.customizeDatePosition();
                } else if (outerLeftDate) {
                    this.calenderClass = window.innerWidth == 1280 ? 'dp-custom-menu-show-center' : 'dp-custom-menu-show';
                    return;
                } else {
                    this.dashboardDatePosition();
                }

                return;
            }

            // let ans = this.pRanges.find(o => o.label === label)
            // console.log(ans.state = true)
            // this.pRanges.forEach((el) => {
            //     if(el.label != ans.label) el.state = false;
            // })

            this.setFilter(date, label);
            this.date = date;
            this.$refs['updateCalender'].closeMenu();
        },
        dashboardDatePosition() {
            // const tempElement = document.querySelector('.dp__outer_menu_wrap');
            // const computedStyles = window.getComputedStyle(tempElement);
            // const tempLeftValue = computedStyles.getPropertyValue('left');
            // const leftValue = parseFloat(tempLeftValue);
            // if (leftValue > -50 && leftValue != 0) {
            this.calenderClass = 'dp-custom-menu-show-main';
            // } else {
            //     this.calenderClass = 'dp-custom-menu-show';
            // }
        },
        compare(date1, date2) {
            return date1[0] === date2[0] && date1[1] === date2[1];
        },

        formatPayload(date) {
            const startDate = new Date(date[0]);
            const endDate = new Date(date[1]);
            const formattedStartDate = format(startDate, 'yyyy-MM-dd');
            const formattedEndDate = format(endDate, 'yyyy-MM-dd');
            this.filterDate = formattedStartDate + ' ' + formattedEndDate;
            return [formattedStartDate, formattedEndDate];
        },

        formatDate(date) {
            if (date.length === 2) {
                return format(new Date(date[0]), 'dd-MM-yyyy') + ' - ' + format(new Date(date[1]), 'dd-MM-yyyy'); // this is for we get the warning about vueDateRangePicker's prop name as inputValue
                // return [format(new Date(date[0]), 'dd-MM-yyyy') + ' - ' + format(new Date(date[1]), 'dd-MM-yyyy')]; // Due to this we get above warning
            } else {
                return;
            }
        },

        findRange(date) {
            const tempDate = date;
            this.pRanges = this.pRanges.map((item) => ({ ...item, state: this.compare(tempDate, item.range) }));
            this.pRanges[this.length].state = !this.pRanges.some((item) => item.state === true);
            let label = this.pRanges.find((item) => item.state === true).label;
            const isCustomizedRange = this.pRanges[this.length].state;
            if (isCustomizedRange) {
                label = 'Custom Range';
                // this.pRanges[this.length].range = tempDate;
            }

            return label;
        },
        findDefultRange(date) {
            const tempDate = this.formatPayload(date);
            this.pRanges = this.pRanges.map((item) => ({ ...item, state: this.compare(tempDate, item.range) }));
            this.pRanges[this.length].state = !this.pRanges.some((item) => item.state === true);
            let label = this.pRanges.find((item) => item.state === true).label;
            const isCustomizedRange = this.pRanges[this.length].state;
            if (isCustomizedRange) {
                label = 'Custom Range';
                this.pRanges[this.length].range = tempDate;
            }
            return label;
        },
        tempFunction() {
            this.calenderClass = 'dp-custom-menu-hide';
        },

        setFilter(date, label) {
            const payload = {
                type: 'dateRange',
                selectedDate: this.formatPayload(date, label).join(' '),
                selectedLabel: label.replace(/\s+/g, '_').toLowerCase(),
                label: label,
            };
            this.calenderClass = 'dp-custom-menu-hide';
            this.$emit('updateDate', payload);
        },
        customizeDatePosition() {
            const isDesktopView = window.innerWidth > 1024;
            if (isDesktopView) {
                const filterElement = document.querySelector('.p-column-filter-overlay');
                const divElement = document.querySelector('.card.datatable-card');
                const dataTableWidth = divElement.clientWidth;
                const computedStyles = window.getComputedStyle(filterElement);
                const tempLeftValue = computedStyles.getPropertyValue('left');
                const leftValue = parseFloat(tempLeftValue);
                const rightValue = dataTableWidth - leftValue;
                if (rightValue > leftValue) {
                    this.calenderClass = 'dp-custom-menu-show';
                } else if (leftValue < 750 && rightValue < 700) {
                    this.calenderClass = 'dp-custom-menu-show-center';
                } else {
                    this.calenderClass = 'dp-custom-menu-show-right';
                }
            } else {
                this.calenderClass = 'dp-custom-menu-show';
                return;
            }
        },
    },
};
</script>

<style lang="scss">
@import '../../../../assets/itl-common-css/common-css.scss';

.dp--year-select:hover,
.dp__month_year_select:hover {
    @include theme() {
        background-color: theme-get('background-top-active');
    }
}

.dp__inner_nav_disabled {
    @include theme() {
        background-color: theme-get('background');
    }
}

.features-left-side .dp__menu .custom-sort {
    display: none !important;
}

.dp__menu {
    border: none;
    // border: solid 1px #d0d6dc;
    transform: none !important;
    left: auto !important;
    // background: transparent;

    // box-shadow: 0px 25px 50px -12px #00000040;
    min-width: 210px !important;

    // @media (max-width: 768px) {
    //     // overflow: scroll;
    //     // height: 300px;
    // }
    // &:focus {
    //     border: none;
    // }
    // .dp__sidebar_left {
    //     padding: 20px 0;
    // }
    .dp__sidebar_left {
        padding: 16px 0;
    }

    .dp__arrow_top,
    .dp__arrow_bottom {
        display: none;
    }
}

.dp__menu_content_wrapper .dp__instance_calendar {
    margin-left: 8px;
    height: 340px;

    // background-color: #fff;
    @include theme() {
        background-color: theme-get('dt-filter-header');
    }

    border-radius: 0;
    border: none;
}

.dp__menu:focus {
    border: none;
    outline: none;
}

.dp__menu .dp__menu_content_wrapper .dp__sidebar_left {
    @include theme() {
        background-color: theme-get('dt-filter-header');
        border: 1px solid theme-get('border-black-400');
    }

    // background-color: #fff;
    // border: 1px solid #d0d6dc;
    border-radius: 4px;
    // width: 210px;
}

.dp__menu.dp-custom-menu-show.dp__theme_light .dp__sidebar_left {
    width: 285px;
}

.dp__menu_content_wrapper .dp__instance_calendar .dp__flex_display .dp__instance_calendar {
    margin-left: 0;
    border: none;

    @include theme() {
        border-right: 1px solid theme-get('modal-border-bottom');
    }

    border-radius: 4px;
}

.dp__menu_content_wrapper .dp__instance_calendar .dp__flex_display .dp__instance_calendar:last-child {
    border-right: none;
}

.dp__flex_display {
    // border: 1px solid #d0d6dc;
    @include theme() {
        border: 1px solid theme-get('border-black-400');
    }

    border-radius: 4px;
}

.dp__month_year_select {
    @include theme() {
        border-bottom: 1px solid theme-get('modal-border-bottom');
    }

    border-radius: 0px;
    width: 28%;
}

.dp__main.dp__theme_light.dp__flex_display {
    border: none;
}

.dp__action_row {
    display: none;
}

.dp__menu_index {
    z-index: 9;
}

.dp__calendar_header_item {
    text-align: center;
    flex-grow: 1;
    height: auto;
    padding: 0;
    width: 35px;
    box-sizing: border-box;

    // color: #656f7d;
    @include theme() {
        color: theme-get('daterange-header-item');
    }

    font-size: 13px;
}

.dp__calendar_row {
    margin: 0;
}

.dp__calendar_header {
    margin-bottom: 15px;
    margin-top: 15px;
}

.dp__calendar_header_separator {
    display: none;
}

.dp__menu_content_wrapper {
    border-radius: 4px;
    // box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.05), 0 10px 15px 0 rgba(0, 0, 0, 0.1);
    // border: solid 1px #d0d6dc;
    border-bottom: none;

    @media (max-width: 768px) {
        flex-direction: column;
    }
}

.left-sidebar {
    max-width: 100%;
    min-width: 184px;
    padding: 7px 16px;
    margin: 0;
    border-radius: 0;
    font-size: 13px;
    display: flex;
    flex-flow: wrap;
    gap: 5px 0;
    cursor: pointer;
    font-family: $segoeUIRegularFont;

    // color: #1d252b;
    @include theme() {
        color: theme-get('black-800');
    }
}

.left-sidebar span {
    // color: #006af4;
    @include theme() {
        color: theme-get('dt-filter-custom-range-text');
    }
}

.left-sidebar:hover {
    // background: #f3f4f6;
    @include theme() {
        background-color: theme-get('dt-input-search-bg');
    }
}

.sidebar-active {
    color: blue;
    position: relative;
}

.dp__menu .sidebar-active:after {
    content: '';
    display: inline-block;
    height: 5px;
    width: 10px;
    border-radius: 2px;

    // border-left: 2px solid #0065ff;
    // border-bottom: 2px solid #0065ff;
    @include theme() {
        border-left: 2px solid theme-get('dt-sidebar-active-tick');
        border-bottom: 2px solid theme-get('dt-sidebar-active-tick');
    }

    transform: rotate(-45deg);
    position: absolute;
    right: 20px;
    top: 12px;
}

.dp-custom-menu-hide {
    .dp__instance_calendar {
        display: none;
    }

    .dp__action_row {
        display: none;
    }
}

.dp__sidebar_left {
    border-right: none;
}
.dp--menu-wrapper {
    z-index: 9 !important;
}

.dp-custom-calender-show {
    .dp__instance_calendar {
        display: block;
    }

    .dp__action_row {
        display: block;
        width: 100% !important;
    }
}

.outer-dateranger-picker {
    margin-left: 8px;

    .dp__input {
        // border: 1px solid #d1d5db;
        border-radius: 16px;
        font-family: 'HelveticaNowText-medium';

        // color: red;
        @include theme() {
            color: theme-get('dateRangePicker-color');
            border: 1px solid theme-get('border-black-400');
        }

        font-size: 13px;
        line-height: 16px;
        height: 32px;

        &:hover {
            border-color: #d1d5db;
        }
    }

    .dp__clear_icon {
        display: none;
    }

    .dp__input_focus {
        border-color: #d1d5db;
    }
}

.custom-sort {
    padding: 16px 16px 7px;
    // padding: 0 16px 10px;
    // border-bottom: 1px solid #d0d6dc;
}

.filter-text {
    font-size: 10px;
    font-weight: 600;
    font-style: normal;
    line-height: 12px;
    letter-spacing: normal;
    color: #656f7d;
    font-family: $segoeUISemiBoldFont;
    margin: 20px 16px 0px;
}

.outer-dateranger-picker .dp__menu .dp__sidebar_left {
    padding: 0;
}

.min-max-outer-section .dp-custom-menu-show-center {
    position: absolute;
    right: 0px;
    left: -290px !important;
    min-width: 687px !important;
    background: transparent !important;
}

.min-max-outer-section .dp-custom-menu-show-right {
    right: 0px;
    left: -528px !important;
    position: absolute;
    min-width: 687px !important;
    background: transparent !important;
}

.dp__month_year_wrap {
    justify-content: center;
}

.dp__menu_inner {
    padding: 0px;
}

.dp-custom-menu-show-main {
    // right: 0px;
    // left: -528px !important;
    // left: -15px !important;
    right: -260px !important;
    // right: -242px;
    position: absolute;
    // min-width: 687px !important;
}

@media (max-width: 1023px) {
    .dp__menu_content_wrapper .dp__instance_calendar {
        margin-left: 0 !important;
    }

    .dp__menu .dp__menu_content_wrapper .dp__sidebar_left {
        width: 260px !important;
    }

    .datepicker-outer .dp__outer_menu_wrap.dp--menu-wrapper {
        max-height: 307px !important;
        overflow: auto;
        right: 0;
    }
}

@media only screen and (width <=1023px) {
    .dp__flex_display {
        flex-direction: column;
    }
}

@media (min-width: 820px) and (max-width: 1024px) {
    .dp__menu_content_wrapper .dp__instance_calendar {
        margin-left: 0 !important;
    }

    .dp__menu .dp__menu_content_wrapper .dp__sidebar_left {
        width: 260px !important;
    }

    .datepicker-outer .dp__outer_menu_wrap.dp--menu-wrapper {
        max-height: 307px !important;
        overflow: auto;
    }

    .dp__menu_content_wrapper {
        display: block;
    }

    .dp__menu_inner.dp__flex_display {
        display: block;
    }

    .popover-body .dp__menu_content_wrapper {
        overflow: auto;
        height: 360px;
    }
}

@media (max-width: 768px) {
    .popover-body .dp__menu_content_wrapper {
        overflow-y: auto;
        height: 360px;
        overflow-x: hidden;
        border-bottom: 1px solid #ccc;
    }
}

.dp__overlay_cell:hover {
    @include theme() {
        background-color: theme-get('background-celldisable');
        color: theme-get('black-800');
    }
}

.dp__overlay_cell_disabled {
    @include theme() {
        color: theme-get('black-800');
        background-color: theme-get('daterange-disable-cell');
    }
}

.dp__overlay_cell_disabled:hover {
    @include theme() {
        color: theme-get('black-800');
        background-color: theme-get('daterange-disable-cell');
    }
}

.dp__month_year_select {
    @include theme() {
        color: theme-get('black-800');
    }
}

.dp__cell_offset {
    @include theme() {
        color: theme-get('daterange-date-disable');
    }
}

.dp__overlay {
    @include theme() {
        color: theme-get('black-800');
        background-color: theme-get('daterange-year-picker');
    }
}

.dp__range_between {
    @include theme() {
        background-color: theme-get('dt-input-search-bg');
        border: theme-get('border-black-400');
        color: theme-get('black-800');
    }
}

.dp__calendar_item {
    @include theme() {
        color: theme-get('black-800');
    }
}
.features-outer .dp-custom-menu-show-center {
    position: absolute;
    right: 0px;
    left: -180px !important;
    min-width: 687px !important;
    background: transparent !important;
}
</style>
