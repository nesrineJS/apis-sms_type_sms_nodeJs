const logger=require('../config/logger')
const  db=require('../config/db.config')
const Sms_mt = db.Sms_mt;
const ID_API= 10;


const   Add =(request, response) => {
       
        console.log(request.headers);
        
        var p_key =request.headers.key;
        var p_secret=String(request.headers.authorization).replace('Bearer','').replace(' ','')
       
        var p_id_sms_mt =request.body.id_sms_mt;
    
        
        var v_id_sms_mt_list = ";";

        if(p_id_sms_mt.length > 0)
        {
            v_id_sms_mt_list = p_id_sms_mt[0]
        }    
     
        for(var i=1; i < p_id_sms_mt.length; i++){
            v_id_sms_mt_list +=  ";" + p_id_sms_mt[i];
        };


  db.sequelize.query('SELECT * FROM public.ctl_sms_mt_api_dlr_list(:key,:secret,:id_api,:id_sms_mt) ',
  { replacements: {key:p_key,secret:p_secret,id_api:ID_API,id_sms_mt:v_id_sms_mt_list}, type: db.sequelize.QueryTypes.SELECT }
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