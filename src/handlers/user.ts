import prisma from '../db';
import { createJWT, hashPassword } from '../modules/auth';
import { Request, Response } from 'express';
import { userSchema } from '../schema/userSchema';

export const createNewUser = async (req: Request, res: Response) => {
  const userInput = userSchema.parse(req.body);

  const hashedPassword = await hashPassword(userInput.password);

  try {
    const user = await prisma.user.create({
      data: {
        username: userInput.username,
        password: hashedPassword,
      },
    });
    const token = createJWT(user);
    res.status(2001).json({ message: 'User created successfully', token });
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};
