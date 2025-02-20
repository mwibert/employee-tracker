"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const queries_js_1 = __importDefault(require("../src/utils/queries.js"));
const { getAllEmployees, getAllRoles, getAllDepartments, addEmployee, updateEmployeeManager, deleteEmployee, deleteRole, deleteDepartment, viewDepartmentBudget, } = queries_js_1.default;
const mainMenu = () => __awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    console.log("🌟 EMPLOYEE MANAGEMENT SYSTEM 🌟\n");
    const { choice } = yield inquirer_1.default.prompt([
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
            yield getAllEmployees();
            break;
        case "View All Roles":
            yield getAllRoles();
            break;
        case "View All Departments":
            yield getAllDepartments();
            break;
        case "Add Employee":
            yield addEmployee();
            break;
        case "Update Employee Manager":
            yield updateEmployeeManager();
            break;
        case "Delete Employee":
            yield deleteEmployee();
            break;
        case "Delete Role":
            yield deleteRole();
            break;
        case "Delete Department":
            yield deleteDepartment();
            break;
        case "View Department Budget":
            yield viewDepartmentBudget();
            break;
        case "Exit":
            console.log("👋 Exiting Employee Management System. Goodbye!");
            process.exit();
    }
    setTimeout(() => mainMenu(), 1000);
});
exports.default = mainMenu;
