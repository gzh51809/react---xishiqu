import * as serviceWorker from './libs/serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router } from 'react-router-dom';

import './styles/app.css';
import './styles/home.css';
import './styles/activity.scss';
import './styles/act.scss';
import './styles/film.css';
import './styles/city.css';
import './styles/category.scss'
import './styles/Calendar.scss'
import './styles/upload.css'
import 'antd-mobile/dist/antd-mobile.css';

import App from './App';
// 路由




// 状态管理 配置store的
import { createStore } from 'redux'
// 把上面配置好的store和react进行关联
import { Provider } from 'react-redux';




import axios from 'axios';
React.axios = axios;


        


// 它是状态管理的配置参数，函数第一个参数为state，就是存储组件需要通信和交换的数据
// 第二个参数是action，它是触发，他需要其他组件传递一个信号，



//获取cookie
function getCookie(cname){
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

var golbalCode = getCookie('cityCode');
if(golbalCode === ''){
	golbalCode = '021';
}
// console.log(golbalCode);


// state交换数据的仓库
// action交换数据的动作
const store = createStore((state = {
    initListData:'',
	isShowOrder:'',
	isCalendar:false,
	isShowBox:false,
    cityCode:golbalCode,
    categoryIdx: 0,
    isShowNav: false,
    isShowGallery: {
        bool: false,
        src: ""
    },

}, action) => {
    switch (action.type) {
        case 'setCityCode':
            return {
                ...state,
                cityCode:action.cityCode
            }
        case 'toggleGallery':
            return {
                ...state,
                isShowGallery:action.isShowGallery
            }
        case 'toggleBox':
            return {
                ...state,
                isShowBox:action.isShowBox
            }

        case 'toggleCalendar':
	        return {
	            ...state,
	            isCalendar:action.isCalendar
	        }
	    case 'toggleOrder':
	        return {
	            ...state,
	            isShowOrder:action.isShowOrder
	        }

        case 'setCategoryIdx':
            return {
                ...state,
                categoryIdx:action.categoryIdx
            }
        case 'setListData':
            return {
                ...state,
                initListData:action.initListData
            }

        default:
            return state
    }
})


ReactDOM.render(
	<Provider store={store}>
		<Router>
		<App />
		</Router>
	</Provider>
, document.getElementById('root'));




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
