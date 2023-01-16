import React, { useState } from 'react'
import { Modal, useMantineTheme } from "@mantine/core";
import CommentModal from "../CommentModal.js/CommentModal";
import moment from "moment";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { useDispatch, useSelector } from 'react-redux';
import { POSTS_API } from '../../axios';
import { toast } from 'react-hot-toast';
import { hideLoading, showLoading } from '../../redux/alertSlice';


const PostModal = ({ data, setPostModal, postModal }) => {
    const theme = useMantineTheme();
    const dispatch = useDispatch();
    const [postDetails, setPostDetails] = useState(data)
    const [likes, setLikes] = useState(data?.likes?.length);
    const [commentModalOpen, setCommentModalOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const handleComment = async (id) => {
        try {
            dispatch(showLoading());
            const response = await POSTS_API.get(`/${id}/comments`);
            dispatch(hideLoading());
            if (response.data.status) {
                setComments(response.data.data);
                setCommentModalOpen(true);
            } else {
                console.log(response, "Error");
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            toast.error(error.response.data.message);
        }
    };
    return (
        <Modal
            overlayColor={
                theme.colorScheme === "dark"
                    ? theme.colors.dark[9]
                    : theme.colors.gray[2]
            }
            overlayOpacity={0.55}
            overlayBlur={3}
            size="40%"
            opened={postModal}
            onClose={() => setPostModal(false)}
        >
            <div className="Post" key={postDetails?._id} id={postDetails?._id}>

                <img src={postDetails?.images} alt="PostImage" />


                <span style={{ color: "var(--gray) ", fontSize: "13px" }}>
                    {likes ? likes : 0} likes
                </span>
                <div className="details">
                    <span>
                        <b>{postDetails?.userId?.username} </b>
                    </span>
                    <span> {postDetails?.desc}</span>
                </div>
                <CommentModal
                    comments={comments}
                    setComments={setComments}
                    commentModalOpen={commentModalOpen}
                    setCommentModalOpen={setCommentModalOpen}
                    data={postDetails}
                />
                <div>
                    {postDetails?.comments?.length > 0 ? (
                        postDetails?.comments.slice(0, 2).map((comment, id) => {
                            return (
                                <div
                                    className="details"
                                    key={id}
                                    style={{ fontSize: "13px", marginTop: '-15px', lineHeight: 2.5 }}
                                >
                                    <span>
                                        <b>{comment?.commentedUserName}</b>
                                    </span>
                                    <span style={{ marginLeft: "5px" }}>{comment?.comment}</span>
                                    <br />
                                </div>
                            );
                        })
                    ) : (
                        <span style={{ fontSize: "12px" }}>No Comments</span>
                    )}
                    {postDetails?.comments?.length > 0 && (<span
                        style={{ cursor: "pointer", fontSize: "14px" }}
                        onClick={() => handleComment(postDetails._id)}
                    >
                        View all comments
                    </span>)}
                </div>
                <span style={{ color: "var(--gray) ", fontSize: "10px", marginTop: '-10px' }}>
                    {moment(postDetails?.createdAt).fromNow()}
                </span>
            </div>
        </Modal>
    )
}

export default PostModal