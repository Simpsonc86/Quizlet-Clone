# Wizlet (Quizlet Clone)

This Project is a clone for Quizlet learning platform. The three full CRUD features are Folders, Sets, and Questions. CSS is used for flashcard animation.


Link to live site [Wizlet](https://wizlet.onrender.com)

Check out the Wiki for more info [Wiki](https://github.com/Simpsonc86/Quizlet-Clone/wiki)

# Project Features
## Folder CRUD

The project includes a feature for the user to have a list of created Folders displayed in a user page called library. The library tab can be accessed once the account is created or logged in. From there, a user can see options for managing their folders or to create a set within a Folder.

## Sets CRUD

The project also includes Sets functionality. A set is basically a quiz, or a set of questions rather. Each set has its own functionality to manage or an option to create a new question

## Questions CRUD
The questions are maintained in a Set created by the user. The questions can be managed from the individual Set page and update immediately for other users. The set questions are accessible from the card carousel, animated for front and back flipping actions of each Q/A in the set.



## Technologies used
Python 3.9,
Flask,
SQLAlchemy,
React JS 17,
Redux,
Validator JS

#Project Goals

The primary goals of this project are as follows:

   * To create a user-friendly and intuitive interface for flashcards and Set storage.
   * To implement a Folder system that allows users to easily view their own Sets and recently listed public folders and recently listed sets.
   * To ensure data security and privacy by employing best practices in authentication and authorization.
   * To deliver a functional and reliable Quizlet clone that provides value to its users.
   * Have daily SCRUM meetings.

Feel free to explore the project further and provide feedback on any additional features or improvements you'd like to see.

Happy learning!

# Getting Started

1. Clone the repository and from main branch on GitHub.

2. Install dependencies.

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the **.env** file.

5. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


# DB Schema

![DB Schema](254628535-da3602ec-d307-4374-9032-0160ffb138b6.png)

# API Routes

Comming soon
