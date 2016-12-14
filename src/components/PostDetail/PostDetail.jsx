import React from 'react'
import $ from 'jquery'
import _ from 'lodash'
import axios from 'axios'

import apiUrl from 'apis/config.js'
import c from './style.scss'
import ajax from 'apis/ajax.js'
import moment from 'moment'

export default class Collect extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      post: {},
      interactList: [],
      isShowCommentBox: false,
      isLike: false,
      replyBoxId: '',
      atUsername: '',
      atUserId: ''
    }
  }
  componentWillMount () {
    const _this = this
    ajax.get(apiUrl.postDetail + this.props.params.id, {}, (res) => {
      this.setState({
        isLike: res.is_like,
        post: res.post,
        interactList: res.interact_list
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
  publishComment (type) {
    const data = {
      post_id: this.state.post.id,
      type
    }
    if (type === 1) {
      Object.assign(data, {
        content: this.refs.commentText.value.trim()
      })
    }
    ajax.post(apiUrl.replyPost, data, (v) => {
      if (parseInt(v.interact.type) === 1) {
        const interactList = [...this.state.interactList]
        interactList.unshift(v.interact)
        this.setState({isShowCommentBox: false, interactList})
      } else {
        this.setState({isLike: v.interact.status})
      }
    })
  }
  publishReplyInteract (interactId, type) {
    ajax.post(apiUrl.replyInteract, {
      interact_id: interactId,
      type,
      content: type === 1 ? this.refs.replyInteractCon.value.trim() : '',
      at_user_id: this.state.atUserId
    }, (res) => {
      const interactList = [...this.state.interactList]
      const idx = interactList.findIndex(v => v.id === parseInt(res.reply.interact_id))
      if (res.reply.type === 1) {
        interactList[idx].reply_list.unshift(res.reply)
        this.setState({interactList})
      } else {
        interactList[idx].is_like = res.reply.status
        this.setState({interactList})
      }

    })
  }
  replyInteract (interactId) {
    if (interactId === this.state.replyBoxId) {
      this.setState({replyBoxId: '', atUsername: '', atUserId: ''})
    } else {
      this.setState({replyBoxId: interactId, atUsername: '', atUserId: ''})
    }
  }
  atReply (username, userid) {
    this.refs.replyInteractCon.value = ''
    this.setState({atUsername: username, atUserId: userid})
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
                  <p className='name'>{this.state.post.username}</p>
                </div>
              </div>
              <div className='post'>
                <p className='content'>{this.state.post.content}</p>
                <a className='comment' onClick={this.changeCommentBox.bind(this)}>参与评论</a>
                <i className={'iconfont praise' + ' ' + (this.state.isLike ? 'red' : null)} onClick={this.publishComment.bind(this, 2)}>&#xe601;</i>
              </div>
              {
                this.state.isShowCommentBox ? (
                  <div className='post-comment'>
                    <form action=''>
                      <textarea name='' rows='8' ref='commentText'/>
                      <div>
                        <a className='cancel'>收起</a>
                        <a className='publish' onClick={this.publishComment.bind(this, 1)}>发布</a>
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
                      <span className='name'>{v.username}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className='time'>{moment(v.create_at*1000).format('MM-DD hh:mm')}</span></p>
                    <div className='content'>
                      {v.content}
                    </div>
                    <p className='interact'>
                      <span>热度({v.hot})</span>
                      <span>
                        <a className='reply' onClick={this.replyInteract.bind(this, v.id)}>评论({v.comment_count})</a>
                      </span>
                        <span>
                          点赞 <i className={'iconfont praise ' + (v.is_like ? 'red' : '')} onClick={this.publishReplyInteract.bind(this, v.id, 2)}>&#xe601;</i>
                          {/* <i className='iconfont praise'>&#xe601;</i> */}
                        </span>
                      </p>
                  </div>
                  {
                    this.state.replyBoxId === v.id ? (
                      <div className='reply-interact clearfix'>
                        <div className='reply-box clearfix'>
                          <input type='hidden' className='at-user' />
                          <input type='text' className='reply-content' placeholder = {(this.state.atUsername) ? '@' + this.state.atUsername : ''} ref='replyInteractCon'/>
                          <a className='publish' onClick={this.publishReplyInteract.bind(this, v.id, 1)}>发布</a>
                        </div>
                        <ul className='reply-interact-box'>
                        {
                          v.reply_list.map((value) => value.type === 1 ?
                            (
                              <li className='clearfix' key={value.id}>
                                <img src='http://cdn.bangyoung.com/cdn/user_portrait/20160902/beijingdaxue/32r2r2r.jpg' alt='' className='head' />
                                  <p>
                                    <span className='name'>{value.from_username}</span>
                                    {value.at_username ? (
                                      <span>
                                        <span>&nbsp;回复了&nbsp;</span>
                                        <span className='at-username'>{value.at_username}</span>
                                      </span>
                                    ) : ''}
                                      <span>&nbsp;{value.content}</span>
                                  </p>
                                  <a className='reply' onClick={this.atReply.bind(this, value.from_username, value.from_user_id)}>回复</a>
                              </li>
                            ) : null
                          )
                        }

                        </ul>
                      </div>
                    ) : ''
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
     )
   }
}
