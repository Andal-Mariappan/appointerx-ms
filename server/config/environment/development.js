'use strict';

// Development specific configuration
// ==================================
module.exports = {
	mysql: {
     uri: 'mysql://root:Hb@12345@localhost:3306/physician' || 'mysql://b79d6add40b312:48089a29@us-cdbr-azure-central-a.cloudapp.net/physician?reconnect=true'
	},
	// Seed database on startup
  seedDB: false

};