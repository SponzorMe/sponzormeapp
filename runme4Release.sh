#!/bin/bash -x
gulp release
file="SponzorMeRelease.apk"
[[ -f "$file" ]] && rm -f "$file"
ionic build --release android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore sponzorme.keystore platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk sponzorme
~/Library/Android/sdk/build-tools/19.1.0/zipalign -v 4 platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk SponzorMeRelease.apk
