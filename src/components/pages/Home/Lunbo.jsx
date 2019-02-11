import React, { Component } from 'react';



import Swiper from 'swiper'
class Lunbo extends Component {
	constructor(props){
		super(props);
		this.props=props;
		this.state={
			bannerdata:[]
		}
	}
	getBannerData(cityCode){
		React.axios.get('http://localhost:1234/getIndexData',{params:{
			cityCode: cityCode
		}
	})
		.then( (res)=> {
	    	console.log(res);
	    	this.setState({
	    		bannerdata:res.data.result.bannerInfo
	    	},()=>{
	    		this.lunbo();
	    	})
	    	console.log(this.state.bannerdata);
	  })
	  	.catch(function (error) {
	    	console.log(error);
	  });
	}
	lunbo(){
		var swiper = new Swiper('.swiper-container', {
			loop: true,
	      spaceBetween: 30,
	      centeredSlides: true,
	      autoplay: {
	        delay: 2500,
	        disableOnInteraction: false,
	      },
	      pagination: {
	        el: '.swiper-pagination',
	        clickable: true,
	      },
	      navigation: {
	        nextEl: '.swiper-button-next',
	        prevEl: '.swiper-button-prev',
	      },
	    });
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
		 this.getBannerData(code);
	}
  render() {
    return (
      <div className="Lunbo">
        <div className='block-wrapper'>
    		<div className="swiper-container banners">
		    <div className="swiper-wrapper">
		      {
		      	(()=>{
		      		let bannerHTML=this.state.bannerdata.map((item,idx)=>{
						return <div key={idx} className="swiper-slide">
							<img src={item.imgUrl} />
						</div>
					})
					return bannerHTML
		      	})()
		      }
		    </div>
		    <div className="swiper-pagination"></div>

		  </div>
        </div>
      </div>
    );
  }
}

export default Lunbo;
