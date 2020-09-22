import React, { Component } from 'react'
import { Route } from 'react-router'
import { Layout } from './components/Layout'
import PhoneBookEntries from './components/PhoneBookEntries'
import PhoneBooks from './components/PhoneBooks'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={PhoneBooks} />
        <Route exact path='/phonebooks' component={PhoneBooks} />
        <Route exact path='/phonebooks/:phoneBookId' component={PhoneBookEntries} />
      </Layout>
    );
  }
}
