module.exports.msalConfig = {
    auth: {
        clientId: process.env.OAUTH_CLIENT_ID,
        authority: process.env.OAUTH_AUTHORITY,
        clientSecret: process.env.OAUTH_CLIENT_SECRET
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
};

// Create msal application object
app.locals.msalClient = new msal.ConfidentialClientApplication(msalConfig);