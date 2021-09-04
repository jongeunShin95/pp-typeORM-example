import express from 'express';
 
const app = express();

app.use(express.urlencoded({
  extended: true
}));
 
app.get('/api/hello', (req, res) => {
  res.send('hello world');
});
 
app.listen(8080, () => {
  console.log('server is listening 8080');
});