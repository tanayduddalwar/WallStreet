const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  // Delete existing records before inserting new ones
  await prisma.company.deleteMany({});
  await prisma.user.deleteMany({});

  const companies = [
    { id: 1, name: 'Google' },
    { id: 2, name: 'Facebook' },
    { id: 3, name: 'Instagram' },
    { id: 4, name: 'Spotify' },
    { id: 5, name: 'Dropbox' },
    { id: 6, name: 'Reddit' },
    { id: 7, name: 'Netflix' },
    { id: 8, name: 'Pinterest' },
    { id: 9, name: 'Quora' },
    { id: 10, name: 'YouTube' },
  ];

  // Insert companies
  await prisma.company.createMany({
    data: companies,
  });

  console.log('Sample companies added!');

  // Seed users with email and password
  await prisma.user.createMany({
    data: [
      {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123', // Add a password here
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        password: 'password123', // Add a password here
      },
    ],
  });

  console.log('Sample users added!');

  // Close Prisma connection
  await prisma.$disconnect();
}

// Run the seed function
seed().catch(e => {
  console.error(e);
  process.exit(1);
});
