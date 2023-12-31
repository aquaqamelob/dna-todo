import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.todo.delete({
        where: {
          id: input.id,
        },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.todo.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
          isComplete: false,
        },
      });
    }),
  toggle: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const todo = await ctx.prisma.todo.findFirst({
        where: {
          id: input.id,
        },
      });

      return ctx.prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          isComplete: todo ? !todo.isComplete : false,
        },
      });
    }),
});
