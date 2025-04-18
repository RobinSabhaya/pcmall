/**
 * Create a common function for check mongodb's objectId is valid or not.
 */
const objectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
        return helpers.message('"{{#label}}" must be a valid mongo id');
    }
    return value;
};

/**
 * Create a common function for check the password is valid or not.
 */
const password = (value, helpers) => {
    if (value.length < 8) {
        return helpers.message('password must be at least 8 characters');
    }
    if (!value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,}$/)) {
        return helpers.message(
            'Password must be at least 8 characters long, and contains at least 1 uppercase, 1 lowercase, and 1 special characters.'
        );
    }
    return value;
};

/**
 * Check instagram username is valid or not
 * @param {string} value
 * @param {*} helpers
 * @returns
 */
const instagramUserName = (value, helpers) => {
    if (!value.match(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim)) {
        return helpers.message('Invalid instagram username');
    }

    return value;
};

/**
 * If fund_updated_at is not filled then undisclosed_fund_date set as a true
 * @param {boolean} value
 * @param {*} helpers
 * @returns
 */
const undisclosedFundDate = (value, helpers) => {
    let { fund_updated_at, undisclosed_fund_date } = helpers.state.ancestors[0];
    if (!fund_updated_at && !undisclosed_fund_date) {
        return true;
    }

    return value;
};

/**
 * If announced_date is not filled then undisclosed_announced_date set as a true
 * @param {boolean} value
 * @param {*} helpers
 * @returns
 */
const undisclosedAnnDate = (value, helpers) => {
    let { announced_date, undisclosed_announced_date } = helpers.state.ancestors[0];
    if (!announced_date && !undisclosed_announced_date) {
        return true;
    }

    return value;
};

/**
 * All custom validations are exported from here 👇
 */
module.exports = {
    objectId,
    password,
    instagramUserName,
    undisclosedFundDate,
    undisclosedAnnDate,
};
