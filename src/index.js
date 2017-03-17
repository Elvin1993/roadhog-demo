// import autobind from 'autobind-decorator'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Table } from 'antd'
import 'whatwg-fetch';
import QueryString from 'qs'
import style from './style.css'
import './index.html'

let  get = (endpoint: string, params: Object = {}, cb: Function) =>{
  if (typeof params === 'function') {
    cb = params
    params = {}
  }
  let qs = QueryString.stringify(params)
  if (qs) {
    endpoint += '?' + qs
  }
  cb = cb || function () {}
  return fetch(endpoint)
    .then((resp) => resp.json())
    .then((json)=> {
      json.code |= 0
      cb(json)
      return json
    }).catch(function (ex) {
      console.log('parsing failed', ex)
    })
}

// @autobind
class App extends Component {
  constructor(props) {
    super(props)

    this.state= {
      columns: this.initColumns()
    }
  }
  componentDidMount() {
  }

  initColumns() {
    return [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    }];
  }

  render() {
    let { dataset } = this.props
    let { columns } = this.state
    
    return <div className={style.app}>
      <Table rowKey={record=> record.id} dataSource={dataset} columns={columns} />
    </div>
  }
}

get('/api/users')
  .then((ret)=> {
    ReactDOM.render(<App dataset= {ret.dataset} />, document.getElementById('root'))

  })



