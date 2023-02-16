export const typeDefs = /* GraphQL */ `
  type Query {
    getUser: User!
    linkFeed(filterNeedle: String, take: Int, skip: Int): [Link]!
    link(id: Int!): Link
    comment(id: Int!): Comment
    linkComments(linkId: Int!): Link
  }

  type Mutation {
    # prevent post link if user has a link with the same title
    postLink(description: String!, url: String!): Link
    postCommentOnLink(linkId: Int!, body: String!): Comment
    deleteCommentOnLink(commentId: Int!): Comment
    updateCommentOnLink(commentId: Int!, body: String!): Comment

    deleteLink(id: Int!): Link!
    updateLink(id: Int!, description: String, url: String): Link!

    signUp(name: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    deleteUserAccount(password: String!): User
  }

  type AuthPayload {
    user: User
    token: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    links: [Link]
    comments: [Comment]
  }

  type Link {
    id: ID!
    description: String!
    url: String!
    comments: [Comment]
    postedBy: User
  }

  type Comment {
    id: ID!
    body: String!
    link: Link
    postedBy: User
  }
`;