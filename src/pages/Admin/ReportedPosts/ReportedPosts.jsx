import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './ReportedPosts.css'
import { hideLoading, showLoading } from '../../../redux/alertSlice';
import toast from 'react-hot-toast';
import { ADMIN_GET, POSTS_API } from '../../../axios';
import { useEffect } from 'react';
import Layout from '../Layout/Layout';
import moment from 'moment';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import CloseIcon from '@mui/icons-material/Close';
import PostModal from '../../../components/PostModal/PostModal';


const ReportedPosts = () => {
    const [reportedPosts, setReportedPosts] = useState([])
    const dispatch = useDispatch()
    const [postModal, setPostModal] = useState(false)
    const getReportedPosts = async () => {
        try {
            console.log('function called post');
            dispatch(showLoading())
            const response = await ADMIN_GET('/reported-posts')
            dispatch(hideLoading())
            if (response.data.status) {
                console.log(response.data.data)
                setReportedPosts(response.data.data)
            } else {
                console.log(response)
                toast(response.data.message)
                setReportedPosts(response.data.data)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    const viewPost = (post) => {
        setPostModal(true)
    }
    const deletePost = async (id) => {
        try {
            dispatch(showLoading())
            const response = await POSTS_API.delete(`/${id}?admin='true'`)
            dispatch(hideLoading())
            if (response.data.status) {
                toast.success(response.data.message)
                getReportedPosts()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        getReportedPosts()
    }, [])
    return (
        <Layout>
            <div className='p-5'>
                <h3>Reported posts</h3>
                {reportedPosts.length > 0 ? (
                    <>
                        <div className="userRow d-flex justify-content-between mt-5">
                            <span className="col-1">
                                <b>Sl.No</b>
                            </span>
                            <span className="col-2">
                                <b>Posted by</b>
                            </span>
                            <span className="col-2">
                                <b>Username</b>
                            </span>
                            <span className="col-2">
                                <b>Time</b>
                            </span>
                            <span className="col-2">
                                <b>Action</b>
                            </span>
                        </div>
                        {reportedPosts?.map((post, id) => {
                            return (
                                <div className="userRow d-flex justify-content-between" key={id}>
                                    <span className="col-1">{id + 1}</span>
                                    <span className="col-2">{`${post?.userId?.fname} ${post?.userId?.lname}`}</span>
                                    <span className="col-2">{post?.userId?.username}</span>
                                    <span className="col-2">
                                        {moment(post?.createdAt).format('LLLL')}
                                    </span>
                                    <div className="col-2">
                                        <span onClick={() => viewPost(post)}><AspectRatioIcon style={{ color: 'grey', cursor: 'pointer' }} /></span>
                                        <PostModal data={post} postModal={postModal} setPostModal={setPostModal} />
                                        <span onClick={() => deletePost(post._id)}><CloseIcon style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }} /></span>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                ) : (
                    <span className='mt-5'>No reported posts</span>
                )}
            </div>
        </Layout>
    )
}

export default ReportedPosts