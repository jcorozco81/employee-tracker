# employee-tracker ![License Badge](https://img.shields.io/badge/License-MIT%20License-blue)
Employee Tracking System

  
## Description
***

The **Employee Tracking System** was created to support the Human Resources deparment of an organization, to have a better understanding of their teams, an automated Team Profile generator was created. The **Employee Tracking System** allows the user to store employee information such as employe id number, name, salary, position/role and the manager whom the employee reports. The system provides an interface so the user can add, modify or view the records. The application was created to run in the **Node JS** runtime environment.


## Table of Contents
***  

- [Installation](#installation)
- [Usage](#usage)
- [How to Contribute](#How)
- [Tests](#Tests)
- [Questions](#Questions)
- [License](#license)

  
  
## Installation
***

  The installation can be completed by following these instructions:
    
1. To install a Node JS project, install [Node JS](https://nodejs.org/)       

2. Clone the GitHub repository to you local computer. Click on the following link.
 
  * Repository link : https://github.com/jcorozco81/employee-tracker

3. Download and install [MySQL Community](https://dev.mysql.com/downloads/installer/).

4. Load the ``schema.sql`` to create the database and tables. At the root directory, open a mysql console and run the follwing command: ``SOURCE db/schema.sql``;


Additional packages required: 

1. To install additional packages, first initialize the repository with a ```package.json``` file by running ```npm init -y```.

[Inquirer package](https://www.npmjs.com/package/inquirer). 

2. To install inquirer run the following command: ```npm i inquirer --save```. This will add it to the list of dependencies. 

[mysql package](https://www.npmjs.com/package/mysql). 

3. To install mysql run the following command: ```npm i mysql```. This will add it to the list of dependencies. 

[dotenv package](https://www.npmjs.com/package/dotenv). 

4. To install dotenv run the following command: ```npm i dotenv```. This will add it to the list of dependencies. 
  
**Note** The following packages are highly recommended but not required.

[console.table package](https://www.npmjs.com/package/console.table). 

5. To install console.table run the following command: ```npm i console.table```. This will add it to the list of dependencies. 

## Usage
***
   
   1. To execute the script, open a Git terminal on the main project folder (cloned folder) Run the following command: ```node index.js```.

   2. A series of navigation prompts will be displayed, enter the information to add, view or modify records.


* A video with a demo of the script of the script can be found here: https://drive.google.com/drive/folders/1dtQot8GOPrvie7qggSCOe3-hIDd3X9EQ
  


## How to Contribute
***

  Developers who are interested in contributing ideas for this application must agree to follow and comply with the Contributor Covetnant: Code of Conduct. The Contributor Covenant Code of Conduct can be found in the following address:

  [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/code_of_conduct.md/)



## Tests
***
  No test cases were created for this project.



## Questions
***
  
  You can find additional projects on my github page: https://github.com/jcorozco81.

  If you have any questions please contact me at my E-Mail address: jcorozco@gmail.com.



## License
***

Copyright (c) 2021 jcorozco81.



This software/code is licensed under the MIT License; to use this software/code you must agree to follow and comply the License. A copy of the License can be found at:

https://www.mit.edu/~amini/LICENSE.md