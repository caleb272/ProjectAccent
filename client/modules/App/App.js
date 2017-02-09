import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestGetUser, requestLogout } from '../User/UserActions'

// Import Style
import styles from './App.css'

// Import Components
import Helmet from 'react-helmet'
import DevTools from './components/DevTools'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Flexbox from 'flexbox-react'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = { isMounted: false }
  }

  componentDidMount() {
    this.setState({isMounted: true}) // eslint-disable-line
    this.props.requestGetUser()
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
          <Flexbox element="header" width="100%">
            <Header
              user={this.props.user}
              logout={this.props.requestLogout}
            />
          </Flexbox>
          <Flexbox flexGrow={1}>
            <div className={styles.container}>
              {this.props.children}
            </div>
          </Flexbox>
          <Flexbox element="footer" height="100px" width="100%">
            <Footer
              currentPathname={this.props.currentPathname}
            />
          </Flexbox>
        </Flexbox>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
  requestGetUser: PropTypes.func.isRequired,
  requestLogout: PropTypes.func.isRequired,
  currentPathname: PropTypes.string.isRequired,
  user: PropTypes.object
}

App.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps(store, context) {
  return {
    currentPathname: context.location.pathname,
    user: store.user
  }
}


function mapDispatchToProps(dispatch) {
  return {
    requestGetUser: bindActionCreators(requestGetUser, dispatch),
    requestLogout: bindActionCreators(requestLogout, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
