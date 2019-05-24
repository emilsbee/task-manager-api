require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5cd47247b8ea0a09d18ec86b').then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false })
// }).then((tasks) => {
//     console.log(tasks);
// }).catch((e) => {
//     console.log(e);
// })

const deleteTaskAndCount = async (id) => {
    const deleteTask = await Task.findByIdAndDelete(id)
    const countTasks = await Task.countDocuments({ completed: false })
    return countTasks
}

deleteTaskAndCount('5cd4729bd7a18b09de57b981').then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
})
