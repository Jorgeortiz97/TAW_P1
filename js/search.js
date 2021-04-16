
function search() {

	let title    = document.getElementById("title").value,
		summary  = document.getElementById("summary").value,
		before   = document.getElementById("before").value,
		after    = document.getElementById("after").value,
		featured = document.getElementById("featured").checked;

	var query = "";

	if (title)
		query += "&title_contains=" + title;
	if (summary)
		query += "&summary_contains=" + summary;
	if (before)
		query += "&publishedAt_lt=" + before;
	if (after)
		query += "&publishedAt_gt=" + after;
	if (featured)
		query += "&featured=true";

	loadArticles({query: query, showToast: true})
}


window.onload = function() {
	$( ".datepicker" ).datepicker({
		dateFormat: 'yy-mm-dd',
	});

	document.getElementById("searchBtn").onclick = search;
};


