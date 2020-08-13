const logger=require('../config/logger')
const  db=require('../config/db.config')
const Sms_mt = db.Sms_mt;
const ID_API= 10;


const   Add =(request, response) => {
       
        console.log(request.headers);
        
        var p_key =request.headers.key;
        var p_secret=String(request.headers.authorization).replace('Bearer','').replace(' ','')
       
        var p_sms =request.body.sms;
        var p_msisdn =request.body.msisdn;
        var p_sender =request.body.sender;
        var p_send_date =request.body.send_date;
        
        var v_msisdn_list = ";";

        if(p_msisdn.length > 0)
        {
            v_msisdn_list = p_msisdn[0]
        }    
     
        for(var i=1; i < p_msisdn.length; i++){
            v_msisdn_list +=  ";" + p_msisdn[i];
        };


  db.sequelize.query('SELECT * FROM public.ctl_sms_mt_api_add_list(:key,:secret,:id_api,:sms,:msisdn,:sender,:send_date) ',
  { replacements: {key:p_key,secret:p_secret,id_api:ID_API,sms:p_sms,msisdn:v_msisdn_list,sender:p_sender,send_date:p_send_date}, type: db.sequelize.QueryTypes.SELECT }
  , {
       model: Sms_mt,
       mapToModel: true 
}).then(Sms_mt=> {
  logger.info(Sms_mt)
  response.json(Sms_mt)

   

}).catch(err => {
       logger.error(err)
       response.status(500).json({msg: "error", details: err});
   });
};


module.exports = {
    Add
}