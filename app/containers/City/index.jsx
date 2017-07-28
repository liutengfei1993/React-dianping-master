import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userInfoActionsFromOtherFile from "../../actions/userinfo.js"
import Header from '../../components/Header/index'
import CurrentCity from '../../components/CurrentCity/index'
import CityList from '../../components/CityList/index'
import LocalStorage from '../../util/localStore.js'
import { CITYNAME } from '../../config/localStoreKey.js'
import { hashHistory } from 'react-router'

class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount() {
      console.info("userinfo",this.props.userinfo);
      console.info("userinfo",this.props.userInfoActions);
      console.info("LocalStorage",LocalStorage)
      console.info("CITYNAME",CITYNAME)
    }
    render() {
        return (
            <div>
                <Header title="选择城市"/>
                <CurrentCity cityName={this.props.userinfo.cityName} />
                <CityList changeFn={this.changeCity.bind(this)}/>
            </div>
        )
    }
    changeCity(newCity) {
      //1.修改redux
      if(newCity == null) {
        return;
      }
      const userinfo = this.props.userinfo;
      userinfo.cityName = newCity;
      //update方法在container下index.jsx文件中
      this.props.userInfoActions.update(userinfo)
      //2.修改localstorage
      LocalStorage.setItem(CITYNAME, newCity)
      //3.跳转到首页
      hashHistory.push("/")
    }
}


//读取函数
function mapStateToProps(state) {
    return {
      userinfo: state.userinfo
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
)(City)
