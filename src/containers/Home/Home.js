import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
// import { CounterButton, GithubButton } from 'components';
import config from 'config';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

@connect(
  state => ({
    online: state.online
  })
)
export default class Home extends Component {

  static propTypes = {
    online: PropTypes.bool.isRequired
  };

  render() {
    // const { online } = this.props;
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage} alt="presentation" />
              </p>
            </div>
            <h1>{config.app.title}</h1>

            <h2>{config.app.description}</h2>

            <p>
              <a
                className={styles.github}
                href="https://github.com/kubohiroya/extyping"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-github" /> View on Github
              </a>
            </p>

            <p className={styles.humility}>
              Created and maintained by{' '}
              <a href="https://twitter.com/kubohiroya" target="_blank" rel="noopener noreferrer">@kubohiroya</a>.
            </p>
          </div>
        </div>
        { /*
        <div className="container">
          <div className={styles.counterContainer}>
            <CounterButton multireducerKey="counter1" />
            <CounterButton multireducerKey="counter2" />
            <CounterButton multireducerKey="counter3" />
          </div>

          <p><Link to="/practice">Practice</Link></p>

          <p>– Hiroya Kubo</p>
        </div>
        */ }
      </div>
    );
  }
}
