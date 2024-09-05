// USER MODEL
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please provide your name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot be more than 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add your email'],
        unique: true,
        trim: true, //removes white space
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'], //regexp expression to catch a wrong email address
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a unique password'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false //excludes password from queries by default
    },
    role: {
        type: String,
        enum: ['attendee', 'organizer', 'admin'],
        default: 'attendee'
    },
    profilePicture: {
        type: String,
        default: '/public/images/userprofile.jpg'
    },
    bio: {
        type: String,
        maxlength: [200, 'Bio cannot be more than 200 characters']
    },
    registeredEvents: [{
        type: mongoose.Schema.Types.ObjectId, //creating a relationship with the event model that the user has signed up or
        ref: 'Event'
    }],
    organizedEvents: [{
        type: mongoose.Schema.Types.ObjectId, //creating a relationship with the event model
        ref: 'Event'
    }],
    timestamps: true //this automatically adds createdAt and updatedAt fields
   


});

// pre saves the middleware to hash 
userSchema.pre('save', async function (next) {
    try {
        const salt = await bcryp.genSalt(12);
        if (this.isModified('password')) {
            const hashedPwd = await bcrypt.hash(this.password, salt);
            this.password = hashedPwd;
        }
        next();
    } catch (error) {
        next(error);
    }
})

// to check if the password entered when logging in is the same as the original
userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;
