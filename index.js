const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

// Arrays
const actionOptions2 = ["Roles", "Departments", "Employee"];
const actionOptions1 = ["View", "Add", "Modify", "Exit"]; //Add delete

// Load information from Data Base
let departmentList;
const departmentListQuery = () => {
  db.query("SELECT department_name FROM department", (err, res) => {
    if (err) throw err;
    departmentList = res.map(function (obj) {
      return obj.department_name;
    });
  });
};

let roleList;
const roleListQuery = () => {
  db.query("SELECT title FROM roles", (err, res) => {
    if (err) throw err;
    roleList = res.map(function (obj) {
      return obj.title;
    });
  });
};

let employeeList;
const employeeListQuery = () => {
  db.query("SELECT id, first_name, last_name FROM employee", (err, res) => {
    if (err) throw err;
    employeeList = res.map(function (obj) {
      return obj.first_name + "," + obj.last_name;
    });
    // console.log(employeeList);
  });
};

const actionQuestion = [
  {
    type: "list",
    message: "Do you want to View, Add, or Modify (Employee only)?",
    name: "action",
    choices: actionOptions1,
  },
];

let actionSelected = "View";
const actionQuestion2 = [
  {
    type: "list",
    message: `What do you want to ${actionSelected}?`,
    name: "action2",
    choices: actionOptions2,
  },
];

require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.HOST,
  port: 3306,
  user: "root",
  password: process.env.PASSWORD,
  database: process.env.DATABASENAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log(
    `Welcome to the Employee Management System. Connected as ID: ${db.threadId}`
  );
  var datetime = new Date();
  console.log(datetime);

  init();
  departmentListQuery();
  roleListQuery();
  employeeListQuery();
});

init = () => {
  console.log("Init");
  // Initialize
  selectAction();
}; //Init

const selectAction = () => {
  inquirer.prompt(actionQuestion).then((data) => {
    switch (data.action) {
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
        type: "list",
        message: "Select table:",
        name: "action2",
        choices: actionOptions2,
      },
    ])
    .then((data) => {
      switch (actionSelected) {
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
};

const viewTables = (action2Selected) => {
  switch (action2Selected) {
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

const addToTables = (action2Selected) => {
  switch (action2Selected) {
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
  // db.query('SELECT id AS "Employee ID", first_name AS "Employee First Name", last_name AS "Employee Last Name" FROM employee', (err, res) => {
  db.query(
    'SELECT A.id AS "Employee ID", A.first_name AS "Employee First Name", A.last_name AS "Employee Last Name", roles.title AS "Title", roles.salary AS "Salary", department.department_name AS "Department", B.first_name AS "Manager First Name", B.last_name AS "Manager Last Name" FROM employee A     LEFT JOIN roles ON roles_id=roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employee B on B.id = A.manager_id;',
    (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
};
const loadDepartmentsList = () => {
  // View all Departments
  db.query(
    'SELECT id AS "Department ID", department_name AS "Department Name" FROM department',
    (err, res) => {
      if (err) throw err;
      // console.log(res);
      console.table(res);
      init();
    }
  );
};

const loadRolesList = () => {
  // View all Roles
  db.query(
    'SELECT id AS "Role ID", title AS "Title" FROM roles',
    (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
      // return;
    }
  );
};

// Add Records //
//------------//

// Add to Roles
const addToRolesList = () => {
  // console.log(departmentList);

  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the new position title?",
      },

      {
        type: "input",
        name: "salary",
        message: "Enter the position salary:",
      },
      {
        type: "list",
        message: "Select department:",
        name: "department",
        choices: departmentList,
      },
    ])
    .then((answer) => {
      const query_s = "SELECT id FROM department WHERE department_name = ?";
      db.query(query_s, [answer.department], (err, res_s) => {
        if (err) throw err;

        id_query = res_s.map(function (obj) {
          return obj.id;
        });

        const query =
          "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
        db.query(query, [answer.title, answer.salary, id_query], (err, res) => {
          if (err) throw err;
          console.log(`Records updated`);
          init();
        });
      });
    });
};

const addToDepartmentsList = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Enter the new Department Name?",
      },
    ])
    .then((answer) => {
      const query = "INSERT INTO department (department_name) VALUES (?)";
      db.query(query, [answer.departmentName], (err, res) => {
        if (err) throw err;
        console.log(`Records updated`);
        init();
      });
    });
};

const addToEmployeeList = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the new employee first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the new employee last name?",
      },
      {
        type: "list",
        message: "Select new employee role:",
        name: "role",
        choices: roleList,
      },
      {
        type: "list",
        message: "Select new employee manager:",
        name: "manager",
        choices: employeeList,
      },
    ])
    .then((answer) => {
      const query_i = "SELECT id FROM roles WHERE title = ?";
      db.query(query_i, [answer.role], (err, res_id) => {
        if (err) throw err;

        id_query = res_id.map(function (obj) {
          return obj.id;
        });

        const query_mn =
          "SELECT id FROM employee WHERE first_name = ? AND last_name = ?";
        let managerName = answer.manager.split(",");
        db.query(query_mn, [managerName[0], managerName[1]], (err, res_mn) => {
          if (err) throw err;

          mn_query = res_mn.map(function (obj) {
            return obj.id;
          });

          const query =
            "INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)";
          db.query(
            query,
            [answer.firstName, answer.lastName, id_query, mn_query],
            (err, res) => {
              if (err) throw err;
              console.log(`Records updated`);
              init();
            }
          );
        });
      });
    });
};

// Modify

const modifyEmployee = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Select the employee:",
        name: "employee",
        choices: employeeList,
      },
      {
        type: "list",
        message: "Select new employee role:",
        name: "role",
        choices: roleList,
      },

      // {
      //   type: 'list',
      //   message: 'Select the new manager:',
      //   name: 'manager',
      //   choices: employeeList,
      // }
    ])
    .then((answer) => {
      const query_en =
        "SELECT id FROM employee WHERE first_name = ? AND last_name = ?";
      let employeeName = answer.employee.split(",");
      db.query(query_en, [employeeName[0], employeeName[1]], (err, res_en) => {
        if (err) throw err;

        eid_query = res_en.map(function (obj) {
          return obj.id;
        });

        const query_i = "SELECT id FROM roles WHERE title = ?";
        db.query(query_i, [answer.role], (err, res_id) => {
          if (err) throw err;

          id_query = res_id.map(function (obj) {
            return obj.id;
          });

          // const query_mn = 'SELECT id FROM employee WHERE first_name = ? AND last_name = ?';
          // let managerName = answer.manager.split(",");
          // db.query(query_mn, [managerName[0], managerName[1]], (err,res_mn) =>{
          //   if (err) throw err;

          //   mid_query = res_mn.map(function (obj) {
          //     return obj.id;
          //   });

          const query = "UPDATE employee SET roles_id = ? WHERE id = ?";
          db.query(query, [id_query, eid_query], (err, res) => {
            if (err) throw err;
            console.log(`Records updated`);
            init();
          });
        });
      });
    });
};

// db.end();
