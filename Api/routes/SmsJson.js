module.exports = function(app) {
    const SmsJson = require('../controllers/SmsJson');

    app.put('/json/sms/',SmsJson.Add );


}
