import React from 'react'
import $ from 'jquery'
import _ from 'lodash'
import axios from 'axios'

import apiUrl from 'apis/config.js'
import c from './style.scss'


export default class Collect extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      post: {},
      interactList: [],
      isShowCommentBox: false
    }
  }
  componentWillMount () {
    const _this = this
    axios.get(apiUrl.postDetail + this.props.params.id).then(res => {
      this.setState({
        post: res.data.post,
        interactList: res.data.interact_list
      })
    })
  }
  changeCommentBox (v) {
    if (localStorage.getItem('account')) {
      if (this.state.isShowCommentBox) {
        this.setState({isShowCommentBox: false})
      } else {
        this.setState({isShowCommentBox: true})
      }
    } else {
      location.href = '/login'
    }

  }
  publishComment () {
    $.post(apiUrl.replyPost, {
      content: this.refs.commentText.value.trim(),
      type: 1,
      post_id: this.state.post.id,
      bang_token: localStorage.getItem('bang_token'),
      bang_account: localStorage.getItem('account')
    }, (v) => {
      const interactList = [...this.state.interactList]
      interactList.unshift(v.interact)
      this.setState({isShowCommentBox: false, interactList})
    })
  }
  render () {
    return (
      <div className='post-detail'>
        <div className='outer'>
          <div className='detail clearfix'>
            <div className='inner'>
              <div className='user clearfix'>
                <p className='title'>{this.state.post.title}</p>
                <div className='user-info'>
                  <img src='http://cdn.bangyoung.com/cdn/user_portrait/20160902/beijingdaxue/32r2r2r.jpg' alt='' className='host-head' />
                  <p className='name'>小小鸟</p>
                </div>
              </div>
              <div className='post'>
                <p className='content'>{this.state.post.content}</p>
                <a className='comment' onClick={this.changeCommentBox.bind(this)}>参与评论</a>
                {
                  this.state.post.is_like ?
                  (<i className='iconfont praise red'>&#xe601;</i>) : (<i className='iconfont praise'>&#xe601;</i>)
                }
              </div>
              {
                this.state.isShowCommentBox ? (
                  <div className='post-comment'>
                    <form action=''>
                      <textarea name='' rows='8' ref='commentText'/>
                      <div>
                        <a className='cancel'>收起</a>
                        <a className='publish' onClick={this.publishComment.bind(this)}>发布</a>
                      </div>
                    </form>
                  </div>
                ) : null
              }

              <div className='comment-order'>
                <a>最新评论</a>
                <a>热门评论</a>
              </div>
            </div>

          </div>
          {
            this.state.interactList.map(v => (
              <div className='item clearfix' key={v.id}>
                <img src='http://cdn.bangyoung.com/cdn/user_portrait/20160902/beijingdaxue/32r2r2r.jpg' alt='' className='head' />
                <div className='comment'>
                  <div className='comment-box'>
                    <p className='user'>
                      <span className='name'>{v.username}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className='time'>sdf</span></p>
                    <div className='content'>
                      {v.content}
                    </div>
                    <p className='interact'>
                      <span>热度({v.hot})</span>
                      <span>
                        <a className='reply'>评论({v.comment_count})</a>
                      </span>
                        <span>
                          点赞 <i className='iconfont praise red'>&#xe601;</i>
                          {/* <i className='iconfont praise'>&#xe601;</i> */}
                        </span>
                      </p>
                  </div>
                  <div className='reply-interact hid clearfix'>
                    <div className='reply-box clearfix'>
                      <input type='hidden' className='at-user' />
                      <input type='text' className='reply-content' />
                      <a className='publish'>发布</a>
                    </div>
                    <ul className='reply-interact-box'>
                      <li className='clearfix'>
                        <img src='http://cdn.bangyoung.com/cdn/user_portrait/20160902/beijingdaxue/32r2r2r.jpg' alt='' className='head' />
                          <p>
                            <span className='name'>safd</span>
                              <span>
                                <span>回复了</span>
                                <span className='at-username'>sdfsda</span>
                              </span>
                              <span>sdf</span>
                          </p>
                          <a className='reply'>回复</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
     )
   }
}
