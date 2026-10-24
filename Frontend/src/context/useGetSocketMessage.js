import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../zustand/useConversation.js";
import sound from "../assets/notification.mp3";
const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { selectedConversation, appendMessage } = useConversation();

  useEffect(() => {
    if (!socket || !selectedConversation?._id) return;

    const handleNewMessage = (newMessage) => {
      const chatPartnerId = selectedConversation._id;
      if (
        newMessage.senderId !== chatPartnerId &&
        newMessage.receiverId !== chatPartnerId
      ) {
        return;
      }

      appendMessage(newMessage);
      if (document.hidden) {
        const notification = new Audio(sound);
        notification.play().catch(() => {});
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedConversation?._id, appendMessage]);
};
export default useGetSocketMessage;
