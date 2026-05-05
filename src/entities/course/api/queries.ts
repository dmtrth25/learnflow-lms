import { graphql } from '@/shared/api/gql'

export const GET_COURSES = graphql(`
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
`)

export const CREATE_COURSE = graphql(`
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
`)
