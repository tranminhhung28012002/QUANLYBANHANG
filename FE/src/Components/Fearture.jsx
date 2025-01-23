function data({ data }) {
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
      {data.length > 0 ? (
        <div className="flex gap-6 mt-10">
          <div className="md:col-span-2">
            <div className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer">
              <img
                src={data[0].Img}
                alt={data[0].Title}
                className="w-[570px] h-[600px] object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
                <h3 className="text-white text-xl font-bold">
                  {data[0].Title}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {data[0].Description}
                </p>
                <p className="text-white flex justify-start border-gray-200 border-b">
                  Shop Now
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="">
              <div className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer">
                <img
                  src={data[1].Img}
                  alt={data[1].title}
                  className="w-[570px] h-[284px] object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
                  <h3 className="text-white text-xl font-bold">
                    {data[1].Title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    {data[1].Description}
                  </p>
                  <p className="text-white flex justify-start border-gray-200 border-b">
                    Shop Now
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              {data.slice(2, 4).map((item, index) => (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer"
                >
                  <img
                    src={item.Img}
                    alt={item.Title}
                    className="w-[270px] h-[284px] object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
                    <h3 className="text-white text-xl font-bold">
                      {item.Title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      {item.Description}
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
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default data;
