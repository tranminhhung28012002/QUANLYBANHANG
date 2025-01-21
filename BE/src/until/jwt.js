import jwt from "jsonwebtoken";

// Hàm tạo token
export const signToken = ({ payload, key, option }) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, key, option, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};
