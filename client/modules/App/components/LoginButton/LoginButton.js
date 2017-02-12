import React from 'react'

function LoginButton(props, context) {
  const login = () => context.router.replace('/login')

  return (
    <ul className="right">
      <li>
        <a onClick={login}>
          <i className="fa fa-2x fa-sign-in" aria-hidden="true"></i>
        </a>
      </li>
    </ul>
  )
}

// LoginButton.contextTypes = {
//   router: React.PropTypes.object.isRequired
// }

export default LoginButton
