import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LocalStorage from '../util/localStore.js'
import { CITYNAME } from '../config/localStoreKey.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userInfoActionsFromOtherFile from "../actions/userinfo.js"

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
          initDone: true
        }
    }
    componentDidMount() {
      //从localstorage获取城市信息
      let cityName = LocalStorage.getItem(CITYNAME);
      if(cityName == null) {
        cityName = "北京"
      }
      console.info("cityName",cityName)

      //将城市信息存储到redux
      this.props.userInfoActions.update({
        cityName: cityName
      })

    }
    render() {
        return (
            <div>
                {
                  this.state.initDone
                  ?
                  this.props.children
                  :
                  <div>加载中...</div>
                }
            </div>
        )
    }
}
//读取函数
function mapStateToProps(state) {
    return {
    }
}
//设置函数
function mapDispatchToProps(dispatch) {
    return {
      userInfoActions: bindActionCreators(userInfoActionsFromOtherFile,dispatch)
    }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(App)
