import wallpage from "../assets/bookwallper.jpg";
import { GoChevronRight } from "react-icons/go";
const item = [
  {
    id: 1,
    name: "Top 100 Book",
    icon: <GoChevronRight />,
  },
  { id: 2, name: "Men's Fashion" },
  {
    id: 3,
    name: "Children Book",
    icon: <GoChevronRight />,
  },
  {
    id: 4,
    name: "Computers & Technology",
    icon: <GoChevronRight />,
  },
  {
    id: 5,
    name: "Medical Books",
    icon: <GoChevronRight />,
  },
  {
    id: 6,
    name: "Sports & Outdoor",
    icon: <GoChevronRight />,
  },
  {
    id: 7,
    name: "Arts & Photography",
    icon: <GoChevronRight />,
  },
  {
    id: 8,
    name: "Test Preparation",
    icon: <GoChevronRight />,
  },
  { id: 9, name: "Self-Help" },
];

function NavItem() {
  return (
    <div className="flex justify-between ">
      <div className="flex flex-col  w-[317px] border-r border-gray-300 pt-10">
        {item.map((e) => (
          <div
            key={e.id}
            className="flex  items-center justify-between pr-4 hover:bg-gray-200 cursor-pointer"
          >
            <p className="text-black py-2 cursor-pointer  font-[450]">
              {e.name}
            </p>
            <p>{e.icon}</p>
          </div>
        ))}
      </div>
      <div className="pt-10">
        <img src={wallpage} alt="" className="w-full" />
      </div>
    </div>
  );
}

export default NavItem;
