import { IConfig } from "overmind";
import { createHook } from "overmind-react";
import { namespaced, merge } from "overmind/config";
import { Options } from "overmind/lib/internalTypes";

// globals
import globalState from "./global/state";
import * as globalActions from "./global/actions";

// models
import items from "./models/Item";
import tags from "./models/Tag";

// config

const globalConfig = {
  state: globalState,
  actions: globalActions
};

const namespacedConfig = namespaced({
  items,
  tags
});

export const config = merge(globalConfig, namespacedConfig);

// react

export const useOvermind = createHook<typeof config>();

export const options: Options = {
  devtools: true
};

// types

declare module "overmind" {
  interface Config extends IConfig<typeof config> {}
}
