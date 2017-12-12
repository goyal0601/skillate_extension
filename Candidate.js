import React, { Component, PropTypes } from 'react';
import style from './Candidate.css';
import axios from 'axios';
// import content from './content';
// import popup from './popup';

const { App, Name, a, Id } = style;


class Candidate extends Component {


  render() {
    const { resume } = this.props;
    const {
    name,
    url,
    angelLink,
    behanceLink,
    bioLink,
    facebookLink,
    githubLink,
    twitteLink,
    stackOverflowLink
     } = resume;


    console.log(resume);
    const id = `http://localhost:8080/#/candidates/${resume.id}`;
    return (
      <div className={App}>
        <div className={Name}><u>{name}</u></div>
        <div className={Id}><a href={id}>Skillate Link</a></div>
        <div className={style['App-header']}>
          <div className={style['profile-social']}>
            {twitteLink
              ? (<a
                className="icon fa fa-twitter link-twitter"
                href={twitteLink}
                target="_blank" rel="noopener noreferrer"
              />)
              : null}
            {facebookLink ?
              (<a
                className="icon fa fa-facebook link-facebook"
                href={facebookLink}
                target="_blank" rel="noopener noreferrer"
              />)
              : null}
            {url ?
              (<a
                className="icon fa fa-linkedin link-linkedin"
                href={url}
                target="_blank" rel="noopener noreferrer"
              />)
              : null}
            {githubLink ?
              (<a
                className="icon fa fa-github link-github"
                href={githubLink}
                target="_blank" rel="noopener noreferrer"
              />)
              : null}
            {behanceLink ?
              (<a
                className="icon fa fa-behance link-behance"
                href={behanceLink}
                target="_blank" rel="noopener noreferrer"
              />)
              : null}
            {angelLink ?
              (<a
                className="icon fa fa-angellist link-angellist"
                href={angelLink}
                target="_blank" rel="noopener noreferrer"
              />)
              : null}
            {stackOverflowLink ?
              (<a
                className="icon fa fa-stack-overflow link-stackoverflow"
                href={stackOverflowLink}
                target="_blank" rel="noopener noreferrer"
              />)
              : null}
          </div>
        </div>
        <p className={style['App-intro']} />
      </div>
    );
  }
}
// Candidate.propTypes = {
//   resume: PropTypes.object.isRequired
// };

export default Candidate;
