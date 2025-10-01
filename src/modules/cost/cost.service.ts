import { prisma } from "../../db/client";

export const CostService = {
  create: (operationId: number, volumeRange: string, cost: number) =>
    prisma.cost.create({
      data: { operationId, volumeRange, cost }
    }),
  createManyForOperation: (operationId: number, costs: { volumeRange: string; cost: number }[]) =>
    prisma.$transaction(
      costs.map(c => prisma.cost.create({ data: { operationId, volumeRange: c.volumeRange, cost: c.cost } }))
    ),
  deleteByOperation: (operationId: number) =>
    prisma.cost.deleteMany({ where: { operationId } })
};
