const { ClientSecretCredential } = require('@azure/identity');
const { Client } = require('@microsoft/microsoft-graph-client');
const { TokenCredentialAuthenticationProvider } = require('@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials');
require('isomorphic-fetch');

let clientSecretCredential;
let appGraphClient;

async function ensureGraphForAppOnlyAuth() {

  if (!clientSecretCredential) {
    clientSecretCredential = new ClientSecretCredential(
      "a5c20665-f3d8-4f07-b211-5051a9b92f26",
      "7035e4a3-ecfa-479f-adb6-51632547a3e6",
      "JgZ8Q~EEzc80FFoQeC8EmvqOtDEqwSYiBFqH2arh"
    );
  }

  if (!appGraphClient) {
    const authProvider = new TokenCredentialAuthenticationProvider(
      clientSecretCredential, {
        scopes: [ 'https://graph.microsoft.com/.default' ]
      });

    appGraphClient = Client.initWithMiddleware({
      authProvider: authProvider
    });
    // console.log('Yo',clientSecretCredential);
    // console.log('\nYa',appGraphClient);
  }
}

async function createNewMeetingAsync(userId) {
  ensureGraphForAppOnlyAuth();

  const newMeeting = `/users/${userId}/calendar/events`;
  
  const event = {
    subject: 'Inteltion Customer Service Meeting',
    start: {
        dateTime: '2023-10-14T15:49:18.0000000',
        timeZone: 'UTC'
    },
    end: {
        dateTime: '2023-10-14T16:49:18.0000000',
        timeZone: 'UTC'
    },
    isOnlineMeeting: true,
    
  };

  
  const newEvent = await appGraphClient.api(newMeeting).post(event);    
  return newEvent;     
}

// createNewMeetingAsync('00e5a27e-aa10-4705-9a6d-200ad0cbc28d');
async function getuser(){
  
  ensureGraphForAppOnlyAuth();
  
  const newEvent = await appGraphClient.api('/users/kitti@inteltion.com').get();
  console.log(newEvent.id);
}

getuser();

