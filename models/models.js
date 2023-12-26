const { Sequelize, DataTypes } = require("sequelize");
const { connectDB } = require("../db/connection");

const dbModel = async () => {
  const sequelize = await connectDB(process.env.DB_PASSWORD);

  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    },
    {
      tableName: "users",
      timestamps: false,
      hooks: {
        beforeValidate: (user, options) => {
          if (!user.username || !user.email || !user.password) {
            const error = new Error(
              "Username, email, and password are required."
            );
            error.status = 400;
            throw error;
          }
        },
      },
    }
  );

  const WaterWell = sequelize.define(
    "WaterWell",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      country_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "water_well",
      timestamps: false,
    }
  );

  const DonatorInfo = sequelize.define(
    "DonatorInfo",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      telno: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      donationtype: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      donationquantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      donationamount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    },
    {
      tableName: "donator_info",
      timestamps: false,
      hooks: {
        beforeValidate: (donator, options) => {
          if (
            !donator.name ||
            !donator.surname ||
            !donator.telno ||
            !donator.donationtype ||
            !donator.donationquantity ||
            !donator.donationamount
          ) {
            const error = new Error(
              "Name, surname, telno, donationtype, donationquantity and donationamount are required."
            );
            error.status = 400;
            throw error;
          }
        },
      },
    }
  );

  const WaterWellPart = sequelize.define(
    "WaterWellPart",
    {
      donator_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      well_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "water_well_part",
      timestamps: false,
    }
  );

  return { User, WaterWell, DonatorInfo, WaterWellPart };
};

module.exports = {
  dbModel,
};
