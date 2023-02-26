# Review Management system

This app is a review managment portal, where admin can manage employees. Admin can also create review requests for some employees. He can assign other employee to review requests. Employees can login/register to the portal. They can check their review requests and add feedbacks accordingly. Admin can also make an employee as admin

Tech stack used in this application

1. ReactJs - for frontend
2. NodeJs - for backend
3. Mongodb - for database

Steps to use this application locally

1. Copy .env.example file to .env
2. Update the credentials accordingly
3. In the terminal type "npm install"
4. Go to frontend folder inside the project
5. Copy .env.example file to .env
6. In the terminal type "npm install"
7. Now in the root directory run this command "npm start"

Employees can register using this link - http://localhost:3000/auth/register

For admin login you can do either of the two:-

1. Register an employee and change role from database, also push admin to privileges in database.
2. You can copy this document into mongodb. The credentials are:-
    - admin@yopmail.com
    - Test@123

{
  "_id": {
    "$oid": "63a4028e44ba0863d4dba9aa"
  },
  "role": "admin",
  "name": "Super admin",
  "email": "admin@yopmail.com",
  "password": "$2a$08$zhW5ESkCQt5X1PGY5ttcfO2hrdGeeSfv9IAF2irL/ZIyZvNgEWBK.",
  "phone": "123123213",
  "privileges": [
    "admin"
  ]
}