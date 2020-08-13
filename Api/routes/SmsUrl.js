module.exports = function(app) {
    const sms_url = require('../controllers/SmsURL');
    const verifyToken = require('../config/VerifyToken')


    app.get('/url/sms/',verifyToken, sms_url.Add);
    app.get('/api/sms/url/token', sms_url.GenerateToken);



}
