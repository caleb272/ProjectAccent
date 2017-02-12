import React from 'react'
import test from 'ava'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { LoginButton } from '../../components/LoginButton/LoginButton'

test('login called properly when the button is clicked', t => {
  const replace = sinon.stub()
  const wrapper = shallow(
    <LoginButton />,
    {
      context: { router: { replace } },
    }
  )

  t.is(wrapper.find('a').length, 1)
  wrapper.find('a').first().simulate('click')
  t.truthy(replace.calledOnce)
})
