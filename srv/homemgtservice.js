module.exports = cds.service.impl(async function(){
var db;
  this.before('*', '*', async req => {
    if (process.env.flag === 'X') {
        db = await cds.connect.to('db_emp');
    } else {
        db = await cds.connect.to('db_sup');
    }
    console.log("My DB  connection -" + JSON.stringify(db));
  });

  
  this.on('READ', '*', async req => {
    console.log("My DB  connection -" + JSON.stringify(db)); 
    return db.run(req.query)
  });

  this.on('CREATE', '*', async req => {
    console.log("My DB  connection -" + JSON.stringify(db)); 
    return db.run(req.query)
  });


})