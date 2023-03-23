# The ultimate open source & free to use license visibility tool
Gain visibility on all 3rd party licenses and dependencies in your repo, regardless of how big it is - monorepos are supported as well...

Run the tool with either a simple CLI command, or with a handy UI with filtering & exportation capabilities! 
The choice is yours :)

# How to install & run
In order to use the tool you'll need node installed on your machine - https://nodejs.org/en/download

Once you have node installed on your system, clone this repository and do the following steps:

### Using the CLI
* Open your terminal and navigate to the license-check-cli folder in the code
* Run this command: node license-checker.js /path/to/your/code/root/directory
* Wait until the scan is done, and watch the results :)

<img width="828" alt="Screen Shot 2023-03-22 at 11 35 06" src="https://user-images.githubusercontent.com/74436218/226861818-156936cd-9ff8-4b9b-aabe-5ce2a49d3c18.png">
<img width="1512" alt="Screen Shot 2023-03-22 at 11 36 30" src="https://user-images.githubusercontent.com/74436218/226861848-6d0f618b-278e-4ac1-92ef-61be276f2b07.png">

### Using the UI
* Open your terminal and navigate to the backend folder in the code
* Run the command: npm i
* Run the command: node ./src/app.js | note that the backend runs on port 5432, if you would like to change it use the .env file under the backend folder
* Open another instance of the terminal, and navigate to the frontend folder
* Run the command: npm i
* Run the command: npm run start | note that the react frontend runs on port 3000 by default
* Navigate to http://localhost:3000/Licenses
* Enjoy! :)



<img width="1288" alt="Screen Shot 2023-03-23 at 11 32 08" src="https://user-images.githubusercontent.com/74436218/227161457-79dfc28b-42db-43c6-9568-bf6e182a8b05.png">



https://user-images.githubusercontent.com/74436218/226866454-81bf2120-3e61-46f9-afe7-2918713bdff0.mp4


#### Note: currently the CLI doesn't output the path in which the package is used, this functionality exists only in the UI

### Feel free to contact in the discussions for any feature requests & extra suggestions
