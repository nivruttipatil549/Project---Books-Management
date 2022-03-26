const bookModel = require('../models/bookModel');
const userModel = require('../models/userModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;



const isValid = (value) => {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}
const isValidRequestBody = (requestBody) => {
    if (Object.keys(requestBody).length) return true
    return false;
}
const createBook = async (req, res) => {
    try {
        const requestBody = req.body;

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid Request parameters. Please provide Book details' })
        }
        const { title, excerpt, userId, ISBN, category, subcategory, reviews, releasedAt } = req.body;

        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: 'title is required' })
        }
        const titleExist = await bookModel.findOne({ title });
        if (titleExist) {
            return res.status(409).send({ status: false, message: "Title already exists" })
        }

        if (!isValid(excerpt)) {
            return res.status(400).send({ status: false, message: 'excerpt is required' })
        }
        if (!isValid(userId)) {
            return res.status(400).send({ status: false, message: 'userId is required' })
        }
        const id = await userModel.findOne({ userId });
        if (!id._id) {
            return res.status(404).send({ status: false, message: "userId not found" });
        }

        if (!ObjectId.isValid(userId)) {
            return res.status(400).send({ status: false, message: 'Only Object Id allowed !' });
        }

        if (!isValid(ISBN)) {
            return res.status(400).send({ status: false, message: 'ISBN is required' })
        }

        const ISBNexist = await bookModel.findOne({ ISBN });
        if (ISBNexist) {
            return res.status(409).send({ status: false, message: "ISBN  already exists" })
        }

        if (!(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(ISBN))) {
            return res.status(400).send({ status: false, message: 'ISBN should be valid ISBN' })

        }

        if (!isValid(category)) {
            return res.status(400).send({ status: false, message: 'category is required' })
        }
        if (!isValid(subcategory)) {
            return res.status(400).send({ status: false, message: 'subcategory is required' })
        }
        if (!isValid(releasedAt)) {
            return res.status(400).send({ status: false, message: 'releasedAt is required' })
        }

        const bookCreated = await bookModel.create(requestBody)
        res.status(201).send({ status: true, message: "Success", data: bookCreated })

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }

}

module.exports.createBook = createBook;