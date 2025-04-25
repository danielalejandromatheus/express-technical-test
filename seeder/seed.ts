import mongoose from 'mongoose';
import { UserModel } from 'src/models/user.model'; // Adjust path if needed
import { MONGODB_URI } from 'src/consts/env';

const seedUsers = async () => {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to DB');

  const usersToSeed = [
    {
      name: 'Root User',
      email: 'root@example.com',
      password: '123456',
      role: 'admin',
    },
    {
      name: 'Manager User',
      email: 'manager@example.com',
      password: '123456',
      role: 'manager',
    },
  ];

  for (const userData of usersToSeed) {
    const existingUser = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
      console.log(`User ${userData.email} already exists`);
      continue;
    }

    const user = new UserModel({
      ...userData,
    });
    await user.save();
    console.log(`User ${user.email} created`);
  }

  await mongoose.disconnect();
  console.log('Disconnected from DB');
};

seedUsers().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});
