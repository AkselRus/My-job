import React, { useEffect, useState } from "react";
import API from "../../../api";
import SelectedField from "../../common/form/selectedField";
import TextArea from "./textArea";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";

const CreateComment = ({ comments, onSubmit }) => {
    console.log("comments", comments);
    const [users, setUsers] = useState({});
    const [data, setData] = useState({ userId: "", content: "" });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        API.users.fetchAll().then((data) => {
            const usersList = Object.keys(data).map((user) => ({
                label: data[user].name,
                value: data[user]._id
            }));
            setUsers(usersList);
        });
    }, []);

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Обязательно выберите пользователя"
            }
        },
        content: {
            isRequired: {
                message: "Сообщение не должно быть пустым"
            }
        }
    };
    const clearForm = () => {
        setData({ userId: "", content: "" });
        setErrors({});
    };
    const handleChange = (target) => {
        console.log("target", target);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    console.log("users", users);
    console.log("data", data);
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        console.log("handleSubmit", data);
        clearForm();
    };

    return (
        <div className="card mb-2">
            <div className="card-body">
                <div>
                    <h2>New comment</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <SelectedField
                                defaultOption="Выберите пользователя"
                                options={users}
                                name="userId"
                                onChange={handleChange}
                                value={data.userId}
                                error={errors.userId}
                            />
                        </div>
                        <TextArea
                            label="Сообщение"
                            name="content"
                            value={data.content}
                            onChange={handleChange}
                            error={errors.content}
                        />
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary">
                                Отправить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
CreateComment.propTypes = {
    comments: PropTypes.array,
    onSubmit: PropTypes.func
};

export default CreateComment;
