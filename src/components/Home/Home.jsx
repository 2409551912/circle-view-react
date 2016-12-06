import React from 'react'
import $ from 'jquery'
import _ from 'lodash'
import axios from 'axios'

import c from './style.scss'
import apiUrl from 'apis/config.js'


export default class Collect extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      postList: []
    }
  }
  componentWillMount () {
    const _this = this
    axios.get(apiUrl.indexPost).then(function (res) {
      _this.setState({postList: res.data.list})
    }).catch(function (error) {
    console.log(error);
    });
  }
  render () {
    const list = [[], [], [], []]
    _.filter(this.state.postList, (v, index) => {
      list[(index - 1) % 4].push(v)
    })
    return (
    <div className="module-wrap">
    {
      list.map((v, index) => {
        return (
          <div className={'col' + (index % 4 === 3 ? ' fouthMargin' : '')} key={index}>
            {
              v.map(m => {
                return (
                <div className='module' key={m.tag_id}>
                  <div>
                    <div className="head">
                      <img src="http://cdn.bangyoung.com/cdn/user_portrait/20160902/beijingdaxue/32xr22x.JPG" alt="" />
                      <span>{m.tag}</span>
                    </div>
                    <div className="focus">
                      <span>关注</span>
                    </div>
                  </div>
                  <ul className="topic">
                    {
                      m.list.map(value => {
                        return (
                          <li key={value.id}><a href={'post/' + value.id}>{value.title}</a></li>
                        )
                      })
                    }
                  </ul>
                  <div className="more">
                    <span>
                      <a href="#">更多</a>
                    </span>
                  </div>
                </div>
                )
              })
            }
        </div>
        )
      })
    }
    </div>
     )
   }
}
