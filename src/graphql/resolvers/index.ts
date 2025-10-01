import { plantResolvers } from "./plan.resolver";
import { operationResolvers } from "./operation.resolver";
import { merge } from "lodash";

// GraphQL expects a single resolver map. We combine maps.
export const resolvers = merge({}, plantResolvers, operationResolvers);
