const express = require('express');
const utils = require('./utils')

// express 도움말: https://expressjs.com/ko/4x/api.html
const app = express();
const port = 9999;
const webroot = __dirname + '/public';

// 포트 리스닝
app.listen(port, () => {
  console.log('Server is listening at http://localhost:' + `${port}`);
});

// 무쓸모
/* 
app.get('/', (req, res) => {
  // console.debug('Requesting index page');
  res.redirect('/index.html')
});
 */

app.use(express.static(webroot));

// express.static() 있어서 없어도 됨
/* 
app.get('*', (req, res) => {
  res.sendFile(req.path, { root: webroot })
});
 */

// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })) 

app.all('*', (req, res, next) => {
  req.method == 'GET' ? utils.printGetRequestInfo(req) : utils.printPostRequestInfo(req);
  next();
});

// 여기까지 앱 기본 설정

app.all('/return-headers.data', (req, res) => {
  res.json(req.headers);
});

app.get('/error500.data', (req, res) => {
  res.status(500).send('Something broke!');
});

app.get('/success.data', (req, res) => {
  res.set('Content-Type', 'text/html').end('Everything is okay'); 
  // res.end()는 res.status(200).end()와 같음
});

app.post('/success.data', (req, res) => {
  res.set('Content-Type', 'text/html').end('Everything is okay'); 
});

app.get('/success-json.data', (req, res) => {
  res.set('Content-Type', 'application/json').json({ message: 'Everything is okay' }); 
});

app.post('/success-json.data', (req, res) => {
  res.set('Content-Type', 'application/json').json({ message: 'Everything is okay' }); 
});

app.get('/uncategorized/*.data', (req, res) => {
  res.json(req.query); // 데이터를 응답할 땐 res.send() 혹은 res.json()
});

app.post('/uncategorized/*.data', (req, res) => {
  res.json(req.query);
});

app.post('/get-my-request-body.data', (req, res) => {
  res.json(req.body);
});

app.get('/read-grid.data', (req, res) => {
  let gridData = [
    { name: "Beautiful Lies", artist: "Birdy", type: "Deluxe", release: "2016.03.26", genre: "Pop" },
    { name: "X", artist: "Ed Sheeran", type: "Deluxe", release: "2014.06.24", genre: "Pop" },
    { name: "Moves Like Jagger", artist: "Maroon5", type: "Single", release: "2011.08.08", genre: "Pop,Rock" },
    { name: "A Head Full Of Dreams", artist: "Coldplay", type: "Deluxe", release: "2015.12.04", genre: "Rock" },
    { name: "21", artist: "Adele", type: "Deluxe", release: "2011.01.21", genre: "Pop,R&B" },
    { name: "Warm On A Cold Night", artist: "HONNE", type: "EP", release: "2016.07.22", genre: "R&B,Electronic" },
    { name: "Take Me To The Alley", artist: "Gregory Porter", type: "Deluxe", release: "2016.09.02", genre: "Jazz", },
    { name: "Make Out", artist: "LANY", type: "EP", release: "2015.12.11", genre: "Electronic" },
    { name: "Get Lucky", artist: "Daft Punk", type: "Single", release: "2013.04.23", genre: "Pop,Funk" },
    { name: "Valtari", artist: "Sigur Rós", type: "EP", release: "2012.05.31", genre: "Rock" },
    { name: "Bush", artist: "Snoop Dogg", type: "EP", release: "2015.05.12", genre: "Hiphop" },
    { name: "2", artist: "Beyoncé", type: "Deluxe", release: "2011.07.26", genre: "Pop" },
    { name: "I Won't Give Up", artist: "Jason Mraz", type: "Single", release: "2012.01.03", genre: "Pop" },
    { name: "Following My Intuition", artist: "Craig David", type: "Deluxe", release: "2016.10.01", genre: "R&B,Electronic" },
    { name: "Blue Skies", artist: "Lenka", type: "Single", release: "2015.03.18", genre: "Pop,Rock" },
    { name: "This Is Acting", artist: "Sia", type: "EP", release: "2016.10.22", genre: "Pop" },
    { name: "Blurryface", artist: "Twenty One Pilots", type: "EP", release: "2015.05.19", genre: "Rock" },
    { name: "I'm Not The Only One", artist: "Sam Smith", type: "Single", release: "2014.09.15", genre: "Pop,R&B" },
    { name: "The Magic Whip", artist: "Blur", type: "EP", release: "2015.04.27", genre: "Rock" },
    { name: "Chaos And The Calm", artist: "James Bay", type: "EP", release: "2015.03.23", genre: "Pop,Rock" },
  ];
  let gridResponse = {
    result: true,
    data: {
      contents: gridData,
      pagination: {
        page: req.query.page,
        totalCount: 100
      }
    }
  };
  res.json(gridResponse);
});