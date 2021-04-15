
/* CUSTOMIZATION PARAMETERS */
const API_BASE_URL = "https://spaceflightnewsapi.net/api/v2/articles/";
const API_REQ_BY_PAGE = 6;

							 //                \./
const PAGINATION_OFFSET = 2; // [Prev] [1] [2] [3] [4] [5] [Next]
							 //        < off >     < off >
var currentPage = 0


function generatePaginationItem(dispName, page, isActive, isEnabled) {
	var html = '';

	if (isActive)
		html += '<li class="page-item active">';
	else if (isEnabled)
		html += '<li class="page-item">';
	else
		html += '<li class="page-item disabled">';

	html += '<a class="page-link" href="javascript:void(0);" onclick="loadArticles(' + page + ');">';
	html += dispName;
	html += '</a></li>';
	return html;
}

function loadArticles(page) {

	var xmlhttp = new XMLHttpRequest();
	url = API_BASE_URL + "?_limit=" + API_REQ_BY_PAGE + "&_start=" + page * API_REQ_BY_PAGE;
	xmlhttp.open("GET", url, true);
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
			var articles = JSON.parse(xmlhttp.responseText);

			var articlesHtml = '';
			for (i = 0; i < articles.length; i++)
			articlesHtml += '<div class="col-lg-4 col-md-6 col-sm-12">' +
							'<h3 class="feature-title"><a href="' + articles[i].url + '">' + articles[i].title + '</a></h3>' +
							'<img src="' + articles[i].imageUrl + '" class="img-fluid">' +
							'<p>' + articles[i].summary + '</p>' +
							'</div>';

			document.getElementById("articles-data").innerHTML = articlesHtml;

			var paginationHtml = '';
			if (page == 0)
				paginationHtml += generatePaginationItem("Previous", page - 1, false, false);
			else
				paginationHtml += generatePaginationItem("Previous", page - 1, false, true);

			for (i = -PAGINATION_OFFSET; i < PAGINATION_OFFSET + 1; i++)
				if (page + i >= 0)
					paginationHtml += generatePaginationItem(page + i + 1, page + i, i == 0, true);

			paginationHtml += generatePaginationItem("Next", page + 1, false, true);

			document.getElementById("pagination-data").innerHTML = paginationHtml;
			currentPage = page;
		}
	}
	xmlhttp.send();
}

window.onload = function() {
	loadArticles(currentPage);

	$( ".datepicker" ).datepicker({
		dateFormat: 'yy-mm-dd',
	});
};


// set modal time delay before loading

//setTimeout(function() {
//	$('#demo-modal').modal();
//}, 500);