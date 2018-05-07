# Playing with Canvas (and Geometry)

## How to hack locally

TL;DR:

* `npm i`

* `npm run watch`

Longer version:

#### Frontend requirements

You will need [npm](https://www.npmjs.com/) and [Node](https://nodejs.org).

On Linux you might get those by `sudo apt install npm` and `sudo apt install nodejs`

Then install project requirements locally:

`npm i`

#### Raise your node server

You need this to server webpack automagically bundled assets after each change

`npm run dev`

## About the project

This is a simple geometry app. Each click on canvas will update one of the three point
references in a cyclic order (P0, P1, P2, P0, P1...). Each point is highlighted with a red circle.

After P0, P1 and P2 are set, the app calculates P3 so that,
P0-P1-P2-P3 forms a parallelogram, which is ploted in blue.

Also it plots a yellow circle, which has the same area and centre of mass as the parallelogram.

Red circle, blue parallelogram and yellow circle are updated within each click.

RESET CANVAS button erases all point references (and derived shapes).

SHAPES DETAILS tab displays updated X (from left to right) and Y (from top to bottom)
coordinates (in an ordered pair (x, y)) of each point,
as well as the centre of mass and area (both the same for both shapes).

Author: [Marcelo Tokarnia](https://www.github.com/marcelotokarnia)

Deployed at: [canvas-tokarnia@now](https://canvas-tokarnia.now.sh/)
