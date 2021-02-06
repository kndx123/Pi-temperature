# Raspberry pi CPU temperature monitor
Description: Full-stack application which monitors the CPU temperature of a Raspberry pi.
## Step 1: BASH 
The bash script continously measures the temperature of the Raspberry pi's CPU using:

	/opt/vc/bin/vcgencmd measure_temp
It also trims the output using the sed command, leaving only the float value.
	
	$(/opt/vc/bin/vcgencmd measure_temp | sed "s/\<temp=//g" | sed "s/..$//")
	output: 36.5
Then stores and updates the key in redis using redis-cli every second.
## Step 2: Redis
Redis holds the temperature value in the memory where it can be efficiently fetched.
## Step 3: Node.js
Node.js app retrives the key from redis and broadcasts it using an http server.
## Step 4: NGiNX
Nginx hosts the index.html and q.js files under the domain: https://arturkraak.duckdns.org.
Nginx makes the Node.js app accessible through a proxy at: https://no.arturkraak.duckdns.org.
## Step 5: jQuery
jQuery creates and loads the value into a hidden table header each second.
## Step 6: HTML CSS JS
JavaScript updates the table headers and draws a graph onto the HMTL Canvas where it is displayed to the client(Browser).
