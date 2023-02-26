// import the gql tagged template function
const { gql } = require('apollo-server-express');

//create typeDefs
const typeDefs = gql`

    type Inbox {
        _id: ID
        name: String
        emails: [Email]
    }

    type Email {
        _id: ID
        date: String
        subject: String
        body: String
    }

    input EmailInput {
            date: String!
            subject: String!
            body: String!
        }

    type Query {
        getInbox: [Inbox]
        getOneInbox(_id: ID!): Inbox
        openInbox: [Email]
        getEmail(_id: ID!): Email
    }

    input AddEmailInput {
        inboxId: ID!
        emails: [EmailInput!]!
      }

    type Mutation{
        addInbox(name: String!): Inbox
        addEmail(inboxId: ID!, email: EmailInput): Inbox
        deleteInbox(_id: ID!): Inbox
        deleteEmail(_id: ID!): Email
    }

`;

// export the typeDefs
module.exports = typeDefs;
