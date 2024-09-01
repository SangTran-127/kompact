// import pg, { type ConnectionConfig } from 'pg'
// import { type MongoDBConfig, MongooseClient } from './client/mongoose-client'

// const { Client: PgClient } = pg

// type DatabaseType = 'mongodb' | 'pg'

// type DatabaseConfig = {
//   mongodb: MongoDBConfig
//   pg: ConnectionConfig
// }

// export class DatabaseConnector<
//   T extends DatabaseType = 'mongodb',
//   V extends DatabaseConfig[T] = DatabaseConfig['mongodb'],
// > {
//   public client
//   constructor(
//     private readonly type: T,
//     private readonly config: V,
//   ) {
//     if (this.type === 'pg') {
//       this.client = new PgClient(this.config as DatabaseConfig['pg'])
//     } else if (type === 'mongodb') {
//       const config = this.config as DatabaseConfig['mongodb']
//       this.client = new MongooseClient(config.uri, config.connectOptions)
//     }
//   }

//   public async connect(): Promise<void> {
//     if (!this.client) {
//       throw new Error('Cannot create db')
//     }
//     await this.client.connect()
//   }
// }
