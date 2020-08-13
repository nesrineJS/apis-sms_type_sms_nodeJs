module.exports = function(db, sequelize, Sequelize) {
    
    db.sms_mt=require('./SmsMt')(sequelize, Sequelize);




}
