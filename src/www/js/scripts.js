var Util = new Object();


Util.over = function(element, targetElement) {
	if(targetElement == undefined) {
		if(!element.initiated){
			element.onmouseout = function() {
				Util.out(this);
			}
			element.initiated = true;
		}
		element.firstChild.src = element.firstChild.src.replace(/\./g, "_sel.");
	}
	else {
		if(!element.initiated){
			element.onmouseout = function() {
				Util.out(this, targetElement);
			}
			element.initiated = true;
		}
		targetElement.className += targetElement.className ? " selected" : "selected";
	}
}

Util.out = function(element, targetElement) {
	if(targetElement == undefined) {
		element.firstChild.src = element.firstChild.src.replace(/_sel/g, "");
	}
	else {
		targetElement.className = targetElement.className.replace(/ selected|selected |selected/g, "");
	}
}

Util.noScriptLink = function(action, image, alt) {
	document.write('<a href="'+action+'" onmouseover="Util.over(this);"><img src="'+image+'" alt="'+alt+'" /></a>');
}

Util.listOver = function(element) {
	element.className += element.className ? " over" : "over";
	if(!element.initiated){
		element.onmouseout = function() {
			Util.listOut(this);
		}
		element.initiated = true;
	}
}
Util.listOut = function(element) {
	element.className = element.className.replace(/ over|over |over/g, "");
}
Util.listCheck = function(element, event) {
	event = event ? event : window.event;
	var i, input, inputs;
	if(element.nodeName.toLowerCase() == "input" && element.type == "checkbox") {
		inputs = new Array();
		inputs[0] = element;
	}
	else {
		inputs = element.getElementsByTagName("input");
	}
	for(i = 0; input = inputs[i]; i++) {
		if(input.type == "checkbox") {
			if(input.checkValue) {
				input.checkValue = false;
				input.checked = false;
			}
			else {
				input.checkValue = true;
				input.checked = true;
			}
		}
	}

}
Util.showLargerThumb = function(element) {
	if(!element.initiated){
		var i, thumbs, thumb;
		thumbs = element.parentNode.getElementsByTagName("div");
		for(i = 0; thumb = thumbs[i]; i++) {
			if(thumb.className == "largerThumb") {
				element.thumb = thumb;
				element.onmouseout = function() {
					Util.hideLargerThumb(this);
				}
				element.initiated = true;
			}
		}

	}

	element.thumb.style.left = Util.absoluteLeft(element) + 52 + 'px';
	element.thumb.style.top = Util.absoluteTop(element) + 'px';
	element.thumb.className += element.thumb.className ? " show" : "show";
}
Util.hideLargerThumb = function(element) {
	element.thumb.className = element.thumb.className.replace(/ show|show |show/g, "");
}
Util.showLargerQuestionaireThumb = function(element) {
	if(!element.initiated){
		var i, thumbs, thumb;
		thumbs = element.parentNode.getElementsByTagName("div");
		for(i = 0; thumb = thumbs[i]; i++) {
			if(thumb.className == "largerThumb") {
				element.thumb = thumb;
				element.onmouseout = function() {
					Util.hideLargerThumb(this);
				}
				element.initiated = true;
			}
		}

	}

	element.thumb.style.left = Util.absoluteLeft(element) - 250 + 'px';
	element.thumb.style.top = Util.absoluteTop(element) + 8 + 'px';
	element.thumb.className += element.thumb.className ? " show" : "show";
}

// Get absolute left position
Util.absoluteLeft = function(element) {
	if(Util.safari() && element.nodeName == "TR") {
		return element.getElementsByTagName("TD")[0].offsetLeft + Util.absoluteLeft(Util.getParentTag("TABLE", element));
	}
	else if(element.offsetParent) {
		return element.offsetLeft + Util.absoluteLeft(element.offsetParent);
	}
	return element.offsetLeft;
} 
// Get absolute top position
Util.absoluteTop = function(element) {
	if(Util.safari() && element.nodeName == "TR") {
		return element.getElementsByTagName("TD")[0].offsetTop + Util.absoluteTop(Util.getParentTag("TABLE", element));
	}
	else if(element.offsetParent) {
		return element.offsetTop + Util.absoluteTop(element.offsetParent);
	}
	return element.offsetTop;
}
Util.explorer = function() {
	return (document.all) ? true : false;
}
Util.safari = function() {
	return (navigator.appVersion.indexOf("Safari") >= 0) ? true : false;
}
Util.firefox = function() {
	return (navigator.userAgent.indexOf("Firefox") >= 0) ? true : false;
}
Util.opera = function() {
	return (navigator.userAgent.indexOf("Opera") >= 0) ? true : false;
}
// Returns the first parent occurence of tag
Util.getParentTag = function(tag, element) {
	if(element.nodeName != tag && element.nodeName != "BODY") {
		element = Util.getParentTag(tag, element.parentNode);
	} 
	return element;
}
Util.nonClick = function(event){
	event = event ? event : window.event;
	if(event.preventDefault){event.preventDefault();}
	if(event.stopPropagation){event.stopPropagation();}
	event.returnValue = false;
	event.cancelBubble = true;
}
