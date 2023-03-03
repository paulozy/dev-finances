import { initTRPC } from '@trpc/server'

const trpc = initTRPC.create()

const router = trpc.router
const procedure = trpc.procedure

export { router, procedure }
