const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0, 
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    password: {
        type: String,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot be named "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer 
    }
}, {
    timestamps: true 
})

// A relationship between two entities. This is not a real thing saved in the database, but rather a link between two models. 
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this 
    const userObject = user.toObject()
    
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

// Functions that are on 'methods' are functions available on the instances 'user', also known as instance methods. 
userSchema.methods.generateToken = async function () {
    const user = this 
    const token = jwt.sign({_id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}   

// Functions that are on 'statics' are functions available for the whole model
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login.')
    }
    
    const isMath = await bcrypt.compare(password, user.password)
    
    if (!isMath) {
        throw new Error('Unable to login.')
    }
    return user
}





// Hash the plane text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8) 
    }

    next()
})


userSchema.pre('remove', async function (next) {
    const user = this 

    await Task.deleteMany({owner: user._id})

    next()
})

const User = mongoose.model('User', userSchema)


module.exports = User