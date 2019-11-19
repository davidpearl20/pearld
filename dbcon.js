var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_pearld',
  password        : '3329',
  database        : 'cs290_pearld'
});

module.exports.pool = pool;
