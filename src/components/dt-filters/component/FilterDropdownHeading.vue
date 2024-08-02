<template>
    <Accordion>
        <AccordionTab :header="header">
            <button v-for="(item, index) in tempData  " :key="index"
                class="capitalize text-[13px] font-interRegular text-left"
                @click="hightLight(getClassName(item.heading))">{{ item.heading }}
            </button>
        </AccordionTab>
    </Accordion>
</template>
<script setup>
const { tempData, header } = defineProps(['tempData', 'header']);
const hightLight = (item) => {
    Array.from(document.getElementsByClassName('right-lists')).forEach((element) => element.classList.remove('right-active-list'));
    Array.from(document.getElementsByClassName('active-filterType-9')).forEach((element) => element.classList.remove('active-filterType-9'));
    const rightactiveDiv = document.getElementById(item);
    if (rightactiveDiv) {
        rightactiveDiv.classList.add('active-filterType-9');
    }
    scrollToElement(item);
}
const scrollToElement = (id) => {
    console.log(id);
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center', // Align the top of the element with the top of the visible area of the scrollable ancestor
            inline: 'nearest',
        });

    }
};

const getClassName = (heading) => {
    return heading.toLowerCase().replace(/\s/g, '-');
}
</script>

<style lang="scss">
@import '../../../assets/itl-common-css/common-css.scss';

.p-accordion-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.filter-modal-open .p-icon {
    width: 14px !important;
    height: 14px !important;
}

.filter-modal-open .p-accordion-header,
.filter-modal-open .p-accordion .p-accordion-content,
.filter-modal-open .p-accordion .p-accordion-header .p-accordion-header-link {
    @include theme() {
        color: #4d4d4d;
        font-weight: 400 !important;
    }
}

.filter-modal-open .active-list .p-accordion-header a {
    font-weight: bolder !important;
}

.filter-modal-open .p-accordion .p-accordion-header .p-accordion-header-link {
    flex-direction: row-reverse;
    justify-content: space-between;
    padding: 0px;
    border: none;
    border-radius: 4px;
    background-color: transparent;
    background: none;
}

.filter-modal-open .p-accordion .p-accordion-header:not(.p-disabled).p-highlight:hover .p-accordion-header-link,
.filter-modal-open .p-accordion .p-accordion-header:not(.p-highlight):not(.p-disabled):hover .p-accordion-header-link {
    background: none;

}

.filter-modal-open .p-accordion .p-accordion-header:not(.p-disabled) .p-accordion-header-link:focus {
    box-shadow: none;
}

.filter-modal-open .p-accordion .p-accordion-header:not(.p-disabled).p-highlight .p-accordion-header-link,
.filter-modal-open .p-accordion .p-accordion-content {
    border: none;
    // padding: 0px 8px;
    border-radius: 4px;
    background-color: transparent;
}

.filter-modal-open .p-accordion .p-accordion-content {
    padding: 12px 8px 8px 16px;
}
</style>