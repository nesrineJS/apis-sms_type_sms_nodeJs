const logger=require('../config/logger')
const  db=require('../config/db.config')
const Sms_mt = db.Sms_mt;
const ID_API=10;

const Add =(request, response) => { 
    var p_key =request.headers.key;
    var p_secret=String(request.headers.authorization).replace('Bearer','').replace(' ','')
    var p_id_sms_mt=request.query.id_sms_mt



    db.sequelize.query('SELECT * FROM public.ctl_sms_mt_api_dlr(:key,:secret,:id_api,:id_sms_mt) ',

           { replacements: {  secret:p_secret,id_api:ID_API,key:p_key,id_sms_mt:p_id_sms_mt}, type: db.sequelize.QueryTypes.SELECT }
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

module.exports = {
    Add
  
}