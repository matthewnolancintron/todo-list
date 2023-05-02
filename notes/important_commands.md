# commands for testing and development:

## commands used for firebase:

### importing and exporting firebase's emulators's data:
 - to instruct the emulator to import data on start up
   and to export data on shutdown, either specifying an export path or simply using the path passed to the --import flag.
   -        firebase emulators:start
            --import=./fireStoreEmulatorData 
            --export-on-exit
    
- to import data for a specific emulator (such as Firestore), you can use the --only flag to specify which emulator to start. For example:

 -     firebase emulators:start --only firestore --import=./firestore-data

        - This command would start only the Firestore emulator 
          and import data from the ./firestore-data directory.
            
- use the --project flag to specify which Firebase project to use. For example:
  -      firebase emulators:start
         --only firestore 
         --project=my-project
         --import=./firestore-data

        - This command would start only the Firestore emulator for the my-project Firebase project and import data from the ./firestore-data directory.

    
## for webpack
    npx webpack --watch

## workflow when starting up 
need to run the commands for webpack before setting up
the firebase emulators


## look more into these commands later:
### for firebase 
    emulators:start
-       --inspect-functions debug_port 
        full command:
        firebase emulators:start --inspect functions debug_port

	Optional. Use with the Cloud Functions emulator to enable breakpoint debugging of functions at the specified port (or the default port 9229 if argument omitted). Note that when this flag is supplied, the Cloud Functions emulator switches to a special serialized execution mode in which functions are executed in a single process, in sequential (FIFO) order; this simplifies function debugging, though the behavior differs from multi-process, parallel execution of functions in the cloud. 

    interesting note from the documentation:
    The firebase emulators:exec method is generally more appropriate for continuous integration workflows.
    could look into this more later.


