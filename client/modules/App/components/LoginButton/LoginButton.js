import React from 'react'
import { Link } from 'react-router'

import styles from './LoginButton.css'

function LoginButton() {
  return (
    <span className={styles['login-button']}>
      <h5>
        <Link to="/">Login&nbsp;/&nbsp;Register</Link>
      </h5>
    </span>
  )
}

LoginButton.propTypes = {}

export default LoginButton
