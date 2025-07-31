const HomeOwner = require('../modals/HomeOwner');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const HomeOwnerController = async(req, res) => {
    try{
        const {firstName, lastName, location , email, password, phone, role} = req.body;
        if(!firstName || !lastName || !location || !email || !password || !phone){
            return res.status(400).json({ message: 'Please fill all the fields' });
        }
        const existingHomeOwner = await HomeOwner.findOne({ email });
        if(existingHomeOwner){
            return res.status(400).json({ message: 'HomeOwner already exists' });
        }
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newHomeOwner = new HomeOwner({
            firstName,
            lastName,
            location,
            email,
            password: hashedPassword,
            phone,
            role: role // Default role to homeowner if not provided
        })
        await newHomeOwner.save();
        // Generate a token for the new HomeOwner
        const token = generateToken(newHomeOwner._id);
        res.status(201).json({
            message: 'HomeOwner registered successfully',
            token, 
            user: {
                id: newHomeOwner._id,
                firstName: newHomeOwner.firstName,
                lastName: newHomeOwner.lastName,
                email: newHomeOwner.email,
                phone: newHomeOwner.phone,
                location: newHomeOwner.location
            }
        });

    }catch(error){
        console.error('Error in HomeOwnerController:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const HomeOwnerLogin = async(req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({ message: 'Please fill all the fields' });
        }
        const existingHomeOwner = await HomeOwner.findOne({ email });
        if(!existingHomeOwner){
            return res.status(400).json({ message: 'HomeOwner does not exist' });
        }
        // Compare the password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, existingHomeOwner.password);
        if(!isPasswordValid){
            return res.status(400).json({ message: 'Invalid password' });
        }
        // Generate a token for the HomeOwner
        const token = generateToken(existingHomeOwner._id);
        res.status(200).json({
            message: 'HomeOwner logged in successfully',
            token,
            user: {
                id: existingHomeOwner._id,
                firstName: existingHomeOwner.firstName,
                lastName: existingHomeOwner.lastName,
                email: existingHomeOwner.email,
                phone: existingHomeOwner.phone,
                location: existingHomeOwner.location
            }
        }); 
    }catch(error){
        console.error('Error in HomeOwnerLogin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = {
    HomeOwnerController,
    HomeOwnerLogin
};