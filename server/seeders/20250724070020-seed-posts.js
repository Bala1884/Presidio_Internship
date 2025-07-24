'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('posts', [
    {
      title: 'First Post',
      content: 'This is the content of the first post.',
      category: 'Tech',
      tags: 'fastify,node,blog',
      image_urls: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
      user_id: 1, // should match existing user ID
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: 'Second Post',
      content: 'This is another blog post.',
      category: 'Life',
      tags: 'daily,thoughts',
      image_urls: ['https://example.com/image3.jpg'],
      user_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('posts', null, {});
}
