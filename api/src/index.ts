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

  input CreateCourseInput {
    title: String!
    description: String!
    level: String!
  }

  type Query {
    courses: [Course!]!
  }

  type Mutation {
    createCourse(input: CreateCourseInput!): Course!
  }
`

const resolvers = {
  Query: {
    courses: () => courses,
  },
  Mutation: {
    createCourse: (
      _: unknown,
      args: {
        input: {
          title: string
          description: string
          level: string
        }
      },
    ) => {
      const newCourse = {
        id: crypto.randomUUID(),
        title: args.input.title,
        description: args.input.description,
        level: args.input.level,
        status: 'Draft',
        studentsCount: 0,
        progress: 0,
      }

      courses.push(newCourse)

      return newCourse
    },
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
