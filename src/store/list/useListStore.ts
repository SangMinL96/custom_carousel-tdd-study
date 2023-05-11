import { create } from "zustand";

const defaultState = {
  listLimit: 5,
  detailCarClassId: null,
};
export interface State {
  listLimit: number;
  detailCarClassId: number | null;
  setListLimit: (value: number) => void;
  setDetailCarClassId: (value: number) => void;
  resetState: () => void;
}

export const useListStore = create<State>((set) => ({
  ...defaultState,
  setListLimit: (value) => set(() => ({ listLimit: value === 0 ? 5 : value })),
  setDetailCarClassId: (value) => set(() => ({ detailCarClassId: value })),
  resetState: () => set(defaultState),
}));
