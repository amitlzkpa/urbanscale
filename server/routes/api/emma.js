const router = require('express').Router();
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');


function isName(i, node) {
  let v = node.attribs.class === "genericQtipHelp";
  if (v) {
    console.log(node);
  }
  return true;
}


router.get('/id/:id', async (req, res) => {
  
  const emmaId = req.params.id;

  let url = `https://emma.msrb.org/Security/Details/${emmaId}`;
  console.log(url);

  let html = (await axios.get(url)).data;
  fs.writeFileSync('./foo.html', html.toString('utf-8'));

  let $ = await cheerio.load(html);
  let resp = '';
  let q = $('body');
  q.each((i, node) => {
    console.log(node);
    resp += node.html();
  })

  return res.send(resp);
});


module.exports = router;