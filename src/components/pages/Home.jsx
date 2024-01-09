import toast, { Toaster } from "react-hot-toast";

import { useTweetPosting } from "../features/tweetPosting/hooks/useTweetPosting";
import { TweetForm } from "../features/tweetPosting/components/TweetForm";

export const Home = () => {
  const {
    textValue,
    image,
    changeInput,
    changeImage,
    submitDisabled,
    createForm,
    formReset,
    tweetPosting,
  } = useTweetPosting();

  const submitForm = async (e) => {
    e.preventDefault();
    const form = createForm();
    try {
      await tweetPosting(form);
      toast.success("投稿に成功しました");
      formReset();
    } catch (error) {
      toast.error("投稿に失敗しました");
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <TweetForm
        textValue={textValue}
        image={image}
        changeInput={changeInput}
        changeImage={changeImage}
        submitDisabled={submitDisabled}
        submitForm={submitForm}
      />
    </>
  );
};
