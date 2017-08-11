// @flow

import React from 'react';
import { Button, Image } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import logo from './images/slack-logo.png';
// import slackConnectHref from './connectWithSlackHref';
import slack from './images/slackIcon.png';

import store from './store';
import Actions from './Actions';

export function LoginView(props) {
  console.log(props)
  const {connectWithSlack} = props;
  return (
    <div>
      <div className="SlackApp">
        <div className="SlackApp-header">
          <img src={logo} className="SlackApp-logo" alt="slack-logo" />
        </div>
        <div className="connectButton">
          <Button
            size="big"
            color={'teal'}
            // href={slackConnectHref}
            onClick={
              () => connectWithSlack()
            }
          >
            <Image avatar src={slack} />
            Connect with Slack
          </Button>
        </div>
      </div>
    </div>
  );
}

export const mapDispatchToProps = (dispatch) => {
  const {connectWithSlack} = Actions;
  return bindActionCreators({connectWithSlack}, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginView);
