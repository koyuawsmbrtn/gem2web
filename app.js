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
    //Page title
    var title = $("h1").html();
    if (location.href.includes(".gmi")) {
        document.title = title+" – "+document.title;
    }
    //Table of Contents
    //Taken from https://medium.com/codefile/an-automatic-table-of-contents-generator-in-javascript-3f56220c9397
    menu = document.getElementById("menu");
    menuHeader = document.createElement("h1");
    menuHeader.innerText="Menu";
    var menuList = document.createElement("ul");
    menu.appendChild(menuHeader);
    var headers = document.getElementsByTagName("h2");
    for (i = 0; i < headers.length; i++){
        var name = "h"+i;
        headers[i].id=name;
        menuListItem = document.createElement("li");
        var menuEntry = document.createElement("a");
        menuEntry.setAttribute("href","#"+name);
        menuEntry.innerText=headers[i].innerText;
        menuListItem.appendChild(menuEntry);
        menuList.appendChild(menuListItem);
    }
    menu.appendChild(menuList);
    //Widgets logic
    if (headers.length > 0) {
        widgetcount = 1;
    }
    if (widgetcount === 0) {
        $("#widgets").hide();
    }
    //Scroll to page after menu has been loaded
    window.setTimeout(function() {
        try {
            document.getElementById(location.href.split("#")[1]).scrollIntoView();
        } catch (e) {}
    }, 1000);
});