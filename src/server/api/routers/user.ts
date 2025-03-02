import { UserCreateInputSchema, UserSessionSchema, UserUpdateInputSchema } from '@/schemas/user'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'

export const userRouter = createTRPCRouter({
  getLoggedIn: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        id: ctx.session?.user?.id,
      },
    })
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({
      where: {
        retrospectives: {
          some: {
            participants: {
              some: {
                id: {
                  equals: ctx.session?.user?.id,
                },
              },
            },
          },
        },
        NOT: {
          id: {
            equals: ctx.session?.user?.id,
          },
        },
      },
    })
  }),
  add: publicProcedure.input(UserCreateInputSchema).mutation(({ ctx, input }) => {
    return ctx.db.user.create({ data: input })
  }),
  edit: publicProcedure.input(UserUpdateInputSchema).mutation(({ ctx, input }) => {
    return ctx.db.user.update({
      where: {
        id: input.id,
      },
      data: input,
    })
  }),
  delete: publicProcedure.input(UserSessionSchema).mutation(({ ctx, input }) => {
    return ctx.db.user.delete({
      where: {
        id: input.id,
      },
    })
  }),
  subscriptionStatus: protectedProcedure.query(async ({ ctx }) => {
    const { session, db } = ctx

    if (!session.user?.id) {
      throw new Error('Not authenticated')
    }

    const data = await db.user.findUnique({
      where: {
        id: session.user?.id,
      },
      select: {
        stripeSubscriptionStatus: true,
      },
    })

    if (!data) {
      throw new Error('Could not find user')
    }

    return data.stripeSubscriptionStatus
  }),
})
