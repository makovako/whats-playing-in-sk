const axios = require('axios')

exports.handler = async function(event, context, calback) {
    const resource = event.resource

    console.log(resource);

    let response = {
        statusCode: 200,
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          payload: resource
        })
      };
      return response;
    
}