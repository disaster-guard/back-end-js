define({ "api": [  {    "type": "post",    "url": "/api/flare",    "title": "Upload user coordinates to database",    "name": "Flare",    "group": "API",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "longitude",            "description": "<p>longitude of user</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "latitude",            "description": "<p>latitude of user</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "user_id",            "description": "<p>user_id of user</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "JSON",            "optional": false,            "field": "success",            "description": "<p>message.</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "API"  },  {    "type": "post",    "url": "/oauth",    "title": "Authenticate login for user",    "name": "OAuth",    "group": "API",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>email of user</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>password of user</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "JSON",            "optional": false,            "field": "session",            "description": "<p>token</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "API"  },  {    "type": "post",    "url": "/register",    "title": "Create new user account in database",    "name": "Register",    "group": "API",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>name of user</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>email of user</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>password of user</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>success/failure message if user was created</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "API"  },  {    "type": "post",    "url": "/api/getUserId",    "title": "Query for UserId from database",    "name": "getUserId",    "group": "API",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>email of user</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "user_id",            "description": "<p>verified userId</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "API"  },  {    "type": "post",    "url": "/api/nearbyProfile",    "title": "Handle NearbyAPI requests from client devices",    "name": "nearbyProfile",    "group": "API",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>email of user</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "results",            "description": "<p>verified user name and profile picture</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "API"  },  {    "type": "post",    "url": "/api/uploadPredictionPicture",    "title": "Upload picture and run against facial recognition",    "name": "uploadPredictionPicture",    "group": "API",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "File",            "optional": false,            "field": "image",            "description": "<p>image to be evaluated</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "JSON",            "optional": false,            "field": "matches",            "description": "<p>facial recognition results</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "routes/index.js",    "groupTitle": "API"  }] });
