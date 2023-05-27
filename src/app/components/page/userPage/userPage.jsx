import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";
import UserAvatar from "./userAvatar";
import CreateComment from "./createComment";
import CommentList from "./commentsList";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    const [comments, setComments] = useState([]);
    console.log("userId", userId);
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    const handleClick = () => {
        history.push("/users");
    };
    const handleDeleteComment = (id) => {
        api.comments.remove(id).then((id) => {
            setComments(comments.filter((arr) => arr._id !== id));
        });
    };
    const handleSubmit = (data) => {
        console.log("UserPage handleSubmit", data);
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };
    const handleClickEdit = () => {
        history.push(`/users/${userId}/edit`);
    };
    if (user) {
        return (
            <div>
                <button className="btn btn-primary" onClick={handleClick}>
                    Back
                </button>
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card mb-3">
                                <UserAvatar
                                    user={user}
                                    handleClickEdit={handleClickEdit}
                                />
                            </div>
                            <div className="card mb-3">
                                <div
                                    className="
                                            card-body
                                            d-flex
                                            flex-column
                                            justify-content-center
                                            text-center
                                        "
                                >
                                    <h5 className="card-title">
                                        <span>Qualities</span>
                                    </h5>
                                    <Qualities qualities={user?.qualities} />
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card mb-3">
                                    <div
                                        className="
                                                card-body
                                                d-flex
                                                flex-column
                                                justify-content-center
                                                text-center
                                            "
                                    >
                                        <h5 className="card-title">
                                            <span>Completed meetings</span>
                                        </h5>

                                        <h1 className="display-1">
                                            {user?.completedMeetings}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Блок создания комментария */}
                        <div className="col-md-8">
                            <CreateComment
                                userId={userId}
                                onSubmit={handleSubmit}
                            />
                            {/* Блок отоброжения комментария */}
                            <CommentList
                                comments={comments}
                                onDelete={handleDeleteComment}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
