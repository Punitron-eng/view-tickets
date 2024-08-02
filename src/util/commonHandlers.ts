import { ref } from 'vue';
import config from './config';
import { useStore } from 'vuex';
// check user Type

interface TopHeader {
    user_type: string | number;
}

type User = 'vendor' | 'subadmin' | 'admin';

const topHeader: TopHeader = JSON.parse(localStorage.getItem('top_header') || 'false');

export const checkUserType = (user: User): boolean => {
    try {
        if (topHeader.user_type == '3' && user == 'vendor') return true;
        else if (topHeader.user_type == '2' && user == 'subadmin') return true;
        else if (topHeader.user_type == '1' && user == 'admin') return true;
        else false;
    } catch (err) {
        console.log(err.message, ' Error ');
        return false;
    }
    return false;
};

// check user Type

//access rights start
const connectPlusAccess: any = JSON.parse(localStorage.getItem('connect_plus_access_right') || '{}');
export const checkAccessRight = (value: string): boolean => {
    if (connectPlusAccess.is_full_access == 1) {
        if(connectPlusAccess.is_vendor_parent == 0){// deeep staff user
            if(connectPlusAccess.user_access_rights[value+'_access'] == 1){
                return true;
            } else {
                window.location.href = config.baseUrlPanel + 'logout';
            }
        } else {
            return true;
        }
    } else {
        return false;
    }
};
export const deepCheckAccessRight = (menuType: string, moduleName: string, accessValue: string): boolean => {
    if (connectPlusAccess.is_full_access == 0 && connectPlusAccess.user_access_rights[menuType][moduleName][accessValue] == 1) {
        return true;
    } else if(connectPlusAccess.is_full_access == 0 && connectPlusAccess.user_access_rights[menuType][moduleName]['view'] == 0) {
        window.location.href = config.baseUrlPanel + 'logout';
    } else if(menuType == 'checkout') {
        if(connectPlusAccess.is_full_access == 0 && connectPlusAccess.user_access_rights[menuType][moduleName]['view_'+accessValue] == 0){
            window.location.href = config.baseUrlPanel + 'logout';
        }
    }else {
        return false;
    }
};
//access rights end
