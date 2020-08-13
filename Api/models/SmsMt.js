
module.exports = (sequelize,Sequelize) => {
 
    const SmsMt = sequelize.define('sms_mt', {
        id_sms_mt: {
             type: Sequelize.INTEGER, 
             autoIncrement: true ,
             primaryKey: true
        },
        sms: {
            type: Sequelize.STRING
        },
        msisdn: {
            type: Sequelize.STRING
        },
        sender: {
            type: Sequelize.STRING,
        },
        prefix:{
            type: Sequelize.INTEGER,
        },
        nbr_sms :{
            type: Sequelize.INTEGER

        },
        entry_date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW 
        },
        
        id_developer: {
            type: Sequelize.INTEGER
        },
        id_app_api : {
            type: Sequelize.INTEGER
        },
        status:{
            type: Sequelize.INTEGER ,
            defaultValue: Sequelize.INTEGER=0
 
        },
        send_date:{
            type: Sequelize.DATE

        },
        dlr_type:{
            type: Sequelize.STRING,

        },
        dlr_date:{
            type: Sequelize.DATE
        },
        dlr_id_message:{
            type: Sequelize.STRING

        }
    },
    {
        timestamps: false, //pour annuler les autre column
        paranoid: false,
        // This is the column name of the referenced models
      //  key: 'id_module',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    });
    

    return SmsMt;
}
