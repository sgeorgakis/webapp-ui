# WebappUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Notes

The application is communicating with a server to display all the information of the uploaded files.
When the home page is load, a request is made to fetch all the available information.

In order to upload a file, a title, a description and a file path must be present to enable the save button.
If the file is uploaded, a success message is displayed for a few seconds and the response object of the upload request
is added in the list of the already fetched objects.
A better solution would be to reload the component responsible for the display of the information of all the uploaded files,
thus, making a new request to fetch the latest information, but I considered this solution better to reduce the number of requests.

The application is consisted of 3 components and 2 services:
- The file-data component, responsible for the display of the information of the already uploaded files.
- The file-upload component, responsible for gathering the information for a file to be uploaded.
- The message component, that keeps a message to be displayed to the user.
- The file-data service, responsible for the communication with the server for fetching the information and for the file upload.
- The message service, responsible to classify messages and pass them in the message component.
