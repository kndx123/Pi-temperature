#!/bin/bash
while true
do
cpu=$(/opt/vc/bin/vcgencmd measure_temp | sed "s/\<temp=//g" | sed "s/..$//")
redis-cli set cpu $cpu
sleep 1
done
