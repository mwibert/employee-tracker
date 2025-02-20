import inquirer from "inquirer";
import queries from "../src/utils/queries.js";

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

const mainMenu = async (): Promise<void> => {
  console.clear();
  console.log("EMPLOYEE MANAGEMENT SYSTEM \n");

  const { choice }: { choice: string } = await inquirer.prompt([
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
      console.log("👋 Exiting Employee Management System. Goodbye!");
      process.exit();
  }

  setTimeout(() => mainMenu(), 1000);
};

export default mainMenu;
