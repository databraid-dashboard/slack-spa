// @flow

// const slackConnectHref = process.env.SLACK_CONNECT_HREF;

// export default slackConnectHref;

export const WIDGET_ID = 'slack';

// export const slackConnectHref = 'https://slack.com/oauth/authorize?scope=incoming-webhook&client_id=218633036018.221954264375';

export const slackConnectHref = `https://slack.com/oauth/authorize?scope=channels:history,reactions:read,users:read&client_id=${process.env.REACT_APP_SLACK_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
