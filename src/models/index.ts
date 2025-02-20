import Department from "./Department.js";
import Role from "./Role.js";
import Employee from "./Employee.js";
import queries from "../utils/queries.js";
import inquirer from "inquirer";

Department.hasMany(Role, { foreignKey: "department_id", onDelete: "CASCADE" });
Role.belongsTo(Department, { foreignKey: "department_id" });

Role.hasMany(Employee, { foreignKey: "role_id", onDelete: "CASCADE" });
Employee.belongsTo(Role, { foreignKey: "role_id" });

Employee.hasMany(Employee, { foreignKey: "manager_id" });
Employee.belongsTo(Employee, { foreignKey: "manager_id", as: "manager" });

export { Department, Role, Employee };

const {
  getAllEmployees,
  getAllRoles,
  getAllDepartments,
  addEmployee,
  updateEmployeeManager,
  deleteEmployee,
  deleteRole,
  deleteDepartment,
  viewDepartmentBudget,
} = queries;

const mainMenu = async () => {
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Add Employee",
        "Update Employee Manager",
        "Delete Employee",
        "Delete Role",
        "Delete Department",
        "View Department Budget",
        "Exit",
      ],
    },
  ]);

  switch (choice) {
    case "View All Employees":
      await getAllEmployees();
      break;

    case "View All Roles":
      await getAllRoles();
      break;

    case "View All Departments":
      await getAllDepartments();
      break;

    case "Add Employee":
      await addEmployee();
      break;

    case "Update Employee Manager":
      await updateEmployeeManager();
      break;

    case "Delete Employee":
      await deleteEmployee();
      break;

    case "Delete Role":
      await deleteRole();
      break;

    case "Delete Department":
      await deleteDepartment();
      break;

    case "View Department Budget":
      await viewDepartmentBudget();
      break;

    case "Exit":
      console.log("Exiting Employee Management System. Goodbye!");
      process.exit();
  }

  await mainMenu();
};

export default mainMenu;
