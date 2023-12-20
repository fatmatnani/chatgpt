import React, { useState } from 'react'; // Combine React and useState import
import PropTypes from 'prop-types'; //eslint-disable-line

const ChatInput = ({ sendMessage, loading }) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value.trim() === '') return;
    sendMessage({ sender: 'user', message: value.trim() });
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      handleSubmit();
    }
  };

  return (
    <div className="w-full bg-white bg-opacity-10 max-h-40 rounded-lg px-4 py-4 overflow-auto relative">
      {loading ? (
        <img src="./loader.gif" className="w-8 m-auto" alt="Loading" />
      ) : (
        <>
          <textarea
            onKeyDown={handleKeyDown}
            rows={1}
            className="border-0 bg-transparent outline-none w-11/12"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <img
            onClick={handleSubmit}
            src="./send.png"
            width={20}
            alt="Send button"
            className="absolute top-4 right-3 hover:cursor-pointer ease-in duration-100 hover:scale-125"
          />
        </>
      )}
    </div>
  );
};

// You can add PropTypes validation here if necessary
 ChatInput.propTypes = {
   sendMessage: PropTypes.func.isRequired,
   loading: PropTypes.bool.isRequired
 };

export default ChatInput;
