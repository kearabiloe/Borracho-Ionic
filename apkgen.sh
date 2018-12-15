#!/bin/sh
echo "Ionic to Signed APK  \n"
export APKDIR="platforms/android/app/build/outputs/apk/release/"
export PARSE_PRODUCTION=false
source ~/.bash
ionic cordova build android --prod --release -- -- --gradleArg=--offline 
#cp platforms/android/app/build/outputs/apk/release/app-release.apk platforms/android/app/src/main/assets/www/assets/httpd_root/apk/borracho-latest.apk
#cordova build android --release -- --gradleArg=--offline 
adb install -r platforms/android/app/build/outputs/apk/release/app-release.apk