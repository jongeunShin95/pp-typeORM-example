import express from 'express';
import router from './router';
import { createConnection } from 'typeorm';
 
const app = express();

app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());
app.use('/api', router);
 
createConnection().then(connection => {
  app.listen(8080, () => {
    console.log('server is listening 8080');
  });
});