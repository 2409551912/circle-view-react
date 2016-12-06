import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, hashHistory, browserHistory } from 'react-router'
import commonCss from './src/assets/common.scss'

import App from './src/App.jsx'
import Home from './src/components/Home/Home.jsx'
import PostDetail from './src/components/PostDetail/PostDetail.jsx'
import Movie from './src/components/Movie/Movie.jsx'
import Login from './src/components/Login/Login.jsx'
const defaultState = 0

//配置路由
const routeConfig = [
  {
    path: '/',
    component: App,
    indexRoute: { component: Home },
    childRoutes: [
      { path: 'post/:id', component: PostDetail },
      { path: 'movie', component: Movie },
      { path: 'login', component: Login }
    ]
  }
]

ReactDOM.render(
  <Router history={browserHistory} routes={routeConfig} />, document.getElementById('app')
)
