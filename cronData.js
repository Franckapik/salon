var CronJob = require('cron').CronJob;
var controller = require('./controller');

console.log('Cronjob : Activé');

var addTemp = new CronJob({


    cronTime: '0 0 * * * *',

    onTick: function() {

        controller.readAddTemp();
	controller.queryData();
    },

    start: true,
    timeZone: 'Europe/Paris'
});

addTemp.start();

exports.addTemp = addTemp;
