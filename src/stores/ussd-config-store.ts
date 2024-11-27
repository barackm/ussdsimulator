import { create } from "zustand";

type UssdConfigState = {
  phoneNumber: string;
  serviceCode: string;
  callbackUrl: string;
  showConfigModal: boolean;
  setConfig: (config: Partial<UssdConfigState>) => void;
  resetConfig: () => void;
  setShowConfigModal: (show: boolean) => void;
};

export const useUssdConfigStore = create<UssdConfigState>((set) => ({
  phoneNumber: "",
  serviceCode: "",
  callbackUrl: "",
  setConfig: (config) => set((state) => ({ ...state, ...config })),
  resetConfig: () => set({ phoneNumber: "", serviceCode: "", callbackUrl: "" }),
  showConfigModal: false,
  setShowConfigModal: (show) => set({ showConfigModal: show }),
}));
