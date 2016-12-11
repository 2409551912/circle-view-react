import React from 'react'
import $ from 'jquery'
import _ from 'lodash'
import axios from 'axios'

import apiUrl from 'apis/config.js'
import c from './style.scss'
import Page from '../basic/Pagination/Pagination.jsx'

export default class Movie extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      movieList: [],
      currentPage: 1,
      count: ''
    }
  }
  componentWillMount () {
    const _this = this
    $.post('https://api.yjshare.com/v1/auth', {
      auth: 'api.yjshare.com'
    }, (res) => {
      if (res.status === 200) {
        localStorage.setItem('suid', res.data.token)
        $.get('https://api.yjshare.com/v1/movie/subjects?token=' + localStorage.getItem('suid') + '&p=' + this.state.currentPage, (v) => {
          this.setState({movieList: v.data.rows, count: v.data.count})
        })
      }
    })
  }
  download (id) {
    $.get('https://api.yjshare.com/v1/movie/subject/' + id + '/source?token=' + localStorage.getItem('suid'), (v) => {
      window.location.assign(v.data[0].href)
    })
  }
  handlePageChange (page) {
    $.get('https://api.yjshare.com/v1/movie/subjects?token=' + localStorage.getItem('suid') + '&p=' + page, (v) => {
      this.setState({movieList: v.data.rows, count: v.data.count})
    })
    this.setState({currentPage: page})
  }
  render () {
    return (
      <div className='movie'>
      {
        this.state.movieList.map(v => (
          <div className='item' key={v.id} onClick={this.download.bind(this, v.id)}>
            <div>
              <img src={v.images.medium} className='movieImage'/>
              <div className='detail'>
                <p>片名: <span className='tit'>{v.title}</span></p>
                <p>导演: {v.directors}</p>
                <p>主演: {v.casts}</p>
                <p>类型: {v.genres}</p>
                <p>{v.year} {v.countries}</p>
                <p>豆瓣评分: <span className='rating'>{v.rating}</span></p>
              </div>
            </div>
            <div className='summary' onClick={this.download.bind(this, v.id)}>
              简介："城市里流传着一个奇怪的传言。有一些流浪在外居无定所的人会偷偷潜入别人的家里，把自己隐藏起来，然后生活下去……
  张家伟是一家咖啡厅的老板，和妻女居住在一个高档小区里，生活富足，家庭和睦，不过他却患有严重的洁癖和强迫症，终日饱受心理疾病的折磨，一天，他接到了哥哥失踪询问电 话，神经一下子紧张起来。到旧公寓寻找哥哥未果的家伟结识了跟哥哥居住在同一层的苏红母女，苏红对张家伟的哥哥表现出异常的恐慌和反感，失踪案件变得扑朔迷离。
  与此同时，张家伟的妻女和家忽然间成为一个“神秘人”的袭击目标，张家伟一边抵挡着“神秘人”对家人的袭击，一边寻找哥哥，由此一步步揭开了一个隐藏在他心中多年的秘密……"
            </div>
          </div>
        ))
      }
        <Page
          activePage={this.state.currentPage}
          itemsCountPerPage={20}
          totalItemsCount={parseInt(this.state.count)}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
     )
   }
}
