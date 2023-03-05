import { initTRPC } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getSession } from "next-auth/react";

const trpc = initTRPC.create();

const router = trpc.router;
const procedure = trpc.procedure;

export { router, procedure };
