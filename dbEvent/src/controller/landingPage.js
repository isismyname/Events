// Get user Models into variable
const {user} = require('../../models');
// Introduce what you need here
const Joi = require('joi');

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

// Create API
exports.register = async (req, res) => {

    // Create rules for Register
    const rules = Joi.object({
        companyName: Joi.string().min(4).required(),
        email: Joi.string().email().min(4).required(),
        password: Joi.string().min(4).pattern(/^[a-zA-Z0-9]{3,30}$/).required()
    })

    const { error } = rules.validate(req.body)

    if(error) {
        return res.status(404).send({
            status: 'Validation Failed',
            message: console.log(error.message)
        })
    }

    try {

        // Hashing password using bycrypt
        const salt = await bcrypt.genSalt(9)
        const hashing = await bcrypt.hash(req.body.password, salt)

        // Post on DB
        const information = await user.create({
            companyName: req.body.companyName,
            email: req.body.email,
            password: hashing
        });

        // Get token
        const userToken = jwt.sign(
            {id: information.id}, process.env.SECRET_KEY
        )

        // Send response Success 
        res.send({
            status: "Success Post Data",
            data: {
                email: req.body.email,
                userToken
            }
        })

    } catch (error) {

        // Send response Failed
        res.send({
            status: "Failed",
            message: console.log(error.message)
        })

    }
}

exports.login = async (req, res) => {
    
    const rules = Joi.object({
        email: Joi.string().email().min(4).required(),
        password: Joi.string().min(4).required()
    })

    const {error} = rules.validate(req.body)
    
    if(error) {
        
        return res.status(404).send({
            status: 'Validation Failed',
            message: console.log(error.message)
        })

    }
    
    try {

        // Find Email on DB
        const checkEmail = await user.findOne({
            
            where: {
                email: req.body.email
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }

        })
        
        // Compare password
        const checkPassword = await bcrypt.compare(req.body.password, checkEmail.password)
        

        // Check password if not same
        if(!checkPassword){

            return res.status(400).send({
                status: 'Cant Login',
                message: console.log(error.message)
            })

        }

        // Get token for Login
        const token = jwt.sign( { id: checkEmail.id }, process.env.SECRET_KEY)

        // Sending response if success
        res.status(200).send({
            status: "Success",
            data: {
                id: checkEmail.id,
                companyName: checkEmail.companyName,
                email: checkEmail.email,
                statusUser: checkEmail.statusUser,
                token
            }
        })

    } catch (error) {
        
        res.status(400).send({
            status: "Failed",
            message: console.log(error.message)
        })

    }

}

exports.checkAuth = async (req, res) => {
    
    try {
        const id = req.user.id

        const checkUser = await user.findOne({
            where:{
                id
            },
            attributes: {
                exclude: ['updatedAt', 'createdAt', 'password']
            },
        })

        if(!checkUser){
            res.status(400).send({
                status: "Failed"
            })
        }

        res.send({
            
            status: "We find it...",
            data: {
                user:{
                    id: checkUser.id,
                    companyName: checkUser.companyName,
                    email: checkUser.email,
                    statusUser: checkUser.statusUser,
                }
            }

        })

    } catch (error) {
        res.status(400).send({
            status: "Failed",
            message: console.log(error.message)
        })
    }

}