#!/bin/bash -x
ionic build --release android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore sponzorme.keystore platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk sponzorme 
jarsigner -verify -verbose -certs platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk
~/Development/android-sdk/build-tools/23.0.2/zipalign -v 4 platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk SponzorMeRelease.apk
