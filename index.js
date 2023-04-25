const request = require("request");
const cheerio = require("cheerio");
const app = require("express")();
const express = require("express");

app.set("view engine", "ejs");
app.use(express.static("public"));

let linksarr = [];
let tilte = [];
let NoticeDate = [];
request("https://adgitmdelhi.ac.in/notice/", (err, res, html) => {
  linksarr = [];
  if (err) console.log("Error", err);
  else {
    let $ = cheerio.load(html);
    let h1s = $(".post-content>a");
    let time = $(".post-content>time");
    for (let i = 0; i < h1s.length; i++) {
      linksarr.push(h1s[i].attribs.href);
      tilte.push(h1s[i].children[0].data);
      NoticeDate.push(time[i].attribs.datetime.slice(0, 10));
    }
    // console.log(NoticeDate);
  }
});
// console.log(tilte);

app.get("/", (req, res) => {
  res.render("home", { links: linksarr, title: tilte, Dates: NoticeDate });
});

app.listen(process.env.PORT || 5500, () => {
  console.log("ok");
});
