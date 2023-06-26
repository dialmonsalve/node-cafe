import express, { Application } from 'express';
import cors from 'cors';

import { dbConnection } from '../database/config';
import users from '../routes/users';
import auth from '../routes/auth';
import categories from '../routes/categories';
import products from '../routes/products';
import search from '../routes/search';
import { IRoutes } from '../utilities/types';

class Server {

  private app: Application;
  private port: string | undefined;
  private paths: IRoutes;


  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      users: '/api/users',
      products: '/api/products',
      search:'/api/search'
    }


    this.connectDB();

    //Middleware
    this.middleware();


    //App Routs
    this.routes()
  }

  async connectDB() {
    await dbConnection();
  }

  middleware() {

    // Cors
    this.app.use(cors());

    // Read and Parse the body
    this.app.use(express.json())

    this.app.use(express.static('public'));
  }

  routes() {

    this.app.use(this.paths.auth, auth);
    this.app.use(this.paths.users, users);
    this.app.use(this.paths.categories, categories);
    this.app.use(this.paths.products, products);
    this.app.use(this.paths.search, search);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Running in port', this.port);

    })
  }

}


export default Server