import React, { Component } from 'react';
import { connect } from 'react-redux';

import Huaju from './Huaju.jsx';
import Lunbo from './Lunbo.jsx';
import Xheader from '../../common/Xheader.jsx';
import Xfooter from '../../common/Xfooter.jsx';
import Hcotegory from './Hcategory.jsx';
import Recommends from './Recommends.jsx';
import { Route } from "react-router-dom";
import Show from './Show.jsx'
import Hlist from './Hlist.jsx'
import Concert from './Concert.jsx'

// import MovieData from './MovieData.jsx'


class Home extends Component {
  

	constructor(props){
        super(props);
        this.props = props;
        console.log(this.props)
        this.state={
        	nav: 0,
        	initListData: ''
        }
    }

    componentDidMount(){
    	console.log(this.props.initListData)
    	// this.setState({
    	// 	initListData:this.props.initListData
    	// })
    }

    componentWillReceiveProps(np){
    	console.log(np.initListData)
    	this.setState({
    		initListData:np.initListData
    	})
    }

	render() {
		return (
			<div id="wrapper-home">

				<div id="home" className="page">

					<Xheader history={this.props.history} />
					<div className="block-wrapper">
						<Lunbo></Lunbo>
					</div>
					<div className="block-wrapper">
						<Hcotegory history={this.props.history} />
			            <Recommends></Recommends>
			            <Show history={this.props.history} ></Show>
			            <Route initListData={this.state.initListData} path="/home/one/" component={Hlist} />
			            <Route initListData={this.state.initListData} path="/home/two/" component={Hlist} />
			            <Route initListData={this.state.initListData} path="/home/three/" component={Hlist} />
			            <Route initListData={this.state.initListData} path="/home/four/" component={Hlist} />
			            <Route initListData={this.state.initListData} path="/home/five/" component={Hlist} />
			            <Route initListData={this.state.initListData} path="/home/six/" component={Hlist} />
			            <Route initListData={this.state.initListData} path="/home/seven/" component={Hlist} />
			            <Route initListData={this.state.initListData} path="/home/init/" component={Hlist} />			 
			            <Concert></Concert>
			      		<Huaju></Huaju>
					
					</div>
		          	<div className="report"><span className="text">举报电话：<a href="tel:021-52398129" className="tel">021-52398129-403</a></span></div>
				</div>
				<Xfooter history={this.props.history} nav={this.state.nav} />

			</div>

		);
	}

}

export default connect((state)=>{
	console.log(state)
    return state
},(dispatch=>{
    return {
    setListData(){
      dispatch({
        type:"setListData",
        
      })
    },

  }
}))(Home);
