import "./profilePage.scss";
import List from "../../components/list/List";
import Chat from "../../components/chat/Chat";
import apiRequest from "../../lib/apiRequest";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const data = useLoaderData(); // now contains userPosts, savedPosts, chats
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>

          <div className="info">
            <span>
              Avatar:{" "}
              <img src={currentUser.avatar || "/noavatar.jpg"} alt="avatar" />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>

          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <List posts={data.userPosts} />

          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List posts={data.savedPosts} />
        </div>
      </div>

      <div className="chatContainer">
        <div className="wrapper">
          <Chat chats={data.chats} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
