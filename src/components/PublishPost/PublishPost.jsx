import React from 'react'
import $ from 'jquery'
import _ from 'lodash'
import axios from 'axios'

import apiUrl from 'apis/config.js'
import c from './style.scss'
import ajax from 'apis/ajax.js'
import moment from 'moment'

export default class PublishPost extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  componentWillMount () {

  }
  publish () {
    ajax.post(apiUrl.publishPost, {
      title: this.refs.tit.value.trim(),
      tag_id: this.refs.opt.value,
      content: this.refs.txt.value.trim()
    }, (v) => {
      if (v.ret === 1) {
        location.href = '/'
      }
    })
  }
  render () {
    return (
      <div className='outer'>
        <div className='publish'>
          <div className='inner'>
            <input type='text' className='tit' placeholder='输入帖子标题' ref='tit'/><div className='choose'>
            <select ref='opt'>
              <option value='1'>热圈儿</option>
              <option value='2'>娱乐圈儿</option>
              <option value='3'>军事圈儿</option>
              <option value='4'>历史圈儿</option>
              <option value='5'>体育圈儿</option>
              <option value='6'>科技圈儿</option>
            </select>
            </div>
            <textarea placeholder='输入帖子内容' ref='txt'></textarea>
            <a className="sub" onClick={this.publish.bind(this)}>发表</a>
          </div>
        </div>
      </div>
     )
   }
}
