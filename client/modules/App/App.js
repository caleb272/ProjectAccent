import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Import Style
import styles from './App.css'

// Import Components
import Helmet from 'react-helmet'
import DevTools from './components/DevTools'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Flexbox from 'flexbox-react'

// Import Actions
import { toggleAddPost } from './AppActions'
import { switchLanguage } from '../../modules/Intl/IntlActions'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = { isMounted: false }
  }

  componentDidMount() {
    this.setState({isMounted: true}) // eslint-disable-line
  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost())
  }

  // {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
  render() {
    return (
      <div>
        <Flexbox flexDirection="column" minHeight="100vh" width="100%" minWidth="300px">
          <Helmet
            title="Project Accent"
            titleTemplate="%s - Chat For The Web"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <Flexbox element="header" height="200px" width="100%">
            <Header
              switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
              intl={this.props.intl}
              toggleAddPost={this.toggleAddPostSection}
            />
          </Flexbox>
          <Flexbox flexGrow={1}>
            <div className={styles.container}>
              {this.props.children}
            </div>
          </Flexbox>
          <Flexbox element="footer" height="100px" width="100%">
            <Footer />
          </Flexbox>
        </Flexbox>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
  };
}

export default connect(mapStateToProps)(App)
