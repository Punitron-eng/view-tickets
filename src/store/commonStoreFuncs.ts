export const isobjectLabel = (value) => {
    if (typeof value === 'object' && value !== null) {
        if ('label' in value && value.label.length > 0 && value != undefined) {
            return true;
        }
    }
};
export function isObject(value) {
    if (typeof value === 'object' && value !== null) {
        if ('id' in value && Array.isArray(value.id) && value.id.length > 0) {
            return true;
        } else if ('min' in value && typeof value.min === 'string' && value.min.length > 0) {
            return true;
        }
    }

    return false;
}

export function updateFilterData(state, dataKey, newData) {
    state.allFilterData[dataKey] = newData;
}
export function updateGroupFilterData(state, dataKey, subDataKey, newData) {
    state.allFilterData[dataKey][subDataKey] = newData;
}

export function isObjectForCheckbox(value) {
    if (typeof value === 'object' && value !== null) {
        if ('id' in value && Array.isArray(value.id) && value.id.length > 0) {
            return true;
        }
    }
    return false;
}
export function isObjectForGroupCheckbox(value) {
    if (typeof value === 'object' && value !== null) {
        if (typeof value[Object.keys(value)[0]] === 'object' && value[Object.keys(value)[0]] !== null && !Array.isArray(value[Object.keys(value)[0]]) && Array.isArray(value[Object.keys(value)[0]].id)) {
            return true;
        }
    }
    return false;
}
export function isObjectForRadio(value) {
    if (typeof value === 'object' && value !== null) {
        if ('id' in value && !Array.isArray(value.id) && value.id !== '') {
            return true;
        }
    }
    return false;
}
export function isObjectForMinMax(value) {
    if (typeof value === 'object' && value !== null) {
        if ('min' in value && value.min != '') {
            return true;
        }
    }
    return false;
}
interface FormattedDataItem {
    [key: string]: any; // This allows for any string key with any value
    type: string; // This is a fixed property with a string value
}
export function formatFilterData(data: any) {
    const formattedData: FormattedDataItem[] = [];
    for (const key in data) {
        if (key != 'id' && key != 'name' && key != 'is_pinned' && key !== 'vendor_name') {
            if (key.length > 0 && typeof data[key] === 'string' && data[key]) {
                formattedData.push({
                    type: 'search',
                    [key]: data[key],
                });
            } else if (isobjectLabel(data[key])) {
                formattedData.push({
                    type: 'dateRange',
                    [key]: data[key],
                });
            } else if (isObjectForMinMax(data[key])) {
                formattedData.push({
                    type: 'minMax',
                    [key]: data[key],
                });
            } else if (isObjectForCheckbox(data[key])) {
                formattedData.push({
                    type: 'multiSelect',
                    [key]: data[key],
                });
            } else if (isObjectForRadio(data[key])) {
                formattedData.push({
                    type: 'multiSelect',
                    [key]: data[key],
                });
            } else if (isObjectForGroupCheckbox(data[key])) {
                formattedData.push({
                    type: 'mutipleArraySelectCheckbox',
                    [key]: data[key],
                });
            }
        }
    }
    return formattedData;
}

export const findTypeIndex = (payload: any): number => {
    const entries = Object.keys(payload);
    return entries.indexOf('type') == 0 ? 1 : 0;
};

export const setFilterValue = (state: any, payloads: any) => {
    payloads.forEach((payload) => {
        const dataKey = Object.keys(payload)[1];
        const temp = { id: [], value: [] };
        switch (payload.type) {
            case 'mutipleArraySelectCheckbox':
                for (const key in payload[dataKey]) {
                    const tempfilterType9 = { id: [], value: [] };
                    payload[dataKey][key].forEach((values) => {
                        const [id, value] = values.split(',');
                        tempfilterType9.id.push(id);
                        tempfilterType9.value.push(value);
                    });
                    updateGroupFilterData(state, dataKey, key, { ...tempfilterType9 });
                }
                break;
            case 'dateRange':
                const dateRangeData = payload[dataKey];
                updateFilterData(state, dataKey, { id: dateRangeData.selectedLabel, value: dateRangeData.selectedDate, label: dateRangeData.label });
                break;
            case 'multiSelect':
            case 'vendorModal':
                payload[dataKey].forEach((values) => {
                    const [id, value] = values.split(',');
                    temp.id.push(id);
                    temp.value.push(value);
                });
                updateFilterData(state, dataKey, { ...temp });
                break;
            case 'radio':
            case 'search':
            case 'sort':
            case 'minMax':
                updateFilterData(state, dataKey, payload[dataKey]);
                break;
            case 'dropdownRadio':
                payload[dataKey].id !== undefined ? (temp.id = payload[dataKey].id) : (temp.id = '');
                payload[dataKey].value && payload[dataKey].value !== undefined ? (temp.value = payload[dataKey].value) : (temp.value = '');
                updateFilterData(state, dataKey, { ...temp });
                break;
        }
    });
};

// export const clearFilterByField = (state, key) => {
//     const item = state.allFilterData[key];
//     const tempFilterData = { ...state.allFilterData };

//     if (typeof item === 'object') {
//         if (Array.isArray(item)) {
//             tempFilterData[key] = [];
//         } else if (item.min || item.max) {
//             tempFilterData[key] = '';
//         } else {
//             if ('label' in item) {
//                 tempFilterData[key] = { id: '', value: '', label: '' };
//             } else {
//                 tempFilterData[key] = { id: [], value: [] };
//             }
//             if (key === dataVariables.value.syncDateName) {
//                 const startDate = subDays(new Date(), 29);
//                 const endDate = new Date();
//                 const formattedStartDate = format(startDate, 'yyyy-MM-dd');
//                 const formattedEndDate = format(endDate, 'yyyy-MM-dd');
//                 tempFilterData[key].value = `${formattedStartDate} ${formattedEndDate}`;
//                 tempFilterData[key].id = 'last_30_days';
//             }
//         }
//     } else {
//         tempFilterData[key] = '';
//     }

//     state.allFilterData = { ...tempFilterData };
// };

export const getFilterMappedValues = (state: any) => {
    const allFilterData = {};
    for (const key in state.allFilterData) {
        if (key != 'paginatorStart' && key != 'paginatorLast') {
            const value = state.allFilterData[key];
            let filteredValue: any = '';
            if (typeof value === 'object' && 'label' in value) {
                filteredValue = value.label === undefined ? '' : value.label;
            } else if (typeof value === 'object' && 'id' in value && Array.isArray(value.id)) {
                if (value.value !== undefined && value.value.length > 0) {
                    filteredValue = value.value.join(',');
                }
            } else if (typeof value === 'object' && 'id' in value && !Array.isArray(value.id)) {
                if (value.value !== undefined && value.value.length > 0) {
                    filteredValue = value.value;
                }
            } else if (typeof value === 'object' && 'min' in value) {
                const min = value.min;
                const max = value.max;
                if (min !== '' && max !== '' && (min !== 0 || max !== 0)) {
                    filteredValue = value;
                } else {
                    filteredValue = '';
                }
            } else if (typeof value === 'object' && !('id' in value)) {
                const newData = {};
                for (const key in value) {
                    if (value.hasOwnProperty(key) && value[key].value.length > 0) {
                        newData[key] = value[key].value.join(',');
                    }
                }
                filteredValue = Object.keys(newData).length === 0 ? '' : newData;
            } else {
                filteredValue = value;
            }
            allFilterData[key] = filteredValue;
        }
    }
    return allFilterData;
};

export const getFilterMappedPayload = (state: any) => {
    const allFilterData = {};

    for (const key in state.allFilterData) {
        if (state.allFilterData.hasOwnProperty(key)) {
            const value = state.allFilterData[key];
            if (value && typeof value === 'object' && value.hasOwnProperty('label')) {
                allFilterData[key] = value.value;
                allFilterData[`${key}_label`] = value.id;
            } else if (value && typeof value === 'object' && value.hasOwnProperty('id')) {
                allFilterData[key] = value.id;
            } else {
                allFilterData[key] = value;
            }
        }
    }

    return allFilterData;
};

export const setApplySaveFilterData = (state: any, selectedFilter: any) => {
    selectedFilter.forEach((payload) => {
        const dataKey = Object.keys(payload)[0];
        const temp = { id: [], value: [] };

        switch (payload.type) {
            case 'mutipleArraySelectCheckbox':
                for (const key in payload[dataKey]) {
                    const tempfilterType9 = { id: [], value: [] };
                    tempfilterType9.id = payload[dataKey][key].id;
                    tempfilterType9.value = payload[dataKey][key].value;
                    updateGroupFilterData(state, dataKey, key, { ...tempfilterType9 });
                }
                break;
            case 'dateRange':
                const dateRangeData = payload[dataKey];
                updateFilterData(state, dataKey, { id: dateRangeData.id, value: dateRangeData.value, label: dateRangeData.label });
                break;
            case 'multiSelect':
            case 'vendorModal':
                temp.id = payload[dataKey].id;
                temp.value = payload[dataKey].value;
                updateFilterData(state, dataKey, { ...temp });
                break;
            case 'radio':
            case 'search':
            case 'sort':
            case 'minMax':
            case 'dropdownRadio':
                updateFilterData(state, dataKey, payload[dataKey]);
                break;
        }
    });
};

export const setViewSaveFilterData = (state: any, item: any, tempFilterObject: any, index: any, filterData: any) => {
    item.forEach((payload: any) => {
        const dataKey = Object.keys(payload)[findTypeIndex(payload)];
        const datetemp = { id: [], value: [], label: '' };
        const temp = { id: [], value: [] };

        switch (payload.type) {
            case 'mutipleArraySelectCheckbox':
                tempFilterObject = { ...tempFilterObject, [dataKey]: { ...payload[dataKey] } };
                break;
            case 'dateRange':
                datetemp.id = payload[dataKey].id;
                datetemp.value = payload[dataKey].value;
                datetemp.label = payload[dataKey].id;
                tempFilterObject = { ...tempFilterObject, [dataKey]: { ...datetemp } };
                break;
            case 'multiSelect':
            case 'vendorModal':
                temp.id = payload[dataKey].id;
                temp.value = payload[dataKey].value;
                tempFilterObject = { ...tempFilterObject, [dataKey]: { ...temp } };
                break;
            case 'search':
            case 'radio':
            case 'minMax':
            case 'dropdownRadio':
                tempFilterObject[dataKey] = payload[dataKey];
                tempFilterObject = { ...tempFilterObject };
                break;
        }
    });
    tempFilterObject['name'] = filterData.data[index].filter_name;
    tempFilterObject['id'] = filterData.data[index].id;
    tempFilterObject['is_pinned'] = filterData.data[index].is_pinned;
    state.viewSaveFilteredData.push(tempFilterObject);

    state.viewSaveFilteredData = state.viewSaveFilteredData.map((item) => {
        const filteredItem = {};
        if (item) {
            for (const key in item) {
                const value = item[key];
                if ((value.length >= 0 && typeof value === 'string') || isObject(value) || isobjectLabel(value) || isObjectForMinMax(value) || isObjectForGroupCheckbox(value) || key === 'id' || key === 'is_pinned') {
                    filteredItem[key] = value;
                }
            }
        }

        return filteredItem;
    });
};
