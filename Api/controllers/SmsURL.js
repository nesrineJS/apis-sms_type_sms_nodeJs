const logger=require('../config/logger')
const  db=require('../config/db.config')
const jwt = require('jsonwebtoken');

const Sms_mt = db.sms_mt;

const ID_API=10;

const Add =(request, response) => { 
    var p_key =request.headers.key;
    var p_secret=String(request.headers.authorization).replace('Bearer','').replace(' ','')
    var p_sms =request.query.sms;
    var p_msisdn =request.query.to;
    var p_sender =request.query.from;
    var p_send_date =request.query.send_date;



    db.sequelize.query('SELECT * FROM public.ctl_sms_mt_api_add(:key,:secret,:id_api,:sms,:msisdn,:sender,:send_date) ',

           { replacements: {  secret:p_secret,id_api:ID_API,key:p_key,sms:p_sms,msisdn:p_msisdn,sender:p_sender,send_date:p_send_date}, type: db.sequelize.QueryTypes.SELECT }
           , {
                model: Sms_mt,
                mapToModel: true 
        }).then(Sms_mt => {
            logger.info(Sms_mt)
            response.json(Sms_mt)
        }).catch(err => {
                logger.error(err)
                response.status(500).json({msg: "error", details: err});
            });
   
};

const GenerateToken =(request, response) => { 
    var p_key =request.headers.key;
    var p_secret=String(request.headers.authorization).replace('Bearer','').replace(' ','')
  
   if(p_key && p_secret){
        var token = jwt.sign({id:ID_API}, process.env.TOKEN_SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        response.send({"Token":token})
        
        console.log(token)
    }
};


module.exports = {
    Add,
    GenerateToken
}