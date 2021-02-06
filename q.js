$(document).ready(function() {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	var i;
	var zoom = 8;
	var width = document.getElementById("myCanvas").width;
	var height = document.getElementById("myCanvas").height;
	var grd = ctx.createLinearGradient(0, 0, 0, height);

	// FILLSTYLE GRADIENT
	// TOP
	grd.addColorStop(0, "red");
	// BOTTOM
	grd.addColorStop(1, "black");
	ctx.fillStyle = grd;

	// GENERATE TABLE HEADERS
	for (i = 0; i < 10; i++) {
		$("table").append("<th id=\"p" + i + "\">0.00</th>");
	}
	$("table").append("<th hidden id=\"p10\">0.00</th>");

	// MAIN LOOP
	setInterval(function() {
		// CLEAR CANVAS
		ctx.clearRect(0, 0, width, height);

		// LOAD DATA
		$("#p10").load("https://no.arturkraak.duckdns.org/");

		// MOVE DATA
		for (i = 0; i < 10; i++) {
			document.getElementById("p" + (i).toString()).innerHTML = document.getElementById("p" + (i + 1).toString()).innerHTML;
		}

		// TITLE
		document.title = document.getElementById("p9").innerHTML;

		// DRAW
		for (i = 0; i < 10; i++) {
			ctx.fillRect((width / 10 * i), (height - document.getElementById("p" + i.toString()).innerHTML * zoom), (width / 10), document.getElementById("p" + i.toString()).innerHTML * zoom);
		}
	}, 1000);
});
