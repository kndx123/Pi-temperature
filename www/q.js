$(document).ready(function() {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        var i;
        var zoom = 8;
        var width = document.getElementById("myCanvas").width;
        var height = document.getElementById("myCanvas").height;
        var grd = ctx.createLinearGradient(0, 0, 0, height);
        var buffer
        // FILLSTYLE GRADIENT
        // TOP
        grd.addColorStop(0, "red");
        // BOTTOM
        grd.addColorStop(1, "black");
        ctx.fillStyle = grd;

        // PREPOPULATE BUFFER
        $("body").append("<p hidden id=\"th10\">0.00</p>");
        $.get("https://test.arturkraak.duckdns.org/", function (data){
                buffer = data.toString().split(",");

                // GENERATE TABLE HEADERS AND DRAW GRAPH
                for (i = 0; i < 10; i++) {
                        $("table").append("<th id=\"th" + i + "\">"+buffer[i]+"</th>");
                        ctx.fillRect((width / 10 * i), (height - document.getElementById("th" + i.toString()).innerHTML * zoom), (width / 10), document.getElementById("th" + i.toString()).innerHTML * zoom);
                }
        });

        // MAIN LOOP
        setInterval(function() {
                // CLEAR CANVAS
                ctx.clearRect(0, 0, width, height);

                // LOAD DATA
                 $.get("https://test.arturkraak.duckdns.org/", function (data){
                        buffer = data.toString().split(",");
                });
                document.getElementById("th10").innerHTML = buffer[buffer.length-1]

                // UPDATE TITLE
                document.title = document.getElementById("th10").innerHTML;

                // UPDATE TABLE HEADERS AND GRAPH
                for (i = 0; i < 10; i++) {
                        document.getElementById("th" + (i).toString()).innerHTML = document.getElementById("th" + (i + 1).toString()).innerHTML;
                        ctx.fillRect((width / 10 * i), (height - document.getElementById("th" + i.toString()).innerHTML * zoom), (width / 10), document.getElementById("th" + i.toString()).innerHTML * zoom);
                }
        }, 1000);
});
