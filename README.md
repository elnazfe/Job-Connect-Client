# Job-Tracker-Client

# Project Name

Job Connect

# Quick Compo

<br>

## Description

"JobConnect" is an app to track job applications for job seekers to organize and track all applications in one place, customize profiles, follow-up the process, receive reminders and notifications, manage documents and supercharge your career.

## User Stories

-  **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
-  **Signup:** As an anonymous user I can sign up on the platform so that I can start creating and managing my job applications.
-  **Login:** As a user I can login to the platform so that I can access my profile and start creating and managing my job applications.
-  **Logout:** As a logged in user I can logout from the platform so no one else can use it.
-  **Profile Page**: As a logged in user I can visit my profile page so that I can access the edit page and see the dashboard I have created.
-  **Dashboard:** As a logged in user I can access my dashboard, where I can track my progress in job seeking.
-  **Edit Job:** As a logged in user I can see the job details and edit it.
- **Notes:** As a logged in user I can access the notes section, where I can post deadline, interview tips or any material I need for the job etc.





## Backlog

<br>


# Client / Frontend

## React Router Routes (React App)

| Path                         | Component            | Permissions                | Behavior                                            |
| ---------------------------- | -------------------- | -------------------------- | --------------------------------------------------|
| `/login`                     | LoginPage            | anon only `<AnonRoute>`    | Login form, navigates to home page after login.    |
| `/signup`                    | SignupPage           | anon only  `<AnonRoute>`   | Signup form, navigates to home page after signup. |
| `/`                          | HomePage             | public `<Route>`           | Home page.                                         |
| `/user-profile`              | ProfilePage          | user only `<PrivateRoute>` | Job seeker profile for the current user.             |
| `/user-profile/edit`         | EditProfilePage      | user only `<PrivateRoute>` | Edit user profile form.                           |
| `/dashboard/`                | DashboardPage        | user only `<PrivateRoute>` | Dashboard Page.                               |
| `/jobs`                      | JobsPage             |  public `<Route>`          | Jobs list.                                         |
| `/jobs/:jobId`               | JobDetailPage        |  public `<Route>`          | Job details.  |
| `/dashboard/addjob/`         | DashboardPage         | user only `<PrivateRoute>` | Adding a job to your bookmarks section.          |
| `/dashboard/removejob`       | DashboardPage         | user only `<PrivateRoute>` | Removing a job from your bookmarks section       |
| `/applied/add`               | AppliedJobsPage      | user only `<PrivateRoute>` | Applied Jobs Page                                 |




## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- DashboardPage

- ProfilePage

- EditProfilePage

- JobsPage

- JobDetailPage   


  

Components:
- Navbar
- Footer




## Services

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`

- **User Service**

  - `userService` :
    - `.updateCurrentUser(id, userData)`
    - `.getCurrentUser()`

- **Job Service**

  - `jobService` :
    - `.addJob(jobData)`
    - `.editJob(id)`
    - `.deleteJob(id)`
<br>


# Server / Backend


## Models

**User model**

```javascript
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
    type: String,
    required: true,
    enum: [jobseeker, recruiter]
    },
    profile: {
    img: String,
    firstName: String,
    lastName: String,
    address : {
    	street: String,
    	city: String,
    	country, String,
   	 },
target: String,
summary: String,
    },
    bookmark:[
      {
        type: Schema.Types.ObjectId,
        ref:'Job'
      }],
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]

  },
);
```


**Dashboard model**

```javascript
 {
   status: [{ type: Schema.Types.ObjectId, ref:'Status' }],
   user: [ { type: Schema.Types.ObjectId, ref:'User' } ],
   bookmarks: [],
   applications: []
   notes: []
 }
```
**Job model**
```javascript
 {
   title: String,
   companyName: String,
   jobURL: String,
   description: String,
   status: String,
   user: [ { type: Schema.Types.ObjectId, ref:'User' } ],
   notes: String
 }
```




<br>


## API Endpoints (backend routes)

| HTTP Method | URL                    | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | ---------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `    | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`         | {email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| UPDATE      | `/user-profile/edit`.  |
| POST        | `/auth/login`          | {email, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`         |                              | 204            | 400          | Logs out the user                                            |
| GET         | `/api/dashboard`     |                              |                | 400          | Show the whole dahsboard                                        |
| GET         | `/api/profile` |                              |                |              | User Profile          
| POST        | `/api/profile/edit`             |       | 201            | 400          | Edit User Profile                                             |
| GET         | `/api/jobs/addjob` |                              |                |              | Add a new job          
| POST        | `/api/jobs/editjob/:id`             |       | 201            | 400          | Edit job Detail            
| DELETE      | `/api/jobs/removejob/:id` |                              | 201            | 400          | remove job                                        


<br>

## API's

Google Calendar API
Linkedin API - Sign up with Linkedin, Apply with Linkedin
GitHub API - Sign up with GitHub

<br>

## Packages

<br>


### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/elnazfe/job-connect-client)

[Server repository Link](https://github.com/elnazfe/job-connect-server)

### Slides


### Contributors

Elnaz Farrokhi - <elnazfe> - <linkedin-profile-link>

Ana Rak - <ana-rak> - <linkedin-profile-link>
