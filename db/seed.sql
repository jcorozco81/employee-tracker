-- Departments

INSERT INTO department (id, department_name)
VALUES  (1, "Quality"),
        (2, "Engineering"),
        (3, "Finance"),
        (4, "Operations"),
        (5, "Materials"),
        (6, "Human Resources");

-- roles

INSERT INTO roles (id, title, salary, department_id)
VALUES  (1, "General Manager", 150000.00, 4),
-- Quality Dept 1
        (2, "Quality Manager", 110000.00, 1),
        (3, "Quality Engineer", 75000.00, 1),
        (4, "Senior Quality Engineer", 90000.00, 1),
        (5, "Quality Inspector", 50000.00, 1),
-- Engineering Dept 2
        (6, "Engineering Manager", 120000.00, 2),
        (7, "Enginner", 70000.00, 2),
        (8, "Senior Enginner", 85000.00, 2),
        (9, "Technician", 45000.00, 2),
        (10, "Master Technician", 60000.00, 2),
-- FInance Dept 3
        (11, "Comptroller", 120000.00, 3),
        (12, "Finance Specialist", 80000.00, 3),
        (13, "Finance Clerk", 50000.00, 3),   
        (14, "Accountant", 70000.00, 3), 
-- Production Dept 4
        (15, "Production Manager", 120000.00, 4),
        (16, "Manufacturing Supervisor", 60000.00, 4),
        (17, "Assembly Line Leader", 45000.00, 4),
        (18, "Assembler", 35000.00, 4),
        (19, "Machine Operator", 40000.00, 4),
-- Materials Dept 5
        (20, "Materials Manager", 120000.00, 5),
        (21, "Buyer", 55000.00, 5),
        (22, "Planner", 70000.00, 5),
-- HR Dept 6
        (23, "Human Resources Manager", 120000.00, 6),
        (24, "Human Resources Specialist", 55000.00, 6),
        (25, "Clerk", 45000.00, 6);

-- Employee

INSERT INTO employee (id, first_name, last_name, roles_id, manager_id)
VALUES  (1, "Juan", "Orozco", 6, 12),
        (2, "Peter", "Shadwill", 10, 1),
        (3, "Kevin", "Gibbons", 8, 1),
        (4, "Matthew", "Smith", 9, 1),
        (5, "Carla", "Knight", 7, 1),
        (6, "Hector", "Mendez", 9, 1),
        (7, "Mike", "Lee", 2, 1),
        (8, "Stephanie", "King", 4, 7),
        (9, "Caroline", "Zimmer", 3, 7),
        (10, "Patrick", "Miller", 5, 7),
        (11, "Scott", "Reyes", 10, 1),
        (12, "Daniel", "Dzurnak", 1, NULL);


       

       
