let express = require('express');
let router = express.Router();
//var data = [{string: 'himawan', integer: '30', float: '29.6', date: '2018-02-13', boolean: 'true'}];
let fs = require("fs");
let path = require("path");
let data = JSON.parse(fs.readFileSync(path.join(__dirname, '../database/data.json'), 'utf8'));
const writeData = (data) => {
  fs.writeFile(path.join(__dirname, '../database/data.json'), JSON.stringify(data, null, 3), 'utf-8');
};

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    data
  });
});

router.get('/add', function (req, res, next) {
  res.render('add');
});

router.post('/add', function (req, res) {
  data.push({
    string: req.body.string,
    integer: parseInt(req.body.integer),
    float: parseInt(req.body.float),
    date: req.body.date,
    boolean: JSON.parse(req.body.boolean)
  });
  writeData(data);
  res.redirect('/');
})

router.get('/edit/:id', function (req, res, next) {
  let id = req.params.id;
  res.render('edit', {
    item: data[id],
    id: id
  })
});

router.post('/edit/:id', function (req, res, next) {
  let id = req.params.id;
  data[id] = {
    string: req.body.string,
    integer: parseInt(req.body.integer),
    float: parseInt(req.body.float),
    date: req.body.date,
    boolean: JSON.parse(req.body.boolean)
  };
  writeData(data);
  res.redirect('/');
});

router.get('/delete/:id', function (req, res, next) {
  let id = req.params.id;
  data.splice(id, 1);
  writeData(data);
  res.redirect('/');
});

module.exports = router;