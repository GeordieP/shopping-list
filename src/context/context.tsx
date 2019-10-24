import React, { createContext, useReducer } from "react";

import {
  reducer as itemsReducer,
  initialState as itemsInitialState
} from "./itemsState";

import {
  reducer as tagsReducer,
  initialState as tagsInitialState
} from "./tagsState";

type TItemsContext = {
  state: ItemsState;
  dispatch: React.Dispatch<ItemsAction>;
};
type TTagsContext = { state: TagsState; dispatch: React.Dispatch<TagsAction> };

export const ItemsContext = createContext<TItemsContext | null>(null);
export const ItemsContextProvider = createProvider<
  ItemsState,
  ItemsAction,
  TItemsContext
>(itemsReducer, itemsInitialState, ItemsContext as React.Context<
  TItemsContext
>);

export const TagsContext = createContext<TTagsContext | null>(null);
export const TagsContextProvider = createProvider<
  TagsState,
  TagsAction,
  TTagsContext
>(tagsReducer, tagsInitialState, TagsContext as React.Context<TTagsContext>);

// Helper to create a generic provider component with the necessary bindings.
function createProvider<S, A, C>(
  reducer: React.Reducer<S, A>,
  initialState: S,
  ctx: React.Context<C>
) {
  return ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    props: any[];
  }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // TODO: declare this type manually (why can't it be inferred?)
    const Prov = ctx.Provider as any;

    return (
      <Prov value={{ state, dispatch }} {...props}>
        {children}
      </Prov>
    );
  };
}
