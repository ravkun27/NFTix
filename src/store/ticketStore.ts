// stores/ticketStore.ts
import { create } from "zustand";

type TicketStore = {
  mintedTicketIds: Set<string>;
  mintTicket: (id: string) => void;
};

export const useTicketStore = create<TicketStore>((set) => ({
  mintedTicketIds: new Set(),
  mintTicket: (id: string) =>
    set((state) => ({
      mintedTicketIds: new Set(state.mintedTicketIds).add(id),
    })),
}));
