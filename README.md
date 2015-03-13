Agglo
=====

This is a fun project to learn [paper.js](http://paperjs.org/ "paper.js") and simple 2D game mechanics.

Originally this game was built with Processing as a school assignment many years ago and can be viewed [here](http://www.openprocessing.org/sketch/32751 "Open Processing")(JavaPlugin req.).

This is my attempt to rebuild the game using new techniques, make it more efficient, and add new modes and abilities. Please feel free to contribute.

Classes
-------

Right now there are 3 Classes. 
- Bullets - act as the enemy. 
- Expanders - produced by user mouseEvents and cannot come into contact with bullets.
- Balls - Expanders that have been grown and dropped. Respond to gravity and collisions with all other classes.

TO-DO's
-------

_General_
- make a common class for Bullets, Expanders and Balls to share positions
- make quadtree for more efficient collision detection
- turn Bullets and Balls into Paper.Symbols and Paper.Groups of symbols
- make speed, gravity, scale and size dependent on current canvas size

_Expanders_
- create a 'pop' animation on collision and destroy expander instance
- on mouse release, add expander to Balls array and inherit ball properties (gravity, methods, bounce, etc.)
- Expanders collide with dropped Balls and reduce or expand accordingly. (much like hitting the view boundary)
- if Expander.bounds is outside the view.bounds when dropped then adjust it's position to be inside

Contribute
----------
If you would like to contribute, please create an issue and a pull-request with your issue number.