[![Version](https://img.shields.io/static/v1?label=version&message=2.0.0&color=blue)](https://shields.io/)
[![NPM](https://img.shields.io/static/v1?label=npm&message=6.8.5&color=blue)](https://shields.io/)
[![NODE](https://img.shields.io/static/v1?label=node&message=10.12.8&color=success)](https://shields.io/)
[![MYSQL](https://img.shields.io/static/v1?label=mysql&message=8.0.10&color=blueviolet)](https://shields.io/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://shields.io/)

### [🌐 Website](https://ask-away-front.onrender.com/)

### API Hosted On

- **[ask-away-q5j9.onrender.com](https://ask-away-q5j9.onrender.com) (Primary)**

As the name suggests, this project is a clone of a famous Q/A website for professional and enthusiast programmers built solely by me using a completely different stack.

## My Tech Stack (MERN)

#### Front-end

- Front-end Framework: `React.js (with Redux)`
- Styling: `SASS` and `BOOTSTRAP`

#### Back-end

- For handling index requests: `Node.js with Express.js Framework`
- As Database: `MongoDB`
- API tested using: `Thunder Client`

## Guidelines to setup

There are two ways to setup the project: manually or using the Dockerfile. Read below for more details:

### Manual Setup

1. Open your local CLI -

   ```
   mkdir Ask_Away
   cd Ask_Away
   ```

2. Setup the backend code -

   **NOTE:** For Frontend Developers, if they dont want to setup the Backend Code, they can skip the Step 2, and make sure they follow the optional step mentioned in Step 4

   - Create a `.env` file and the format should be as given in `.env.example`.
   - Clone the code & install the modules-

     ```
     git clone https://github.com/Ujjwalvinze/Ask_Away
     cd Ask_Away

     npm install
     ```

   - Run the index `yarn start`.

3. Open a new CLI terminal and goto the root `Ask_Away` folder you created in the first step.
4. Setup the Frontend code -

   - Clone the code & install the modules-

     ```
     git clone https://github.com/Ujjwalvinze/Ask_Away
     cd Ask_Away/View

     yarn install
     ```

   - Run the client index `npm start`.
