var winston = require('winston');

var currentDate = new Date();
var day = currentDate.getDate();
var month = currentDate.getMonth();
var year = currentDate.getFullYear();

var dateFormat = year +'-'+ (month + 1) +'-'+ day ;
var pathLog = process.env.LOG_PATH + 'Log_' + dateFormat + '_.log';

var _level = process.env.LOG_LEVEL;
var _silent = false;

if(process.env.LOG_LEVEL == 'disable')
{
    var _level = 'error';
    var _silent = true;
}

var options = {
    file: {
        level: _level,//{'verbose','error'},
        filename: pathLog,
        prettyPrint : true,
        handleExceptions: true,
        json: true,
        maxsize: 80000, // 5MB
        maxFiles: 20,
        colorize: false,
        silent: _silent,
    },
    console: {
        level: 'verbose',
        handleExceptions: true,
        json: true,
        colorize: true,
    }    
};

const config = {
    levels: {
        error: 0,
        debug: 1,
        warn: 2,
        data: 3,
        info: 4,
        verbose: 5,
        silly: 6,
        custom: 7
    },
    colors: {
        error: 'red',
        debug: 'blue',
        warn: 'yellow',
        data: 'grey',
        info: 'green',
        verbose: 'cyan',
        silly: 'magenta',
        custom: 'yellow'
    }
};

winston.addColors(config.colors);

// your centralized logger object
let logger = winston.createLogger({
    levels: config.levels,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
    ),
   
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console({
            format: winston.format.combine (
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.simple()
            )}),
    ],
    exitOnError: false, // do not exit on handled exceptions
    //level: 'custom'
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function(message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)        
        console.log(message);
        logger.info(message);
        
    }  
};

module.exports = logger;