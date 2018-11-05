#!/bin/sh
echo "Ionic to Signed APK ---- b@agencys.eu // Benjamin Rathelot\n"
export APKDIR="platforms/android/app/build/outputs/apk/release/"
printf "Project key alias : "
read ALIAS
source ~/.bash
cordova build --release android
#cd platforms/android/app/build/outputs/apk/release/
rm borracho-signed.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../keystores/borracho-release-key.keystore $APKDIR/app-release-unsigned.apk $ALIAS
zipalign -v 4 $APKDIR/app-release-unsigned.apk borracho-signed.apk