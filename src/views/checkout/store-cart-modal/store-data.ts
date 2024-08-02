export const Data={
    StoreData:{
        type:'store',
        basic:{
            cart_id:"ITL00010",
            order_date:"2/3/2023",
            amount:"₹800.00",
            time_iniated:'12:45 PM',
            checkout_stage:'Address added',
            transaction_id:'SUN8392FBSDG4',
            
        },
        customer:{
            name:'Akash Kumbhar',
            phone:'+91 8291000290'
        },
        products : [
            {
                product: {
                    image: 'https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/placeholder-products.svg',
                    value: 'Men Waterproof Sailing Jacket',
                    class:'max-w-12rem text-left'
                },
                qty: '1',
                sku: 'HSDN7280',
                hsn_code: '6739100020',
                discount: '-₹40.00',
                tax_rate: '₹3.45',
                price: '₹1500.00',
            },
            {
                product: {
                    image: 'https://itl-dashboard-aws.s3.ap-south-1.amazonaws.com/my-alpha/theme3/assets/images/placeholder-products.svg',
                    value: 'Blue Dail Analog Watch',
                    class:'max-w-12rem text-left'
                },
                qty: '1',
                sku: 'HSDN7280',
                hsn_code: '6739100020',
                discount: '-₹40.00',
                tax_rate: '₹3.45',
                price: '₹3100.00',
            },
        ],
        ColoumnKey : [
            {
                field: 'loop_product_title',
                header: 'Product',
            },
            {
                field: 'loop_product_quantity',
                header: 'QTY',
            },
            {
                field: 'loop_product_sku',
                header: 'SKU',
            },
            // {
            //     field: 'loop_hsn_code',
            //     header: 'HSN CODE',
            // },
            {
                field: 'loop_final_total_discount',
                header: 'DISCOUNT',
            },
            // {
            //     field: 'loop_final_total_tax',
            //     header: 'TAX RATE',
            // },
            {
                field: 'loop_product_price',
                header: 'PRICE',
            },
        ],
        other_details:{
            deliver_method:'SND',
            fulfilment:'unfulfilled',
            tags:['think','confirmed' ]
        }
    }
}


loop_final_total_discount
: 
"0.00"
loop_final_total_tax
: 
"0.00"
loop_hsn_code
: 
"abcd"
loop_is_gift
: 
""
loop_product_price
: 
"150.00"
loop_product_quantity
: 
"0"
loop_product_sku
: 
""
loop_product_title
: 
""
loop_product_total_price
: 
"0.00"