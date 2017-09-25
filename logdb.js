var winston = require('winston');

var MongoDB = require('winston-mongodb');

var logger = new(winston.Logger)({
    transports:[
        new(winston.transports.Console)(),
        new(winston.transports.MongoDB)({
            db:'mongodb://127.0.0.1:27017/test',
            collection: 'collectionTest',
            level:'info'

        })
    ]
});

logger.info("test for db");

