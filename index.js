"use strict";
const awsx = require("@pulumi/awsx");
const aws = require("@pulumi/aws");

const eventHandler = new aws.lambda.CallbackFunction("pulumi-test", {
    memorySize: 256,
    codePathOptions: {
        extraIncludePaths: ['./app.js']
    },
    callback: async (event, context) => {
        const serverless = require('serverless-http');
        const app = require('./app.js');
        const handler = serverless(app);
        const result = await handler(event, context);
        return result;
    },
});

const api = new awsx.apigateway.API("pulumi-test", {
    routes: [
        {
            path: "/",
            method: "ANY",
            eventHandler
        },
        {
            path: "/{proxy+}",
            method: "ANY",
            eventHandler
        },
    ],
    stageName: 'dev'
})

module.exports = {
    url: api.url
}