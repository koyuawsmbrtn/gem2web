#!/bin/python3
import ignition
from markdown import markdown
from bottle import * # pylint: disable=unused-wildcard-import

rooturl = "//koyu.space/web/"

@route("/")
def index():
    rep = str(ignition.request(rooturl))
    body = "\n".join(rep.split("\n")[1:])
    lines = body.split("\n")
    parsedmd = ""
    for e in lines:
        if e.startswith("=>"):
            link = e.replace("=> ", "").split(" ")[0]
            text = " ".join(e.replace("=> ", "").split(" ")[1:])
            parsedmd += "["+text+"]("+link+")"+"\n"
        else:
            parsedmd += e+"\n"
    parsedhtml = str(markdown(parsedmd))
    htmlines = parsedhtml.split("\n")
    html = ""
    for eh in htmlines:
        if not "code>" in eh and not "<h" in eh and not "</h" in eh and not "ul>" in eh and not "li>" in eh:
            html += "<p>"+eh+"</p>\n"
        else:
            html += eh+"\n"
    html = html.replace("<p><code>", "<code>").replace("</code></p>", "</code>").replace("<p><p>", "<p>").replace("</p></p>", "</p>").replace("gemini://koyu.space/rockshow/", "https://tilde.club/~koyu/")
    f = open("head.txt", "r")
    head = f.read()
    f.close()
    f = open("tail.txt", "r")
    tail = f.read()
    f.close()
    html = head+html+tail
    return html

@route("/<url:re:.+>")
def defr(url):
    req = ignition.request(rooturl+url)
    try:
        rep = str(req.data())
        mime = str(req).split("\n")[0].split(" ")[1].split(";")[0]
    except:
        mime = "text/plain"
        images = [".jpg", ".png", ".gif", ".ico"]
        for i in images:
            if i in str(req.url):
                mime = "image/"+url.split(".")[1]
        if "ogg" in str(req.url):
            mime = "audio/ogg"
        if "mp3" in str(req.url):
            mime = "audio/mpeg"
    if mime == "text/gemini":
        body = rep
        lines = body.split("\n")
        parsedmd = ""
        for e in lines:
            if e.startswith("=>"):
                link = e.replace("=> ", "").split(" ")[0]
                text = " ".join(e.replace("=> ", "").split(" ")[1:])
                parsedmd += "["+text+"]("+link+")"+"\n"
            else:
                parsedmd += e+"\n"
        parsedhtml = str(markdown(parsedmd))
        htmlines = parsedhtml.split("\n")
        html = ""
        for eh in htmlines:
            if not "code>" in eh and not "<h" in eh and not "</h" in eh and not "ul>" in eh and not "li>" in eh:
                html += "<p>"+eh+"</p>\n"
            else:
                html += eh+"\n"
        html = html.replace("<p><code>", "<code>").replace("</code></p>", "</code>").replace("<p><p>", "<p>").replace("</p></p>", "</p>")
        f = open("head.txt", "r")
        head = f.read()
        f.close()
        f = open("tail.txt", "r")
        tail = f.read()
        f.close()
        html = head+html+tail
        return html
    else:
        if mime.startswith("text"):
            rep = str(req.data())
            mime = str(req).split("\n")[0].split(" ")[1].split(";")[0]
            response.content_type = mime+";charset=utf-8"
            return req.raw_body
        else:
            response.content_type = mime
            return req.raw_body

run(host="127.0.0.1", port=1968, server="tornado")