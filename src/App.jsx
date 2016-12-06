import React from 'react'
import { connect } from 'react-redux'
import Header from './components/basic/Header/Header.jsx'
import axios from 'axios'

function mapStateToProps (state) {
  return {
    start: state.start,
    end: state.end
  }
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isNav: '1992'
    }
  }
  render () {
    return (
     <div className='container'>
      <Header />
      {this.props.children}
     </div>
    )
   }
}

export default App
