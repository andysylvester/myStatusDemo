# myStatusDemo
Perform a demo of rssCloud protocol and reallySimple NPM module

## Requirements

Current version of Node.js, NPM installed on a Linux server

RSS feed supporting rssCloud and method for pinging a rssCloud server

## Installation

Get the two files included in this repo, copy them to a folder on your server

Change directory to that folder, then type "npm install" to install NPM packages needed by the script

Edit rssCloudTestOriginal02.js on line 1 to change the server name from "fedwiki.andysylvester.com" (my server name) to the URL for your server

Edit rssCloudTestOriginal02.js on line 21 to enter a RSS feed URL for a feed that has rssCloud elements

Type "node rssCloudTestOriginal02.js" in a terminal and press Enter. You should see a message that the rssCloud server in the script has recognized the server created by the script. It also means the rssCloud server has registered the feed and will send info to the script server when the feed updates.

