import { useState } from "react";
import { axiosInstance } from "../Axios";
import { CiSearch } from "react-icons/ci";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      fetchSuggestions(value);
    } else {
      setSearchResults([]);
    }
  };

  const fetchSuggestions = async (term) => {
    try {
      const res = await axiosInstance.get("/api/search", {
        params: { title: term },
      });
      setSearchResults(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-[243px] flex bg-neutral-200 py-[7px] pl-[20px] pr-[12px] relative">
      <input
        type="text"
        placeholder="What are you looking for? "
        className="bg-neutral-200 w-[153px] outline-none"
        value={searchTerm}
        onChange={handleChange}
      />
      <CiSearch className="h-[30px] w-[30px] outline-none ml-[34px] cursor-pointer" />
      <div className="absolute bg-neutral-200 max-h-[200px] overflow-auto top-12 w-full right-0 custom">
        {searchResults.length > 0 && (
          <div className="flex flex-col">
            {searchResults.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 cursor-pointer hover:bg-neutral-300"
              >
                <img src={item.Img} className="w-12 h-12" />
                <div className="flex flex-col">
                  <span className="text-base font-medium">{item.Title}</span>
                  <span className="text-sm">{item.Author}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
