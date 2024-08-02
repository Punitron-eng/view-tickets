interface IsStringOptions {
    strict: boolean;
}

/**
 * Options for configuring precision of the amount.
 */
interface CheckAmountOptions {
    /** The precision for the digits on the left side of the decimal point. */
    leftPrecision?: number;
    /** The precision for the digits on the right side of the decimal point. */
    rightPrecision?: number;
}

/**
 * Interface defining options for validating a name.
 */
interface IsNameOptions {
    /**
     * Specifies the expected number of words in the name.
     */
    wordsCount?: number;
}

/**
 * Checks if a given value is a number or can be parsed into a valid number.
 * @param value The value to be checked, can be a number or a string.
 * @returns True if the value is a number or can be parsed into a valid number, otherwise false.
 */
export const isNumber = (value: number | string): boolean => {
    if (typeof value != 'number') value = Number(value);
    if (typeof value == 'number' && !Number.isNaN(value)) return true;
    return false;
};

/**
 * Checks if a value is a string.
 *
 * @param value - The value to be checked, which a string.
 * @param options - (Optional) Additional options for the string check.
 * @param options.strict - (Optional) If set to `true`, performs a strict check to consider `NaN` as a valid string.
 * @returns `true` if the value is a string, `false` otherwise.
 */
export const isString = (value: string, options?: IsStringOptions): boolean => {
    if (value.charAt(0) == ' ') return false;
    if (options) {
        if (options.strict) {
            return Number.isNaN(Number(value));
        }
    } else {
        if (typeof value != 'string') value = String(value);
        return typeof value == 'string';
    }
    return false;
};

/**
 * Checks if a given value is a valid email address.
 * @param value The value to be checked.
 * @returns True if the value is a valid email address, otherwise false.
 */
export const isEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
};

/**
 * Checks if a password meets certain criteria.
 * @param {string} value - The password string to be checked.
 * @returns {boolean} Returns true if the password meets all criteria, otherwise false.
 */
export const checkPassword = (value: string): boolean => {
    if (value.charAt(0) == ' ') return false;
    const hasEightChars = value.length >= 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasCapitalLetter = /[A-Z]/.test(value);

    return hasEightChars && hasSpecialChar && hasNumber && hasCapitalLetter;
};

/**
 * Checks if a value represents a valid mobile number.
 * @param {number | string} value - The value to be checked. It can be either a number or a string.
 * @returns {boolean} Returns true if the value represents a valid mobile number, otherwise false.
 */
export const checkMobileNumber = (value: number | string): boolean => {
    if (typeof value != 'number') value = Number(value);
    if (typeof value == 'number' && !Number.isNaN(value)) {
        value = String(value);
        if (value.charAt(0) == ' ') return false;
        return value.length == 10;
    }
    return false;
};

/**
 * Checks if a value represents a valid amount according to specified precision options.
 * @param {number | string} value - The value to be checked. It can be either a number or a string.
 * @param {CheckAmountOptions} [options] - Optional. An object specifying precision options.
 * @returns {boolean} Returns true if the value represents a valid amount, otherwise false.
 */
export const checkAmount = (value: number | string, options?: CheckAmountOptions): boolean => {
    value = String(value);
    if (value.charAt(0) == ' ') return false;
    let temp = value.split('.');
    if (options) {
        if (options.leftPrecision) {
            if (temp[0].length != options.leftPrecision) return false;
        }
        if (options.rightPrecision) {
            if (temp[1].length != options.rightPrecision) return false;
        }
    } else {
        if (temp[0].length != 2) return false;
        if (temp[1].length != 2) return false;
    }
    return true;
};

/**
 * Checks if the provided string is a valid name according to specified options.
 * @param value The string to be checked.
 * @param options (Optional) Additional options for validation.
 * @returns true if the string is a valid name; otherwise, false.
 */
export const isName = (value: string, options?: IsNameOptions): boolean => {
    const charArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' '];
    let containsInvalidChar = false;

    value = String(value);
    if (value.charAt(0) == ' ') return false;

    [...value].forEach((e) => {
        if (!charArray.includes(e.toLowerCase())) {
            containsInvalidChar = true;
            return;
        }
    });
    if (containsInvalidChar) return false;

    if (options) {
        console.log(value.split(' '));
        if (options.wordsCount) {
            const wordsCountArray = value.split(' ');
            const wordsCount = wordsCountArray.filter((el) => {
                return el.length != 0;
            }).length;
            if (wordsCount != options.wordsCount) return false;
        }
    }

    return true;
};

/**
 * Checks if the provided value is a valid Aadhaar number.
 * @param value - The value to be checked, can be either a string or a number.
 * @returns A boolean indicating whether the provided value is a valid Aadhaar number.
 */
export const checkAadhar = (value: string | number): boolean => {
    value = String(value);

    if (value.length != 12) return false;
    if (!isNumber(value)) return false;

    return true;
};

/**
 * Checks if the provided value is a valid PAN (Permanent Account Number) number.
 * @param value - The PAN number to be checked.
 * @returns A boolean indicating whether the provided value is a valid PAN number.
 */
export const checkPan = (value: string): boolean => {
    value = value.trim().toUpperCase();

    if (value.length !== 10) {
        return false;
    }

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value)) {
        return false;
    }

    const lastChar = value.charAt(9);
    if (!/^[A-Z]$/.test(lastChar)) {
        return false;
    }

    return true;
};

/**
* Checks if a value is alphanumeric.
* @param value The value to be checked.
* @returns True if the value is alphanumeric, otherwise false.
*/
export const isAlphanumeric = (value: string): boolean => {
    return /^[a-zA-Z0-9]+$/.test(value);
};
/* Validates if the provided value is a valid Indian PIN code.
 * @param value - The PIN code to be checked.
 * @returns A boolean indicating whether the provided value is a valid Indian PIN code.
 */
export const isValidIndianPinCode = (value: string): boolean => {
    // Ensure the input is a string and not empty
    if (typeof value !== 'string' || value.trim() === '') {
        return false;
    }

    // Check if the length is exactly 6 characters
    if (value.length !== 6) {
        return false;
    }

    // Use a regular expression to match the pattern of an Indian PIN code
    const pinCodePattern = /^[1-9][0-9]{5}$/;

    // Test the value against the pattern
    return pinCodePattern.test(value);
};

/**
 * Checks if a value represents a valid weight with up to three digits after the decimal point.
 * @param {number | string} value - The value to be checked. It can be either a number or a string.
 * @returns {boolean} Returns true if the value has up to three digits after the decimal point, otherwise false.
 */
export const checkWeight = (value: number | string): boolean => {
    value = String(value);
    if (value.charAt(0) == ' ') return false;
    let temp = value.split('.');
    if (temp.length > 1 && temp[1].length > 3) return false;
    return true;
};
