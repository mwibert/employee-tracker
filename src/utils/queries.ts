import { Employee, Role, Department } from "../models/index.js";
import inquirer from "inquirer";

const getAllEmployees = async (): Promise<void> => {
  const employees = await Employee.findAll({ include: [Role] });
  console.table(
    employees.map((emp) => ({
      ID: emp.id,
      Name: `${emp.first_name} ${emp.last_name}`,
      Role: emp.role_id ? `Role ${emp.role_id}` : "No Role",
      Manager: emp.manager_id ? emp.manager_id : "No Manager",
    }))
  );
};

const getAllRoles = async (): Promise<void> => {
  const roles = await Role.findAll({ include: [Department] });
  console.table(
    roles.map((role) => ({
      ID: role.id,
      Title: role.title,
      Salary: role.salary,
      Department: role.department_id
        ? `Department ${role.department_id}`
        : "No Department",
    }))
  );
};

const getAllDepartments = async (): Promise<void> => {
  const departments = await Department.findAll();
  console.table(
    departments.map((dep) => ({
      ID: dep.id,
      Name: dep.name,
    }))
  );
};

const addEmployee = async (): Promise<void> => {
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    { type: "input", name: "first_name", message: "Enter first name:" },
    { type: "input", name: "last_name", message: "Enter last name:" },
    { type: "input", name: "role_id", message: "Enter role ID:" },
    {
      type: "input",
      name: "manager_id",
      message: "Enter manager ID (or leave blank):",
    },
  ]);

  // Validate that the entered role exists to prevent foreign key errors
  const roleExists = await Role.findByPk(parseInt(role_id));
  if (!roleExists) {
    console.log(`Role with ID ${role_id} does not exist. Cannot add employee.`);
    return;
  }

  await Employee.create({
    first_name,
    last_name,
    role_id: parseInt(role_id),
    manager_id: manager_id ? parseInt(manager_id) : null,
  });

  console.log("Employee added successfully.");
};

const updateEmployeeManager = async (): Promise<void> => {
  const { employee_id, manager_id } = await inquirer.prompt([
    { type: "input", name: "employee_id", message: "Enter Employee ID:" },
    { type: "input", name: "manager_id", message: "Enter New Manager ID:" },
  ]);

  await Employee.update(
    { manager_id: manager_id ? parseInt(manager_id) : null },
    { where: { id: parseInt(employee_id) } }
  );

  console.log(`Employee ${employee_id} manager updated to ${manager_id}.`);
};

const deleteEmployee = async (): Promise<void> => {
  const { employee_id } = await inquirer.prompt([
    {
      type: "input",
      name: "employee_id",
      message: "Enter Employee ID to delete:",
    },
  ]);

  await Employee.destroy({ where: { id: parseInt(employee_id) } });

  console.log(`Employee ${employee_id} deleted.`);
};

const deleteRole = async (): Promise<void> => {
  const { role_id } = await inquirer.prompt([
    { type: "input", name: "role_id", message: "Enter Role ID to delete:" },
  ]);

  await Role.destroy({ where: { id: parseInt(role_id) } });

  console.log(`Role ${role_id} deleted.`);
};

const deleteDepartment = async (): Promise<void> => {
  const { department_id } = await inquirer.prompt([
    {
      type: "input",
      name: "department_id",
      message: "Enter Department ID to delete:",
    },
  ]);
  await Department.destroy({ where: { id: parseInt(department_id) } });

  console.log(`Department ${department_id} deleted.`);
};

const viewDepartmentBudget = async (): Promise<void> => {
  const { department_id } = await inquirer.prompt([
    {
      type: "input",
      name: "department_id",
      message: "Enter Department ID to calculate budget:",
    },
  ]);

  const roles = await Role.findAll({
    where: { department_id: parseInt(department_id) },
    include: [
      {
        model: Employee,
        attributes: ["id"],
      },
    ],
  });

  const totalBudget = roles.reduce((sum, role) => {
    const employeeCount = role.employees?.length || 0;
    return sum + role.salary * employeeCount;
  }, 0);

  console.log(`Total budget for Department ${department_id}: $${totalBudget}`);
};

const queries = {
  getAllEmployees,
  getAllRoles,
  getAllDepartments,
  addEmployee,
  updateEmployeeManager,
  deleteEmployee,
  deleteRole,
  deleteDepartment,
  viewDepartmentBudget,
};

export default queries;
