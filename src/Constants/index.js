// @flow

export const WIDGET_ID = 'slack';

export const slackConnectHref = `https://slack.com/oauth/authorize?scope=channels:history,reactions:read,users:read&client_id=${process.env.REACT_APP_SLACK_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
