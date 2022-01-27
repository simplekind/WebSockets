
![Logo](https://raw.githubusercontent.com/simplekind/WebSockets/heroku/favicon/android-chrome-192x192.png)

[Take me to your Website !](https://evening-journey-95118.herokuapp.com/)
# About the Multiplayer Game WebSockets

A Multiplayer Realtime Game where players can create a game server and they can play it with their friends.  

## Description

So this is a simple competetive game where players compete with each other to color the maximum tiles. The game state gets updated once a player colors a tile  just by hovering over it and it gets broadcasted over every other player in the same game server. 

# Getting Started  

## How to play? 

1. Create a Game ID by clicking 'New Game'.
2. Copy the Game ID using the Copy button.
3. Paste it in the box ;
4. Join the Game ID by clicking 'Join Game'.
5. Share the link to your friends and ask them to do steps 3-4 .
6. Great! now you are in the game and to play it hover over the tiles, to color them!


####NOTE
Game only allows 3 players at max .

##Branches
1. Master Branch => with Node Modules and Runnable on local host
2. Heroku Branch => without Node Modules(since Heroku don't need it while deploying), but can be downloaded since Package.json is there by running:

```
npm install
```

#

## Usage Preview

![Preview](https://github.com/simplekind/WebSockets/blob/master/preview.gif?raw=true)

## Prototyping with 
- Figma (Software) 

## Built with
- HTML
- CSS 
- JavaScript 
- Bootstrap
- Node.js 
- Express.js
- WebSockets

## So how does it works  ? 
Using WebSockets as a communication between client and server, client sends various request to the server based on its various activity. 

A request is sent in form of JSON format from the client side and response is sended back from server side also in JSON format in order to facilate the activity .

For every new player joining and  creating the new game, a new client ID unique to player and a unique Game ID is generated whose ID is stored in a Map for reterival purposes.

During the gameplay, when the player hovers over the cell ,the game state gets updated for every player by saving the game state in the server and broadcasting it to every other player present in the game .  

## Contributing
Pull requests are most welcome.
 For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## 🚀 Catch me Up On :

https://www.linkedin.com/in/harshit-goyal-a603a0220/ś