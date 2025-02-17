import { useState } from "react";
import { axiosInstance } from "../Axios";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
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
        params: { query: term },
      });
      const sortedBooks = res.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setSearchResults(sortedBooks);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDetail = async (e) => {
    try {
      navigate(`/productDetail/${e}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[300px] flex bg-neutral-200 py-[7px] pl-[20px] pr-[4px] relative z-50">
      <input
        type="text"
        placeholder="What are you looking for? "
        className="bg-neutral-200 w-[153px] outline-none"
        value={searchTerm}
        onChange={handleChange}
      />
      <CiSearch className="h-[30px] w-[30px] outline-none ml-[70px] cursor-pointer" />

      {searchTerm && (
        <div className="absolute bg-neutral-200 max-h-[300px] overflow-auto top-12 w-full right-0 custom">
          {searchResults.length > 0 ? (
            <div className="flex flex-col">
              {searchResults.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 cursor-pointer hover:bg-neutral-300"
                  onClick={() => handleDetail(item.BookID)}
                >
                  <img src={item.Img} className="w-12 h-12" alt={item.Title} />
                  <div className="flex flex-col">
                    <span className="text-base font-medium">{item.Title}</span>
                    <span className="text-sm">{item.Author}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-2xl font-medium p-1">No search results found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
