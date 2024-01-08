import mongoose from 'mongoose';
import connectDB from '../index.js';
import { Post, User } from '../models/index.js';

const seed = async () => {
  console.log('Cleanning database');

  await connectDB();
  await mongoose.connection.dropCollection('posts');
  await mongoose.connection.dropCollection('users');

  console.log('Database clean');

  const users = [
    new User({ name: 'User 1' }),
    new User({ name: 'User 2' }),
    new User({ name: 'User 3' }),
  ];

  // Obviously fake names
  const posts = [
    new Post({
      caption: 'The incredible GraphQL',
      poster: users[0]?._id,
      likedUsers: [
        {
          id: users[1]?._id,
          time: Date.now(),
        },
      ],
    }),
    new Post({
      caption: 'Node.js Superman',
      poster: users[1]?._id,
      commentedUsers: [
        {
          id: users[0]?._id,
          comment: `Comment by ${users[0]?.name}`,
          time: Date.now(),
        },
      ],
    }),
    new Post({ caption: 'Javascript Master', poster: users[2]?._id }),
    new Post({ caption: 'Building APIs with GraphQL', poster: users[2]?._id }),
    new Post({
      caption: 'Dante Inferno: Callback hell',
      poster: users[0]?._id,
    }),
    new Post({ caption: 'Async and await', poster: users[1]?._id }),
    new Post({ caption: 'Another common JS book', poster: users[2]?._id }),
    new Post({ caption: 'Hello world!: A JS tale', poster: users[1]?._id }),
  ];

  users.push(
    new User({
      name: 'User 4',
      followers: [users[0]?._id],
      following: [users[0]?._id],
      likedPosts: [
        {
          id: posts[0]?._id,
          time: Date.now(),
        },
      ],
      commentedPosts: [
        {
          id: posts[0]?._id,
          comment: 'Great!!!',
          time: Date.now(),
        },
      ],
    })
  );

  const savings = [
    ...users.map((user) => user.save()),
    ...posts.map((post) => post.save()),
  ];

  await Promise.all(savings);

  console.log('Database seeded');

  mongoose.connection.close();
};

seed();
