[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

# Accommodation booking application built with MERN stack

An example of a complex application with React, Redux, Express, MongoDB and Stripe.

![Screenshot](screenshot1.png)
![Screenshot](screenshot2.png)
![Screenshot](screenshot3.png)
![Screenshot](screenshot4.png)
![Screenshot](screenshot5.png)

## Getting Started
These instructions will provide you with a copy of the project that will be launched on your local computer for development and testing.

## Prerequisites
What things you need to install the software.

- Git
- NPM
- Docker Desktop (or local MongoDB database)
- Robo 3T (or another MongoDB management tool)
- IDE (or code editor)


## Install
Clone the git repository on your computer
```
$ git clone https://github.com/alavir-ua/alexlodging.git
```
You can also download the entire repository as a zip file and unpack in on your computer if you do not have git

After cloning the application, you need to install it's dependencies.
```
$ npm install && npm install --prefix client 
```

## Creating a local MongoDB
To create a local MongoDB, you can do the following:
1) Install the database using the instructions in the official documentation at the 
   [link](https://docs.mongodb.com/manual/administration/install-community/)
2) If you have a Docker desktop on your computer, use the following command
```
npm run docker:db
```

## Set environment keys
When you are done with the installation, rename the .env.example files in your project's root directory and the 
"client" directory to .env and fill them with your local development environment variables.

## Seed Database

You can use the following commands to populate the database with some sample users, rooms, bookings and
destroy all data.

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@gmail.com (Admin)
4321

20 random users
password 1234

21 random rooms
21 random bookings

```
You can change the generation parameters (number of essences, logins, passwords, etc.) at your own discretion in 
the server / seeder.js file.

## Run the application
```
# Run frontend (:3000) & backend (:8080)
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client
```

After that, open the browser at http://localhost:3000/ to view the result.

## Links
[Live Demo](https://alexlodging.herokuapp.com/)

