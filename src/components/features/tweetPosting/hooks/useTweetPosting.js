import axios from "axios";
import { useState } from "react";

import { tweet, tweetImage } from "../../../../common/urls";
import { useUser } from "../../../../common/hooks/useUser";

export const useTweetPosting = () => {
  const [textValue, setTextValue] = useState("");
  const [image, setImage] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const { authHeader } = useUser();

  const changeInput = (e) => {
    const newValue = e.target.value;
    setTextValue(newValue);
    if (image) return;
    newValue.length >= 1 && newValue.length < 141
      ? setSubmitDisabled(false)
      : setSubmitDisabled(true);
  };

  const changeImage = (e) => {
    const newImage = e.target.files[0];
    setImage(newImage);
    if (textValue) return;
    newImage ? setSubmitDisabled(false) : setSubmitDisabled(true);
  };

  const imageForm = () => {
    const imageFile = new FormData();
    if (image) {
      imageFile.append("image", image);
    }
    return imageFile;
  };

  const createForm = () => {
    const content = { content: textValue };
    const imageFile = image ? imageForm() : null;
    return { content, imageFile };
  };

  const formReset = () => {
    setTextValue("");
    setImage(null);
  };

  const tweetPosting = (params) => {
    const { content, imageFile } = params;

    return axios
      .post(tweet, content, {
        headers: authHeader,
      })
      .then((res) => {
        if (imageFile) {
          imageFile.append("tweet_id", res.data.data.id);
          return axios
            .post(tweetImage, imageFile, {
              headers: authHeader,
            })
            .then((res) => {
              return res;
            })
            .catch((e) => {
              throw e;
            });
        } else {
          return res;
        }
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  };

  return {
    textValue,
    image,
    changeInput,
    changeImage,
    submitDisabled,
    createForm,
    formReset,
    tweetPosting,
  };
};
