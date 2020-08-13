module.exports = function(app) {
    const sms_mt = require('../controllers/SmsMt');

    app.put('/api/sms/json/', sms_mt.ApiAddJson); 
    
    app.put('/api/sms/multiple/json/', sms_mt.ApiMultiAddJson); 


     app.get('/api/sms/url/', sms_mt.ApiAdd);


}
