#!/bin/bash -x
sudo npm install
npm install xml2js
sudo npm install -g bower
sudo npm install -g karma-cli
sudo npm install -g karma
sudo npm install -g phantomjs
sudo npm install -g karma-chrome-launcher
sudo npm install -g karma-phantomjs-launcher
sudo npm install -g karma-html-reporter
sudo npm install -g karma-coverage
sudo npm install -g karma-jasmine
bower install
ionic state restore
ionic resources
