'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('users', [
    {
      name: 'Alice',
      email: 'alice@example.com',
      password: 'hashedpassword1', // ⚠️ Store hashed passwords in real apps!
      bio: 'Just a curious developer.',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Bob',
      email: 'bob@example.com',
      password: 'hashedpassword2',
      bio: 'I write about code and coffee.',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('users', null, {});
}
