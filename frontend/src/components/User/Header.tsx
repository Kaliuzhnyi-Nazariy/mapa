import { Link } from "react-router";

const Header = ({ link, title }: { link: string; title: string }) => {
  return (
    <div className="relative bg-orange-500 w-full flex justify-between items-center px-6 min-[1440px]:relative h-12 min-[768px]:h-18 min-[1440px]:h-22 text-center text-white ">
      <Link
        to={link}
        className="absolute top-1/2 left-5 -translate-y-1/2 text-xs"
      >
        Back
      </Link>
      <h1 className="text-white text-center mx-auto">{title}</h1>
    </div>
  );
};

export default Header;
