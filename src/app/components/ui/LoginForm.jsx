import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { useHistory } from "react-router-dom";
import axios from "axios";

const httpAuth = axios.create();

const LoginForm = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    async function signIn({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        console.log("url", url);
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            console.log(data);
            if (data.registered) {
                history.push("/");
            }
        } catch (error) {
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                if (message === "INVALID_PASSWORD") {
                    const errorObject = {
                        password: "Пароль недействителен"
                    };
                    throw errorObject;
                }
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = {
                        email: "Email не существует, или введен не правильно. Возможно, пользователь был удален"
                    };
                    throw errorObject;
                }
                if (message === "USER_DISABLED") {
                    const errorObject = {
                        password:
                            "Учетная запись пользователя отключена администратором"
                    };
                    throw errorObject;
                }
            }
        }
    }
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
        try {
            await signIn(data);
        } catch (error) {
            setErrors(error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
