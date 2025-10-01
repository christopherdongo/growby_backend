import { PlantService } from "../../modules/plant/plant.service";

export const plantResolvers = {
  Query: {
    plants: async () => await PlantService.findAll(),
    plant: async (_: any, { id }: { id: string }) => await PlantService.findById(Number(id))
  },
  Mutation: {
    createPlant: async (_: any, { name }: { name: string }) => await PlantService.create(name)
  }
};
