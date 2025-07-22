export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('posts', [
    {
      title: 'First Post',
      category: 'Tech',
      tags: 'fastify,node,sequelize',
      user_id: 1, // Ensure this user exists
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Second Post',
      category: 'Life',
      tags: 'thoughts,daily',
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('posts', null, {});
}
