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
      isLogin: true
    }
  }
  componentWillMount () {
  }
  changeLogin (loginStatus) {
    this.setState({isLogin: loginStatus})
  }
  login () {
    $.post(apiUrl.login, {
      account: this.refs.account.value,
      password: this.refs.pwd.value
    }, v => {
      if (v.ret === 1) {
        localStorage.setItem('account', v.bang_account)
        localStorage.setItem('bang_token', v.bang_token)
        localStorage.setItem('username', v.body.user.username)
        window.location.href = '/'
      }
    })
  }
  register () {
    $.post(apiUrl.register, {
      account: this.refs.regAccount.value,
      username: this.refs.regUsername.value,
      password: this.refs.regPwd.value
    }, v => {
      if (v.ret === 1) {
        this.changeLogin(true)
      }
    })
  }
  render () {
    return (
      <div className='loginBox'>
        <p className='slogan'>圈儿，放松生活~</p>
        <p className='title'><span className={this.state.isLogin ? 'stress' : ''} onClick={this.changeLogin.bind(this, true)}>登录</span>&nbsp;&nbsp;&nbsp;&nbsp; <span className={!this.state.isLogin ? 'stress' : ''} onClick={this.changeLogin.bind(this, false)}>注册</span></p>
        {
          this.state.isLogin ? (
            <form>
              <div className='inputBox account'>
                <i className='iconfont icon-denglu'></i>
                <input type='text' placeholder='请输入账号' autoFocus ref='account'/>
              </div>
              <div className='inputBox'>
                <i className='iconfont icon-iconfontcolor10'></i>
                <input type='password' placeholder='请输入密码' ref='pwd'/>
              </div>
              <a className='sub' onClick={this.login.bind(this)}>登录</a>
            </form>
          ) : (
            <form>
              <div className='inputBox account'>
                <i className='iconfont icon-denglu'></i>
                <input type='text' placeholder='请输入注册账号' autoFocus ref='regAccount'/>
              </div>
              <div className='inputBox'>
                <i className='iconfont icon-mingzi'></i>
                <input type='text' placeholder='请设置用户名' ref='regUsername'/>
              </div>
              <div className='inputBox'>
                <i className='iconfont icon-iconfontcolor10'></i>
                <input type='text' placeholder='请设置密码' ref='regPwd'/>
              </div>
              <a className='sub' onClick={this.register.bind(this)}>注册</a>
            </form>
          )
        }

      </div>
     )
   }
}
