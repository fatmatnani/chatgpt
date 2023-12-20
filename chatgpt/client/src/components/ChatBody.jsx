import React, { useEffect, useRef } from 'react'; // Combine React and hooks imports
import PropTypes from 'prop-types'; //eslint-disable-line
import autoAnimate from '@formkit/auto-animate';

const ChatBody = ({ chat }) => {
  const parent = useRef(null);
  const bottomRef = useRef(null);
  const aiStyle = "bg-white bg-opacity-40 backdrop-blur-lg dropshadow-md mr-auto";

  // Auto animations
  useEffect(() => {
    if (parent.current) {
      autoAnimate(parent.current);
    }
  }, [parent]);

  // Scroll to bottom on chat update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  return (
    <div className="flex flex-col gap-4" ref={parent}>
      {chat.map((message, i) => (
        <div
          key={i}
          className={`border-[#999999] break-words border-2 rounded-xl self-end px-3 py-3 max-w-[80%] ${message.sender === 'ai' && aiStyle}`}
        >
          <pre className="whitespace-pre-wrap">
            <span>{message.message}</span>
          </pre>
        </div>
      ))}
      <div ref={bottomRef} className="h-3"></div>
    </div>
  );
};

// You can add PropTypes validation 
 ChatBody.propTypes = {
   chat: PropTypes.array.isRequired
 };

export default ChatBody;
