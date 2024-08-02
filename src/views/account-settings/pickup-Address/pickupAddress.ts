import { ref } from 'vue';

interface DummyDataItem {
    id: string;
    address1: string;
    address2: string;
    city_id: string;
    city_name: string;
    company_name: string;
    country_id: string;
    country_name: string;
    email: string;
    gst_no: string;
    invoice_prefix: string;
    invoice_suffix: string;
    is_default: string;
    is_rto_same_as_pickup_address: string;
    mobile: string;
    pincode: string;
    rto_address_id: string;
    state_id: string;
    state_name: string;
    isActive: boolean;
    user_id: string;
    website: string;
    user_mobile: string;
}

export const dummyData = [
    {
        id: '34567',
        address1: 'SHED NO.01,DAMWALA COMPOUND',
        address2: 'OPP. CNG PUMP, BHESTAN',
        city_id: '1041',
        city_name: 'Surat',
        company_name: 'Gee Impex',
        country_id: '101',
        country_name: 'India',
        email: '',
        gst_no: 'NA',
        invoice_prefix: 'NA',
        invoice_suffix: '0',
        is_default: '1',
        is_rto_same_as_pickup_address: '1',
        mobile: '',
        pincode: '395023',
        rto_address_id: '0',
        state_id: '12',
        state_name: 'gujarat',
        isActive: true,
        user_id: '10',
        website: '',
        user_mobile: '7096605555',
    },
    {
        id: '2',
        address1: '456 Elm Street',
        address2: 'Suite 202',
        city_id: '1002',
        city_name: 'Los Angeles',
        company_name: 'XYZ Corp.',
        country_id: '103',
        country_name: 'USA',
        email: 'example2@example.com',
        gst_no: '987654321',
        invoice_prefix: 'NA',
        invoice_suffix: '002',
        is_default: '0',
        is_rto_same_as_pickup_address: '1',
        mobile: '9876543211',
        pincode: '90001',
        rto_address_id: '2',
        state_id: '23',
        state_name: 'California',
        isActive: false,
        user_id: '21',
        website: 'www.example2.com',
        user_mobile: '1234567891',
    },
    {
        id: '3',
        address1: '456 Elm Street',
        address2: 'Suite 202',
        city_id: '1002',
        city_name: 'Los Angeles',
        company_name: 'XYZ Corp.',
        country_id: '103',
        country_name: 'USA',
        email: 'example2@example.com',
        gst_no: '987654321',
        invoice_prefix: 'NA',
        invoice_suffix: '002',
        is_default: '0',
        is_rto_same_as_pickup_address: '1',
        mobile: '9876543211',
        pincode: '90001d',
        rto_address_id: '2',
        state_id: '23',
        state_name: 'California',
        isActive: true,
        user_id: '21',
        website: 'www.example2.com',
        user_mobile: '1234567891',
    },

];

