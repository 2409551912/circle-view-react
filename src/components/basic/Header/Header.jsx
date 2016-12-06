import React from 'react'
import c from './style.scss'

export default class Collect extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isNav: '1992'
    }
  }
  exitAccount () {
    localStorage.removeItem('account')
    localStorage.removeItem('bang_token')
    localStorage.removeItem('username')
    window.location.href = '/'
  }
  render () {
    console.log(localStorage.getItem('account'))
    const { start } = this.props
    return (
      <div className='publicHeader'>
      <div className='box'>
        <div className='logo'>圈 儿</div>
        <div className='nav'>
          <ul>
            <li><a href='/'>首页</a></li>
            <li><a href='/movie'>电影</a></li>
          </ul>
        </div>
        </div>
      <div className='account'>
        {
          !localStorage.getItem('account') ? (
            <span>
              <a href="login" className='login'>
                <i className='iconfont icon-signin'></i>&nbsp;登陆
              </a>
              <a href="login" className='register'>
                <i className='iconfont icon-denglu'></i>&nbsp;注册
              </a>
            </span>
          ) : (
            <span>
              <a className='username'>
                <i className='iconfont icon-denglu'></i>&nbsp;{localStorage.getItem('username')}
              </a>
              &nbsp;<i className='iconfont icon-signin exit' onClick={this.exitAccount.bind(this)}></i>
            </span>
          )
        }
     </div>
     <a href="/index/post/publish" className="write">
       <i className="iconfont">&#xe604;</i>
     </a>

 </div>
     )
   }
}
