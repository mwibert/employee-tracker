import { Model, DataTypes } from "sequelize";
import sequelize from "../db/connection.js";
import Employee from "./Employee.js";

interface RoleAttributes {
  id: number;
  title: string;
  salary: number;
  department_id: number;
  employees?: Employee[];
}

class Role extends Model implements RoleAttributes {
  public id!: number;
  public title!: string;
  public salary!: number;
  public department_id!: number;
  public employees?: Employee[];
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "role",
    timestamps: false,
  }
);

export default Role;
