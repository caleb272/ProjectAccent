import React, { PropTypes } from 'react'

// Import Style
import styles from './Footer.css'

export function Footer(props) {
  const baseURL = `http://192.168.1.7:8000${props.currentPathname}`
  const facebook = `http://www.facebook.com/sharer.php?u=${baseURL}`
  const googlePlus = `https://plus.google.com/share?url=${baseURL}`
  const twitter = `https://twitter.com/share?url=${baseURL}`

  return (
    <div className={styles.footer}>
      <div className="row">
        <div className="col s12 m4 l4 offset-m4 offset-l4">
          <p>&copy; 2017 &middot; Caleb Martin</p>
        </div>

        <div className={`col s12 m4 l4 ${styles['share-buttons']}`}>
          <a
            className={`fa-stack fa-lg ${styles.google}`}
            href={googlePlus}
            target="_blank"
          >
            <i className="fa fa-square fa-stack-2x" />
            <i className="fa fa-google fa-stack-1x" />
          </a>

          <a
            className={`fa-stack fa-lg ${styles.facebook}`}
            href={facebook}
            target="_blank"
          >
            <i className="fa fa-square fa-stack-2x" />
            <i className="fa fa-facebook fa-stack-1x" />
          </a>

          <a
            className={`fa-stack fa-lg ${styles.twitter}`}
            href={twitter}
            target="_blank"
          >
            <i className="fa fa-square fa-stack-2x" />
            <i className="fa fa-twitter fa-stack-1x" />
          </a>
        </div>
      </div>
    </div>
  )
}

Footer.propTypes = {
  currentPathname: PropTypes.string.isRequired
}

export default Footer
