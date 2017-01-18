import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import styles from './LoginButton.css'

function LoginButton(props, context) {
  return (
    <span className={styles['login-button']}>
      <h5>
        <Link to="/">Login</Link>
      </h5>
    </span>
  )
}

LoginButton.propTypes = {}

export default LoginButton
