import React from 'react'
import test from 'ava'
import { mount } from 'enzyme'
import { LoginButton } from '../../components/LoginButton/LoginButton'

test('login called properly when the button is clicked', t => {
  const wrapper = mount(
    <LoginButton />,
    { context: { router: {} } }
  )

  wrapper.find('a').simulate('click')
  t.truthy(context.router.replace.calledOnce)
})
