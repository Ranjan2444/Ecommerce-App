import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const deleteUser = async (username) => {
    try {
        const user = await prisma.user.delete({
            where: {
                username: username, // Use the username you want to delete
            },
        });
        console.log(`User with username ${username} deleted successfully`);
    } catch (error) {
        console.error('Error deleting user:', error);
    } finally {
        await prisma.$disconnect();
    }
};

deleteUser('admin'); // Replace 'admin' with the actual username you want to delete
