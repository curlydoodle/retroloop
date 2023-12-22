import { z } from 'zod'

export const UserCreateInputSchema = z.object({
  email: z.string(),
  name: z.string().nullable(),
  subscriptionType: z.string(),
  subscriptionExpires: z.date().nullable(),
})

export const UserUpdateInputSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  subscriptionType: z.string().optional(),
  subscriptionExpires: z.date().optional(),
})

export const UserSessionSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().nullable(),
  image: z.string().nullable(),
  subscriptionType: z.string(),
  subscriptionExpires: z.date().nullable(),
})
