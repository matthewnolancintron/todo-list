# build features that make use of firebase
I'm going to add a sign in option to my todo application 
and rather than using local storage i'll have data for the users todo information
saved to fire storage instead and be able to use it offline too.

general steps to add Firebase authentication and Firestore to your todo application:

    Create a Firebase account and project
        Go to the Firebase console (https://console.firebase.google.com/) and create a new project
        Follow the prompts to set up your project

    Add Firebase to your project
        In your project directory, run npm install firebase to install the Firebase SDK for JavaScript
        In your HTML file, add the Firebase JavaScript SDK using a script tag
        Initialize Firebase in your JavaScript code using your Firebase project's configuration

    Set up Firebase Authentication
        In the Firebase console, go to the Authentication section and enable the sign-in method you want to use (e.g., email and password)
        Use the Firebase Authentication SDK in your JavaScript code to handle user authentication
        Add sign-in and sign-out buttons to your UI, and handle user authentication state changes in your code

    Set up Firestore
        In the Firebase console, go to the Firestore section and create a new database
        Use the Firestore SDK in your JavaScript code to read and write data to your Firestore database
        Modify your todo application to use Firestore instead of local storage to store user data

    Test your application
        Test your application locally and make sure it's working as expected
        Deploy your application to GitHub Pages and test it again to make sure it's working in a production environment

These are just general steps to get you started. You may need to adjust them based on the specific requirements of your todo application.