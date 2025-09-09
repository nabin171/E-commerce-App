import userModel from "../models/usersModel";

//Route for user login
const loginUser = async (req, res) => {};

//Route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, password, email } = registerUser.body;
    //checking user already exists or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return response.json({ success: false, message: "User already exists" });
    }
  } catch (error) {}
};

//Route for admin login
const adminLogin = async (req, res) => {};
export { loginUser, registerUser, adminLogin };
