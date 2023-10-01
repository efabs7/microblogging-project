import { useState, useEffect, useRef } from "react";
import { Header } from "../components/Header";
import { Post } from "../components/Post";
import axios from "axios";
import "../App.css";
import { globalStatesContext } from "../components/globalStatesContext";
import { useContext } from "react";
import { useFetch } from "../components/useFetch";
import { myFetch } from "../components/useFetch";
import InfiniteScroll from "react-infinite-scroll-component";
import { LogInView } from "./LogInView";
import { useCheckLogin } from "../components/useCheckLogin";

export const HomeView = () => {
  const context = useContext(globalStatesContext);
  const {
    postList,
    setPostList,
    responseData,
    setResponseData,
    setFullList,
    isLoggedIn,
    setIsLoggedIn,
    setUsername,
    username,
    setUserServerId,
    userLogin,
  } = context;
  const [postText, setPostText] = useState("");
  const [headerText, setHeaderText] = useState("What do you have in mind...");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isError, setisError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const apiURL = `https://6446a9ff0431e885f018a981.mockapi.io/users`;
  const serverURL = new URL(
    `https://6446a9ff0431e885f018a981.mockapi.io/posts`
  );
  serverURL.searchParams.append("sortBy", "createdAt");
  serverURL.searchParams.append("order", "desc");
  const limitURL = new URL(`https://6446a9ff0431e885f018a981.mockapi.io/posts`);
  limitURL.searchParams.append("sortBy", "createdAt");
  limitURL.searchParams.append("order", "desc");
  limitURL.searchParams.append("page", 1);
  limitURL.searchParams.append("limit", 10);

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const stylesCss = {
    margin: "2px",
  };

  useEffect(() => {
    if (postText.length > 140) {
      setIsDisabled(true);
      setisError(true);
    } else {
      setIsDisabled(false);
      setisError(false);
    }
  }, [postText]);

  useEffect(() => {
    myFetch(serverURL, setPostList, setIsLoading, setResponseData, setFullList);
    return () =>
      myFetch(
        serverURL,
        setPostList,
        setIsLoading,
        setResponseData,
        setFullList
      );
  }, []);

  useFetch(limitURL, setPostList, setIsLoading, setResponseData);

  useEffect(() => {
    let timerId = setTimeout(() => {
      if (isLoggedIn)
        try {
          axios.get(apiURL).then((resp) => {
            const users = resp.data;
            const findUser = users.find((user) => user.login == userLogin);
            const userId = findUser.id;

            localStorage.setItem("userServerId", userId);
            setUsername(userLogin);
            setUserServerId(userId);
          });
        } catch (err) {
          console.log(err);
        }
      timerId = null;
    }, 3000);
    return () => clearTimeout(timerId);
  }, []);

  useCheckLogin(setUserServerId, setIsLoggedIn);

  const createPost = (e) => {
    e.preventDefault();

    let newPost = {
      id: new Date().getTime().toString(36) + new Date().getUTCMilliseconds(),
      post: (
        <Post
          content={postText}
          date={new Date().toISOString("en-US", options)}
          username={username}
        ></Post>
      ),
    };

    axios
      .post(serverURL, {
        headers: { "content-type": "application/json" },
        content: newPost.post.props.content,
        date: JSON.stringify(newPost.post.props.date),
        username: newPost.post.props.username,
        id: JSON.stringify(newPost.id),
      })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        console.log("successful connection");
      })
      .then((post) => {
        console.log("pushed to server");
      })
      .catch((err) => {
        window.alert(
          "There has been an issue posting your content, perhaps Elon fired everyone"
        );
      });
    setPostList([newPost, ...postList]);
    setPostText("");
    setHeaderText("what do you have in mind?");
  };

  const renderHistory = () => {
    if (responseData) {
      return responseData.map((i) => {
        return (
          <li key={i.id}>
            <Post content={i.content} username={i.username} date={i.date} />
          </li>
        );
      });
    }
    {
      return <div>Guess no one has posted yet!</div>;
    }
  };

  const handleInput = (e) => {
    setPostText(e.target.value);
  };

  return (
    <div className="row d-flex justify-content-center" style={stylesCss}>
      {isLoggedIn ? (
        <div>
          (
          <Header
            onClick={createPost}
            onChange={handleInput}
            disabled={isDisabled}
            placeholder={headerText}
            input={postText}
            overflow={isError}
          ></Header>
          ) (
          <div>
            <InfiniteScroll
              dataLength={responseData.length}
              next={() =>
                myFetch(
                  serverURL,
                  setPostList,
                  setIsLoading,
                  setResponseData,
                  setFullList
                )
              }
              hasMore={true}
              loader={isLoading && <p>still loadin'</p>}
              endMessage={<p>that's all she wrote</p>}
            >
              {renderHistory()}
            </InfiniteScroll>

            {isLoading && <p>loading stuff</p>}
          </div>
          )
          <div className="d-flex justify-content-center">
            {isLoading && (
              <div className="spinner-border text-info" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
            {isLoading && (
              <p className="error-text p-2">loading...spinner didn't work</p>
            )}
          </div>
        </div>
      ) : (
        <LogInView />
      )}
    </div>
  );
};
