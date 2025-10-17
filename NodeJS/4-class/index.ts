import dotenv from 'dotenv';
import app from './src/server';

dotenv.config({
    path: '../../.env'
});

const port:number = parseInt(process.env.PORT || '', 10) || 3001;

app.listen(port, () => {
  console.log('[Contacts API]: Running over port => ' + port)
})