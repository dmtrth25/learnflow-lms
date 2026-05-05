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

export const CREATE_COURSE = gql`
  mutation CreateCourse($input: CreateCourseInput!) {
    createCourse(input: $input) {
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
