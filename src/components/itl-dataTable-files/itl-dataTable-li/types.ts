export interface Props {
    saveUpdateChild?: boolean;
    filterWithScroller?: boolean;
    allClearButton?: boolean;
    oneClearIcon?: boolean;
    hideSaveUpdateBtn?: boolean;
    saveUpdateFilter?: boolean;
    updateFilterData?: Object;
    checkField: string[];
}

export type Filter = Record<string, Number | string>;

export interface Filters {
    filters: Object;
}
