import { gql } from '@apollo/client'

export const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      title
      description
      level
      status
      studentsCount
      progress
    }
  }
`
