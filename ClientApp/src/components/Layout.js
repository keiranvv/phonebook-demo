import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div className="bg-gray-100 h-screen">
        <div className="border-b mb-4 p-2 shadow-sm bg-white">
          <Link to="/">
            <span className="font-semibold text-lg text-gray-900">ABSA Phonebook Assessment</span>
          </Link>
        </div>
        <div className="container mx-auto">
          {this.props.children}
        </div>
      </div>
    )
  }
}
