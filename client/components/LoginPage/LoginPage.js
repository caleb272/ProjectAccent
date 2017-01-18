import React, { PropTypes } from 'react'

import styles from './LoginPage.css'

function LoginPage() {
  return (
    <div className={styles['login-page']}>
      <a href="/auth/twitter/login">Login With Twitter</a>
    </div>
  )
}

LoginPage.propTypes = {
}

export default LoginPage
