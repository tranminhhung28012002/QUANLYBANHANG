import { useEffect, useState } from "react";
import Card from "../../Components/Card";
import { axiosInstance } from "../../Axios";

function AllBook() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const booksPerPage = 10;
  const fetchBooks = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/books?page=${currentPage}&limit=${booksPerPage}`
      );
      const sortedBooks = res.data.booksData.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setBooks(sortedBooks);
      setTotalPages(Math.ceil(res.data.total / booksPerPage));
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div className="w-full">
      <div className="w-[1440px] mx-auto grid grid-cols-4 my-20 gap-y-4 ">
        {Array.isArray(books) && books.length > 0 ? (
          books.map((item, index) => (
            <div key={index}>
              <Card
                id={item.id}
                price={item.sales || item.Price}
                title={item.Title}
                img={item.Img}
                Evaluate={item.Description}
                icon={item.start}
                sales={item.sales === null ? null : item.Price}
              />
            </div>
          ))
        ) : (
          <p>There are no books to display</p>
        )}
      </div>
      <div className="flex justify-center items-center my-10">
        <button
          onClick={handlePrevPage}
          className="px-4 py-2 bg-red-500 text-white rounded-md mr-2 disabled:bg-gray-400 hover:bg-red-600"
          disabled={currentPage === 1}
        >
          Previous page
        </button>
        <span>
          Page {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-red-500 text-white rounded-md ml-2 disabled:bg-gray-400 hover:bg-red-600"
          disabled={currentPage === totalPages}
        >
          Next page
        </button>
      </div>
    </div>
  );
}

export default AllBook;
