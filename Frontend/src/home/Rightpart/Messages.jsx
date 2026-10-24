import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";
function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage(); // listing incoming messages
  console.log(messages);

  const lastMsgRef = useRef();
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      lastMsgRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 50);
    return () => window.clearTimeout(timeout);
  }, [messages]);
  return (
    <div className="min-h-full px-2 py-3 sm:px-4">
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message, index) => (
          <div key={message._id} ref={index === messages.length - 1 ? lastMsgRef : null}>
            <Message message={message} />
          </div>
        ))
      )}

      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">
            Say! Hi to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;
