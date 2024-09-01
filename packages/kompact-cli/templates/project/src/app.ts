import { KompactApp } from 'kompact';
import { MainController, BookController } from './controllers';

const PORT = 3002;

async function main() {
  const app = new KompactApp({
    controllers: [MainController, BookController],
  });

  /*
    // will be custom these param, don't hard code anymore
    this.app.use(helmet()); // help secure Express apps by setting HTTP response headers.
    this.app.use(compression()); 
  */

  app.start(PORT, () => {
    console.log(`running at ${PORT}`);
  });
}

main();
