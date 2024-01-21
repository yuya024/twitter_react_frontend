export const Pagination = (props) => {
  const { paginate, pageChange } = props;

  return (
    <div className="flex justify-center my-4">
      {paginate.previous && (
        <p
          className="mr-6 cursor-pointer font-bold text-gray-700 border-2 rounded-l-md border-gray-400 p-2"
          onClick={() => pageChange(paginate.previous)}
        >
          前へ
        </p>
      )}
      {paginate.next && (
        <p
          className="cursor-pointer font-bold text-gray-700 border-2 rounded-r-md border-gray-400 p-2"
          onClick={() => pageChange(paginate.next)}
        >
          次へ
        </p>
      )}
    </div>
  );
};
