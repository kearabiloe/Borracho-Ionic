#!/bin/sh
echo "Ionic to Signed APK ---- b@agencys.eu // Benjamin Rathelot\n"
export APKDIR="platforms/android/app/build/outputs/apk/release/"
export ALIAS=borracho
source ~/.bash
ionic cordova build --release android --prod
#cd platforms/android/app/build/outputs/apk/release/
rm -f /home/droog/Public/borracho-signed.apk 
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../keystores/borracho-release-key.keystore $APKDIR/app-release-unsigned.apk $ALIAS
zipalign -v 4 $APKDIR/app-release-unsigned.apk /home/droog/Public/borracho-signed.apk