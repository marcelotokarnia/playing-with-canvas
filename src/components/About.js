import React, { Component } from 'react'
import linkedin from '../assets/linkedin.png'
import github from '../assets/github.png'
import skype from '../assets/skype.png'

class About extends Component {
  render() {
    return (
      <div className="flex-row justify-center">
        <div className="flex1 font-cursive small-horizontal-margin">
          Marcelo Tokarnia
          <div className="small-vertical-margin">
            <img
              src="https://s.gravatar.com/avatar/9e6c8c1ae66c4495fcba38b6f6d29315?s=80"
              alt="Author profile"
              className="circle-border flex3"
            />
            <div className="">
              <a href="https://www.linkedin.com/in/marcelo-tokarnia-5a1ab2128/" target="_blank" rel="noopener noreferrer">
                <img src={linkedin} alt="Linkedin" width="25" height="25" />
              </a>
              <a href="https://www.github.com/marcelotokarnia" title="marcelotokarnia" target="_blank" rel="noopener noreferrer">
                <img src={github} alt="Github" width="25" height="25" />
              </a>
              <a href="skype:live:marcelotokarnia?userinfo" title="live:marcelotokarnia">
                <img src={skype} alt="Skype" width="25" height="25" />
              </a>
            </div>
          </div>
          <div>
            Rio de Janeiro, Brazil
          </div>
        </div>
        <div className="flex3 font-smaller">
          <p>
            This is a simple geometry app. Each click on canvas will update one of the three point
            references in a cyclic order (P0, P1, P2, P0, P1...). Each point is highlighted with a red circle.
          </p>
          <p>
            After P0, P1 and P2 are set, the app calculates P3 so that,
            P0-P1-P2-P3 forms a parallelogram, which is ploted in blue.
          </p>
          <p>
            Also it plots a yellow circle, which has the same area and centre of mass as the parallelogram.
          </p>
          <p>
            Red circle, blue parallelogram and yellow circle are updated within each click.
          </p>
          <p>
            RESET CANVAS button erases all point references (and derived shapes).
          </p>
          <p>
            SHAPES DETAILS tab displays updated X (from left to right) and Y (from top to bottom)
            coordinates (in an ordered pair (x, y)) of each point,
            as well as the centre of mass and area (both the same for both shapes).
          </p>
        </div>
      </div>
    )
  }
}

export default About
