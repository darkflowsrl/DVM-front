import create from "zustand";

interface KeyBoardsState {
  openedKeyBoard: boolean;
  value: string;
  toggleKeyBoard: () => void;
  setValue: (value: string) => void;
}

export const useKeyBoard = create<KeyBoardsState>((set, get) => ({
  value: "",
  openedKeyBoard: false,
  toggleKeyBoard: () =>
    set((state) => ({
      openedKeyBoard: !state.openedKeyBoard,
      value: state.value
    })),
  setValue: (value: string) =>
    set((state) => ({
      value: value,
      openedKeyBoard: state.openedKeyBoard,
    })),
}));
