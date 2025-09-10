const connectDB = require("./Db");
const connectSchema = require("../Schema/Demo");

class Database_Acount {
    Select_M = async (id, Callback) => {
        try {
            await connectDB();
            const result = await connectSchema.find({ _id: id });
            Callback(null, result);
        } catch (error) {
            Callback(error);
        }
    };


    Update__M = async (id, dataAddNew, Callback) => {
        try {
            await connectDB();
            const result = await connectSchema.findByIdAndUpdate(id, dataAddNew, { new: true });
            Callback(null, result);
        } catch (error) {
            Callback(error);
        }
    }


}

module.exports = Database_Acount;
