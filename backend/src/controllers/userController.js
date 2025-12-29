import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";

export const getProfile = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.userId },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  res.json(user);
};


export const updateProfile = async (req, res) => {
  const { fullName, email } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id: req.user.userId },
    data: { fullName, email },
    select: { fullName: true, email: true },
  });

  res.json({
    message: "Profile updated successfully",
    user: updatedUser,
  });
};


export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await prisma.user.findUnique({
    where: { id: req.user.userId },
  });

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Old password is incorrect" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  res.json({ message: "Password changed successfully" });
};
