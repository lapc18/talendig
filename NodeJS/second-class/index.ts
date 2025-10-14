import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const MOCK_LOGING_DATA = {
  username: 'talendig',
  pwd: '123456'
}

const MY_KEY: string = "talendig-nodejs-superclass-xd";
// const MY_KEY: string | undefined = process.env["JWT_KEY"];

const app = express();

const WHITELIST:string[] = [
  'localhost',
  'google.com',
  'talendig.com'
]

app.use(express.json());


const myCustomCors = cors({
  origin: (origin, callback) => {
    if(WHITELIST.includes(origin || '')) callback(null);
    else callback({ message: 'Origin not allowed', name: 'CORS'  })
  }
});

// Middleware
const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header: string = req.headers['authorization'] || 'none';

  console.log('here we go...')

  if (header && header.includes('Bearer ') && header.length > 7) {
    console.log('here we go... token found')
    try {
      const token: string = header.split(' ')[1]!;
      const decoded = jwt.verify(token, MY_KEY);

      const { user, role } = decoded as any;

      console.log(user, role)
      console.log('here we go... token:', token)
      next();
    } catch (err) {
      console.error('wey, hay algo fallando...', err);
      res.status(403).json({ message: `U'te e un palomo... Ruede` });
    }
  }

  return;
}

//Authorization
app.get("/health", jwtMiddleware, myCustomCors, (req, res) => {
  const { method, url, headers, body } = req;

  console.log("Request Details:", { method, url, headers, body });

  return res.status(200).send({
    status: "OK",
    timestamp: new Date().toISOString(),
    body: {
      message: `
        Server is healthy and running.
            AND
        E'to e una prueba de la mejol clase de node'
        `,
    },
  });
});

//Authentication
app.post('/login', (req, res) => {
  const { user, password } = req.body;

  console.log('My Key: ', MY_KEY)

  if (user && (user as string).includes(MOCK_LOGING_DATA.username)) {
    if (password && (password as string).includes(MOCK_LOGING_DATA.pwd)) {
      console.log('congrats! you are logged in');

      // Roles: admin | teacher | student

      const token = jwt.sign({ user, role: 'student' }, MY_KEY, { expiresIn: "1h" });

      res.status(200).json({ jwt: token })
      return;
    }
  }

  res.status(401).json({ message: 'No user found...' })
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  // send a email or notification here
  // craate a file for cron services...
  // whatever you want
});
