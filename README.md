# CareerConnect – Job Portal

A full-stack job portal built with **Node.js, Express.js, MongoDB, EJS, and JavaScript**. CareerConnect connects candidates and recruiters through job postings, online applications, and applicant tracking.

## Features

- **User Authentication:** Candidate and recruiter registration and login.
- **Secure Password Storage:** Password hashing using bcrypt.
- **Role-Based Access Control:** Separate permissions for candidates and recruiters.
- **Job Management:** Create, view, edit, and delete job postings.
- **Job Applications:** Candidates can apply for available jobs.
- **Application Tracking:** Candidates can view their application statuses.
- **Recruiter Applicant Management:** Recruiters can review applicants and update application statuses.
- **Duplicate Application Prevention:** Prevents a candidate from applying to the same job more than once.

## Screenshots

### Available Jobs

![Available Jobs](https://github.com/rakshiatgithub/CareerConnect-Job-Portal/blob/main/ScreenShots/available%20jobs.png)

### User Registration

![User Registration](https://github.com/rakshiatgithub/CareerConnect-Job-Portal/blob/main/ScreenShots/register.png)

### Login

![Login](https://github.com/rakshiatgithub/CareerConnect-Job-Portal/blob/main/ScreenShots/login.png)

### Post a Job

![Post a Job](https://github.com/rakshiatgithub/CareerConnect-Job-Portal/blob/main/ScreenShots/newjob%20posting.png)

### Candidate Applications

![Candidate Applications](https://github.com/rakshiatgithub/CareerConnect-Job-Portal/blob/main/ScreenShots/My%20Applications.png)

### Recruiter Applicant Tracking

![Applicant Tracking](https://github.com/rakshiatgithub/CareerConnect-Job-Portal/blob/main/ScreenShots/applicant%20tracking.png)

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling |
| JavaScript | Application logic |
| EJS | Server-side page rendering |
| Node.js | Runtime environment |
| Express.js | Backend framework |
| MongoDB | Database |
| Mongoose | Database modeling |
| bcrypt | Password hashing |
| express-session | Session management |
| Git and GitHub | Version control |

## Project Structure

```text
CareerConnect-Job-Portal/
├── middleware/
├── models/
├── public/
│   └── css/
├── routes/
├── views/
├── screenshots/
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/rakshiatgithub/CareerConnect-Job-Portal.git
cd CareerConnect-Job-Portal
```

**2. Install dependencies**

```bash
npm install
```

**3. Start MongoDB**

Make sure your MongoDB server is running locally.

**4. Start the application**

```bash
node server.js
```

**5. Open in your browser**

Visit http://localhost:3000.

## Learning Outcomes

This project demonstrates full-stack web development, authentication, role-based authorization, MongoDB integration, CRUD operations, session management, and recruitment workflow implementation.

## Future Enhancements

- Job search and filtering
- Resume upload
- Email notifications
- Cloud deployment
- Automated testing

## Author
GitHub: @rakshiatgithub

Project: CareerConnect-Job-Portal

Developed as a full-stack web development project.
