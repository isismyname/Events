const {event, user} = require('../../models');

exports.addEvent = async (req, res) => {
    try {
        let find = await user.findOne({
            where: {
                id: user
            }
        })

        find = JSON.parse(JSON.stringify(find))

        find = {
            ...find,
        }

        let adding = await event.create({
            location: req.body.location,
            date: req.body.date,
            eventName: req.body.eventName,
            idUser: req.user.id
        })

        res.send({
            status : 200,
            data: adding
        })

    } catch (error) {
        res.send({
            status: "Failed",
            message: console.log(error.message)
        })
    }
}

exports.events = async (req, res) => {
    try {

        let data = await event.findAll({
            include: {
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                },
            },
            attributes: {
                exclude: ['updatedAt']
            }
        })

        res.send({
            status: "Success",
            data: {data}
        })
        
    } catch (error) {
    
        res.send({
            status: "Failed",
            message: console.log(error.message)
        })

    }
}

exports.detailEvent = async (req, res) => {
    try {

        let {id} = req.params

        let data = await event.findOne({
            where: {
                id
            },
            attributes:{
                exclude: ['updatedAt']
            }
        })

        res.send({
            status: "Success",
            data: data
        })

    } catch (error) {

        res.send({
            status: "Failed",
            message: console.log(error.message)
        })

    }
}

exports.updateApprove = async (req, res) => {
    try {
        
        let {id} = req.params;
        
        let approved = await event.update({
            status: 'Approve'
        },
        {
            where: {
                id
            }
        })

        res.send({
            status: "Success",
            data: approved
        })

    } catch (error) {
        
        res.send({
            status: "Error",
            message: console.log(error.message)
        })

    }
}
exports.updateReject = async (req, res) => {
    try {

        let {id} = req.params;

        let rejected = await event.update({
            status: 'Reject'
        },
        {
            where: {
                id
            }
        })

        res.send({
            status: "Success",
            data: rejected
        })

    } catch (error) {
        
        res.send({
            status: "Error",
            message: console.log(error.message)
        })

    }
}

exports.updateData = async (req, res) => {
    try {
        let {id} = req.params

        await event.update(req.body, {
            where: {
                id
            }
        })

        res.send({
            status: "Success",
            data: req.body
        })

    } catch (error) {
        
        res.send({
            status: "Error",
            message: console.log(error.message)
        })

    }

}

exports.deleteEvent = async (req, res) => {
    try {
        const {id} = req.params;

        await event.destroy({
            where:{
                id
            }
        })

        res.send({
            status: 'Success',
            data: `Delete Event id ${id} Success`
        })
        
    } catch (error) {
        
        res.send({
            status: 'Failed',
            message: (error.message)
        })
    
    }

}