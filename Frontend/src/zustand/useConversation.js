import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessage: (messages) => set({ messages }),
  appendMessage: (message) =>
    set((state) =>
      state.messages.some((existing) => existing._id === message._id)
        ? state
        : { messages: [...state.messages, message] }
    ),
}));
export default useConversation;
