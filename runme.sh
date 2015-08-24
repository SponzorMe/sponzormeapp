#!/bin/bash -x
sudo npm install
bower install
mkdir www/lib/gcloud
curl -Lso www/lib/gcloud/client.js https://apis.google.com/js/client.js
curl -Lso www/css/materialicons.css https://fonts.googleapis.com/icon?family=Material+Icons
