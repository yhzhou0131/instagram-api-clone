import mongoose from 'mongoose';
import connectDB from '../index.js';
import { CommentAt, Like, Post, User } from '../models/index.js';

const seed = async () => {
  console.log('Cleanning database');

  await connectDB();
  await mongoose.connection.dropCollection('posts');
  await mongoose.connection.dropCollection('users');
  await mongoose.connection.dropCollection('likes');
  await mongoose.connection.dropCollection('comments');

  console.log('Database clean');

  const users = [
    new User({ name: 'User 1', email: 'user1@eamil.com', password: 'pwd1' }),
    new User({ name: 'User 2', email: 'user2@eamil.com', password: 'pwd2' }),
    new User({ name: 'User 3', email: 'user3@eamil.com', password: 'pwd3' }),
  ];

  // Obviously fake names
  const posts = [
    new Post({
      caption: 'The incredible GraphQL',
      poster: users[0]?._id,
    }),
    new Post({
      caption: 'Node.js Superman',
      poster: users[1]?._id,
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
      email: 'user4@email.com',
      password: 'pwd4',
      followers: [users[0]?._id],
      following: [users[0]?._id],
    })
  );

  const likes = [
    new Like({
      uid: users[0]?._id,
      postId: posts[0]?._id,
    }),
    new Like({
      uid: users[0]?._id,
      postId: posts[2]?._id,
    }),
  ];

  const comments = [
    new CommentAt({
      uid: users[0]?._id,
      posterId: posts[0]?.poster,
      postId: posts[0]?._id,
      comment: `Comment by ${users[0]?.name}`,
    }),
    new CommentAt({
      uid: users[1]?._id,
      posterId: posts[1]?.poster,
      postId: posts[1]?._id,
      comment: 'Great!!!',
    }),
  ];

  const savings = [
    ...users.map((user) => user.save()),
    ...posts.map((post) => post.save()),
    ...likes.map((like) => like.save()),
    ...comments.map((comment) => comment.save()),
  ];

  await Promise.all(savings);

  console.log('Database seeded');

  mongoose.connection.close();
};

seed();
