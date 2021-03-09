#!/usr/bin/env node

const http = require('http')
const port = 3001
var temp_arr
const redis = require('redis')
const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379
})

client.on('error', err => {
    console.log('Error ' + err)
})

const { exec } = require('child_process');

exec('./temp.sh', (error, stdout, stderr) => {
  if (error) {
    console.error(`error: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout:\n${stdout}`);
});

const server = http.createServer(function(req, res) {
        client.lrange('my_list', 0, -1, (err, reply) => {
        if (err) throw err
        temp_arr = reply.toString().split(",")
        res.end(temp_arr.toString())
        })
})

server.listen(port, function(error){
        if(error) {
                console.log("err: ", error)
        } else {
                console.log("Server is listening on port "+ port)
        }
})
