import React from 'react'
import Pagination from 'react-js-pagination'
import c from './style.scss'

export default class Page extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
     return (
       <Pagination
         activePage={this.props.activePage}
         itemsCountPerPage={this.props.itemsCountPerPage}
         totalItemsCount={this.props.totalItemsCount}
         pageRangeDisplayed={this.props.pageRangeDisplayed}
         onChange={this.props.onChange}
        />
     )
   }
}
