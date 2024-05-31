const {query} = require("../database/db")

const ambilDataUser = async(req,res) => {
   
    try {
        const result = await query("SELECT * FROM users")
        return res.status(200).json({data: result})
    } catch (error) {
        return res.status(400).json({pesan: "ada yang salah", error})
    }
}

module.exports = {
    ambilDataUser
}