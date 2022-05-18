import React, { Component } from 'react';
import {SearchOutlined} from '@ant-design/icons';
import FilterBar from './searchbar';
import './Click.css';

export default class ClickReveal extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
  }

  handleClick() {
    const wrapper = this.wrapperRef.current;
    wrapper.classList.toggle('is-nav-open')
  }

  render() {
    return (
      <div ref={this.wrapperRef} className="wrapper" >
        <div className="nav">
        <SearchOutlined className="nav__icon" type="menu-fold" onClick={() => this.handleClick()}/>
          <div className="nav__body">
            <FilterBar />
          </div>
        </div>
      </div>
    );
  }
}