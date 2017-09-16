# [Defend the Castle](https://mccordgh.github.io/Defend_The_Castle)

![alt text](http://imgur.com/u7MWF6a.gif "Defend The Castle Main Menu")

* [Defend the Castle](https://mccordgh.github.io/Defend_The_Castle) is a fast-paced arcade-style video game, with a twist on the classic [tower defense](https://en.wikipedia.org/wiki/Tower_defense) genre.
* " "An evil wizard has opened portals that are spawning malicious creatures on your King's island. Defend the castle from attacking bats at all costs."
* The engine and game are written from scratch in JavaScript, and it runs right in your browser.

In Game Screenshot:

![alt text](http://imgur.com/yiSYbPK.gif "Defend The Castle In Game Screenshot")

## How To Play

* movement: WASD or Arrow Keys (up, down, left, right)
* to attack: run sword in to a bat!
* portals will spawn more bats
* bats will charge the castle
* red arrows indicate offscreen enemies approaching
* game over when Castle Strength depletes

![alt text](http://imgur.com/Obq5rkh.gif "Defend The Castle How To Play")

## Running it locally

To get it up and running locally, you'll need to have a local http-server. I use [http-server](https://www.npmjs.com/package/http-server)

Once you have http-server installed then:

* Clone this repo.

* From the root directory of it, run: $ http-server
In your browser, open: http://localhost:8080 and
http-server will automatically load the index.html from that directory.
* Leave http-server running, and whenever you change the code, you can do a hard refresh to run the newly saved code.

## ETC

* Feel free to download this code, play with it, and add to the game, etc!

* res/textures/tiles.png and snow_expansion.png have a ton of extra assets to crop and insert in to the game!

* If the leaderboards ever gets fubar, use res/leaderboard/leaderboard.json as a template. (and/or submit an issue so that I know!)
