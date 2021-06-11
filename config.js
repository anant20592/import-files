const config = {
    development: {
      port: "3000",
      db: {
        url: "mongodb+srv://anant1:Admin@cluster553.oap06.gcp.mongodb.net/test",
        dbName : 'test'
      }
    },
    test: {
      port: "3000",
      db: {
        url: "mongodb+srv://anant1:Admin@cluster553.oap06.gcp.mongodb.net/test",
        dbName : 'test'
      }
    },
    production: {
      port: "3000",
      db: {
        url: "mongodb+srv://anant1:Admin@cluster553.oap06.gcp.mongodb.net/test",
        dbName : 'test'
      }
    },
  };
  
  const NODE_ENV = process.env.NODE_ENV || "development";
  const environment = config[NODE_ENV];
  config.port = environment.port;
  config.db_config = environment.db;
  config.NODE_ENV = NODE_ENV;
  module.exports = config;