import React, { Component } from 'react'
import linkedin from '../assets/linkedin.png'
import github from '../assets/github.png'
import skype from '../assets/skype.png'

class About extends Component {
  render() {
    return (
      <div className="flex-row" >
        <div className="flex1">
          <img
            src="https://s.gravatar.com/avatar/9e6c8c1ae66c4495fcba38b6f6d29315?s=80"
            alt="Author profile"
            className="circle-border flex3"
          />
          <div className="">
            <a href="https://www.linkedin.com/in/marcelo-tokarnia-5a1ab2128/" target="_blank" rel="noopener noreferrer">
              <img src={linkedin} alt="Linkedin" width="25" height="25" />
            </a>
            <a href="https://www.github.com/marcelotokarnia" target="_blank" rel="noopener noreferrer">
              <img src={github} alt="Github" width="25" height="25" />
            </a>
            <a href="skype:marcelotokarnia?add">
              <img src={skype} alt="Skype" width="25" height="25" />
            </a>
          </div>
        </div>
        <div className="flex3">
          <p>Geometry</p>
        </div>
      </div>
    )
  }
}

export default About
