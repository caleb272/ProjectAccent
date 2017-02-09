import React, { PropTypes } from 'react'
import LoginButton from '../LoginButton/LoginButton'
import LoggedInNav from '../LoggedInNav/LoggedInNav'

export function Header(props, context) {
  function home() {
    context.router.replace('/')
  }

  return (
    <nav className="blue darken-3">
      <div className="nav-wrapper">
        <a
          to="/"
          className="brand-logo left"
          onClick={home}
        >ACCENT</a>
        {!context.router.isActive('login') && !props.user ? <LoginButton /> : <LoggedInNav />}
      </div>
    </nav>
  )
}

Header.contextTypes = {
  router: React.PropTypes.object
}

Header.propTypes = {
  user: PropTypes.object
}

export default Header
