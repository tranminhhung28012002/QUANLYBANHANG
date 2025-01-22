import { useEffect, useState } from "react";
import Card from "../../Components/Card";
import { axiosInstance } from "../../Axios";

function AllBook() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axiosInstance.get("/api/books");
        const sortedBooks = res.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        console.log(sortedBooks);
        setBooks(sortedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="w-full">
      <div className="w-[1440px] mx-auto grid grid-cols-4 my-20 gap-y-4 ">
        {Array.isArray(books) && books.length > 0 ? (
          books.map((item, index) => (
            <div key={index}>
              <Card
                price={item.Price}
                title={item.Title}
                img={item.Img}
                Evaluate={item.Description}
                icon={item.start}
              />
            </div>
          ))
        ) : (
          <p>Không có sách nào để hiển thị</p>
        )}
      </div>
    </div>
  );
}

export default AllBook;
