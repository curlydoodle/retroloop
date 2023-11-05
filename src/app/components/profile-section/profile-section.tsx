'use client'
import { User } from '@prisma/client'
import { IconUserCircle } from '@tabler/icons-react'
import { Field, Form, Formik } from 'formik'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { GridLoader } from 'react-spinners'
import { DeleteUserDialog } from 'src/app/components/profile-section/components/delete-user-dialog'
import { UserUpdateInput } from 'src/app/types/user'
import { Avatar, AvatarFallback, AvatarImage } from 'src/app/ui/avatar/avatar'
import { Badge } from 'src/app/ui/badge/badge'
import { Button } from 'src/app/ui/button/button'
import { Card, CardHeader, CardTitle } from 'src/app/ui/card/card'
import { Input } from 'src/app/ui/input/input'
import { Label } from 'src/app/ui/label/label'
import { useToast } from 'src/app/ui/toast/use-toast'
import { trpc } from 'src/app/utils/trpc'
import { formatDate } from 'src/app/utils/utils'
import { toFormikValidationSchema } from 'zod-formik-adapter'

import { UserUpdateInputSchema } from '@/schemas/user'

export function ProfileSection() {
  const { publicRuntimeConfig } = getConfig()
  const router = useRouter()
  const { toast } = useToast()
  const { resolvedTheme } = useTheme()

  const { data: user, isLoading, refetch } = trpc.user.getLoggedIn.useQuery()
  const version = publicRuntimeConfig?.version

  const { mutate: updateUser } = trpc.user.edit.useMutation({
    onSuccess: () => {
      refetch()
    },
  })

  const { mutate: deleteUser } = trpc.user.delete.useMutation({
    onSuccess: () => {
      router.push('/')
    },
  })

  const handleSubmit = (input: UserUpdateInput): void => {
    updateUser(input)
    toast({
      title: 'Profile updated',
      description: 'Your profile was successfully updated',
    })
  }

  const handleDelete = (input: User): void => {
    deleteUser(input)
    toast({
      title: 'Account deleted',
      description: 'Your account was successfully deleted',
    })
  }

  return (
    <>
      {user ? (
        <Card className='w-[calc(100%-2.5rem)] bg-background p-10 shadow-sm'>
          <CardHeader className='flex flex-row items-baseline justify-between'>
            <CardTitle>PROFILE</CardTitle>
            <Badge>Version {version}</Badge>
          </CardHeader>

          <Formik
            validationSchema={toFormikValidationSchema(UserUpdateInputSchema)}
            initialValues={{
              id: user?.id || '',
              name: user?.name || '',
              email: user?.email || '',
              image: user?.image || '',
              role: user?.role || '',
              createdAt: user?.createdAt,
              emailVerified: user?.emailVerified,
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form className='mx-auto w-10/12'>
              <div className='flex flex-col items-center justify-around gap-5 sm:flex-row sm:items-end sm:gap-0'>
                <section className='flex flex-col gap-5'>
                  <fieldset className='flex flex-col items-start gap-2'>
                    <Label htmlFor='name'>Name</Label>
                    <Field as={Input} id='name' name='name' type='text' placeholder='Your Name' />
                  </fieldset>

                  <fieldset className='flex flex-col items-start gap-2'>
                    <Label htmlFor='email'>E-Mail</Label>
                    <Field
                      as={Input}
                      id='email'
                      name='email'
                      type='email'
                      placeholder='user@mail.com'
                    />
                  </fieldset>

                  <Button type='submit'>Submit</Button>
                </section>

                <section className='flex flex-col items-center gap-2'>
                  <Avatar className='h-32 w-32'>
                    <AvatarImage src={user.image || ''} alt='User Avatar' />
                    <AvatarFallback className='h-32 w-32'>
                      <IconUserCircle size={64} />
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col items-center gap-2'>
                    <Label>User since</Label>
                    <Badge variant='outline'>{formatDate(user.createdAt)}</Badge>

                    {user ? (
                      <DeleteUserDialog itemToDelete={user} deleteHandler={handleDelete} />
                    ) : null}
                  </div>
                </section>
              </div>
            </Form>
          </Formik>
        </Card>
      ) : (
        <div className='grid h-screen place-items-center'>
          <GridLoader
            color={resolvedTheme === 'light' ? 'black' : 'white'}
            loading={isLoading}
            size={15}
            aria-label='Loading Spinner'
          />
        </div>
      )}
    </>
  )
}
