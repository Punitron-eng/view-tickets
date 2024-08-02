<script setup>
import { ref, onMounted } from 'vue';
import { getUserData, acknowledgeData } from '../../api/important-update/importantUpdate';
let topHeader = JSON.parse(localStorage.getItem('top_header'));
import { useToast } from 'primevue/usetoast';
import config from '../../util/config';
const toast = useToast();
// Reactive variables for name, email, mobile number, and pdf URL
const name = ref('');
const email = ref('');
const mobile = ref('');
const pdf_link = ref('');
const button = ref('');

const getImg = (imageName) => {
    return new URL(`../../assets/images/${imageName}.svg`, import.meta.url).href;
};

const getDownloadInfo = () => {
    localStorage.setItem('is_pdf_downloaded_wismo', 1);
};

const getAcknowledgeData = async (buttonType) => {
    button.value = buttonType;
    const data = {
        update: 'rate_update',
        button: button.value,
        pdfDownloaded: localStorage.getItem('is_pdf_downloaded_wismo') ? localStorage.getItem('is_pdf_downloaded_wismo') : 0,
    };
    const response = await acknowledgeData(data);
    if (response.status == 'success') {
        toast.add({ severity: 'success', summary: 'Success Message', detail: response.html_message, life: 1000 });
        topHeader.is_show_important_update = 0;
        localStorage.setItem('top_header', JSON.stringify(topHeader));
        window.open(config.baseUrlPanel, '_self');
    } else {
        if (buttonType == 'acknowledge') {
            toast.add({ severity: 'error', summary: 'Error Message', detail: response.html_message, life: 3000 });
            return;
        } else {
            topHeader.is_show_important_update = 0;
            localStorage.setItem('top_header', JSON.stringify(topHeader));
            window.open(config.baseUrlPanel, '_self');
        }
    }
};

// Function to fetch data from API
const fetchData = async () => {
    try {
        const response = await getUserData();
        // console.log(response, 'this is the response ');

        // // Update reactive variables with API data
        name.value = response.sale_poc_data.sales_poc_name;
        email.value = response.sale_poc_data.sales_poc_email;
        mobile.value = response.sale_poc_data.sales_poc_mobile;
        pdf_link.value = response.sale_poc_data.pdf_link;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Call the fetchData function when the component is mounted
onMounted(() => {
    fetchData();
});
</script>


<template>
    <div class="max-w-[944px] md:max-w-auto mx-auto h-full md:min-h-[89vh]">
        <div class="header flex md:flex-col gap-2 md:gap-4 justify-center item-left md:items-center p-[10px] md:p-[30px] px-[22px] md:px-[12px] dark:text-[#dfdfdf]">
            <img :src="getImg('ic_update@2x')" class="w-[24px] h-[24px] md:w-[48px] md:h-[48px]" />
            <p class="headerPara font-bold text-[13px] md:text-[24px]">Rate Update : Effective Feb 15th 2024</p>
        </div>
        <!-- second section start here  -->
        <div class="section-1-card rounded-[8px] border-[1px] dark:border-none bg-[#fff] dark:bg-[#3D3D3D] dark:text-[#dfdfdf] px-[24px] py-[12px] md:px-[30px] md:py-[32px]">
            <div class="section-1-card__main">
                <p class="text-[13px] md:text-[14px] mb-[16px]">We're making some changes to ensure you keep getting the best shipping experience! Our rates are updating on February 15th, 2024</p>
                <p class="text-[13px] md:text-[14px] font-semibold mb-[1px]">What do these changes mean for you?</p>
                <p class="text-[13px] md:text-[14px]">
                    To help your understand the impact, We've attached a detailed PDF breakdown of the new rates based on different shipment types and weights.
                    <a :href="pdf_link" download target="_blank" @click="getDownloadInfo()">Download updated rates</a>
                </p>
                <p class="text-[13px] md:text-[14px] mb-[1px]">We appreciate your understanding and continued support. As always, reach out if you need anything!</p>
                <!-- Dynamic name, email, and mobile number -->
                <p class="text-[13px] md:text-[14px]"><b>Name :</b> {{ name }} | <b>Contact No :</b> {{ mobile }} | <b>Email ID :</b> {{ email }}</p>
                <div class="important_button flex flex-col justify-center items-center">
                    <button type="Submit" @click="getAcknowledgeData('acknowledge')" class="rounded-[6px] mt-[16px] border-[1px] dark:border-none bg-[#1279FF] text-[#fff] dark:text-[#dfdfdf] w-[140px] h-[40px] text-[14px] font-medium px-[10px]">
                        <span class="text-[12px] md:text-[14px]">I Acknowledge</span>
                    </button>
                    <button type="Submit" @click="getAcknowledgeData('close')" class="mt-[10px] text-[#1279FF] text-[14px] font-medium px-[10px]">
                        <span class="border-b-[1px] border-b-[#1279FF] dark:text-[#1279ff]">Close</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../../assets/itl-common-css/common-css.scss';
.header {
    font-family: $interBold;
}
.headerPara {
    font-family: $interSemiBold;
}
.section-1-card__main {
    font-family: $interRegular;
}
// .section-1-card__main p{
//     margin-bottom: 16px !important;
// }
// .section-1-card__main h6{

//     margin-bottom: 2px !important;
//     font-weight: 500;
// }
.section-1-card {
    box-shadow: 0 4px 10px #3f474f26;
}
.important_button {
    font-family: $interSemiBold;
}
.section-1-card__main a {
    color: #1279ff;
}
</style>
