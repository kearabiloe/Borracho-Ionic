#!/bin/sh
echo "Ionic to Signed APK ---- b@agencys.eu // Benjamin Rathelot\n"
export APKDIR="platforms/android/app/build/outputs/apk/release/"
export ALIAS=borracho
source ~/.bash
ionic cordova build android --prod --release
rm -f /home/droog/Public/borracho-signed.apk 
cp $APKDIR/app-release.apk /home/droog/Public/borracho-signed.apk
adb install ~/Public/borracho-signed.apk 