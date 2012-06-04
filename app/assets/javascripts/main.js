/**
 * Function to obtain the relative route of the url after the domain name
 * @param		url		string			url to find the route from
 * @return				array[string]	relative route pieces
 */ 
function getRelativeRoute(url) {

	var route = url.split(document.location.host)[1];
	
	route = route.replace(/(^\/*)|(\/*$)/g, '');

	route = route.split('/');
	
	if (route[0] == "") {
		return new Array();
	} else {
		return route;
	}
}

/**
 * Function capitalize the first character of a string
 * @param		url		string			string to capitalize the first character of
 * @return				string			string with capitalized first character
 */
function ucfirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Makes an AJAX POST request according to rails RESTful api
 * @param		url		string			url to request
 * @param		model	string			model name, used for rails RESTful formatting of data
 * @param		data	string			data to send to server 
 */
function ajaxPost(url, model, data) {
	var postData = {};
	postData[model] = data;

	$.ajax({
		type : 'POST',
		url : url,
		dataType : 'json',
		data : postData,
		success : function( data ) {
			console.log(data);
		},
		error : function( data ) {
			console.log(data);
		}
	});
}