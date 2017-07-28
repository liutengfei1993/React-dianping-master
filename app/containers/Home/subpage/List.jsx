import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import "./style.less"
import {getListData} from '../../../fetch/home/home'
import ListComponent from '../../../components/ListComponent'
import LoadMore from '../../../components/LoadMore'

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
          data: [],
          hasMore: false,
          isLoadingMore: false,
          page: 1
        }
    }
    componentDidMount() {
      this.loadFirstPageData()
    }
    //获取首屏数据
    loadFirstPageData() {
        const cityName = this.props.cityName;
        const result = getListData(cityName,0);
        this.resultHandle(result)
    }
    //加载更多数据
    loadMoreData() {
      //记录状态
      this.setState({
        isLoadingMore: true
      })
      const cityName = this.props.cityName;
      const page = this.state.page;
      const result = getListData(cityName,page);
      this.resultHandle(result);
      //增加page计数
      this.setState({
        page: page + 1,
        isLoadingMore: false
      })
    }
    //数据处理
    resultHandle(result) {
        result.then(res => {
          return res.json()
        }).then(json => {
          console.info("处理后的数据",json)
          const hasMore = json.hasMore;
          const data = json.data;
          this.setState({
            data: this.state.data.concat(data),
            hasMore: hasMore
          })
        })
    }
    render() {
        const  ListItems = this.state.data.length?
        <ListComponent  data={this.state.data}/>
        :<div>加载中....</div>;
        const  LoadMoreData = this.state.hasMore?
        <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
        :<div></div>;
        return (
          <div>
            <h2 className="home-list-title">猜你喜欢</h2>
            {ListItems}
            {LoadMoreData}
          </div>
        )
    }
}

module.exports = List
