let {user} = require('../../models')

// Get users data
exports.users = async (req, res) => {
    try {
        
        let users = await user.findAll({

            attributes: {
                exclude: ['updatedAt', 'createdAt', 'password']
            }

        })

        res.send({
            status: "Success",
            data: users
        })

    } catch (error) {
        
        res.send({
            status: "Failed",
            message: console.log(error.message)
        })

    }

}

// Get detail user
exports.detailUser = async (req, res) => {
    try {

        let {id} = req.params
        
        let detailUser = await user.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        })

        res.send({
            status: "Success",
            data: detailUser
        })

    } catch (error) {

        res.send({
            status: "Failed",
            message: console.log(error.message)
        })

    }

}