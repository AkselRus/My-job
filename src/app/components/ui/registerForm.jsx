import React, { useState, useEffect } from "react";
import TextFiled from "../common/form/textFiled";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectedField from "../common/form/selectedField";
import RadioField from "../common/form/radioField";
import CheckBoxField from "../common/form/checkBoxField";
import MultiSelectField from "../common/form/multiSelectField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "Male",
        qualities: [],
        license: false
    });
    console.log("data", data);

    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState();
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
    console.log("qualities", qualities);
    const handleChange = (target) => {
        console.log("target", target);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
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
        },
        professions: {
            isRequired: { message: "Обязательно выберите вашу профессию" }
        },
        license: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
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
        console.log("data", data.professions);
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
            <SelectedField
                label="Выберите вашу профессию"
                defaultOption="Choose..."
                options={professions}
                name="profession"
                value={data.professions}
                onChange={handleChange}
                error={errors.profession}
            />
            <MultiSelectField
                onChange={handleChange}
                options={qualities}
                defaultValue={data.qualities}
                name="qualities"
                label="Выберите ваши качества"
            />
            <RadioField
                options={[
                    { name: "Male", value: "Male" },
                    { name: "Female", value: "Female" },
                    { name: "Other", value: "Other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
            />
            <CheckBoxField
                name={"license"}
                value={data.license}
                onChange={handleChange}
                error={errors.license}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
            {/* <div className="mb-4">
                <label htmlFor="validationCustom04" className="form-label">
                    State
                </label>
                <select
                    className="form-select"
                    id="validationCustom04"
                    name="profession"
                    value={data.profession}
                    onChange={handleChange}
                >
                    <option selected disabled value="">
                        Choose...
                    </option>
                    {professions &&
                        Object.keys(professions).map((professionName) => (
                            <option
                                key={professions[professionName]._id}
                                value={professions[professionName]._id}
                            >
                                {professions[professionName].name}
                            </option>
                        ))}
                </select>
                <div className="invalid-feedback">
                    Please select a valid state.
                </div>
            </div> */}
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
