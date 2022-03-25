const userModel = require('../models/userModel');

const isValid = (value) => {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}
const isValidRequestBody = (requestBody) => {
    if (Object.keys(requestBody).length) return true
    return false;
}
const createUser = async (req, res) => {
    try {
        requestBody = req.body;

        if(!isValidRequestBody(requestBody)){
            return res.status(400).send({status: false, message: "Invalid request parameters. Please provide User details"})
        }
        const{title, name, phone, email, password } =req.body

        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: 'title is required' })
        }

        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: 'name is required' })
        }
        if (!isValid(phone)) {
            return res.status(400).send({ status: false, message: 'phone is required' })
        }
        if (!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(phone))) {
            return res.status(400).send({ status: false, message: 'phone number should be valid mobile number' })

        }
        const phoneAlreadyUsed = await userModel.findOne({ phone })
        if (phoneAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${phone} number already registered` })
        }

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: 'email is required' })
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: 'Email should be valid email' })

        }
        const emailAlreadyUsed = await userModel.findOne({ email })
        if (emailAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${email} is already registered` })

        }

        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: 'password is required' })
        }

        if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(password))) {
            return res.status(400).send({ status: false, message: 'password should be valid password' })

        }
       
        const userCreated = await userModel.create(requestBody)
        res.status(201).send({status: true, message: "Success", data: userCreated })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        });
    }
}
module.exports.createUser = createUser