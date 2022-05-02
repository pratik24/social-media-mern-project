import { Add, Remove, RssFeed } from '@material-ui/icons'
import './rightbar.css'
import Online from '../online/Online';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from "axios";
import { Link } from 'react-router-dom';

export default function RightBar({ profile }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);  
    const [followed, setFollowed] = useState(false);

    useEffect(() => {
      setFollowed(currentUser.followings.includes(profile?._id));
      const getFriends = async () => {
        try{
          const friendList = await axios.get("/users/friends/" + (profile ? profile._id : currentUser._id));
          setFriends(friendList.data);
        } catch(err){
          console.log(err);
        }
      };
      getFriends();
    }, [currentUser, profile?._id]);

    const handleFollowClick = async () => {
      try {
        if(followed) {
          await axios.put(`/users/${profile._id}/unfollow`, {
            userId: currentUser._id,
          });
          dispatch({ type: "UNFOLLOW", payload: profile._id});
        } else {
          await axios.put(`/users/${profile._id}/follow`, {
            userId: currentUser._id,
          });
          dispatch({ type: "FOLLOW", payload: profile._id})
        }
      } catch(err) {
      }
    }


    const HomeRightbar = () => {
        return (
            <>
             <div className="birthdayContainer">
                 <img src="assets/gift.png" alt="" className="birthdayImg" />
                 <span className="birthdayText">
                    <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
                 </span>
             </div>
             <img src="assets/ad.png" alt="" className="rightbarAd" />
             <h4 className="rightbarTitle">Online Friends</h4>
             <ul className="rightbarFriendList">
                {friends && friends.map((u) => (
                    <Online key={u._id} user={u} />
                ))}
             </ul>
            </>
        );
    };

    const ProfileRightbar = () => {
        return (
          <>
            {profile.username !== currentUser.username && (
              <button className="rightbarFollowButton" onClick={handleFollowClick}>
                {followed ? "Unfollow" : "Follow"}
                {followed ? <Remove /> : <Add />}
              </button>
            )}
            <h4 className="rightbarTitle">User information</h4>
            <div className="rightbarInfo">
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">City:</span>
                <span className="rightbarInfoValue">{profile.city}</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">From:</span>
                <span className="rightbarInfoValue">{profile.from}</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Relationship:</span>
                <span className="rightbarInfoValue">
                    {profile.relationship === 1
                    ? "Single"
                    : profile.relationship === 1
                    ? "Married"
                    : "-"}
                </span>
              </div>
            </div>
            <h4 className="rightbarTitle">User friends</h4>
            <div className="rightbarFollowings">
                {friends.map(friend => (
                  <Link
                    to={"/profile/" + friend.username}
                    style={{textDecoration: "none"}}
                    key={friend._id}
                  >
                    <div className="rightbarFollowing">
                      <img
                        src={
                          friend.profilePicture
                          ? PF + friend.profilePicture
                          : PF + "person/noAvatar.png"
                        }
                        alt=""
                        className="rightbarFollowingImg"
                      />
                      <span className="rightbarFollowingName">
                        {friend.username}
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </>
        );
    };

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {profile ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    )
}
