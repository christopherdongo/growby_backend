import { OperationService } from "../../modules/operations/operation.service";
import { CostService } from "../../modules/cost/cost.service";

export const operationResolvers = {
  Query: {
    operationsByPlant: async (_: any, { plantId }: { plantId: string }) =>
      await OperationService.findAllByPlant(Number(plantId))
  },
  Mutation: {
    createOperation: async (_: any, { data }: any) => {
      // data: { name, plantId, costs: [{volumeRange, cost}] }
      const op = await OperationService.create(Number(data.plantId), data.name);

      if (data.costs && data.costs.length) {
        await CostService.createManyForOperation(op.id, data.costs);
      }

      // return operation with costs
      return await OperationService.findById(op.id);
    },

    updateOperation: async (_: any, { id, data }: any) => {
      // delete old costs and recreate
      await CostService.deleteByOperation(Number(id));
      const op = await OperationService.update(Number(id), data.name);

      if (data.costs && data.costs.length) {
        await CostService.createManyForOperation(op.id, data.costs);
      }

      return await OperationService.findById(op.id);
    },

    deleteOperation: async (_: any, { id }: { id: string }) => {
      await CostService.deleteByOperation(Number(id));
      await OperationService.update(Number(id), "DELETED") // or prisma.operation.delete...
        .catch(() => null);
      // better to actually delete:
      // await prisma.operation.delete({ where: { id: Number(id) } })
      return true;
    }
  }
};
