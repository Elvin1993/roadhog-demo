import Mock, { Random } from 'mockjs';


export default {
  'GET /api/users': Mock.mock({'dataset|20': [{'id|+1': 1, 'name': '@cname', 'sex|1': ['男', '女'], 'email': '@email', 'address': '@county(true)'}]})
}