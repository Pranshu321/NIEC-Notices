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
        let h1s = $(".project-odd>div>h3>a");
        for (let i = 0; i < h1s.length; i++) {
            linksarr.push(h1s[i].attributes[0].value);
            tilte.push(h1s[i].attributes[1].value)
        }
    }
});

app.get('/', (req, res) => {
    res.render('home', { links: linksarr, title: tilte, colour: Math.floor((Math.random() * 3) + 1) });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("ok");
});