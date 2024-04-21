import { Request, Response } from 'express';
import prisma from '../db';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';
import { userSchema } from '../schema/userSchema';

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const userInput = userSchema.safeParse(req.body);

    if (!userInput.success) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    const { username, password } = userInput.data;
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const token = createJWT(user);
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const userInput = userSchema.safeParse(req.body);

    if (!userInput.success) {
      return res.status(400).json({ message: 'Invalid data' });
    }
    const { username, password } = userInput.data;

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await comparePasswords(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = createJWT(user);
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
