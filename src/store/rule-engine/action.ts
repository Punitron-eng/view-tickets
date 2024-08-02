import { RULEENGINE } from './constants';
import { getRuleListData, cloneRuleList } from '../../api/rule-engine/RuleEngineList';

const createActions = () => ({
    async [RULEENGINE.ACTIONS.GETRULELISTDATA](context: any, payload: any) {
        const listData = await getRuleListData(payload);
        context.commit(RULEENGINE.MUTATIONS.SETRULELISTDATA, listData);
    },
    async [RULEENGINE.ACTIONS.GETLOGISTICSDATA](context: any, payload: any) {
        context.commit(RULEENGINE.MUTATIONS.SETLOGISTICSDATA, payload);
    },
    async [RULEENGINE.ACTIONS.GETDROPDOWNDATA](context: any, payload: any) {
        // console.log('action call for drop down data', payload)
        context.commit(RULEENGINE.MUTATIONS.SETDROPDOWNDATA, payload);
    },
    async [RULEENGINE.ACTIONS.GETRULENAME](context: any, payload: any) {
        // console.log('action call rule name data', payload)
        context.commit(RULEENGINE.MUTATIONS.SETRULENAME, payload);
    },
    async [RULEENGINE.ACTIONS.GETSHOWCHANNELDATA](context: any, payload: any) {
        // console.log('action call show channel data', payload)
        context.commit(RULEENGINE.MUTATIONS.SETSHOWCHANNELDATA, payload);
    },
    async [RULEENGINE.ACTIONS.GETWAREHOUSEDATA](context: any, payload: any) {
        // console.log('action call show warehouse data', payload)
        context.commit(RULEENGINE.MUTATIONS.SETWAREHOUSEDATA, payload);
    },
    async [RULEENGINE.ACTIONS.GETDISABLEDDROPDOWN](context: any, payload: any) {
        // console.log('action call dropdown disabled data', payload)
        context.commit(RULEENGINE.MUTATIONS.SETDISABLEDDROPDOWN, payload);
    },
    async [RULEENGINE.ACTIONS.GETADDSTATECITY](context: any, payload: any) {
        // console.log('action call add state city data array', payload)
        context.commit(RULEENGINE.MUTATIONS.SETADDSTATECITY, payload);
    },
    async [RULEENGINE.ACTIONS.GETSTATEAPIDATA](context: any, payload: any) {
        // debugger
        // console.log('action call state api data', payload)
        context.commit(RULEENGINE.MUTATIONS.SETSTATEAPIDATA, payload);
    },
    async [RULEENGINE.ACTIONS.GETCITYAPIDATA](context: any, payload: any) {
        // debugger
        // console.log('action call city api data', payload)
        context.commit(RULEENGINE.MUTATIONS.SETCITYAPIDATA, payload);
    },
    async [RULEENGINE.ACTIONS.GETSHOWSTATECITYDATA](context: any, payload: any) {
        // debugger
        // console.log('action call show state city data', payload)
        context.commit(RULEENGINE.MUTATIONS.SETSHOWSTATECITYDATA, payload);
    },
    async [RULEENGINE.ACTIONS.GETSHOWSTOREDATA](context: any, payload: any) {
        // debugger
        // console.log('action call show store data', payload)
        context.commit(RULEENGINE.MUTATIONS.SETSHOWSTOREDATA, payload);
    },
    async [RULEENGINE.ACTIONS.GETSELECTEDVENDORID](context: any, payload: any) {
        context.commit(RULEENGINE.MUTATIONS.SETSELECTEDVENDORID, payload);
    },
    async [RULEENGINE.ACTIONS.GETCLONEDATA](context: any, payload: any) {
        const cloneData = await cloneRuleList(payload);
        // console.log(cloneData);
        context.commit(RULEENGINE.MUTATIONS.SETCLONEDATA,cloneData)
    },
    async[RULEENGINE.ACTIONS.GETCHANNELDATA](context:any,payload:any){
        context.commit(RULEENGINE.MUTATIONS.SETCHANNELDATA,payload)
    },
});

export default createActions;
