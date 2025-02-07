import { checkEmailExists } from "../modal/userModal.js";
const validateEmailFormat = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
const validatePhoneFormat = (phone) => {
  const regex = /^[0-9]{10,15}$/;
  return regex.test(phone);
};
const validateNameFormat = (name) => {
  const regex = /^[A-Za-zÀ-ÿ\s]+$/;
  return regex.test(name);
};

const validateAddressFormat = (address) => {
  const regex = /^[A-Za-z0-9À-ÿ\s,.-]+$/;
  return regex.test(address);
};
const validatePasswordFormat = (password) => {
  const regex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{6,}$/;
  return regex.test(password);
};
export const checkEmailMiddleware = async (req, res, next) => {
  const { username, password, fullName, email, phone, address } = req.body;

  if (!username) {
    return res.status(400).json({
      message: "Please enter username ",
    });
  }
  if (!password) {
    return res.status(400).json({
      message: "Please enter password",
    });
  }
  if (!fullName) {
    return res.status(400).json({
      message: "Please enter fullname",
    });
  }
  if (!email) {
    return res.status(400).json({
      message: "Please enter email",
    });
  }

  if (!phone) {
    return res.status(400).json({
      message: "Please enter phone number ",
    });
  }
  if (!address) {
    return res.status(400).json({
      message: "Please enter address ",
    });
  }
  if (!validateEmailFormat(email)) {
    return res.status(400).json({
      message: "Invalid email",
    });
  }
  if (!validatePhoneFormat(phone)) {
    return res.status(400).json({
      message: "Invalid phone number",
    });
  }
  if (!validateNameFormat(username)) {
    return res.status(400).json({
      message: "Invalid username",
    });
  }
  if (!validateNameFormat(fullName)) {
    return res.status(400).json({
      message: "Invalid fullname",
    });
  }
  if (!validatePasswordFormat(password)) {
    return res.status(400).json({
      message:
        "Password must contain at least one uppercase letter and one special character.",
    });
  }
  if (!validateAddressFormat(address)) {
    return res.status(400).json({
      message: "Invalid address.",
    });
  }

  try {
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    next();
  } catch (err) {
    console.error("Error checking email exists", err);
    res.status(500).json({
      message: "Error checking email",
    });
  }
};
