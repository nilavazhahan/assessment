import React from 'react';
import axios from 'axios';

const URL = 'https://webhook.site/af2530d1-5416-4a65-892e-343b1a95bde8'

export const fetchData = async (payload) => {
    try {
        const response = await axios.post(URL, payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Server response:', response.data);
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
      }
}




