import { prisma } from "../../db/client";

export const OperationService = {
  create: (plantId: number, name: string) =>
    prisma.operation.create({
      data: { name, plantId }
    }),
  update: (id: number, name: string) =>
    prisma.operation.update({
      where: { id },
      data: { name }
    }),
  findById: (id: number) =>
    prisma.operation.findUnique({ where: { id }, include: { costs: true } }),
  findAllByPlant: (plantId: number) =>
    prisma.operation.findMany({ where: { plantId }, include: { costs: true } })
};
