import React, { PropTypes } from 'react'

import styles from './LoginButton.css'

function LoginButton({ provider }) {
  return (
    <div className={`${styles['login-button']} col s12 m12 l12`}>
      <a
        className={`btn grey darken-3 z-depth-2 ${styles[provider]}`}
        href={`/auth/${provider}/login`}
      >
        <i
          className={`fa fa-${provider}`}
          aria-hidden="true"
        />
        &nbsp;{`login with ${provider}`}
      </a>
    </div>
  )
}

LoginButton.propTypes = {
  provider: PropTypes.string.isRequired
}

export default LoginButton
