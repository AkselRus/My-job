import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

const CommentList = ({ comments, onDelete }) => {
    console.log("comments", comments);
    return (
        <>
            {comments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        {comments &&
                            comments.map((comment) => (
                                <Comment
                                    key={comment._id}
                                    {...comment}
                                    onDelete={onDelete}
                                />
                            ))}
                    </div>
                </div>
            )}
        </>
    );
};
CommentList.propTypes = {
    comments: PropTypes.array,
    onDelete: PropTypes.func
};
export default CommentList;
