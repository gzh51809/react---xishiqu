import React, { Component } from 'react';
import ListHeader from './listHeader.jsx';
import Xcategory from '../../common/Xcategory.jsx';
import NodeList from './NodeList.jsx';
import Xfooter from '../../common/Xfooter.jsx';
import Box from './Box.jsx'
import Calendar from './Calendar.jsx'


class List extends Component {
  constructor(props){
    super(props);
    this.props=props;
    this.state={
          nav: 1,
          frontCate: ''
        }
  }

  getFrontCate(fc){
    console.log('fc:',fc);
    // console.log(this);
    this.setState({
      frontCate: fc
    },()=>{
      console.log(this.state.frontCate);
      
    })
  }

  render() {
    return (
      <div id="wrapper-category">
        <div id="category" className="page">
          <ListHeader history={this.props.history}></ListHeader>
          <div>
            <Xcategory sendFc={this.getFrontCate.bind(this)} />
          </div>
          <NodeList history={this.props.history}  frontCate={this.state.frontCate} />
        	<Box></Box>
        </div>
        <Xfooter history={this.props.history} nav={this.state.nav} />
      </div>
    );
  }
}

export default List;
