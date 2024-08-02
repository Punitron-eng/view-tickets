export interface Reason {
    id: number;
    value: string;
    is_checked: boolean;
}

export type ReturnReasons = Array<Reason>;

export interface VendorData {
    id: number | null;
    name: string | null;
}

export interface TopHeaderValues {
    user_type: number;
}

export interface DropdownValue {
    id: number;
    value: string;
}

export type DropdownOptions = Array<DropdownOptions>;

export interface ChannelValue extends DropdownValue {}

export interface StoreValue extends DropdownValue {}

// export interface FileInfo {
//     fileRemoteName: string,
//     fileName: string
// }
