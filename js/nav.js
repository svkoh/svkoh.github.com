$(document).ready(function(e) {
	$("#world").width($(window).width());
	$("#world").height($(window).height());
	var wave = new Wave();
	wave.Initialize( 'world' );
	for (var i = 0; i < 6; ++i) {
		wave.CreateBubble(undefined, undefined, 15, 30);
	}
	
	var entries = [
		{
			"name" : "文章",
			"url" : "http://koh-side.com/articles"
		},
		{
			"name" : "项目",
			"url" : "http://koh-side.com/projects"
		}
	];
	
	for(var i = 0; i < entries.length; ++i) {
		var entry = entries[i];
		wave.CreateBubble(entry.name, entry.url);
	}
});
