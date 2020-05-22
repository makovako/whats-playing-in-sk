const axios = require('axios')

exports.handler = async function(event, context, calback) {
    const {resource} = JSON.parse(event.body)
    const res = await axios(resource)
    const data = res.data
    let response = {
        statusCode: 200,
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          ...data
        })
      };
      return response;
    
}