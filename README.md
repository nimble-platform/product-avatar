## Product avatar 4.0

The Product Avatar is a web mobile application developed for interact with Nimble DataChannel in order to be able in
searching, tracking and retrieving each kind of Iot data created to monitor a contract in Nimble or to give live to a Data Trading on demand.

Product avatar provides integrated Nimble authentication in all kwnown Nimble instances, it gives User and Company information and service versions of the connected Nimble instance.
Product Avatar enable user in searching and visualization capabilities, including features for product identification by reading a bar code, for iot data transfered over Internal DataChannel Service.

In NIMBLE platform, Product Avatar represents one of the consumers of the NIMBLE Internal DataChannel which is Kafka-based. 
In order to perform an accurate retrieval of the data from the channels, it gives an additional advanced system of filters based on the KSQL has been created in the optional Data Channel Filtering Service.

It has got customizable internal datatype viewer which enable the application to give a data linked look&feel and behaviour: sensors name can have an icon near them to make easy the undestarnding of content of iot Data; a special data selector is enabled, for example a barcode scanner for serialnumber fields.

It is for example used in White Goods scenario in order to track the lifecycle of products starting from production, going to issues and ticketing from CRM, till the end of lify with recycling data (Bill of Material).

In this version Product avatar is integrated with internaldatachannel (Data pipe).

## Howto run as developer
Download the project

npm install -g ionic cordova

npm install

ionic serve

- usefull command line
ionic cordova run browser
cordova run android

## How to build APK
You need a device which runs third party app (https://www.corsoandroid.it/permettere_l_installazione_di_app_al_di_fuori_di_google_play.html)

run
cordova clean android
cordova build android
ionic cordova build android

You find install file in "platforms/android/app/build/outputs/apk/debug/app-debug.apk"

You can simply install it by sending to your mobile device using a common free sharing service (like wetransfer fore example)

For every questions write to Andrea.Musumeci@holonix.it
dev: Weian Xu (Holonix) / Michel Morelli (for Holonix)



