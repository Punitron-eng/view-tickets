import { ref, Ref } from 'vue';

interface ProductVariables {
    previewImage: string;
    inputWidth: string;
    categodyptions: { id: number; value: string }[];
    imageUploadData: { label: string; selectedImage: null | string; hideImageBtn: boolean; isLoading: boolean }[];
    productUploadImg: Array<[]>;
    sku: string;
    hsncode: string;
    productName: string;
    price:string;
    length: string;
    width: string;
    height: string;
    actualWeight: string;
    volumatricWeight: string;
    showError: boolean;
    showImageError: boolean;
    productCategoryId:any;
    isLoadingSubmit:boolean;
    iskeleton:boolean;
    modalTitle:string;
    isAdmin : boolean,
    vendorData :Array<[]>,
    rowIdValue:string
}

export const productVariables: Ref<ProductVariables> = ref({
    previewImage:'',
    inputWidth:'w-[100%]',
    categodyptions : [
        { id: 1, value: 'Channel 1Channel 1Channel 1Channel 1Channel 1Channel 1Channel 1Channel 1Channel 1Channel 1Channel 1Channel 1Channel 1Channel 1Channel 1Channel 1Channel 1Channel 1Channel 1Channel 1Channel 1Channel 1' },
        { id: 2, value: 'bhavbna' },
        { id: 3, value: 'Channel 3' }
    ],
    imageUploadData : [
        { label: '', selectedImage: null, hideImageBtn: true, isLoading: false },
        { label: '', selectedImage: null, hideImageBtn: true, isLoading: false },
        { label: '', selectedImage: null, hideImageBtn: true, isLoading: false },
    ],
    productUploadImg : [],
    sku: '',
    hsncode: '',
    productName: '',
    productCategoryId:'',
    price:'',
    length: '',
    width: '',
    height: '',
    actualWeight: '',
    volumatricWeight: '',
    showError: false,
    showImageError: false,
    isLoadingSubmit:false,
    iskeleton:false,
    modalTitle:"Add",
    isAdmin : false,
    vendorData :[],
    rowIdValue:''
});