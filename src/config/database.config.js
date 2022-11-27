
const {MongoClient} = require("mongodb");
require('dotenv').config()
const url = "mongodb://localhost:27017/DevRev"
// const url = "mongodb://localhost:27017/<name_the_cluster>"
let collections = ["flights"]

let flag = false
let dbo

module.exports = {
    connect : (callback) => {
        MongoClient.connect(process.env.MONGODB_URL ||url, async (err, db) => {
            if (err) throw err
            console.log("DB connected !")
            dbo = await db.db("DevRev")
            try {
                collections.forEach((v, index, arr) => {
                    dbo.createCollection("flights", (err, res) => {
                        if (err && err.codeName === 'NamespaceExists') {
                            arr.length = index + 1
                            flag = true
                            console.log(`Collection ${v} exists !`)
                        }
                        else if (!err)console.log("Collection created !")
                    })
                });
            } catch (error) {
                if (!flag) {
                    console.log("\n Error \n")
                    throw error
                } else console.log("Hey user , Collection already exists")
            } finally {
                return callback(err, dbo)
            }
        })

    },

    getdb : () => {return dbo},
}
