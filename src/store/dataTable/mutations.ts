import { subDays, format, startOfMonth, subMonths } from 'date-fns';

const createMutations = () => ({
    setDefaultColumn(state: any, payload: any) {
        state.defaultColumn = payload;
    },
    setPageCount(state: any, payload: any) {
        state.allFilterData.paginatorLast = Number(payload.page_count);
    },
    clearAllFilter(state: any) {
        state.allFilterData = {
            items: '',
            order_id: '',
            amount: '',
            refund_amount: '',
            customer: '',
            order_date: { id: '', value: '', label: '' },
            requested_date: { id: '', value: '', label: '' },
            rejected_date: { id: '', value: '', label: '' },
            dt_status: { id: [], value: [] },
            payment: { id: [], value: [] },
            awb_no: { id: [], value: [] },
            return_reason: { id: [], value: [] },
            delivery_warehouse: { id: [], value: [] },
            origin_warehouse: { id: [], value: [] },
            paginatorStart: 0,
            paginatorLast: 10,
            search: '',
            vendor_name: { id: [], value: [] },
            pending_complete: '',
            requested_rejected: '',
        };

        const startDate = subDays(new Date(), 29);
        const endDate = new Date();
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');

        const dateKey = state.selectedTab === 'rev_return_request' ? 'requested_date' : 'order_date';

        state.allFilterData[dateKey].value = `${formattedStartDate} ${formattedEndDate}`;
        state.allFilterData[dateKey].id = 'last_30_days';
    },
    setOrderInput: (state: any, payload: Number) => (state.allFilterData.search = payload),
    setPaginatorStart: (state: any, payload: Number) => (state.allFilterData.paginatorStart = payload),
    setDateRange: (state: any, payload: any) => {
        const dateKey = state.selectedTab === 'rev_return_request' ? 'requested_date' : 'order_date';
        state.allFilterData[dateKey].value = payload.date;
        state.allFilterData[dateKey].id = payload.selectedLabel;
    },
});
export default createMutations;
