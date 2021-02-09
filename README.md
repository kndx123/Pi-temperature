# pipucs (Pi) C(PU) (C)elsiu(s)
Description: Full-stack application which monitors the CPU temperature of a Raspberry pi.
## Step 1: Bash shell script
The bash script continuosly measures the temperature of the Raspberry pi's CPU using:

	/opt/vc/bin/vcgencmd measure_temp
	output: temp=36.5'C
It also trims the output using egrep, leaving only the float value.
	
	$(/opt/vc/bin/vcgencmd measure_temp | egrep -o '[0-9]*\.[0-9]*')
	output: 36.5
Then stores and updates the key in redis using redis-cli every second.
## Step 2: Redis
Redis holds the temperature value in the memory where it can be efficiently fetched.
## Step 3: Node.js
Node.js app retrieves the key from redis and broadcasts it using an http server on a different port than the main Nginx server.
## Step 4: NGiNX
-   hosts the index.html and q.js files under the domain:  [https://arturkraak.duckdns.org](https://arturkraak.duckdns.org/)
-   makes the Node.js app accessible through a proxy at:  [https://test.arturkraak.duckdns.org](https://test.arturkraak.duckdns.org/).
## Step 5: HTML/CSS/JS/jQuery 
jQuery creates the table headers then loads the value into a hidden table header each second.

JavaScript updates the table headers and the title then draws a graph onto the HMTL Canvas where it is displayed to the client(Browser).
