

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3700;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://faizanKhan:faizanullahkhan@cluster0.m8aa8br.mongodb.net/website');

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

app.get('/api/contact', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    }catch(error){
        console.log("Invalid Error");
        res.status(500).json({message:"Error"})
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        console.log('Received contact form submission:', name, email, message);
        const newContact = new Contact({
            name, email, message
        });
        await newContact.save();
        res.status(201).json({ message: 'Contact is added' });
    } catch (error) {
        console.log('Error adding contact:', error);
        res.status(500).json({ message: 'Contact is not added' });
    }
});

app.listen(port, () => {
    console.log(`The server is working at ${port}`);
});
