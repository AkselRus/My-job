import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../api";
import TextFiled from "../../common/form/textFiled";
import SelectedField from "../../common/form/selectedField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { update } from "lodash";

const EditUserPage = () => {
    // const [data, setData] = useState({
    //     bookmark: false,
    //     completedMeetings: 247,
    //     email: "bob007@tw.com",
    //     name: "Боб Келсо",
    //     profession: { _id: "67rdca3eeb7f6fgeed471818", name: "Доктор" },
    //     qualities: [],
    //     rate: 3.5,
    //     sex: "male",
    //     _id: "67rdca3eeb7f6fgeed471817"
    // });
    const [user, setUser] = useState();
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    const history = useHistory();
    const { userId } = useParams();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    console.log("user", user);
    console.log("qualities", qualities);
    console.log("professions", professions);
    const handleClickPage = () => {
        update(userId, user);
        history.push(`/users/${userId}`);
    };

    const handleChange = (event) => {
        console.log("event", event);
        setUser((prevState) => ({
            ...prevState,
            [event.name]: event.value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return user ? (
        <form onSubmit={handleSubmit}>
            <TextFiled
                label="Имя"
                name="name"
                value={user.name}
                onChange={handleChange}
                // error={errors.email}
            />
            <TextFiled
                label="Электронная почта"
                name="email"
                value={user.email}
                onChange={handleChange}
                // error={errors.email}
            />
            <SelectedField
                label="Выбери свою профессию"
                defaultOption="Choose..."
                options={professions}
                name="profession"
                onChange={handleChange}
                value={user.profession}
                // error={errors.profession}
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={user.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
            />
            <MultiSelectField
                options={qualities}
                onChange={handleChange}
                defaultValue={user.qualities}
                name="qualities"
                label="Выберите ваши качества"
            />
            <button
                className="btn btn-primary w-100 mx-auto"
                onClick={handleClickPage}
                type="submit"
            >
                Submit
            </button>
        </form>
    ) : (
        <h1>Not Found</h1>
    );
};
export default EditUserPage;
