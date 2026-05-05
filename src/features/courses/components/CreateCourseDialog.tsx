import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { CREATE_COURSE, GET_COURSES } from '@/entities/course/api/queries'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const createCourseSchema = z.object({
  title: z.string().min(3, 'Title should contain at least 3 characters'),
  description: z.string().min(10, 'Description should contain at least 10 characters'),
  level: z.string().min(3, 'Level is required'),
})

type CreateCourseFormValues = z.infer<typeof createCourseSchema>

export function CreateCourseDialog() {
  const [open, setOpen] = useState(false)

  const [createCourse, { loading }] = useMutation(CREATE_COURSE, {
    refetchQueries: [{ query: GET_COURSES }],
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCourseFormValues>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      title: '',
      description: '',
      level: 'Beginner',
    },
  })

  const onSubmit = async (values: CreateCourseFormValues) => {
    await createCourse({
      variables: {
        input: values,
      },
    })

    reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create course</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new course</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input placeholder="React Advanced Patterns" {...register('title')} />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea placeholder="Short description of the course" {...register('description')} />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Level</label>
            <Input placeholder="Beginner / Intermediate / Advanced" {...register('level')} />
            {errors.level && <p className="text-sm text-destructive">{errors.level.message}</p>}
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Creating...' : 'Create course'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
