import prisma from "../utils/prisma.js";

export const getUsers = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        status: true,
      },
    }),
    prisma.user.count(),
  ]);

  const totalPages = Math.ceil(total / limit);

  res.json({
    users,
    total,
    totalPages,
    currentPage: page,
  });
};

export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  await prisma.user.update({
    where: { id },
    data: { status },
  });

  res.json({ message: "Status updated" });
};
