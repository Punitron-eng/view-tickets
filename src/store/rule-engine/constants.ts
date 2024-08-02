export const RULEENGINE = {
    NAME: 'RULEENGINE',
    ACTIONS: {
        GETRULELISTDATA: 'getrulelistdata', // get data of Selected Vendor
        GETLOGISTICSDATA: 'getlogisticsdata',
        GETDROPDOWNDATA: 'getdropdowndata', // get user input dropdown data channelData
        GETRULENAME: 'getrulename', // get rule name data
        GETSHOWCHANNELDATA: 'getshowchanneldata', // show channel data(boolean)
        GETWAREHOUSEDATA: 'getwarehousedata', // get warehouse data(boolean)
        GETDISABLEDDROPDOWN: 'getdisableddropdown', // get disabled dropdown value(boolean)
        GETADDSTATECITY: 'getaddstatecity', //get the addstatecity array
        GETSTATEAPIDATA: 'getstateapidata', //get the state api data
        GETCITYAPIDATA: 'getcityapidata', //get the city api data
        GETSHOWSTATECITYDATA: 'getshowstatecitydata', // get show statecity data (boolean)
        GETSHOWSTOREDATA: 'getshowstoredata', // show store data(boolean)
        GETSELECTEDVENDORID: 'getselectedvendorID', // get vendor Data
        GETCLONEDATA: 'getCloneData', // show Clone Data
    },
    MUTATIONS: {
        SETRULELISTDATA: 'setrulelistdata', // update the data in vendorListData variable
        SETLOGISTICSDATA: 'setlogisticsdata',
        SETDROPDOWNDATA: 'setdropdowndata', // set user input dropdown data
        SETRULENAME: 'setrulename', // update rule name
        SETSHOWCHANNELDATA: 'setshowchanneldata', // update channel data(boolean)
        SETWAREHOUSEDATA: 'setwarehousedata', // update warehouse data(boolean)
        SETDISABLEDDROPDOWN: 'setdisableddropdown', // update disabled dropdown value(boolean)
        SETADDSTATECITY: 'setaddstatecity', //update the addstatecity array
        SETSTATEAPIDATA: 'setstateapidata', //update the state api data
        SETCITYAPIDATA: 'setcityapidata', //update the city api data
        SETSHOWSTATECITYDATA: 'setshowstatecitydata', // update show statecity data (boolean)
        SETSHOWSTOREDATA: 'setshowstoredata', // update show store data(boolean)
        SETSELECTEDVENDORID: 'setSelectedVednorID', // get vendor Data
        SETCLONEDATA: 'setCloneData', // show Clone Data
    },
    GETTERS: {
        RULELISTDATA: 'rulelistdata', // get the state vendorListData variable
        LOGISTICSDATA: 'logisticsdata',
        DROPDOWNDATA: 'dropdowndata', // get user input dropdown data variable
        RULENAME: 'rulename', // get rule name data
        SHOWCHANNELDATA: 'showchanneldata', // get the show channel data(boolean)
        SHOWWAREHOUSEDATA: 'warehousedata', // get the warehouse data
        DISABLEDDROPDOWNDATA: 'disableddropdowndata', // get disabled dropdown value(boolean)
        ADDSTATECITYDATA: 'addstatecitydata', //get the addstatecity array
        STATEAPIDATA: 'stateapidata', //get the state api data
        CITYAPIDATA: 'cityapidata', //get the city api data
        SHOWSTATECITYDATA: 'showstatecitydata', // get the showstatecitydata
        SHOWSTOREDATA: 'showstoredata', // update show store data(boolean)
        SHOWVENDORID: 'showVendorID', // get vendor Data
        SHOWCLONEDATA: 'showCloneData', //  show Clone Data
    },
};
