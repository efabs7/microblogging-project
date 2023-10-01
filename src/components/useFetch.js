import { useEffect } from "react";
import axios from "axios";

export const useFetch = (url, setPostList, setIsLoading, setResponseData) => {
  useEffect(() => {
    let interval = setInterval(() => {
      try {
        axios.get(url).then((resp) => {
          if (!resp) {
            setPostList([]);
            setIsLoading(false);
          } else {
            setIsLoading(false);
            const storedPostsArray = resp.data;

            const returnPosts = storedPostsArray.map((i) => {
              return {
                id: i.id,
                content: i.content,
                date: i.date,
                username: i.username,
              };
            });

            setResponseData([...returnPosts]);
          }
        });
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);
};

export const myFetch = (
  url,
  setPostList,
  setIsLoading,
  setResponseData,
  setFullList
) => {
  try {
    axios.get(url).then((resp) => {
      if (!resp) {
        setPostList([]);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        const storedPostsArray = resp.data;
        setFullList(resp.data.length);

        const returnPosts = storedPostsArray.map((i) => {
          return {
            id: i.id,
            content: i.content,
            date: i.date,
            username: i.username,
          };
        });

        setResponseData([...returnPosts]);
      }
    });
  } catch (err) {
    console.log(err);
    setIsLoading(false);
  }
};
