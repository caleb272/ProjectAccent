import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import LoginButton from '../LoginButton/LoginButton'

// Import Style
import styles from './Header.css'

export function Header(props, context) {
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles['site-title']}>
          <Link to="/">PROJECT ACCENT</Link>
        </h1>
        {!context.router.isActive('login') && !props.user ? <LoginButton /> : null}
      </div>
    </div>
  )
}

Header.contextTypes = {
  router: React.PropTypes.object,
}

Header.propTypes = {
  user: PropTypes.object
}

export default Header
