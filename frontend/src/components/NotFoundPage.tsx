import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="bg-orange-500 w-full h-screen flex justify-center items-center">
      <div className="bg-whitw-4/5 bg-white p-10 rounded-2xl flex flex-col items-center gap-5">
        <article className="text-center">Unfotunately, page not found!</article>
        <Link
          to="/map"
          className="px-10 py-2 bg-orange-500 text-white rounded-4xl"
        >
          Back to app
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
