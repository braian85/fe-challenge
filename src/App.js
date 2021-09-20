import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import Post from "./components/Post/Post";
import "./spinner.css";
import { useDispatch, useSelector } from "react-redux";
import { addPosts, setPostsLoading } from "./redux/slices/chatSlices";

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state?.chat.posts);
  const postsLoading = useSelector((state) => state?.postsLoading);

  // Hook to load Users.
  useEffect(() => {
    dispatch(setPostsLoading(true));
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        dispatch(addPosts(res.data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setPostsLoading(false));
      });
  }, [dispatch]);

  return (
    <div className="App">
      <nav className="nav">
        <span>
          <strong className="str">Auto</strong>Feed
        </span>
      </nav>
      {!postsLoading ? (
        posts.map((data, i) => <Post key={i} clave={i} post={data} />)
      ) : (
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
}
export default App;
