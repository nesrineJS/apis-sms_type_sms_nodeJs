const env = {
    database: process.env.DB_NAME ,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host:process.env.DB_HOST ,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = env;
