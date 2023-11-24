import UserSchema from "../model/userSchema.js"
import { errorHandler } from "../util/error.js";
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  
  try {
    const result = await UserSchema.findOne({ email });
    if (!result) {
      return (next(errorHandler(500, 'User is not Found')))
    }

    const isPasswordMatched = await result.isPasswordmatched(password);
    if (!isPasswordMatched) {
      return (next(errorHandler(500, 'Invalid Credntials')));
    }


    const token = result.createJWT();
    res.status(201).json({ result, token });
  } catch (error) {
    return (next(error))
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    const user = await UserSchema.findOne({ email });
    if (user) {
      return (next(errorHandler(500, 'User Already Exists')))
    }

    if (password !== confirmPassword) {
      return (next(errorHandler(500, 'Invalid Crenditals')))
    }

    const result = await UserSchema.create({
      email,
      password,
      name: `${firstName} ${lastName}`,
    });

    const token = result.createJWT();
    res.status(201).json({ result, token });
  } catch (error) {
    return (next(error))
  }
};