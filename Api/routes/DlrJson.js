module.exports = function(app) {
    const dlr = require('../controllers/DlrJson');

    app.put('/json/dlr/',dlr.Add );
  


}
