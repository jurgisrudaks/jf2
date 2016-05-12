# JF2
## Frontend framework
### Version
0.0.1

### Installation
#### 1. Install Node.js using NVM
Install packages required packages
```sh
$ sudo apt-get update
$ sudo apt-get install build-essential libssl-dev
```
Install NVM
```sh
$ curl https://raw.githubusercontent.com/creationix/nvm/v0.23.3/install.sh | bash
```
Logout and login or source ~/.profile
```sh
$ source ~/.profile
```
Find latest node version
```sh
nvm ls-remote
```
Install latest node version
```sh
$ nvm install [version number]
```
Optional - install node globally, so it is available to all users
```sh
$ sudo n=$(which node);n=${n%/bin/node}; chmod -R 755 $n/bin/*; sudo cp -r $n/{bin,lib,share} /usr/local
```

#### 2. Install Ruby and required dependencies
```sh
$ sudo apt-get install ruby ruby-dev
$ sudo gem install scss-lint compass
```

#### 3. Install MongoDB
```sh
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
$ echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
$ sudo apt-get update
$ sudo apt-get install mongodb-org git build-essential openssl libssl-dev pkg-config
```

##### 3.1 Install MongoDB PHP driver
```sh
$ sudo apt-get install php5-dev php5-cli php-pear make
$ sudo pecl install mongo
```

#### 4. Clone and install JF2
```sh
$ git clone https://github.com/jrudaks/jf2.git .
$ npm install && npm run bower install
```

#### 5. Build
To build just run
```sh
$ npm run gulp
```

[ci-image]: https://codeship.com/projects/b878b460-12d2-0133-3a96-7276a727d42f/status?branch=master
[ci-url]: https://codeship.com/projects/92632
