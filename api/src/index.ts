import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const courses = [
  {
    id: '1',
    title: 'React Fundamentals',
    description: 'Learn React from scratch',
    level: 'Beginner',
    status: 'Active',
    studentsCount: 48,
    progress: 72,
  },
  {
    id: '2',
    title: 'TypeScript Deep Dive',
    description: 'Advanced TypeScript',
    level: 'Intermediate',
    status: 'Active',
    studentsCount: 36,
    progress: 64,
  },
]

const typeDefs = `#graphql
  type Course {
    id: ID!
    title: String!
    description: String!
    level: String!
    status: String!
    studentsCount: Int!
    progress: Int!
  }

  type Query {
    courses: [Course!]!
  }
`

const resolvers = {
  Query: {
    courses: () => courses,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
})

console.log(`Server ready at ${url}`)
