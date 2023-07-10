# Northcoders News API

## Husky

To ensure that we don't commit broken code, this project utilizes git hooks. Git hooks are scripts that are triggered during specific events in the git lifecycle. In this project, we make use of Husky, a popular package that allows us to set up and maintain these scripts. Specifically, we use a pre-commit hook. When attempting to commit our work, the script defined in the `pre-commit` file will run. If any of our tests fail, the commit will be aborted.

For more information on how to configure Husky for your own project and create custom hooks, please refer to the [Husky documentation](https://typicode.github.io/husky/#/).

## Comments

To ensure that sensitive information is not exposed, the `.env.*` files are added to the `.gitignore` file. This means that anyone cloning this repository will not have access to the necessary environment variables. In order to successfully connect to the databases locally, a developer must add two separate files: `.env.test` and `.env.development`. These files should contain the respective database names, which can be obtained from the `setup.sql` file.


## Northcoders News Backend Project

Northcoders News is a project that demonstrates my understanding of JavaScript project development. In the backend section, I have built a RESTful API using SQL to store the data. 

### Getting Started

To start running the written tests, clone the repository using the provided address. Node.js is required to run this server. You can check if Node.js is installed on your machine by running the following command in the terminal:

```
node -v
```

If Node.js is not installed, please visit the link below for installation instructions:

[Node.js Installation Instructions](node-installation-link)

CD into this repository/folder. To install the required dependencies, run the following command:

```
npm install
```

To start the express server and begin exploring the endpoints, run the command:

```
npm run dev
```

To reach the GET endpoints, the quickest option is to open a new web browser window and type in the following URL:

```
localhost:9090/api
```

We recommend using an interface to query all the endpoints:

- GET
- POST
- PATCH
- DELETE

### Testing

All endpoints have been extensively tested for functionality and errors. To begin testing, run the command:

```
npm test
```


This project doesn't stop here, and I have plans to continue its development in the future. Stay tuned for further updates as I work on enhancing and expanding the Northcoders News API.

If you have any questions or feedback about the project, feel free to reach out. Thank you for your interest!

