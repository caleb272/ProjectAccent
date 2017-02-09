import React, { PropTypes } from 'react';

function LoggedInNav(props, context) {
  const logout = () => console.log('logout here')
  const settings = () => context.router.replace('/login')
  const notifications = () => context.router.replace('/login')

  return (
    <ul className="right">
      <li>
        <a
          onClick={notifications}
          className="material-icons"
        >
          <i className="fa fa-bell" aria-hidden="true"></i>
        </a>
      </li>
      <li>
        <a
          onClick={settings}
          className="material-icons"
        >
          <i className="fa fa-cog" aria-hidden="true"></i>
        </a>
      </li>
      <li>
        <a
          onClick={logout}
          className="material-icons"
        >
          <i className="fa fa-sign-out" aria-hidden="true"></i>
        </a>
      </li>
    </ul>
  )
}

LoggedInNav.contextTypes = {
}

export default LoggedInNav
