import React, { PropTypes } from 'react';

function LoggedInNav(props, context) {
  const settings = () => context.router.replace('/settings')
  const notifications = () => context.router.replace('/notifications')

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
          onClick={props.logout}
          className="material-icons"
        >
          <i className="fa fa-sign-out" aria-hidden="true"></i>
        </a>
      </li>
    </ul>
  )
}

LoggedInNav.contextTypes = {
  router: PropTypes.object.isRequired
}

LoggedInNav.propTypes = {
  logout: PropTypes.func.isRequired
}

export default LoggedInNav
