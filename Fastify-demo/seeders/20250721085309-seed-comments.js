export async function up(queryInterface, Sequelize) {
  // Assuming post with ID 1 exists
  await queryInterface.bulkInsert('comments', [
    {
      content: 'Great post!',
      post_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      content: 'Thanks for sharing.',
      post_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Comments', null, {});
}
