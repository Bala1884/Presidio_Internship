'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('comments', [
    {
      content: 'Great post!',
      post_id: 1,
      user_id: 2, // Bob comments on Alice's post
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      content: 'Thanks for the insights!',
      post_id: 2,
      user_id: 1, // Alice comments on Bob's post
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('comments', null, {});
}
