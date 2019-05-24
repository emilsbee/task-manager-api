const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port, () => {
    console.log('Server is up on port ' + port);
})





// Middleware function        request -> do something (middleware function) -> run route handler 
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled.')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Website under maintenance.')
// })


// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('5cdba324202b7d0f5b1c7fda')

//     // // Replaces the owner property which is ID to the actual profile of the user. Important to add ref: 'User' in the task model. 
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner);

//     const user = await User.findById('5cdba2696ef0ce0f4d6317e8')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()

// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('File must be a word document.'))
//         }
//         cb(undefined, true)
//     }
// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message} )
// })