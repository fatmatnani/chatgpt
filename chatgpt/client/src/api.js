export const fetchResponse = async (chat) => {
    try {
      const response = await fetch('https://chatgptclone-pwgu.onrender.com/', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: chat.map((message) => message.message).join("\n")
        })
      });
  
      if (!response.ok) {
        // If the HTTP status code is not 2xx, throw an error
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Check if the data contains the expected properties
      if (typeof data.message === 'undefined') {
        console.error('Invalid response data:', data);
        throw new Error('The server response does not contain a message field.');
      }
  
      return data;
    } catch (error) {
      console.log('Error message:', error.message);  
      // Log more detailed error information for debugging
      console.error('Error fetching response:', error);
      // Depending on your application's needs, you might want to return a default value or re-throw the error
      // return someDefaultValue;
      throw error;
    }
  };
  
