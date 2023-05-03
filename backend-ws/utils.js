const axios = require('axios');

const extractUserFromToken = async (token) => {
    try {
      const response = await axios.get(`${process.env.API_BASE_URL_PRODUCTION}/session/verifyToken`, {
        headers: {
          'Content-Type': 'application/json',
          'token': token,
          'secret': process.env.SERVER_SECRET,
        },
      });
      if (response.data.isValid) return response.data.verifyResult;
      return false;
    } catch (error) {
      console.error('Error extracting user from token:', error.code);
      return false;
    }
};

const logoutUser = async (token) => {
    try {
      const response = await axios.post(`${process.env.API_BASE_URL_LOCAL}/session/logout`,{}, {
        headers: {
          'Content-Type': 'application/json',
          'token': token,
          'secret': process.env.SERVER_SECRET,
        },
      })
      console.info(response.data)
    } catch (e) {
      console.info(e.response.data.error)
    }
}


const sendMessageToClient = (senderUsername, recipientUsername, message) => {
    const recipientWs = clients.get(recipientUsername);
    if (recipientWs) {
      recipientWs.send(JSON.stringify({
        event: "message",
        data: {
          sender: senderUsername,
          message: message
        }
      }));
    } else {
      console.error(`Recipient with username ${recipientUsername} not found`);
    }
  };
  


module.exports = {
    extractUserFromToken,
    logoutUser,
    sendMessageToClient
}