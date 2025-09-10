const Connect_Select_Model = require("../Model/Demo");
const Connect_Data_Model = new Connect_Select_Model();


class User_Controler {
    Select = async (req, res, next) => {
        const _id = req.params.ID;
        Connect_Data_Model.Select_M(_id, (error, result) => {
            if (error) return next(error);
            res.status(200).json({ data: result });
        });
    }


    Update = async (req, res, next) => {
        const _id = req.params.ID;
        const dataEdit = {
            lat: req.body.lat,
            lng: req.body.lng,
            speed: req.body.speed,
            status: req.body.status,
            updatedAt: req.body.updatedAt
        }

        Connect_Data_Model.Update__M(_id, dataEdit, (error, result) => {
            if (error) return next(error);
            res.status(201).json({ message: 'Update thành công' });
        });
    }


}

module.exports = User_Controler