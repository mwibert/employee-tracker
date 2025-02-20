import { Model, DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

class Employee extends Model {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public role_id!: number;
  public manager_id!: number | null;
}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "employee",
    timestamps: false,
  }
);

export default Employee;
