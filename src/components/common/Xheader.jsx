import React, { Component } from 'react';

class Xheader extends Component {
	constructor(props){
		super(props);
		this.props=props;
		this.state={
			cityName: ''
		}
	}

	navigateTo(e){
		/*console.log(e);*/
		/*console.log(this.props.history);*/
		this.props.history.push({pathname: '/city'});
	}

	linkToSearch(e){
		this.props.history.push({pathname: '/search'});
	}

	//获取cookie
	getCookie(cname){
		var name = cname + "=";
		var ca = document.cookie.split(';');
		// console.log("获取cookie,现在循环");
		for (var i = 0; i < ca.length; i++){
			var c = ca[i];
			// console.log(c);
			while (c.charAt(0) === ' ') c = c.substring(1);
			if (c.indexOf(name) !== -1){
				// console.log(c.substring(name.length, c.length));
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	componentDidMount(){
		var code = this.getCookie('cityCode');
		// console.log(code);
		if(code === ''){
			this.setState({
				cityName: '广州'
			})
		}else{
			this.getCityName(code);
		}

	}

	getCityName(cityCode){

		React.axios.get(`http://localhost:1234/getCity?cityCode=${cityCode}`
	      )
	      .then((res)=>{
	        	// console.log(res.data.result.cityName);
	        	this.setState({
	        		cityName: res.data.result.cityName
	        	})
	        	// console.log(this.state.cityName);
	      })
	      .catch((err)=>{
	        
	        console.log(err)
	      })
	}





	  render() {
	    return (
	      <div className="page__header">
		   <div className="left"  onClick={this.navigateTo.bind(this)}> 
		    <div>
		      {this.state.cityName}
		     <i className="icon icon-angle-down" aria-hidden="true"></i>
		    </div> 
		   </div> 
		   <div className="middle">
		    <div className="search" onClick={this.linkToSearch.bind(this)}>
		     <i className="icon icon-search"></i> 
		     <input type="text" placeholder="搜索明星、演出、场馆" />
		    </div>
		   </div> 
		   <div className="right">
		    <div className="icon icon-gift active">
		     <div className="task-list" style={{display: "none"}}>
		      <div className="item active">
		       <span className="text">首次消费返现</span>
		      </div>
		     </div>
		    </div>
		   </div>
		  </div>
	    )
	  }
  
}

export default Xheader;


