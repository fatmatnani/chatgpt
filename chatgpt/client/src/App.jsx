import React, { useState } from 'react';
import { useMutation } from 'react-query';
import ChatBody from './components/ChatBody';
import ChatInput from './components/ChatInput';
import { fetchResponse } from './api';

function App() {
  const [chat, setChat] = useState([]);

  const mutation = useMutation({
    mutationFn: () => fetchResponse(chat),
    onSuccess: (data) => {
      // Check if data and data.message are defined
      if (data && typeof data.message === 'string') {
        setChat((prev) => [
          ...prev,
          { sender: 'ai', message: data.message.replace(/^\n\n/, '') },
        ]);
      } else {
        console.error('Invalid response data:', data);
        // Optionally, handle the case where data is not as expected
        // e.g., set an error state and display a message to the user
      }
    },
    // Consider adding onError callback for handling API errors
  });

  const sendMessage = async (message) => {
    await Promise.resolve(setChat((prev) => [...prev, message]));
    mutation.mutate();
  };

  return (
    <div className="bg-[#1A232E] h-screen py-6 relative sm:px-16 px-12 text-white overflow-hidden flex flex-col justify-between align-middle">
      {/* Gradients */}
      <div className="gradient-01 z-0 absolute"></div>
      <div className="gradient-02 z-0 absolute"></div>

      {/* Header */}
      <div className="uppercase font-bold text-2xl text-center mb-3">
        ChatGptClone
      </div>

      {/* Chat Body */}
      <div className="h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-gray-transparent scrollbar-thumb-rounded-md">
        <ChatBody chat={chat} />
      </div>

      {/* Chat Input */}
      <div className="w-full max-w-4xl min-w-[20rem] self-center">
        <ChatInput sendMessage={sendMessage} loading={mutation.isLoading} />
      </div>
    </div>
  );
}

export default App;
