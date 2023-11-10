import UserSchema from "../model/userSchema.js"
export const signin = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const result = await UserSchema.findOne({ email });
    if (!result) {
      return res.status(400).json({ msg: "User doesn't exist" });
    }

    const isPasswordMatched = await result.isPasswordmatched(password);
    if (!isPasswordMatched) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }


    const token = result.createJWT();
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    const user = await UserSchema.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Password is incorrect" });
    }

    const result = await UserSchema.create({
      email,
      password,
      name: `${firstName} ${lastName}`,
    });

    const token = result.createJWT();
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};