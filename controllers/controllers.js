const { dbModel } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Sequelize, DataTypes } = require("sequelize");

async function saveSacrificeDonation(data) {
  try {
    const { Sacrifice } = await dbModel();
    const sacrifice = await Sacrifice.create({
      donator_id: data.donator_id,
      country_id: data.country_id,
      state: data.state,
      sacrifice_type: data.type,
    });
    return { success: true, message: 'Sacrifice created successfully', data: sacrifice };

  } catch (error) {
    console.error("Error creating Sacrifice:", error);
    throw error; // Hata durumunda hatayı yukarıya fırlat
  }
}

async function addWaterWellPart(data) {
  
  try {
    const { donator_id, quantity } = data;
    const { WaterWellPart, WaterWell } = await dbModel();
    const waterWellPart = await WaterWellPart.create({
      donator_id:donator_id,
      quantity:quantity,
      well_id: 1
    });
    // Update water_well table
    const updatedWaterWell = await WaterWell.update(
      { quantity: Sequelize.literal(`quantity - ${quantity}`) },
      { 
        where: { country_id: data.country_id },
        returning: true,
      }
    );

    // Check if any rows were affected
    if (updatedWaterWell[0] === 0) {
      throw new Error("No rows were updated in water_well table.");
    }
    
    return waterWellPart;
  } catch (error) {
    console.error('Error adding water well part:', error);
    throw error;
  }
}

// DONATORINFO İSLEMLERİ

const saveDonation = async (req, res) => {

  try {
  // Donationtype check
  if (req.body.donationtype < 1 || req.body.donationtype > 3 ||typeof req.body.donationtype !== 'number') {
    console.log("donation type invalid");
    return res.status(400).json({
      success: false,
      message: 'donation type invalid'
    });
  }
    const type_donation = req.body.donationtype
    // Donaterinfo insert
    const { DonatorInfo } = await dbModel();
    const donatorInfo = await DonatorInfo.create({
      name: req.body.name,
      surname: req.body.surname,
      telno: req.body.telno,
      donationtype: req.body.donationtype,
      state: 'created',
      donationquantity: req.body.donationquantity,
      donationamount: req.body.donationamount
    });
    console.log("Donator ID:", donatorInfo);
    // Donator data prepared
    const data = {
      donator_id: donatorInfo.id,
      country_id: 1,
      state: 'active',
      type : type_donation,
      quantity: req.body.donationquantity
    };
    // donationtype 1 sheep
    // donationtype 2 cattle
    // donationtype 3 waterwell
    switch (req.body.donationtype) {
      case 1:
      case 2:
        try {
          const donatorResult = await saveSacrificeDonation(data);
          console.log('Kurban başarıyla eklendi');
          res.status(201).json({
            success: true,
            message: 'Sacrifice kaydı başarıyla eklendi',
            data: donatorResult
          });
        } catch (error) {
          console.error("Error saveSacrificeDonation:", error);
          res.status(500).json({
            success: false,
            message: "Internal Server Error"
          });
        }
        break
      case 3:
        try {
          const wellResult = await addWaterWellPart(data);
          console.log('Kuyu işlemleri yapıldı.');
          res.status(201).json({
            success: true,
            message: 'Well kaydı başarıyla eklendi',
            data: wellResult
          });
        } catch (error) {
          console.error('Error addWaterWellPart:', error);
          res.status(500).json({
            success: false,
            message: 'Internal Server Error'
          });
          
        }
        break
    }

  } catch (error) {
    console.error("Error creating user:", error);

    if (error.status === 400) {
      return res.status(400).json({ success: false, message: error.message });
    } else {
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
};



const getUsers = async (req, res) => {
  try {
    const { User } = await dbModel();
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { User } = await dbModel();
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });
    res.status(201).json({ user });
  } catch (error) {
    console.error("Error creating user:", error);

    if (error.status === 400) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const getWaterWellQuantity = async (req, res) => {
  try {
    const { WaterWell } = await dbModel();
    const water_well_quantity = await WaterWell.findAll();
    res.json(water_well_quantity);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};






// async function saveWaterWellDonation(data){
//   const { donator_id, quantity } = data;
//   try {
//     const { WaterWell } = await dbModel();
//     const waterWell = await WaterWell.create({
//       donator_id: donator_id,
//       quantity: quantity,
//       well_id: 1
//     });
//     res.status(201).json({ waterWell });
//     await addWaterWellPart({
//       donator_id: 1,
//       quantity: req.body.quantity,
//     });
//   } catch (error) {

//     console.error("Error creating user:", error);

//     if (error.status === 400) {
//       res.status(400).json({ error: error.message });
//     } else {
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// };




const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { User } = await dbModel();

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(400).json({ error: "User not found.login" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ error: "Password is incorrect.login" });
      return;
    }

    const { id, username } = user;
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
      expiresIn: 30,
    });

    res.status(200).json({ msg: "User created", token });
  } catch (error) {
    console.error("Error login:", error);
    res.status(500).json({ error: "Internal Server Error login" });
  }
};

module.exports = {
  getUsers,
  createUser,
  getWaterWellQuantity,
  login,
  saveDonation

};
