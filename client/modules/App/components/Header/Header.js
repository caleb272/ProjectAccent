import React, { PropTypes } from 'react'
import LoginButton from '../LoginButton/LoginButton'
import LoggedInNav from '../LoggedInNav/LoggedInNav'

export function Header(props, context) {
  const home = () => context.router.replace('/')
  const devStatus = (
    <sup
      style={{ fontSize: '0.5em', position: 'relative', top: '-20px', left: '-2px', color: '#ff3d00' }}
    >ALPHA</sup>
  )

  return (
    <div style={{ width: '100%' }}>
      <nav id="nav-mobile" className="blue darken-3" data-activates="nav-mobile">
        <div className="nav-wrapper">
          <a
            to="/"
            className="brand-logo left"
            onClick={home}
          >ACCENT{devStatus}</a>
          {!context.router.isActive('login') && !props.user ? <LoginButton /> : null}
          {props.user ? <LoggedInNav logout={props.logout} /> : null}
        </div>
      </nav>
    </div>
  )
}

Header.contextTypes = {
  router: React.PropTypes.object
}

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired
}

export default Header
