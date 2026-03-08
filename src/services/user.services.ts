import prisma from "../db";

export const getAllUsers = async () => {
	return await prisma.user.findMany({
		orderBy: { createdAt: "desc" },
		select: {
			id: true,
			email: true,
			username: true,
			avartarUrl: true,
			createdAt: true,
			updatedAt: true,
		},
	});
};
