import { emailLink } from "../../common/urls";

export const EmailConfirm = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="my-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          認証メールを送信しました。
        </h1>
        {/* <a href={emailLink} className="text-sm font-semibold text-blue-900">
          こちらからご確認ください<span aria-hidden="true">&rarr;</span>
        </a> */}
      </div>
    </main>
  );
};
