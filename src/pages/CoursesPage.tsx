import { useQuery } from '@apollo/client/react'
import { GET_COURSES } from '@/entities/course/api/queries'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CreateCourseDialog } from '@/features/courses/components/CreateCourseDialog'

type Course = {
  id: string
  title: string
  description: string
  level: string
  status: string
  studentsCount: number
  progress: number
}

type GetCoursesData = {
  courses: Course[]
}

export function CoursesPage() {
  const { data, loading, error } = useQuery<GetCoursesData>(GET_COURSES)

  if (loading) return <p>Loading courses...</p>

  if (error) {
    return <p className="text-sm text-destructive">Failed to load courses: {error.message}</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Courses</h1>
          <p className="text-sm text-muted-foreground">Manage LMS courses and track progress</p>
        </div>
        <CreateCourseDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data?.courses.map(course => (
          <Card key={course.id}>
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <Badge variant={course.status === 'Active' ? 'default' : 'secondary'}>
                  {course.status}
                </Badge>
              </div>

              <p className="line-clamp-2 text-sm text-muted-foreground">{course.description}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{course.level}</span>
                <span>{course.studentsCount} students</span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
