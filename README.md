# mini-logiciel

## Installation

### Emscripten (optionel)
[install](https://kripken.github.io/emscripten-site/docs/getting_started/downloads.html)

### npm

```bash
  sudo apt-get install npm
  cd to/the/project
  npm install
```

### uglifyjs

```bash
sudo npm -g install uglifyjs
```


## Utilisation

### Test mode

* [mini-logiciel](https://github.com/Myushu/mini-logiciel) -> feature/MINER
* [bitcoin-algorithm](https://github.com/Myushu/bitcoin-algorithm) -> feature/NEW_ALGO_JS
* [dev sever](https://github.com/Myushu/dev-server) -> master

Construire le mini-logiciel :
```bash
cd /path/to/mini-logiciel
sh compile.sh
```

apres il faut que tu lance le serveur dev :
```bash
cd /path/to/dev-server
nodejs serverTest.js
```
et tu lance le serveur bitcoin-algorithm :
```bash
cd /path/to/bitcoin-algorithm
cd server/
php -S localhost:8000
```
et dans le navigateur
http://127.0.0.1:3000 (edited)


## Troubleshoot
