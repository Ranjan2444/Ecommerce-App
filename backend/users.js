import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function showUsers() {
  try {
    // Query all users from the database
    const users = await prisma.user.findMany();

    // Check if there are no users in the database
    if (users.length === 0) {
      console.log('No users found.');
      return;
    }

    // Display the user information in a table format
    console.table(users, ['id', 'username', 'email', 'role', 'createdAt']); // Customize based on your fields
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    // Disconnect Prisma client to avoid keeping the database connection open
    await prisma.$disconnect();
  }
}

// Run the function
showUsers();
