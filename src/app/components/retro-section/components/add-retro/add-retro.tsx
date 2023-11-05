'use client'

import { IconPlus } from '@tabler/icons-react'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { RetrospectiveCreateInput } from 'src/app/types/retrospective'
import { Button } from 'src/app/ui/button/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/app/ui/dialog/dialog'
import { Input } from 'src/app/ui/input/input'
import { Label } from 'src/app/ui/label/label'
import { toFormikValidationSchema } from 'zod-formik-adapter'

import { RetrospectiveCreateInputSchema } from '@/schemas/retrospective'

type AddRetroProps = {
  handleAddRetro: (input: RetrospectiveCreateInput) => void
}

export function AddRetro({ handleAddRetro }: AddRetroProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='flex gap-1'>
          Start Retro
          <IconPlus size={18} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start retrospective</DialogTitle>
          <DialogDescription>Create a new retrospective by giving it a name</DialogDescription>
        </DialogHeader>

        <Formik
          validationSchema={toFormikValidationSchema(RetrospectiveCreateInputSchema)}
          initialValues={{
            name: '',
            date: new Date(),
            timerExpiration: new Date(),
            phase: 'WRITING',
          }}
          onSubmit={(values: RetrospectiveCreateInput) => {
            handleAddRetro(values)
            setIsOpen(false)
          }}
        >
          <Form className='flex flex-col gap-5'>
            <fieldset>
              <Label htmlFor='name'>Retro Name</Label>

              <Field id='name' as={Input} name='name' placeholder='Untitled Retro' />
            </fieldset>

            <DialogFooter>
              <Button type='submit' aria-label='Start Retro'>
                Start Retro
              </Button>
            </DialogFooter>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
