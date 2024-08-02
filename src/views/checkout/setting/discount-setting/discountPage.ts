import { ref} from 'vue';
import config from '../../../../util/config';
export const discountVariables = ref({
    isShowMore : false,
    showText:'more',
    discountDropdown:['ALL','ACTIVE','SCHEDULED','EXPIRED'],
    isActiveDiscount: 'ACTIVE',
    config: config,
    // tempDiscountArray:[
    //     {
    //         discountPrice: 'FLAT500',
    //         isActive: 'Active',
    //         startDate: '12/10/2023 - 15.00',
    //         createDate: '12/10/2023',
    //         discountAmount: '$500.00',            
    //         cutomerType: 'All customer',
    //         endDate: '12/10/2023 - 15:00',
    //         typeValue:'buy_x_get_y',
    //         totalCount:'15',
    //         combinations: 'Shopping Discount',
    //         class: 'active-btn'
    //     },
    //     {
    //         discountPrice: 'FLAT500',
    //         isActive: 'Inactive',
    //         startDate: '12/10/2023 - 15.00',
    //         createDate: '12/10/2023',
    //         discountAmount: '$500.00',            
    //         cutomerType: 'All customer',
    //         endDate: '12/10/2023 - 15:00',
    //         typeValue:'buy_x_get_y',
    //         totalCount:'15',
    //         combinations: 'Shopping Discount',
    //         class: 'inactive-btn'
    //     },
    //     {
    //         discountPrice: 'FLAT500',
    //         isActive: 'Active',
    //         startDate: '12/10/2023 - 15.00',
    //         createDate: '12/10/2023',
    //         discountAmount: '$500.00',            
    //         cutomerType: 'All customer',
    //         endDate: '12/10/2023 - 15:00',
    //         typeValue:'buy_x_get_y',
    //         totalCount:'15',
    //         combinations: 'Shopping Discount',
    //         class: 'active-btn'
    //     }
    // ]
    tempDiscountArray:[]
})
