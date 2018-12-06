import React, {Component} from 'react';
import { expect } from 'chai'
import {toast, ToastContainer} from "react-toastify";
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import jest from 'jest'
import {notify} from "../../../src/client/utils/notificationHandler";

describe('>>>>>notificationHandler', () => {
  let wrapper;
  it('function notify with type success', () => {
    class App extends Component {
      render(){
        return (
          <div>
            <ToastContainer />
          </div>
        );
      }
    }

    wrapper = mount(<App />);
    notify('a success message', 'success')
    expect(toJson(wrapper)).to.matchSnapshot();
  })
  it('function notify with type error', () => {
    class App extends Component {
      render(){
        return (
          <div>
            <ToastContainer />
          </div>
        );
      }
    }

    wrapper = mount(<App />);
    notify('an error message', 'error')
    expect(toJson(wrapper)).to.matchSnapshot();
  })
  it('function notify with type warning', () => {
    class App extends Component {
      render(){
        return (
          <div>
            <ToastContainer />
          </div>
        );
      }
    }

    wrapper = mount(<App />);
    notify('a warning message', 'warning')
    expect(toJson(wrapper)).to.matchSnapshot();  })
  it('function notify with type info', () => {
    class App extends Component {
      render(){
        return (
          <div>
            <ToastContainer />
          </div>
        );
      }
    }

    wrapper = mount(<App />);
    notify('an info message', 'info')
    expect(toJson(wrapper)).to.matchSnapshot();  })
  it('function notify with type default', () => {
    class App extends Component {
      render(){
        return (
          <div>
            <ToastContainer />
          </div>
        );
      }
    }

    wrapper = mount(<App />);
    notify('a default message', 'default')
    expect(toJson(wrapper)).to.matchSnapshot();  })
})
