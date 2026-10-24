import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage || loading) return;
    await sendMessages(trimmedMessage);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="shrink-0 bg-gray-800 pb-[env(safe-area-inset-bottom)]">
      <div className="flex min-h-16 items-center gap-2 px-3 py-2 sm:px-4">
        <div className="min-w-0 flex-1">
          <input
            type="text"
            placeholder="Type here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-xl border border-gray-700 bg-slate-900 px-4 py-3 text-base outline-none focus:border-blue-400"
            autoComplete="off"
          />
        </div>
        <button type="submit" disabled={!message.trim() || loading} aria-label="Send message" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-blue-400 disabled:opacity-50">
          <IoSend className="text-3xl" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
