import { KompactApp } from 'kompact'
import { MainController, BookController } from './controllers'


const PORT = 3002

async function main() {
  const app = new KompactApp({
    controllers: [MainController, BookController],
  })
  
  app.start(PORT, () => {
    console.log(`running at ${PORT}`)
  })  
}

main()