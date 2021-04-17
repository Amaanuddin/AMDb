# AMDb
Its a web application which displays popular movies and TV series list which can be added to your Favorite list.
# Prerequisites.
This project user serverless framework. To run this project in your local system you need to install serverless package globally. You can use the following command to install it.

```npm i -g serverless```

This project also uses DynamoDB offline. To run the DynamoDb offline in your local system/machine you need to have JRE V>8 installed.
You can find the JRE from the below link.

[JRE V > 8 Download link](https://www.oracle.com/in/java/technologies/javase-jre8-downloads.html)


You also need to have the API key for TMDBb. To get that you can create a free account on [TMDb website](https://www.themoviedb.org/).
  

# Running the project.
After clonning the project and installing all the dependency, you are ready to run the project.

The first command is to install all the packages which are required for the application to work.

```npm run install-packages```

This will install all the packages for client and server.

You need to place your API key, which you got earlier from the TMDb website, in the config.json file present the project .

Now you need to initialize the DB.

```npm run initDB```


After setting up the DB locally, you can run the following command to start the application.

```npm run dev```