import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Candidate from './Candidate';
import content from '../../chrome/extension/content';
import * as TodoActions from '../actions/todos';
import { root } from '../constants/config';
import style from './App.css';

function sendToServer(resume, callback) {
  const data = resume.resume;
  const url = 'http://localhost:8080/extensions/add-resume';
  axios.post(url, data).then(callback);
}

function sendMessageToTabForResume(callback) {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    (tabs) => {
        // ...and send a request for the DOM info...
      chrome.tabs.sendMessage(
            tabs[0].id,
            { from: 'popup', subject: 'DOMInfo' },
            // ...also specifying a callback to be called
            //    from the receiving end (content script)
            resume => sendToServer(resume, callback)
        );
    }
  );
}


@connect(
  state => ({
    todos: state.todos
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
export default class App extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      resume: null
    };
    this.sendResumeToServer = this.sendResumeToServer.bind(this);
  }
  componentDidMount() {
    const self = this;
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      const linkedinUrl = tabs[0].url;
      const url = `${root}/api/extensions/get-resume`;
      axios.get(url, {
        params: {
          url: linkedinUrl
        }
      }).then((response) => {
        console.log(response);
        console.log(linkedinUrl);
        self.setState({ resume: response.data });
      });
    });
  }

  sendResumeToServer() {
    const self = this;
    console.log('button clicked');
    sendMessageToTabForResume(response => self.setState({ resume: response.data }));
  }
/*testing
*/
  render() {
    const { resume } = this.state;
    const { todos, actions } = this.props;
    return (
      <div>
        <div>{
      resume
        ? <Candidate resume={resume} handleAdd={this.sendResumeToServer} />
        : <div><h4>Resume not found!!</h4></div>
    }</div>
        <div><button className="btn btn-primary" onClick={this.sendResumeToServer}>Import Resume</button></div>
      </div>
    );
  }
}
