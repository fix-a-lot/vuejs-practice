module.exports = {
  printGetRequestInfo: (req) => {
    console.log(getGreetingMessage());
    console.log('req.method:', req.method);
    console.log('req.baseUrl:', req.baseUrl)
    console.log('req.path:', req.path)
    console.log('req.query:', req.query);
    // console.log('req.params:', req.params);
    // console.log('req.route:', req.route);
  },
  printPostRequestInfo: (req) => {
    console.log(getGreetingMessage());
    console.log('req.method:', req.method);
    console.log('req.baseUrl:', req.baseUrl)
    console.log('req.path:', req.path)
    console.log('req.query:', req.query);
    console.log('req.body:', req.body);
    // console.log('req.params:', req.params);
    // console.log('req.route:', req.route);
  }
};

function getGreetingMessage() {
  return `------ NEW REQUEST ARRIVED! (${new Date().toString()}) ------`;
}