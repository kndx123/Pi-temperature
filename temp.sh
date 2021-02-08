#!/bin/bash
while true
do
        cpu=$(/opt/vc/bin/vcgencmd measure_temp | sed "s/\<temp=//g" | sed "s/..$//")
        listlen=$(redis-cli llen my_list)
        if (( $listlen > 9 )); then
                redis-cli lpop my_list
        fi
        redis-cli rpush my_list $cpu
        sleep 1
done
