import { z } from 'zod'
import { router, procedure } from '../trpc'

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => ({ greeting: `Hello ${input.text}` })),
})

export type AppRouter = typeof appRouter
