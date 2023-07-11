import React, { useEffect, useState } from 'react'
import { db, collection, query, where, getDoc, getDocs, doc, } from '../firebase';
import { useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';

import CardMedia from '@mui/material/CardMedia';

import Avatar from '@mui/material/Avatar';
function Profile() {
  const { id } = useParams();
  const [userdata, setUserData] = useState(null);
  const [posts, setpost] = useState(null);
  useEffect(() => {

    async function fetchprofiledata() {
      const userRef = doc(db, "users", id);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
        console.log(docSnap.data())
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    fetchprofiledata();

  }, [id])
  useEffect(() => {
    async function fetchposts() {
      const q = query(collection(db, "posts"), where("userid", "==", id));

      const querySnapshot = await getDocs(q);
      let allposts = [];
      querySnapshot.forEach((doc) => {

        allposts.push(doc.data());
      });
      setpost(allposts);
      console.log(allposts)
    }
    fetchposts();

  }, [userdata])
  return <>

    <div className="wrapper">
      {/* Page header */}
      {userdata?<div className="page-header clear-filter page-header-small" filter-color="orange">
        <div className="page-header-image" data-parallax="true" style={{ backgroundImage: `url("${userdata.profilepic}")` }}>
       
        </div>
      <div className="container">
          <Avatar alt="" sx={{ width: 100, height: 100 }} src={userdata.profilepic} />
        

        <Typography variant="h4"  align="center" sx={{ width: 100, mx: "auto"}} color="#ffffff">
         {userdata.Name}
        </Typography>
        </div>
      </div>:""}
      {/* Section */}
      <div className="post-section">

        {posts!=null?posts.map((post) => (<Card sx={{mx:"auto"}}>
       
          <CardMedia className='post-item'
            sx={{ height: 200, width: 400 ,mx:"auto" ,my:"auto" }}
            component={post.contenttype=="image"?"img":"video"}
            src={`${post.posturl}`}
            title={post.postid}
            autoPlay
            muted
          />
        

        
        </Card>)):""}


      </div>
      {/* Footer */}
      <footer className="footer footer-default">
        <div className="container">
          {/* Footer content */}
        </div>
      </footer>
    </div>
  </>
}
export default Profile;