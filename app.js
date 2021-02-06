const http = require('http')
const port = 3000

const redis = require('redis')
const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379
})

client.on('error', err => {
    console.log('Error ' + err)
})

const server = http.createServer(function(req, res) {
	client.get('cpu', (err, reply) => {
        if (err) throw err
        res.write(reply)
    	res.end()
	})
})

server.listen(port, function(error){
	if(error) {
		console.log("err: ", error)
	} else {
		console.log("Server is listening on port "+ port)
	}
})
