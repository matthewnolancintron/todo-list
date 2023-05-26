I'm taking a vaction from this project.

if and when I return start working on things below

1. seems to be an issues on first login when adding todos to list.
will create a todo with none of the info from the form and 
add that to the data base but also adds the correct todo to the ui
when page was refreshed the todo list todo data was erased except for
the faulty todo data or blank todo?
after another refresh the expected behavior resumed.
It's most likely a logic error.

2. when merging data, ui gets sort of scrambled but after a refresh 
ui syncs correctly it's an issues similar to when the user would 
sign out and the ui would be out of synce but refreshing it solved that
I just need to find the correct location in to trigger a page refresh
for post merge operation.

    - I'm getting this error:
Uncaught (in promise) TypeError: document.querySelector(...).children[0] is undefined
    updateListsInTodoListsArea clearAddTodoFormData_view.js:15
    setupUI view:177
    <anonymous> index.js:252
    next index.esm2017.js:1601
    sendOne index.esm2017.js:1709
    promise callback*sendOne index.esm2017.js:1706
    forEachObserver index.esm2017.js:1697
    next index.esm2017.js:1600
    notifyAuthListeners index-16e22603.js:2790
    _updateCurrentUser index-16e22603.js:2651
    queue index-16e22603.js:2837
    _updateCurrentUser index-16e22603.js:2649
    _signInWithCredential index-16e22603.js:5056
    signInWithCredential index-16e22603.js:5072
    signInWithEmailLink index-16e22603.js:5648
    emailAuthenticationLink index.js:379
    promise callback*emailAuthenticationLink index.js:358
    openPopup index.js:291
    <anonymous> index.js:93


3. another issues with anonymous user sign out on occasion.

4. use the application and try to find more issues test use and fix
   until application is stable before moving to 5


5. hosting to github pages using firebase emulators and webpack:

While GitHub Pages itself cannot execute server-side commands, you can use GitHub Actions or other deployment tools to automatically start the Firebase emulators and deploy your application to GitHub Pages.

Here's a high-level overview of how you can achieve this:

    Set up GitHub Actions: Configure a GitHub Actions workflow in your repository to automate the deployment process. You can create a workflow file (e.g., .github/workflows/deploy.yml) that defines the steps to be executed when triggered.

    Define the workflow: In the workflow file, specify the desired triggers, such as changes to the codebase or manual triggers. Define the steps to perform the deployment, including building your application and starting the Firebase emulators.

    Configure environment variables: In the GitHub Actions workflow, set up the necessary environment variables, such as your Firebase project credentials or any other configuration required for running the Firebase emulators.

    Start the Firebase emulators: In one of the workflow steps, use a script or command to start the Firebase emulators. This can include the firebase emulators:start command with the appropriate options, such as --import for importing data and --export-on-exit to export data when the emulators stop.

    Build and deploy the application: Once the emulators are running, proceed with building your application using npx webpack or any other build command specific to your project. After the build process, deploy the resulting static files to GitHub Pages using the appropriate deployment command or tool.

By configuring the GitHub Actions workflow, you can automate the process of starting the Firebase emulators, building the application, and deploying it to GitHub Pages whenever there is a trigger or manual invocation.

Remember to carefully set up your GitHub Actions workflow, including appropriate error handling, environment configurations, and security measures, to ensure the smooth execution of the deployment process.

Please note that this approach may require some customization based on your specific project setup and deployment requirements. It's recommended to refer to the GitHub Actions documentation and Firebase documentation for more detailed guidance and best practices.