import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const res = await apiRequest("/posts?" + query);
  return res.data;
};

export const profilePageLoader = async () => {
  try {
    const [postsRes, chatsRes] = await Promise.all([
      apiRequest.get("/users/profilePosts"),
      apiRequest.get("/chats"),
    ]);

    return {
      userPosts: postsRes.data.userPosts,
      savedPosts: postsRes.data.savedPosts,
      chats: chatsRes.data,
    };
  } catch (err) {
    console.error("Loader error:", err);
    throw err;
  }
};
