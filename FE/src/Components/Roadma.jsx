import { Link, useLocation } from "react-router";

const Roadmap = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);
  const breadcrumbs = pathnames.map((name, index) => {
    const to = "/" + pathnames.slice(0, index + 1).join("/");
    return (
      <span key={to}>
        <Link to={to} className="">
          {name}
        </Link>
        {index < pathnames.length - 1 && " / "}
      </span>
    );
  });

  return (
    <div className="pl-[135px] mt-20 max-w-[1440px] mx-auto">
      <span className="text-[16px] font-normal text-black/50">Home / </span>
      {breadcrumbs.length > 0 ? breadcrumbs : "Home"}
    </div>
  );
};

export default Roadmap;
