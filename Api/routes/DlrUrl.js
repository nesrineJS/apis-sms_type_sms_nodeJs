module.exports = function(app) {
    const dlr= require('../controllers/DlrUrl');

    app.get('/url/dlr/', dlr.Add); 


}
