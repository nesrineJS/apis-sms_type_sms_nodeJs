const logger = require('../config/logger')
const db = require('../config/db.config')
const Sms_mt = db.Sms_mt;
//Add a sms_mt
const ApiAdd = (request, response) => {
    var p_id_api = request.query.id_api;
    var p_key = request.headers.key;
    var p_secret = String(request.headers.authorization).replace('Bearer', '').replace(' ', '')
    var p_sms = request.query.sms;
    var p_msisdn = request.query.msisdn;
    var p_sender = request.query.sender;
    var p_send_date = request.query.send_date;



    db.sequelize.query('SELECT * FROM public.ctl_sms_mt_api_add(:key,:secret,:id_api,:sms,:msisdn,:sender,:send_date) ',

        { replacements: { id_api: p_id_api, key: p_key, sms: p_sms, msisdn: p_msisdn, sender: p_sender, send_date: p_send_date, secret: p_secret }, type: db.sequelize.QueryTypes.SELECT }
        , {
            model: Sms_mt,
            mapToModel: true
        }).then(Sms_mt => {
            logger.info(Sms_mt)
            response.json(Sms_mt)
        }).catch(err => {
            logger.error(err)
            response.status(500).json({ msg: "error", details: err });
        });

};
const ApiAddJson = (request, response) => {
    var p_key = request.headers.key;
    var p_secret = String(request.headers.authorization).replace('Bearer', '').replace(' ', '')
    var p_id_api = request.body.id_api;
    var p_msisdn = request.body.msisdn;
    var p_sms = request.body.sms;
    var p_sender = request.body.sender;
    var p_send_date = request.body.send_date;

    db.sequelize.query('SELECT * FROM public.ctl_sms_mt_api_add(:key,:secret,:id_api,:sms,:msisdn,:sender,:send_date) ',

        { replacements: { id_api: p_id_api, key: p_key, sms: p_sms, msisdn: p_msisdn, sender: p_sender, send_date: p_send_date, secret: p_secret }, type: db.sequelize.QueryTypes.SELECT }
        , {
            model: Sms_mt,
            mapToModel: true
        }).then(Sms_mt => {
            logger.info(Sms_mt)
            response.json(Sms_mt)
        }).catch(err => {
            logger.error(err)
            response.status(500).json({ msg: "error", details: err });
        });

};
const ApiMultiAddJson = (request, response) => {
    var p_key = request.headers.key;
    var p_secret = String(request.headers.authorization).replace('Bearer', '').replace(' ', '')
    var p_id_api = request.body.id_api;

    var p_msisdn = request.body.msisdn;
    var p_sms = request.body.sms;
    var p_sender = request.body.sender;
    var p_send_date = request.body.send_date;

    
    //for (var i = 0; i < msisdn.length; i++) {
      //  logger.info(msisdn[i])

        db.sequelize.query('SELECT * FROM public.ctl_sms_mt_api_add_list(:key,:secret,:id_api,:sms,:msisdn,:sender,:send_date) ',

            { replacements: { id_api: p_id_api, key: p_key, sms: p_sms, msisdn: p_msisdn, sender: p_sender, send_date: p_send_date, secret: p_secret }, type: db.sequelize.QueryTypes.SELECT }
            , {
                model: Sms_mt,
                mapToModel: true
            }).then(Sms_mt => {
                logger.info(Sms_mt)
                response.json(Sms_mt)
            }).catch(err => {
                logger.error(err)
                response.status(500).json({ msg: "error", details: err });
            });



    //};

};

module.exports = {
    ApiAdd,
    ApiAddJson,
    ApiMultiAddJson

}