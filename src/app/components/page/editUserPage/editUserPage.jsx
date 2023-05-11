import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../api";
import TextFiled from "../../common/form/textFiled";
import SelectedField from "../../common/form/selectedField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

const EditUserPage = () => {
    const [user, setUser] = useState();
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    const history = useHistory();
    const { userId } = useParams();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((name) => ({
                label: data[name].name,
                value: data[name]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((option) => ({
                value: data[option]._id,
                label: data[option].name,
                color: data[option].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };
    console.log("user", user);
    console.log("qualities", qualities);
    console.log("professions", professions);

    const handleChange = (event) => {
        console.log("event", event);
        setUser((prevState) => ({
            ...prevState,
            [event.name]: event.value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = {
            ...user,
            profession: getProfessionById(user.profession),
            qualities: getQualities(user.qualities)
        };
        console.log("reg data", {
            ...user,
            profession: getProfessionById(user.profession),
            qualities: getQualities(user.qualities)
        });
        api.users.update(userId, newData);
        console.log(history);
        history.push(`/users/${userId}`);
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
            <button className="btn btn-primary w-100 mx-auto" type="submit">
                Submit
            </button>
        </form>
    ) : (
        <h1>Not Found</h1>
    );
};
export default EditUserPage;
