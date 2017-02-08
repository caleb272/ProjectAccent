import React from 'react'
import LoginButton from '../LoginButton/LoginButton'

import styles from './LoginPage.css'

function LoginPage() {
  return (
    <div className={`container ${styles['login-page']}`}>
      <div className="row">
        <LoginButton provider="twitter" />
        <LoginButton provider="google" />
        <LoginButton provider="facebook" />
      </div>
    </div>
  )
}

LoginPage.propTypes = {}

export default LoginPage
