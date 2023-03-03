import { z } from 'zod'
import { supabase } from '../database/supabase'
import { procedure, router } from '../trpc'

export const appRouter = router({
  getTransactions: procedure
    .input(
      z.object({
        owner: z.string().email(),
      })
    )
    .query(async ({ input }) => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .like('owner', input.owner)

      if (error) {
        console.log(error)
      }

      return data
    }),

  createTransaction: procedure
    .input(
      z.object({
        id: z.string().uuid(),
        type: z.string(),
        description: z.string(),
        value: z.number(),
        date: z.string(),
        owner: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      const { data, error } = await supabase
        .from('transactions')
        .insert([input])

      if (error) {
        throw new Error(error.message)
      }

      return data
    }),

  deleteTransaction: procedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      const { data, error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', input.id)

      if (error) {
        throw new Error(error.message)
      }

      return data
    }),
})

export type AppRouter = typeof appRouter
