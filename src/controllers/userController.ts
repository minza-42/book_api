import { Request, Response } from 'express';
import User from '../models/User';
import { formatUser } from '../utils/formatUser';

export const fetchAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      res.status(200).json({
        message: 'No Users found',
      });
      return;
    }
    const formattedUsers = users.map(user => formatUser(user));
    res.json(formattedUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const fetchUser = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        message: 'User not found',
      });
      return;
    }
    res.json(formatUser(user));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};
