*Agglo*

This is a fun project to learn [paper.js](http://paperjs.org/ "paper.js") and simple 2D game mechanics.

Originally this game was built with Processing as a school assignment many years ago and can be viewed [here](http://www.openprocessing.org/sketch/32751 "Open Processing")(JavaPlugin req.).

This is my attempt to rebuild the game using new techniques, make it more efficient, and add new modes and abilities.

**Classes**

Right now there are 3 Classes. 
- Bullets - act as the enemy. 
- Expanders - produced by user mouseEvents and cannot come into contact with bullets.
- Balls - Expanders that have been grown and dropped. Respond to gravity and collisions with all other classes.

***TO-DO's***

_Expanders_
- reduce jitter when expander is large and touching boundary
- detect collision with a bullet
- create a 'pop' animation on collision and destroy expander instance
- on mouse release, add expander to Balls array and inherit ball properties (gravity, methods, bounce, etc.)
- Expanders collide with dropped Balls and reduce or expand accordingly. (much like hitting the view boundary)
