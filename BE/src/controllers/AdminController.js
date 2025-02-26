import {
  BestSellingBooks,
  BestUserBuyBooks,
  CreateBooks,
  DeleteBooks,
  EditBooks,
} from "../modal/AdminModal.js";

export const CreateBooksController = async (req, res) => {
  try {
    const {
      Title,
      Author,
      Price,
      Quantity,
      Description,
      Img,
      CategoryID,
      Sales,
    } = req.body;

    if (!Title || !Author || !Price || !Quantity || !CategoryID) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu thông tin sách!" });
    }

    const result = await CreateBooks(
      Title,
      Author,
      Price,
      Quantity,
      Description,
      Img,
      CategoryID,
      Sales
    );

    // Phản hồi kết quả
    if (result.success) {
      return res
        .status(201)
        .json({ success: true, message: "Thêm sách thành công!" });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Lỗi khi thêm sách!" });
    }
  } catch (error) {
    console.error("Lỗi CreateBooksController:", error);
    return res.status(500).json({ success: false, message: "Lỗi server!" });
  }
};

export const EditBooksController = async (req, res) => {
  try {
    const { BookID } = req.params;
    const {
      Title,
      Author,
      Price,
      Quantity,
      Description,
      CategoryID,
      Sales,
      Img,
    } = req.body;
    console.log("Sales controller ", Sales);
    console.log("Img controller ", Img);
    const result = await EditBooks(
      BookID,
      Title,
      Author,
      Price,
      Quantity,
      Description,
      Img,
      CategoryID,
      Sales
    );
    if (result.success) {
      return res
        .status(201)
        .json({ success: true, message: "chỉnh sửa sách thành công!" });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Lỗi khi chỉnh sửa sách!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Lỗi server!" });
  }
};

export const DeleteBooksController = async (req, res) => {
  const { BookID } = req.params;
  try {
    const result = await DeleteBooks(BookID);
    if (result.success) {
      return res
        .status(201)
        .json({ success: true, message: "Xóa sách thành công!" });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Lỗi khi xóa sách!" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Lỗi server!" });
  }
};

export const BestSellingBooksController = async (req, res) => {
  const { filterType } = req.query;
  try {
    const result = await BestSellingBooks(filterType);
    if (result.success) {
      return res.status(201).json({
        success: true,
        message: "thống kê sách thành công!",
        data: result.data,
      });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Lỗi khi thống kê sách!" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Lỗi server!" });
  }
};

export const BestUserBuyBooksController = async (req, res) => {
  const { filterType } = req.query;
  try {
    const result = await BestUserBuyBooks(filterType);
    if (result.success) {
      return res.status(201).json({
        success: true,
        message: "thống kê khach hang thành công!",
        data: result.data,
      });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Lỗi khi thống khach hang!" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Lỗi server!" });
  }
};
