import { userQueries, userMutations, userFields } from './user/index.js';
import { postQueries, postMutations, postFields } from './post/index.js';

export const resolvers = {
  Query: {
    ...userQueries,
    ...postQueries,
  },
  Mutation: {
    ...userMutations,
    ...postMutations,
  },
  ...userFields,
  ...postFields,
};
