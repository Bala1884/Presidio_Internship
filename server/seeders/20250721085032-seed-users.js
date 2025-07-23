import bcrypt from 'bcrypt';

export async function up(queryInterface, Sequelize) {
  const hashedPassword = await bcrypt.hash('12345678', 10);

  return queryInterface.bulkInsert('users', [
    {
      name: 'SampleUser',
      email: 'sample@gmail.com',
      password: hashedPassword,
      bio: 'Footballer',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}

export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('Users', { email: 'sample2@gmail.com' });
}
