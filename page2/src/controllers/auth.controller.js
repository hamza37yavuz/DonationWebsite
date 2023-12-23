const db = require("../db/dbConnection")
const bcrypt = require("bcrypt")

async function createDonator(userData) {
    try {
      const { name, surname, telno } = userData;
  
      const result = await db.query(`
          INSERT INTO donator_info (name, surname, telno)
          VALUES ($1, $2, $3)
          RETURNING *;
      `, [name, surname, telno]);
  
      const addedRow = result.rows[0];
      console.log('Donator başarıyla kaydedildi:', addedRow);
      return addedRow;
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

        if (!name || !surname || !telno) {
            return res.status(400).json({ error: 'Name, surname, and telno are required.' });
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