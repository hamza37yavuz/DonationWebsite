const db = require("../db/dbConnection")
const bcrypt = require("bcrypt")

async function addWaterWellPart(data) {
  const { donator_id, quantity } = data;

  try {
    // water_well_part tablosuna ekleme yap
    const resultPart = await db.query(`
      INSERT INTO water_well_part (donator_id, quantity, well_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [donator_id, quantity, 1]);

    const addedRowPart = resultPart.rows[0];
    console.log('water_well_part kaydı başarıyla eklendi:', addedRowPart);

    // water_well tablosundaki quantity değerini 1 azalt
    const resultWell = await db.query(`
      UPDATE water_well
      SET quantity = quantity - $1
      WHERE country_id = $2
      RETURNING *;
    `, [quantity, donator_id]);

    const updatedRowWell = resultWell.rows[0];
    console.log('water_well kaydı başarıyla güncellendi:', updatedRowWell);

    return {
      success: true,
      message: 'Water well part ve well kayıtları başarıyla eklendi ve güncellendi',
      data: {
        waterWellPart: addedRowPart,
        waterWell: updatedRowWell
      }
    };
  } catch (error) {
    console.error('Water well part ve well kayıtları eklenirken hata oluştu:', error);
    throw error;
  }
}
async function addSacrificeRecord(userData) {
    try {
      const { donator_id, country_id, state, type } = userData;
      const result = await db.query(`
        INSERT INTO sacrfice (donator_id, country_id, state, sacrifice_type)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `, [donator_id, country_id, state,type]);

      const addedRow = result.rows[0];
      console.log('Sacrifice kaydı başarıyla eklendi:', addedRow);
      return {
        success: true,
        message: 'Sacrifice kaydı başarıyla eklendi',
        data: addedRow
      };
      } catch (error) {
      console.error('Sacrifice kaydı eklenirken hata oluştu:', error);
      throw error;
      }
}
  
  async function createDonator(userData) {
    try {
      const { name, surname, telno, donationtype, donationquantity, donationamount } = userData;
  
      if (donationtype < 1 || donationtype > 3) {
        console.log("donation type invalid");
        return {
          success: false,
          message: 'donation type invalid'
        };
      }
      const result = await db.query(`
        INSERT INTO donator_info (name, surname, telno, donationtype, donationquantity, donationamount)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `, [name, surname, telno, donationtype, donationquantity, donationamount ]);
  
      let addedRow = result.rows[0];
      console.log('Donator başarıyla kaydedildi:', addedRow);
      const donatorData = {
        donator_id: addedRow.id,
        country_id: 1,
        state: 'active',
        type : donationtype,
        quantity: addedRow.donationquantity
      };
      switch (donationtype) {
        case 1:
        case 2:
          const donatorResult = await addSacrificeRecord(donatorData);
          addedRow = donatorResult.data;
          console.log('Kurban başarıyla eklendi');
          break;
        case 3:
          const wellResult = await addWaterWellPart(donatorData);
          addedRow = wellResult.data;
          console.log('Donation Type 3 için özel işlemler yapılıyor.');
          // Örnek: İşlem 3
          break;
        default:
          console.error('Geçersiz donationtype değeri. donationtype 1 ile 3 arasında olmalıdır.');
          throw new Error('Geçersiz donationtype değeri. donationtype 1 ile 3 arasında olmalıdır.');
      }


      return {
        success: true,
        message: 'Donator başarıyla kaydedildi',
        data: addedRow
      };
    } catch (error) {
      console.error('Donator kaydedilirken hata oluştu:', error);
      throw error;
    }
  }

async function createUser(userData){
    // const db = dbConnection.getClient(); // PostgreSQL bağlantı havuzunu al
  try {
      const {username, email, password } = userData;
  
      const result = await db.query(`
          INSERT INTO users (username, email, password)
          VALUES ($1, $2, $3)
          RETURNING *;
      `, [username, email, password]);
  
      console.log('Kullanıcı başarıyla kaydedildi:', result);
      return result; 
    } catch (error) {
      console.error('Kullanıcı kaydedilirken hata oluştu:', error);
      throw error;
    }
  };



const login = async (req,res) => {
    console.log(req.body)
    return res.json(req.body)
}

const register = async (req, res) => {
    try {
        console.log(req.body);

        // email address
        const {email} = req.body

        // Is Mail Registered?
        // const userCheck = await user.findOne({ email })
        // if(userCheck){
        //     console.log("Mail is already registered")
        //     return res.status(400).json({ 
        //         success: false,
        //         message: 'Mail is already registered' });
        // }

        // Only One Admin User
        // const adminUserCount = await user.countDocuments();
        // if (adminUserCount > 1) {
        //     console.log("Admin user limit exceeded");
        //     return res.status(400).json({ success: false, message: 'Admin kullanıcı limiti aşıldı.' });
        // }

        // Hashing Password
        req.body.password = await bcrypt.hash(req.body.password, 10)
        console.log("hash password: " , req.body.password)

        try{
            const userSave = await createUser(req.body)
                .then((response) => {
                    return res.status(201).json({
                        success: true,
                        data : response,
                        message: "Kayıt başarılı"
                    })
                })
                .catch((err) => {
                    console.log("error: " ,err)
                })
        }
        catch(error){
            console.log(error)
        }
        return res.json({ success: true, message: 'Kullanıcı başarıyla kaydedildi.' });
    } catch (error) {
        console.error('Kullanıcı kaydedilirken hata oluştu:', error);

        return res.status(500).json({ 
            success: false,
             message: 'Sunucu hatası.' });
    }
}

const donation = async (req, res) => {
    try {
        const { name, surname, telno } = req.body;
        if (!name || !surname || !telno || telno.length > 11) {
          return res.status(400).json({ error: 'Name, surname, and a valid telno (up to 11 digits) are required.' });
        }
          const newUser = await createDonator(req.body);
    
        res.status(201).json(newUser);
      } catch (error) {
        console.error("Veritabanına ekleme hatası:", error);
        res.status(500).json({ error: "Veritabanına ekleme hatası" });
      }
}

module.exports = {
    login,
    register,
    donation
}
