import { IConfig } from "overmind";
import { createHook } from "overmind-react";

import state from "./state";
import * as actions from "./actions";
import { Options } from "overmind/lib/internalTypes";

export const config = {
  state,
  actions
};

export const options: Options = {
  devtools: process.env.NODE_ENV === "development"
};

declare module "overmind" {
  interface Config extends IConfig<typeof config> {}
}

export const useOvermind = createHook<typeof config>();
