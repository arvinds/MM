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

function ucfirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
