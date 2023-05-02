# Clearing database between tests
https://firebase.google.com/docs/emulator-suite/connect_firestore#clear_your_database_between_tests

## An example using JavaScript:
const fetch = require('node-fetch');

async function clearFirestoreDatabase() {
  const projectId = 'firestore-emulator-example';
  const url = `http://localhost:8080/emulator/v1/projects/${projectId}/databases/(default)/documents`;
  const response = await fetch(url, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error(`Failed to clear Firestore database: ${response.statusText}`);
  }
}

This JavaScript function sends an HTTP DELETE request to the Firestore emulator REST API endpoint to delete all documents in the Firestore database. The function uses the node-fetch library to send the HTTP request.

Here’s how you can use this function in a test framework setup/tearDown step:

const { beforeEach, afterEach } = require('mocha');

beforeEach(async () => {
  await clearFirestoreDatabase();
});

afterEach(async () => {
  await clearFirestoreDatabase();
});

describe('My test suite', () => {
  it('should do something', async () => {
    // Test code here...
  });
});

In this example, the beforeEach and afterEach hooks call the clearFirestoreDatabase function to clear the Firestore database before and after each test case is run. This ensures that each test case starts with a fresh database.

could investage more into how each function works and how I could set up 
the files and workflow for implementing this if and when I decied to set 
up tests for this or another application


## using firebase emulators:exec command for testing
Here’s an example of how you could use the firebase emulators:exec command to run tests for a Firebase project:

First, make sure you have the Firebase CLI installed. You can install it by running the following command:

npm install -g firebase-tools
Next, navigate to your Firebase project directory and run the following command to start the Firebase emulators:

firebase emulators:start
Once the emulators are running, you can use the firebase emulators:exec command to run tests in the context of the emulators. For example, if you have a test script defined in your package.json file like this:

{
  "scripts": {
    "test": "jest"
  }
}
You could run the tests with the following command:

firebase emulators:exec "npm test"
The firebase emulators:exec command will start up the Firebase emulators and then run the specified command (npm test in this case) in the context of the emulators. This allows your tests to interact with the emulated services (such as Firestore or Realtime Database) instead of the production services.

Some other things you can do with the Firebase emulators include:

Writing integration tests that interact with your Firebase services.
Testing your security rules locally before deploying them.
Developing and testing Cloud Functions locally.
I hope this helps! Let me know if you have any other questions.

continue this conversation with Bing later. 


I'm getting a feeling that to save time from running 
commands in the terminal that I might implement testing
and start using firebase emulators exec and run an npm script
or tess with a testing frame work like jest or explore 
if there any other ones that match the project i'm using
possible this project.

