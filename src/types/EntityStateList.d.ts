declare interface EntityState {}

declare interface EntityStateList<TEntityState> {
  id: string;
  name: string;
  entries: { [key in string]: TEntityState };
}
