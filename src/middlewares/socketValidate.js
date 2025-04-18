const socketValidate = (data, schema) => {
    let { error, value } = schema.validate(data, { abortEarly: false });

    if (error) {
        error = error.details.map((ele) => ele.message).join(', ');
    }

    return { error, value };
};

module.exports = socketValidate;
