import { registerUser, loginUser } from './auth.service.js';
import { AppError } from '../../utils/error.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      throw new AppError('All fields (name, email, password, role) are required', 400);
    }

    const user = await registerUser({ name, email, password, role });
    return res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError('Email and password are required', 400);
    }

    const token = await loginUser({ email, password });
    return res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    next(err);
  }
};
