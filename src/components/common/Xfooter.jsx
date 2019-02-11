import React, { Component } from 'react';

class Xfooter extends Component {
	/*constructor(props){
		super(props);
		this.props = props;*/
		constructor(){
		super();
		this.state={
			nav: 0,
			footerNav:[
				{
					text:'首页',
					iconClass: 'i home',
					path:'/'
				},
				{
					text:'分类',
					iconClass: 'i category',
					path:'/list'
				},
				{
					text:'同趣',
					iconClass: 'i article',
					path:'/fun'
				},
				{
					text:'转票',
					iconClass: 'i ticket',
					path:'/zhuan'
				},
				{
					text:'我',
					iconClass: 'i my',
					path:'/my'
				}
			]
		}
	}

	componentDidMount(){
		this.setState({
			nav: this.props.nav
		})
	}

	navTo(index,e){
		this.setState({
			nav:index
		});
		// console.log(this.props);
		this.props.history.push({pathname: this.state.footerNav[index].path});
	}

  render() {
    return (
      <div className="bottom-toolbar">
      	{
      		(()=>{
      			return this.state.footerNav.map((item,index)=>{
      				return (

					   <div key={index} 
					   		className={index === this.state.nav ? "item active" : "item"}
					   		onClick={this.navTo.bind(this,index)}>
					    <span className={item.iconClass}></span> 
					    <span className="text">{item.text}</span>
					   </div>
      				)
      			})
      		})()
      	}
	   <div>
	   </div>
	  </div>
    )
  }
}

export default Xfooter;


