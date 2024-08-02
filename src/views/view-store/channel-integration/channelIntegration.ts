import { ref } from "vue"

export interface VariablesType {
    channelCards: any
}

export const variables = ref<VariablesType>({
    channelCards: [
        {
            id: 1,
            name: 'Shopify',
            image: `https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/channel-integration-shopify.svg`,
            integrateAvailable: false,

        },
        {
            id: 2,
            name: 'Magento',
            image: `https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/channel-integration-magento.svg`,
            integrateAvailable: true,

        },
        {
            id: 1,
            name: 'WooCommerce',
            image: `https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/channel-integration-woocommerce.svg`,
            integrateAvailable: true,

        },
        {
            id: 1,
            name: 'Shopify',
            image: `https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/channel-integration-shopify.svg`,
            integrateAvailable: true,

        },
        {
            id: 1,
            name: 'Shopify',
            image: `https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/channel-integration-shopify.svg`,
            integrateAvailable: true,

        },
        {
            id: 1,
            name: 'Shopify',
            image: `https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/channel-integration-shopify.svg`,
            integrateAvailable: true,

        },
        {
            id: 1,
            name: 'Shopify',
            image: `https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/channel-integration-shopify.svg`,
            integrateAvailable: true,

        },
    ]
})
