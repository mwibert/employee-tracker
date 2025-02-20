import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";

interface DepartmentAttributes {
  id?: number;
  name: string;
}

class Department
  extends Model<DepartmentAttributes>
  implements DepartmentAttributes
{
  public id!: number;
  public name!: string;
}

Department.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { sequelize, tableName: "department", timestamps: false }
);

export default Department;
