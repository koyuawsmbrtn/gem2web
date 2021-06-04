$(document).ready(function() {
    //Initial variables
    var widgetcount = 0;
    // Back link
    if (location.href.includes(".gmi") && !location.href.includes("index.gmi")) {
        $("body").prepend("<p id=\"backlink\"><a href=\"javascript:history.back();\">&larr; Back to front page</a><p><br>");
    }
    //Parse Twemoji
    $("body").html(twemoji.parse($("body").html()));
    //Open http links in new tab
    $("body").html($("body").html().replaceAll("href=\"https://", "target=\"_blank\" href=\"https://"));
    //Display inline-images
    $('a[href*=".jpg"]').each(function() {
        $(this).html("<img src=\""+$(this).attr("href")+"\" width=\"300\">");
        $(this).attr("target", "_blank");
    });
    $('a[href*=".png"]').each(function() {
        var width = "300";
        //Fix for my selfie
        if ($(this).attr("href") === "me.png") {
            width = 200;
        }
        $(this).html("<img src=\""+$(this).attr("href")+"\" width=\""+width+"\" alt=\""+$(this).html()+"\" title=\""+$(this).html()+"\">");
        $(this).attr("target", "_blank");
    });
    //Article metadata below article title
    $("body").html($("body").html().replaceAll("<p>Posted on ", "<p class=\"published\">Posted on "));
    //Table of Contents
    //Taken from https://medium.com/codefile/an-automatic-table-of-contents-generator-in-javascript-3f56220c9397
    toc = document.getElementById("toc");
    tocHeader = document.createElement("h1");
    tocHeader.innerText="Table of Contents";
    var tocList = document.createElement("ul");
    toc.appendChild(tocHeader);
    var headers = document.getElementsByTagName("h2");
    for (i = 0; i < headers.length; i++){
        var name = "h"+i;
        headers[i].id=name;
        tocListItem = document.createElement("li");
        var tocEntry = document.createElement("a");
        tocEntry.setAttribute("href","#"+name);
        tocEntry.innerText=headers[i].innerText;
        tocListItem.appendChild(tocEntry);
        tocList.appendChild(tocListItem);
    }
    toc.appendChild(tocList);
    //Widgets logic
    if (headers.length > 0) {
        widgetcount = 1;
    }
    if (widgetcount === 0) {
        $("#widgets").hide();
    }
    //Scroll to page after ToC has been loaded
    window.setTimeout(function() {
        try {
            document.getElementById(location.href.split("#")[1]).scrollIntoView();
        } catch (e) {}
    }, 1000);
});