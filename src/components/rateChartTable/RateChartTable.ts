import { ref } from 'vue';

export const logisticsData = ref(null)

export const simplifyDecimal = (str: string) => {
    const decimalNumber = parseFloat(str);
    const hasNonZeroDecimalPart = decimalNumber.toString().split(".")[1] !== "0";
    const formattedNumber = hasNonZeroDecimalPart ? decimalNumber.toFixed(1) : decimalNumber;

    return formattedNumber;
}
