"use strict";
const awsx = require("@pulumi/awsx");
const lambda = require('./lambda');
const api = new awsx.apigateway.API("pulumitest", {
    routes: [
        {
            path: "/",
            method: "ANY",
            eventHandler: lambda.handler
        },
        {
            path: "/{proxy+}",
            method: "ANY",
            eventHandler: lambda.handler
        },
    ],
})

module.exports = {
    url: api.url
}