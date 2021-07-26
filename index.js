const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

  // Arrays
const actionOptions2 = ["Roles", "Departments", "Employee"];
const actionOptions1 = ["View", "Add", "Modify", "Exit"]; //Add delete

let departmentList;
const departmentListQuerry = () => {db.query('SELECT department_name FROM department', (err, res) => {
  if (err) throw err;
  departmentList = res.map(function (obj) {
    return obj.department_name;
  });
})};

let roleList;
const roleListQuerry = () => {db.query('SELECT title FROM roles', (err, res) => {
  if (err) throw err;
  roleList = res;
  // console.log(roleList);
})};


  const actionQuestion = [
    {
      type: 'list',
      message: 'Do you want to View, Add, or Modify (Employee only)?',
      name: 'action',
      choices: actionOptions1,
    }];

  let actionSelected = "View";
  const actionQuestion2 = [
    {
      type: 'list',
      message: `What do you want to ${actionSelected}?`,
      name: 'action2',
      choices: ["Roles", "Departments", "Employee"],
    }];
    
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.HOST,
    port: 3306,
    user: "root",
    password: process.env.PASSWORD,
    database: process.env.DATABASENAME,
  });
  
  db.connect((err) => {
    if (err) throw err;
    console.log(`Welcome to the Employee Management System. Connected as ID: ${db.threadId}`);
    var datetime = new Date();
    console.log(datetime);

    departmentListQuerry();
    roleListQuerry();
    init();

  });

    
  init = () => {
    // Initialize
    selectAction();

  }; //Init




const selectAction = () => {
              inquirer
              .prompt(actionQuestion)                 
              .then((data) => { 
                
                switch(data.action) {
                  case "View":
                    selectTable(data.action);
                    // console.log(data.action);
                    break;
                  case "Add":
                    selectTable(data.action);
                    // console.log(data.action);
                    break;
                    case "Modify":
                      modifyEmployee();
                      // selectTable(data.action);
                      // console.log(data.action);
                      break;
                    case "Exit":
                      db.end();
                    break;
                  default:
                    console.log("Exit");
                }
            });
          };



            const selectTable = (actionSelected) => {
              console.log(`What do you want to ${actionSelected}?`);
            inquirer
            .prompt([  
              {
                type: 'list',
                message: 'Select table:',
                name: 'action2',
                choices: ["Roles", "Departments", "Employee"],
              }])                 
            .then((data) => {

              switch(actionSelected) {
                case "View":
                  viewTables(data.action2);
                  break;
                case "Add":
                  addToTables(data.action2);
                  break;
                  // case "Modify":
                  // modifyRecords(data.action2);
                  //   break;
                default:
                  console.log("Exit");
              }
            });
          }



          const viewTables = (action2Selected) =>{
            switch(action2Selected) {
              case "Roles":
                loadRolesList();
                break;
              case "Departments":
                loadDepartmentsList();
                break;
                case "Employee":
                  loadEmployeeList();
                  break;
              default:
                console.log("Error");
                init();
            }
          };

            const addToTables = (action2Selected) =>{
              switch(action2Selected) {
                case "Roles":
                  addToRolesList();
                  break;
                case "Departments":
                  addToDepartmentsList();
                  break;
                case "Employee":
                  addToEmployeeList();
                    break;
                default:
                  console.log("Error");
                  init();
              }
            };

          //     const modifyRecords = (action2Selected) =>{
          //       switch(action2Selected) {
          //         case "Roles":
          //           modifyRoles();
          //           break;
          //         case "Departments":
          //           modifydepartment();
          //           break;
          //           case "Employee":
          //             modifyEmployee();
          //             break;
          //         default:
          //           console.log("Error");
          //           init();
          //       }
          
          // };




// View Records
            const loadEmployeeList = () => {
              // view all Employees
                db.query('SELECT id AS "Employee ID", first_name AS "Employee First Name", last_name AS "Employee Last Name" FROM employee', (err, res) => {
                  if (err) throw err;
                  console.table(res);
                  init();
                });

              }
                const loadDepartmentsList = () => {
                  // View all Departments
                  db.query('SELECT id AS "Department ID", department_name AS "Department Name" FROM department', (err, res) => {
                    if (err) throw err;
                    // console.log(res);
                    console.table(res);
                    init();
                  });
                }

                  const loadRolesList = () => {
                  // View all Roles
                  db.query('SELECT id AS "Role ID", title AS "Title" FROM roles', (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    init();
                    // return;
                }); 
              };

// Add Records
              // Add to Roles
              const addToRolesList = () => {

                // console.log(departmentList);

                inquirer
                .prompt([  
                  {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the new position title?',
                  },
                        
                  {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the position salary:',
                  },
                  {
                    type: 'list',
                    message: 'Select department:',
                    name: 'department',
                    choices: departmentList,
                  }])                 
                .then((answer) => {
                const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
                db.query(query, [answer.title, answer.salary, answer.department], (err,res) =>{
                if (err) throw err;
                console.log(`Records updated`);
              });
              });
              };


              const addToDepartmentsList = () => {
                inquirer
                .prompt([  
                  {
                    type: 'input',
                    name: 'departmentName',
                    message: 'Enter the new Department Name?',
                  }])                 
                .then((answer) => {
                const query = 'INSERT INTO department (department_name) VALUES (?)';
                db.query(query, [answer.departmentName], (err,res) =>{
                if (err) throw err;
                console.log(`Records updated`);
              });
              });
              };


              const addToEmployeeList = () => {
                inquirer
                .prompt([  
                  {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter the new employee first name?',
                  },
                  {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter the new employee last name?',
                  },
                  {
                    type: 'list',
                    message: 'Select new employee role:',
                    name: 'role',
                    choices: [1, 2, 3],
                  },
                  {
                    type: 'list',
                    message: 'Select new employee manager:',
                    name: 'manager',
                    choices: [1, 2, 3],
                  }
                ])                 
                .then((answer) => {
                const query = 'INSERT INTO department (department_name) VALUES (?)';
                db.query(query, [answer.firstName, answer.lastName, answer.role, answer.manager_id], (err,res) =>{
                if (err) throw err;
                console.log(`Records updated`);
              });
              });
              };

              // Modify

    const modifyEmployee = () => {
    inquirer
    .prompt([ 
    {
      type: 'list',
      message: 'Select the employee:',
      name: 'employee',
      choices: [1, 2, 3],
    }, 
    {
      type: 'list',
      message: 'Select the new manager:',
      name: 'manager',
      choices: [1, 2, 3],
    }
  ])                 
  .then((answer) => {
  const query = 'UPDATE employee SET manager_id = ? WHERE id = ?';
  db.query(query, [answer.manager_id, answer.id], (err,res) =>{
  if (err) throw err;
  console.log(`Records updated`);
});
});
};
              
            
              // db.end();



























// const roleQuestion = [
  
//     {
//       type: 'list',
//       message: 'What is the role of the teammate you want to add?',
//       name: 'addNew',
//       choices: ['Manager','Engineer', 'Intern', 'Finish the Team'],
//     }];

// const questions = [
  
//     {
//         type: 'input',
//         name: 'name',
//         message: 'Enter the Employee Name?',
//       },
    
//       {
//         type: 'input',
//         name: 'id',
//         message: 'Enter the Employee ID:',
//       },
    
//       {
//         type: 'input',
//         name: 'email',
//         message: 'Enter the Employee Email Address:',
//       }];

//   const continueQuestion = [
//       {
//         type: 'list',
//         name: 'continue',
//         message: 'Do you want to add a new teammate?',
//         choices:['Yes','No'],
//       }];

// // Specific Questions
//     const managerQuestion = [
//       {
//       type: 'input',
//       name: 'officeNumber',
//       message: 'Enter the office number:',
//       }];

//     const engineerQuestion = [
//       {
//         type: 'input',
//         name: 'github',
//         message: 'Enter the GitHub username:',
//       }];

//       const internQuestion = [
//         {
//           type: 'input',
//           name: 'school',
//           message: 'Enter the school name:',
//         }];
  

  
// //Create a function to initialize app
//   function init() {
//     console.log("Enter the Manager information:")
//     employeeQuestions('Manager');
//   }
 
//   function employeeQuestions(roleIn){
//       inquirer
//       .prompt(questions)
         
//       .then((data) => {
//         switch(roleIn){
//           case 'Manager':
//             inquirer
//             .prompt(managerQuestion)      
//             .then((datas) => {
//               data.officeNumber = datas.officeNumber;
//               const newTeamMember = new Manager(data);
//               newTeamMember.role = newTeamMember.getRole();
//               newTeamMember.specific=newTeamMember.getofficeNumber();
//               console.log(`New Team Member created: ${newTeamMember.role}`);
//               createCard(newTeamMember);
//               proceedQuestion();
//             });
//             break;
            
//           case 'Engineer':
//             inquirer
//             .prompt(engineerQuestion)      
//             .then((datas) => {
//               data.github=datas.github;
//               const newTeamMember = new Engineer(data);
//               newTeamMember.role = newTeamMember.getRole();
//               newTeamMember.specific=newTeamMember.getGithub();
//               console.log(`New Team Member created: ${newTeamMember.role}`);
//               createCard(newTeamMember);
//               proceedQuestion();
//             });
//             break;
        
//           case 'Intern':
//             inquirer
//             .prompt(internQuestion)      
//             .then((datas) => {
//               data.school=datas.school;
//               const newTeamMember = new Intern(data);
//               newTeamMember.role = newTeamMember.getRole();
//               newTeamMember.specific=newTeamMember.getSchool();
//               console.log(`New Team Member created: ${newTeamMember.role}`);
//               createCard(newTeamMember);
//               proceedQuestion();
//             });
//             break;
            
//             default:
//               createHTML();            
//           }         


//       });
  
//   }

// function proceedQuestion(){
//   inquirer
//   .prompt(continueQuestion)
    
//   .then((data) => {
//     console.log(data);
//     if (data.continue === 'Yes'){
//       role();
//     }
//     else{
//       createHTML();  
//     }
//   });
// }

//   function role(){
//     inquirer
//     .prompt(roleQuestion)       
//     .then((data) => {
//       //   writeToFile('filename', genMarkdown.generateMarkdown(data));
//         console.log(data);    //Debug
//         if (data.addNew =='Finish the Team'){
//           createHTML(); 
//         }
//         else{
//           employeeQuestions(data.addNew);
//         }
//     });
// }




// const headerHTML = `<!doctype html>
// <html lang="en">
//   <head>
//     <meta charset="utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

//     <title>Team Profile Page</title>
//   </head>
//   <body>

//   <!-- Sart Jumbo -->
//     <div class="jumbotron jumbotron-fluid bg-primary">
//         <div class="container text-white text-center">
//           <h1 class="display-4">Team Profile Page</h1>
//           <p class="lead">Software Development Team</p>
//         </div>
//       </div>
// <!-- End Jumbo -->
// <!-- Start Card Container -->
// <div class="container">
//     <div class="row gx-0">
//     <!-- Cards -->`;

// const footerHTML = `<!-- /Cards -->
// </div>
// </div>
// <!-- End Card Container -->
// <!-- Scripts -->
// <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
// </body>
// </html>`;

// function createCard(newTeamMember){

//   const newCard = `
//   <div class="card m-2" style="width: 18rem;">
//   <div class="card-header text-center">
//     <h5 class="card-title">${newTeamMember.name}</h5>
//     <h6 class="card-subtitle mb-2 text-muted">${newTeamMember.role}</h6>
//   </div>
//     <div class="card-body">
//       <p class="card-text">ID: ${newTeamMember.id}</p>
//       <p class="card-text">Email: ${newTeamMember.email}</p>
//       <p class="card-text">${newTeamMember.specific}</p>
//     </div>
//   </div>`;

//   // cardArray.push(newCard);
//   // console.log(cardArray);
//   cardString= cardString.concat(newCard);
//     // console.log(`Card String ${cardString}`);

// }

// function createHTML(){

//   // let bodyHTML = cardArray.toString();
//     // let fullHTML = headerHTML+bodyHTML+footerHTML;

//     let fullHTML = headerHTML+cardString+footerHTML;

//   // console.log(fullHTML);

//   fs.writeFile('./dist/index.html', fullHTML, (err) =>
//   err ? console.log(err) : console.log('Successfully created index.html!')
// );
// }

//   // Function call to initialize app
//   init();