module.exports = () => {
  const mysql=require('mysql');
  let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin123',
    database:'node_vue_moba',
    //想要存入emoji就必须设置这个
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  })
  connection.connect();
  return connection;
}