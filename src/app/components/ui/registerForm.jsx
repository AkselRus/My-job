import React, { useState, useEffect } from "react";
import TextFiled from "../common/form/textFiled";
import { validator } from "../../utils/validator";
import api from "../../api";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        professions: ""
    });
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState();
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    const handleChange = (event) => {
        setData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: { message: "Введите логин" },
            isEmail: { message: "Логин введен не корректно" }
        },
        password: {
            isRequired: { message: "Введите пароль" },
            isPassword: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isPasswordDigital: {
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
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log("data", data);
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextFiled
                label="Логин"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextFiled
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <div className="mb-4">
                <label htmlFor="validationCustom04" className="form-label">
                    State
                </label>
                <select
                    className="form-select"
                    id="validationCustom04"
                    required
                >
                    <option
                        selected={data.professions === ""}
                        disabled
                        value=""
                    >
                        Choose...
                    </option>
                    {professions &&
                        professions.map((profession) => (
                            <option
                                key={profession._id}
                                selected={profession._id === data.professions}
                                value={profession._id}
                            >
                                {profession.name}
                            </option>
                        ))}
                </select>
                <div className="invalid-feedback">
                    Please select a valid state.
                </div>
            </div>
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Отправить
            </button>
        </form>
    );
};
export default RegisterForm;
