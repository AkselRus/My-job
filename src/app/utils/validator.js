export function validator(data, config) {
    const error = {};
    function validate(validMethod, data, config) {
        let statusValidate;
        switch (validMethod) {
            case "isRequired": {
                if (typeof data === "boolean") {
                    statusValidate = !data;
                } else {
                    statusValidate = data.trim() === "";
                }
                break;
            }
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                statusValidate = !emailRegExp.test(data);
                break;
            }
            case "isPasswordSymbol": {
                const passwordRegExp = /[A-Z]+/g;
                statusValidate = !passwordRegExp.test(data);
                break;
            }
            case "isPasswordDigital": {
                const passwordDigit = /\d+/g;
                statusValidate = !passwordDigit.test(data);
                break;
            }
            case "min": {
                statusValidate = data.length < config.value;
                break;
            }
            default:
                break;
        }
        if (statusValidate) return config.message;
    }
    for (const fieldName in data) {
        for (const validMethod in config[fieldName]) {
            const err = validate(
                validMethod,
                data[fieldName],
                config[fieldName][validMethod]
            );
            if (err && !error[fieldName]) {
                error[fieldName] = err;
            }
        }
    }
    return error;
}
