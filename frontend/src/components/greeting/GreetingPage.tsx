import { Link } from "react-router";

const GreetingPage = () => {
  return (
    <div className="w-full h-screen bg-orange-500 flex justify-center items-center">
      <div className="w-4/5 bg-white p-10 rounded-2xl flex flex-col items-center gap-5">
        <h1 className="text-4xl font-bold">Mapa</h1>
        <article className="text-center">
          Mapa is your eveyday tool. You can easily add your locations whenever
          it is in the world. If you need you also can find something near the
          marker. It is pretty handy tool for travelers or just busy people.
        </article>
        <Link
          to="/auth"
          className="px-10 py-2 bg-orange-500 text-white rounded-4xl"
        >
          Lets start!
        </Link>
      </div>
    </div>
  );
};

export default GreetingPage;
