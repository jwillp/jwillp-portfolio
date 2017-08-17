---
title: 'Goat Engine'
feature_image_file: feature_image.jpg
project_image_file: ge_tile.jpg
category: Personal Project
---

Goat Engine is a 2D cross-platform opiniated Java game developpement engine based on the libGDX framework. Being based on libGDX it works on Windows, Linux, Mac OS X, Android, WebGL enabled browsers and iOS.

===

  
---
<!-- ![](https://user-images.githubusercontent.com/5913483/29291036-409ac418-8110-11e7-9576-216d2d838aa8.png) -->
![](ge_logo.png)

<div class="text-center">
    <a href="https://github.com/jwillp/GoatEngine" class="btn btn-ghost" target="_blank"><i class="fa fa-github" aria-hidden="true"></i> View on Github</a>
</div>

## Description
It was first developped as an extension of a school project [Kubotz](https://github.com/jwillp/kubotz) in order to help me create more games quickly in a structured manner and to delve deeper into my understanding of software architecture. It is based on an Entity-Component-System (ECS) architecture. 

One of the main goals I had when creating this engine was to allow myself to reuse most of the logic I had implemented in [Kubotz](https://github.com/jwillp/kubotz) regardless of the game's genre instead of reinventing the wheel everytime or trying to copy and paste code.
Such needs were the concept of game objects managmenet, input handling, graphical display, game state management, AI algorithm and data structures, etc.
Therefore I had to provide a versatile foundation of code that could be applied on a variety of game types. 

Another goal I had in mind was to ease the developement of the mnay iterations of a game. While developing Kubotz I came accross a very usual problem in game programming: Change. The cycle of having to close the game in order make a change, recompile, relaunch and reenact the circumstances of my change was slowing me down a lot. Especially for parameter tweaking. For that reason I decided to integrate a scripting language (Lua) into the engine as well as dynamically loaded configuration files to describe and define the entities (game objects) of the games. That way I could simply test what I needed and, without closing the game, make some changes in the scripts or the config files and reload these changes dynamically to see them instantly applied.

## Features
- 2D
- Cross-platform
- OpenGL
- Entity-Component-System
- Box2D physics integrated
- Lua Scriptable
- Particle System
- Entity Prefab
  - prefab config in lua based DSL (supporting inheritance)
- Easy input handling (Mouse, Keyboard, Game controllers)
- AI
  - Behaviour trees
  - A* pathfinding
- Utilities (Game Framework)
  - Premade Components
  - Premade scripts
  - Premade entities
  - Premade systems

## Conclusion
Working on this project on a 2-year span taught me alot about good practices, organisation, architecture, maintenance, testing and change over time. I also had lots of fun!
