import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

class Hlist extends Component {
	constructor(props){
		super(props);
		this.props=props;
		this.state={
			showList:[],
            idx:0
		}
	}
	
	componentDidMount(){
         console.log('cccccc',this.props.initListData)
        if(this.props.location.state){
        //     console.log(this.props.location.state.name)
            this.setState({
                    showList:this.props.location.state.name
                })
        }

	}
    componentWillReceiveProps(np){
        console.log(np.initListData)
         this.setState({
                    showList:np.initListData
                })
    }
    
  
    
  render() {
    return (
<div className="List">
    <div className="block-wrapper">
        
        <div className="node-list">
            <div className="wrapper" >
                {
                	(()=>{
                		return this.state.showList.map((item,idx)=>{
                			return (
                				<Link key={idx} className="node node--activity vertical" to={ '/detail/' +item.pinyinName }>
                    
                    
                    <div className="thumbnail" style={{backgroundImage: `url(${item.actImgUrl})` ,width: '10rem'}}>
                        
                        <div className="thumbnail__hot">
                            <span>
                               {item.hotLevel}
                            </span>
                            ℃
                        </div>
                    </div>
                    
                    <div className="main">
                        <h1 className="title">
                            {item.actName}
                        </h1>
                        <div className="price">
                            <div>
                                <span>
                                    ￥{item.lowPrice}
                                </span>
                                <span className="sub">
                                    起
                                </span>
                            </div>
                        </div>
                        <div className="date">
                            {item.actTime}
                        </div>
                        <div className="venue">
                            {item.veName}
                        </div>
                    </div>
                    
                </Link>
                				)
                		})
                	})()
                }

            </div>
        </div>
    </div>
</div>
);
  }
}



export default connect((state)=>{
    return state
},(dispatch=>{
    return {
    setListData(){
      dispatch({
        type:"setListData",
        initListData:'',
      })
    },

  }
}))(Hlist);


