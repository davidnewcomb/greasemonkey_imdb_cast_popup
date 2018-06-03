// ==UserScript==
// @name         IMDB cast popup faces
// @description  Facebook style popup for cast members
// @version      2.1
// @author       David Newcomb
// @copyright    2014+, BigSoft Limited (http://www.bigsoft.co.uk)
// @namespace    http://www.bigsoft.co.uk/
// @downloadURL  https://github.com/davidnewcomb/greasemonkey_imdb_cast_popup/master/imdb-cast-popup.user.js
// @match        https://www.imdb.com/title/tt*
// @match        https://www.imdb.com/find*
// @ match        http://localhost/imdb/find*
// @ match        http://localhost/title/tt*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @license      The MIT License; https://opensource.org/licenses/MIT
// ==/UserScript==

$(document).ready(function(){


jQuery.fn.center = function () {
	this.css("position","absolute");
	this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
			$(window).scrollTop()) + "px");
	this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
			$(window).scrollLeft()) + "px");
	return this;
}

var POPUP_WIDTH = 200;
var NO_FILM_PICTURE_URL = "http://ia.media-imdb.com/images/G/01/imdb/images/nopicture/32x44/film-3119741174._CB379391527_.png";
var NO_PROFILE_PICTURE_URL = "http://ia.media-imdb.com/images/G/01/imdb/images/nopicture/32x44/name-2138558783._CB379389446_.png";

function convert_image_url(url) {
	return url.replace(/_V1_?.*_AL_/, "_V1_UY256");
}

function make_div(obj) {

	var name = obj.attr("alt");
	if (name == null) {
		// Must be on the search page
		name = obj.parent().parent().next().first().text();
	}
	var small_image = obj.attr("src");
	if (small_image == NO_FILM_PICTURE_URL || small_image == NO_PROFILE_PICTURE_URL) {
		return null;
	}
	var new_image = convert_image_url(small_image);
	return '<h1>'+ name +'</h1><img width="'+ POPUP_WIDTH +'" src="'+ new_image + '"/>';
}

function popup_show(e) {
	var win_height = $(window).height();
			
	var str = make_div($(this));
	if (str == null) {
		return;
	}
	
	$('#imdb_popup_faces')
		.html(str)
		.center()
		.css("background-color", "white")
		.css("border-style", "solid")
		.css("padding", "0px 2px 2px 2px")
	// Safe max from
	// http://stackoverflow.com/questions/491052/mininum-and-maximum-value-of-z-index#25461690
		.css("zIndex", 16777271)
		;

	$('#imdb_popup_faces').show();
}

function popup_hide(e) {
	$('#imdb_popup_faces').hide();
	$('#imdb_popup_faces').html('');
}

$("body").append('<div id="imdb_popup_faces"></div>');



$(".primary_photo > a > img")
	.mouseover(popup_show)
	.mouseout(popup_hide)
	;


}); // ready
