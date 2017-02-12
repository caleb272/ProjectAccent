import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import { Footer } from '../../components/Footer/Footer';

test('renders the footer properly', t => {
  const wrapper = shallow(
    <Footer currentPathname={"/form"} />
  )

  t.is(wrapper.find('p').first().text(), '© 2017 · Caleb Martin')
})
