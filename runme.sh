#!/bin/bash -x
sudo npm install
sudo npm install -g bower
sudo npm install -g phantomjs
sudo npm install -g karma-phantomjs-launcher
sudo npm install -g karma-html-reporter
sudo npm install -g karma-coverage
bower install
ionic state restore
ionic resources
