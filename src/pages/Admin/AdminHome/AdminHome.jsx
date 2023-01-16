import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../../redux/alertSlice'
import { ADMIN_GET } from '../../../axios'
import { toast } from 'react-hot-toast'
import PersonIcon from '@mui/icons-material/Person';

function AdminHome() {
  const dispatch = useDispatch();
  const [reportedPosts, setReportedPosts] = useState([])
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        dispatch(showLoading());
        const response = await ADMIN_GET("getusers");
        dispatch(hideLoading());
        if (response.data.status) {
          setUsers(response.data.data);
        } else {
          console.log(response);
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
        toast.error(error.response.data.message);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
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
    })()
  }, [])

  return (
    <Layout>
      <div>
        <div class="row">

          {/* <!-- Earnings (Monthly) Card Example --> */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Total Users</div>
                    <div className="h5 text-secondary">{users?.length}</div>
                  </div>
                  <div className="col-auto">
                    <PersonIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Reported Posts</div>
                    <div className="h5 text-secondary">{reportedPosts?.length}</div>
                  </div>
                  <div className="col-auto">
                    <PersonIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminHome
