// @flow

const PATH = process.env.REACT_APP_SLACK_API_URL;

/* eslint func-names: ["error", "never"] */

function fetchRequest(path) {
  return fetch(path)
    .then(response => response.json())
    .catch(err => err);
}

export default class SLACK_API {
  static async fetchRequestChannels() {
    console.log('channels fetch', `with the ${PATH}`);
    const channels = await fetchRequest(`${PATH}/channels`);
    return channels;
  }

  static async fetchRequestMessagesForChannel(channel) {
    const messages = await fetchRequest(`${PATH}/messages/${channel}`);
    return messages;
  }
}
