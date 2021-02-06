#!/bin/bash
while true
do
cpu=$(/opt/vc/bin/vcgencmd measure_temp | egrep -o '[0-9]*\.[0-9]*')
redis-cli set cpu $cpu
sleep 1
done
