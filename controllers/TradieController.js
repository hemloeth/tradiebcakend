const Tradie = require("../modals/Tradie");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

const TradieRegistration = async (req, res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            phone,
            businessName,
            PrimaryTrade,
            Experience,
            ABN,
            ServiceAreas,
            BusinessDescription
        } = req.body;

        if (!firstName || !lastName || !email || !password || !phone || !businessName || !PrimaryTrade || !Experience || !ABN || !ServiceAreas || !BusinessDescription) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const existingTradie = await Tradie.findOne({ email });
        if (existingTradie) {
            return res.status(400).json({ message: 'Tradie already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newTradie = new Tradie({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            businessName,
            PrimaryTrade,
            Experience,
            ABN,
            ServiceAreas,
            BusinessDescription
        });

        await newTradie.save();

        // Generate a token for the new Tradie
        const token = generateToken(newTradie._id);
        
        res.status(201).json({
            message: 'Tradie registered successfully',
            token, 
            user: {
                id: newTradie._id,
                firstName: newTradie.firstName,
                lastName: newTradie.lastName,
                email: newTradie.email,
                phone: newTradie.phone,
                businessName: newTradie.businessName
            }
        });

    }catch(error){
        console.error('Error in TradieRegistration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const TradieLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const existingTradie = await Tradie.findOne({ email });
        if (!existingTradie) {
            return res.status(400).json({ message: 'Tradie does not exist' });
        }

        // Compare the password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, existingTradie.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate a token for the Tradie
        const token = generateToken(existingTradie._id);

        res.status(200).json({
            message: 'Tradie logged in successfully',
            token,
            user: {
                id: existingTradie._id,
                firstName: existingTradie.firstName,
                lastName: existingTradie.lastName,
                email: existingTradie.email,
                phone: existingTradie.phone,
                businessName: existingTradie.businessName
            }
        });

    } catch (error) {
        console.error('Error in TradieLogin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = {
    TradieRegistration,
    TradieLogin
};