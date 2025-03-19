import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const deleteUsers = async (usernames) => {
    try {
        for (const username of usernames) {
            await prisma.user.delete({
                where: {
                    username: username,
                },
            });
            console.log(`User with username ${username} deleted successfully`);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    } finally {
        await prisma.$disconnect();
    }
};

deleteUsers([""]); 
