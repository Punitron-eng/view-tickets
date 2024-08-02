import { apiHandler } from '../common/api';

export const sendMail = async () => {
    const apiPath = 'capital_capture_lead/capital-capture-lead.php';
    const result = await apiHandler(apiPath);
    return result;
};
