module.exports = {
  "type": "postgres",
  "host": process.env.HOST_BBDD || "localhost",
  "port": process.env.PORT_BBDD || 5432,
  "username": process.env.USER_BBDD || "root",
  "password": process.env.PASSWORD_BBDD || "admin",
  "database": process.env.DATABASE_BBDD || "mydatabase",
  "synchronize": false,
  "logging": true,
  "entities": [
    "./src/models/*.ts"
  ],
  "migrations": [
    "./src/database/migrations/*.ts"
  ],
  "subscribers": [
     "common/subscriber/**/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
