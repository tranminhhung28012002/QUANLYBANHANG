import fantasy from "../assets/card/fantasy.jpg";
import giadinh from "../assets/card/giadinh.jpg";
import history from "../assets/card/history.jpg";
import kinhte from "../assets/card/kinhte.jpg";

const images = [
  {
    img: fantasy,
    name: "Frieren",
    description: "Frieren coming out on sale.",
  },
  {
    img: giadinh,
    name: "Trong gia dinh",
    description: "Featured woman collections that give you another vibe.",
  },
  {
    img: history,
    name: "Bách khoa thư lịch sử",
    description: "Amazon",
  },
  {
    img: kinhte,
    name: "Kinh tế tài chính",
    description: "The best top 100",
  },
];

function Feadture() {
  return (
    <div className="mt-[140px] px-6">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex gap-[10px] items-center">
            <span className="w-[20px] h-[40px] bg-red-500 rounded-md"></span>
            <p className="text-red-500 font-semibold">Feature</p>
          </div>
          <div>
            <h3 className="text-4xl font-semibold mt-6">New Arrival</h3>
          </div>
        </div>
      </div>

      <div className="flex gap-6 mt-10">
        <div className="md:col-span-2">
          <div className="relative rounded-lg overflow-hidden shadow-lg group">
            <img
              src={images[0].img}
              alt={images[0].name}
              className="w-[570px] h-[600px] object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
              <h3 className="text-white text-xl font-bold">{images[0].name}</h3>
              <p className="text-gray-300 text-sm mb-4">
                {images[0].description}
              </p>
              <p className="text-white flex justify-start border-gray-200 border-b">
                Shop Now
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="">
            <div className="relative rounded-lg overflow-hidden shadow-lg group">
              <img
                src={images[1].img}
                alt={images[1].name}
                className="w-[570px] h-[284px] object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
                <h3 className="text-white text-xl font-bold">
                  {images[1].name}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {images[1].description}
                </p>
                <p className="text-white flex justify-start border-gray-200 border-b">
                  Shop Now
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-6">
            {images.slice(2).map((item, index) => (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden shadow-lg group"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-[270px] h-[284px] object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
                  <h3 className="text-white text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    {item.description}
                  </p>
                  <p className="text-white border-gray-200 border-b w-[90px]">
                    Shop Now
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nút View All Products */}
    </div>
  );
}

export default Feadture;
