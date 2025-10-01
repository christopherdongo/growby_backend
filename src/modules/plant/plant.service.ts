import { prisma } from "../../db/client";

export const PlantService = {
  create: (name: string) => prisma.plant.create({ data: { name } }),
  findAll: () =>
    prisma.plant.findMany({ include: { operations: { include: { costs: true } } } }),
  findById: (id: number) =>
    prisma.plant.findUnique({
      where: { id },
      include: { operations: { include: { costs: true } } }
    })
};
