const connectDB = require('./db/connect')

const populateProducts = async () => {
    try{
        await connectDB(process.env.MONGO_URI)

        //delete everything

        //add everything

        console.log('populate.js ran Successfully')
    }catch(error){
        console.log(error)
    }
}

module.exports = populateProducts;