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

## Running the script

Type "node rssCloudTestOriginal02.js" in a terminal and press Enter. You should see a message that the rssCloud server in the script has recognized the server created by the script. It also means the rssCloud server has registered the feed and will send info to the script server when the feed updates.

The script is running on port 2222, so open a browser tab with your server name and that port (for example: http://fedwiki.andysylvester.com:2222

Using a tool that creates a rssCloud-enabled RSS feed, create a post. That tool should also ping the rssCloud server listed in the feed. for my testing, I used the Old School blogging tool in [Drummer](http://drummer.scripting.com/) and the "Edit my feed" option in [FeedLand](http://feedland.org/). When the post is created, you should see text appear in the terminal window where the script is running. Next, go to the browser tab you opened earlier and do a refresh. You should see the title of the feed and the title/decription of the first item in the feed.

## Resources

Weblog post: [Demo of rssCloud and reallySimple NPM module](https://andysylvester.com/2022/11/09/demo-of-rsscloud-protocol-and-reallysimple-npm-module/)

