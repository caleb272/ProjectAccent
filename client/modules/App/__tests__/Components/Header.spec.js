import React from 'react'
import test from 'ava'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { Header } from '../../components/Header/Header'

test('renders the header properly when not logged in', t => {
  const router = {
    isActive: sinon.stub().returns(false),
  }
  const wrapper = shallow(
    <Header logout={() => {}} />,
    {
      context: {
        router
      }
    }
  )

  t.is(wrapper.find('LoggedInNav').length, 0)
  t.is(wrapper.find('LoginButton').length, 1)
  t.is(wrapper.find('a').length, 1)
})


test('renders the header properly when logged in', t => {
  const router = {
    isActive: sinon.stub().returns(false),
  }
  const wrapper = shallow(
    <Header user={{}} logout={() => {}} />,
    {
      context: {
        router
      }
    }
  )

  t.is(wrapper.find('LoginButton').length, 0)
  t.is(wrapper.find('LoggedInNav').length, 1)
  t.is(wrapper.find('a').length, 1, 'only has one link to home')
})
