const request = require('request');
const cheerio = require('cheerio');
const app = require('express')();
const express = require('express');

app.set("view engine", 'ejs');
app.use(express.static('public'));


let linksarr = [];
let tilte = [];
request("https://adgitmdelhi.ac.in/notice/", (err, res, html) => {
    linksarr = [];
    if (err)
        console.log("Error", err);
    else {
        let $ = cheerio.load(html);
        let h1s = $(".post-content>a");
        for (let i = 0; i < h1s.length; i++) {
            linksarr.push(h1s[i].attribs.href);
            tilte.push(h1s[i].children[0].data);
        }
        console.log(h1s[0].attribs.href);
    }
});
// console.log(tilte);

app.get('/', (req, res) => {
    res.render('home', { links: linksarr, title: tilte, colour: Math.floor((Math.random() * 3) + 1) });
});

app.listen(process.env.PORT || 5500, () => {
    console.log("ok");
});