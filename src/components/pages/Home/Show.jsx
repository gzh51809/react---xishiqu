import React, { Component } from 'react';
import $ from "jquery";
import { connect } from 'react-redux';
import Swiper from 'swiper'
class Show extends Component {
	constructor(props){
		super(props);
		this.props=props;
		this.state={
			day:[],
			list:[],
			href:['/home/one/','/home/two/','/home/three/','/home/four/','/home/five/','/home/six/','/home/seven/'],
			kw:'超叼的'
		}
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

	getData(code){
		React.axios.get('http://localhost:1234/getIndexData',{params:{
			cityCode:code
		}
	})
		.then((res)=>{
			console.log(res);
			let totalday = res.data.result.activitySevenInfo;
			let titleArr =[];
			let listArr=[];
			for(let i in totalday){
				titleArr.push(totalday[i].title);
				listArr.push(totalday[i].list)
			}
			console.log(titleArr)
			this.setState({
				day:titleArr,
				list:listArr
			},()=>{

    			console.log(this.props)
				let data =this.state.list[0];
				this.props.setListData(data);
			// console.log(this.props.initListData)
				
				/*this.props.history.push({pathname:'/home/init/',state:{name:this.state.list[0]}});*/

				
			})
			console.log(this.state.list);

		})
		.catch((err)=>{
			console.log(err)
		})
	}
	componentDidMount(){


		var code =this.getCookie('cityCode');
		this.getData(code);
	}
	changecolor(idx,e){
		if(!$(e.target).hasClass('active')){
			$(e.target).parent().children().map((idx,item)=>{
			$(item).removeClass('active')
			})
			$(e.target).addClass('active');
			this.props.history.push({pathname:this.state.href[idx],state:{name:this.state.list[idx]}})
		}
		
	}
  render() {
    return (
<div className="Show">
    <div className="block-wrapper">
        <h3 className="block__title">
            七日演出
            <small>
                演出日历
            </small>
        </h3>
        <div className="weekdays">
        {
        	(()=>{
        		return this.state.day.map((itm,idx)=>{
        			return <span className={idx===0?'item active':'item'} onClick={this.changecolor.bind(this,idx)} key={idx} >{itm}</span>
        		})
        	})()
        }
      
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
    setListData(data){
      dispatch({
        type:"setListData",
        initListData:data,
      })
    },

  }
}))(Show);
