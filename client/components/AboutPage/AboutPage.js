import React from 'react'

import styles from './AboutPage.css'

function AboutPage() {
  return (
    <div className={`container ${styles['about-page']}`}>
      <div className="row">
        <div className="section">
          <h4>About</h4>
          <p>Project Accent is a work in progress web app with the goal to add social interaction to every page on the internet.</p>
        </div>
        <div className="section">
          <h4>Contact Us</h4>
          <p>
            Have a better name, suggestion, idea for a feature, or you just want to contribute and talk with the developers?
            &nbsp;<a href="/form/http%3A%2F%2Flocalhost%3A8000%2Fform%2Fprojectaccent">click here</a>
          </p>
        </div>
        <div className="section">
          <h4>Github</h4>
          <p>
            Yes, we&#39;re on Github check out the main repository <a href="https://github.com/caleb272/ProjectAccent">here</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
