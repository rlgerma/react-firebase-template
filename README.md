# React-Firebase-Template

## Description

This is a template for getting a Create React App with Firebase up and running, quicker.

## Design

This template comes with Basic Firebase features connected into CRA such as Auth, Firestore, and Storage. Basic styling also included with React-Bootstrap. Three demo pages are included as well - Home, Login, Account.

## Instructions

You will need to create a Firebase account (allow sign in with email/password in authentication) & setup Firestore (create "users" collection) prior to these steps. [Visit Firebase]("https://console.firebase.google.com/)

1. `yarn`

2. `firebase login`

3. `firebase init` & select Firestore, Hosting, and Storage. You will have to set up other features manually if needed.

4. Add `build` as your public directory.

5. Enter yes to configure to single-page-app.

6. Select no on overwrite `public/index.html`

7. Add Firebase config to `.env`

8. `yarn start`
