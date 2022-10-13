import mysql from 'mysql2/promise';

// Error tables
// CREATE TABLE errors (time INT, protocol VARCHAR(200), error TEXT, PRIMARY KEY(time, protocol), INDEX `idx_time` (`time` ASC) VISIBLE);
// CREATE TABLE errors2 (time INT, protocol VARCHAR(200), error TEXT, storedKey VARCHAR(200), chain VARCHAR(200), PRIMARY KEY(time, protocol, storedKey), INDEX `idx_time` (`time` ASC) VISIBLE);
// CREATE TABLE completed (time INT, protocol VARCHAR(200), elapsedTime INT, storedKey VARCHAR(200), chain VARCHAR(200), PRIMARY KEY(time, protocol, storedKey), INDEX `idx_time` (`time` ASC) VISIBLE);
// CREATE TABLE timeouts (time INT, protocol VARCHAR(200), PRIMARY KEY(time, protocol), INDEX `idx_time` (`time` ASC) VISIBLE);
// CREATE TABLE staleCoins (time INT, address VARCHAR(500), lastUpdate INT, chain VARCHAR(200), symbol VARCHAR(200), PRIMARY KEY(time, address, chain), INDEX `idx_time` (`time` ASC) VISIBLE);
// CREATE TABLE staleCoins2 (time INT, address VARCHAR(500), lastUpdate INT, chain VARCHAR(200), symbol VARCHAR(200), tvlAffected INT, PRIMARY KEY(time, address, chain), INDEX `idx_time` (`time` ASC) VISIBLE);
// CREATE TABLE droppedCoins (time INT, protocol VARCHAR(200), tokenTvl INT, chain VARCHAR(200), symbol VARCHAR(200), PRIMARY KEY(time, protocol, chain, symbol), INDEX `idx_time` (`time` ASC) VISIBLE);

const connection = mysql.createPool({
  host: 'error-logs.cluster-cz3l9ki794cf.eu-central-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  database: 'content',
  password: process.env.INFLUXDB_TOKEN,
  waitForConnections: true,
  connectionLimit: 1,
});

export function execute(sql: string, values: any){
  return connection.execute(sql, values)
}

export function executeAndIgnoreErrors(sql: string, values: any){
    return connection.execute(sql, values)
    .catch(e => console.log("mysql error", e));
}