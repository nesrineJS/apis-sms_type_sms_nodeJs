module.exports = function(app) {
  require('./DlrJson')(app);
  require('./DlrUrl')(app);
  require('./SmsJson')(app);
  require('./SmsUrl')(app);
  require('./SmsMt')(app);



   

   
    
}
