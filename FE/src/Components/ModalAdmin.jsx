import { useState, useEffect } from "react";
import { axiosInstance } from "../Axios";

const ModalAdmin = ({ onClose, cate, bookData }) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    quantity: "",
    description: "",
    img: "",
    categoryID: "",
    sales: "",
  });

  useEffect(() => {
    if (bookData) {
      setBook({
        title: bookData.Title || "",
        author: bookData.Author || "",
        price: Number(bookData.Price) || "",
        quantity: Number(bookData.Quantity) || "",
        description: bookData.Description || "",
        img: bookData.Img || "",
        categoryID: bookData.CategoryID || "",
        sales: Number(bookData.Sales) || "",
      });
    }
  }, [bookData]);
  console.log(book);
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (bookData) {
        // Chế độ chỉnh sửa
        const res = await axiosInstance.put(`/api/editBooks/${bookData.id}`, {
          Title: book.title,
          Author: book.author,
          Price: book.price,
          Quantity: book.quantity,
          Description: book.description,
          CategoryID: book.categoryID,
          Sales: book.sales,
          Img: book.img,
        });
        console.log("Cập nhật sách:", res.data);
      } else {
        // Chế độ thêm mới
        await axiosInstance.post("/api/createBooks", {
          Title: book.title,
          Author: book.author,
          Price: Number(book.price),
          Quantity: Number(book.quantity),
          Description: book.description,
          Img: book.img,
          CategoryID: Number(book.categoryID),
          Sales: Number(book.sales),
        });
      }
      onClose();
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <div>
          <h2 className="text-xl font-bold mb-10">
            {bookData ? "Chỉnh sửa sách" : "Thêm sách mới"}
          </h2>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <input
              className="py-3 px-5 outline-none border border-gray-500 rounded-lg"
              name="title"
              placeholder="Title"
              value={book.title}
              onChange={handleChange}
            />
            <input
              className="py-3 px-5 outline-none border border-gray-500 rounded-lg"
              name="author"
              placeholder="Author"
              value={book.author}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between">
            <input
              className="py-3 px-5 outline-none border border-gray-500 rounded-lg"
              name="price"
              type="number"
              placeholder="Price"
              onChange={handleChange}
              value={book.price}
            />
            <input
              className="py-3 px-5 outline-none border border-gray-500 rounded-lg"
              name="sales"
              type="number"
              value={book.sales}
              placeholder="Sales"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between">
            <input
              className="py-3 px-5 outline-none border border-gray-500 rounded-lg"
              name="img"
              type="text"
              placeholder="Image URL"
              value={book.img}
              onChange={handleChange}
            />
            <input
              className="py-3 px-5 outline-none border border-gray-500 rounded-lg"
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={book.quantity}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p>Category</p>
              <select
                name="categoryID"
                id=""
                className="py-3 px-4 border border-gray-500 rounded-lg text-left mt-3"
                onChange={handleChange}
              >
                {cate.map((category, index) => (
                  <option key={index} value={category.CategoryID}>
                    {category.CategoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="border border-gray-500 w-full h-[200px]">
            <textarea
              name="description"
              placeholder="Description"
              value={book.description}
              onChange={handleChange}
              className="w-full h-full outline-none py-3 px-3"
            />
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <button
            onClick={() => onClose(false)}
            className="py-3 px-6 border border-gray-500 rounded-lg"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="py-3 px-6 bg-red-500 text-white rounded-lg"
          >
            {bookData ? "Cập nhật" : "Thêm sách"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAdmin;
