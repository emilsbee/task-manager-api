require('../src/db/mongoose')
const User = require('../src/models/user')


// User.findByIdAndUpdate('5cd26c14ac66f2039c103250', { age: 1 }).then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 })
// }).then((count) => {
//     console.log(count);
// }).catch((e) => {
//     console.log(e);
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return user, count 
}

updateAgeAndCount('5cd26c14ac66f2039c103250', 17).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
})
