const createGetters = () => ({
    getUpdateColumn: (state: any) => state.defaultColumn,
    getPaginatorLastValue: (state: any) => {
        const total = state.reverseData.recordsTotal;
        let last = state.allFilterData.paginatorStart + Number(state.allFilterData.paginatorLast);
        if (last > total) {
            last = total;
        }
        return last;
    },
    getPaginatorRow: (state: any) => state.allFilterData.paginatorLast,
    setPaginatorStart: (state: any) => state.allFilterData.paginatorStart,
    getPaginatorStateValue: (state: any) => state.allFilterData.paginatorStart,
    getViewSavedFilterData: (state: any) => state.viewSaveFilteredData,
    getVendorModalPayload: (state: any) => state.vendorData,
    getVendorStatus: (state: any) => state.vendorDataStatus,
    getAllFilterData: (state: any) => state.allFilterData,
    // getDataTableData: (state: any) => state.reverseData,
    getUpdatedSizePayload: (state: any) => state.dataTableSizePayload,
    getSavedDataTableResponse: (state: any) => state.savedDatatableResponse,
    getSavedFilterResponse: (state: any) => state.saveFilterResponse,
    getexportStatus: (state: any) => state.exportStatus,
    getVendorValue: (state: any) => state.allFilterData.vendor_name,
    getMappedFilterData: (state: any) => {
        const allFilterData = {};
        for (const key in state.allFilterData) {
            if (Object.prototype.hasOwnProperty.call(state.allFilterData, key)) {
                const value = state.allFilterData[key];
                if (Array.isArray(value)) {
                    allFilterData[key] = value.join(',');
                } else if (value.label !== undefined) {
                    allFilterData[key] = value.label;
                } else if (key === 'amount' || key === 'refund_amount') {
                    const min = value.min;
                    const max = value.max;
                    if (min === '' || (min === 0 && max === 0)) {
                        allFilterData[key] = '';
                    } else {
                        allFilterData[key] = value;
                    }
                } else {
                    allFilterData[key] = value;
                }
            }
        }

        return allFilterData;
    },
    getMappedFilterPayload: (state: any) => {
        const allFilterData = {};

        for (const key in state.allFilterData) {
            if (state.allFilterData.hasOwnProperty(key)) {
                const value = state.allFilterData[key];
                if (value && typeof value === 'object' && value.hasOwnProperty('label')) {
                    allFilterData[key] = value.value;
                    allFilterData[`${key}Label`] = value.id;
                } else if (value && typeof value === 'object' && value.hasOwnProperty('id')) {
                    allFilterData[key] = value.id;
                } else {
                    allFilterData[key] = value;
                }
            }
        }

        // Add additional properties not present in state.allFilterData
        allFilterData.page_count = state.page_count;
        allFilterData.items = state.allFilterData.items == '>5' ? '6' : state.allFilterData.items;

        return allFilterData;
    },
});

export default createGetters;
