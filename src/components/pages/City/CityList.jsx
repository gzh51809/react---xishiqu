import React, { Component } from 'react';

import Xfooter from '../../common/Xfooter.jsx';

class CityList extends Component {
	constructor(props){
		super(props);
		this.props = props;
		this.state = {
			cityData : [],
			cityPy: [],
			allCity: [],
			cityList: [],
			cityName: '广州'
		}
	}

	navigateTo(e){
		this.props.history.go(-1)
	}

	checkTo(code,e){
		this.setCookie('cityCode',code,1);
		this.setCookie('cityName',e.target.innerText,1);
		this.props.history.go(-1)
	}

	setCookie(cname, cvalue, exdays){
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        console.log(cname + "=" + cvalue + "; " + expires);
        document.cookie = cname + "=" + cvalue + "; " + expires;
//         console.log(document.cookie);
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



	getCityList(){
		var arr = [];
		React.axios.get(`http://localhost:1234/getCityList`
	      )
	      .then((res)=>{
	        	this.setState({
	        		cityData : res.data.result
	        	})
	        	// console.log(this.state.cityData);

				for(var i in this.state.cityData){
					var obj = {py:"",list:[]};

					obj.py = i.toUpperCase();
					obj.list = this.state.cityData[i];
					// console.log(i,this.state.cityData[i]);
					arr.push(obj);
					// for(var j=0;j<this.state.cityData[i].length;j++){
					//     console.log(i.toUpperCase(),this.state.cityData[i][j].areaName,this.state.cityData[i][j].areaCode)
					// }
				}
				this.setState({
					cityList: arr
				})

				
	        	
	      })
	      .catch((err)=>{
	        
	        console.log(err)
	      })
	}

	componentDidMount(){
		this.getCityList();
		var name = this.getCookie('cityName');
		if(name === ''){
			name = '广州';
		}
		this.setState({
			cityName: name
		})
		
	}

	render() {
		return (
		    <div id="wrapper-city">
				<div id="city" className="page">
				    <header className="header">
				    	<i className="icon icon-angle-left" onClick={this.navigateTo.bind(this)}></i> 选择城市 
				    </header> 
				    <div className="location">
				      当前定位城市：
				    	<span className="city--name">{this.state.cityName}</span>
				   	</div>

				    <ul className="list list-unstyled">

				    	{
				    		 (() => {
								 return this.state.cityList.map((item, index) => {

				    		 		var cityName = item.list.map((pitem,idx)=>{
		            					return (
		            						
											    
											       <li  key={idx} className="group__item" onClick={this.checkTo.bind(this,pitem.areaCode)}>{pitem.areaName}</li>
											   
		            					)
		            				})


								 	return (
								 			<li key={index} className="group">
								 				<h3 className="group__title">{item.py}</h3>
								 				<ul className="group__list">
									 				{cityName}
								 				 </ul>
								 			</li>
								 		)
								 	})
							 })()
						}
				     
				    </ul>


				</div> 

				<Xfooter />
				
		</div>
			);
	}
}

export default CityList;
