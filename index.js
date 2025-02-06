const e = require('express')
const express = require('express')
const app = express()
const port = 5000
app.use(express.json())

let std = [
    { id: 1, name: "Chisanuphong"},
    { id: 2, name: "Pongpan"},
    { id: 3, name: "Siwat"},
]

app.get('/',(req , res) => res.send('Hello'))
app.get('/std', (req , res) => res.json(std))
app.get("/std/:id" , (req , res) => {
    let data = std.find(i => i.id == req.params.id)
    if (data != undefined) res.json(data)
    else res.json({ massage: "can't find" })
 })

 app.post('/std', (req , res) => {
    let stdID = std[std.length - 1].id +1
    let stdName = req.body.name
    std = [...std, { id: stdID, name: stdName}]
    res.json(std)
 })
app.put('/std/:id', (req , res)=> {
    let data = std.find(i => i.id == req.params.id)
    if (data == undefined) res.json('Not found you idiot')
    else data.name = req.body.name
    std.map((i) => {
        if (i.id == data.id) i.name = data.name
    })
    res.json(std)
})
app.delete('/std/:id', (req , res)=> {
    std = std.filter(i => i.id != req.params.id)
    res.json(std)
})
app.listen(port, () => {
    console.log("Server is running on port", port)
})

let todos = [
    { id: 1, task: 'Buy groceries', completed: false },
    { id: 2, task: 'Finish homework', completed: true },
    { id: 3, task: 'Clean the house', completed: false },
    { id: 4, task: 'Workout', completed: true },
    { id: 5, task: 'Read a book', completed: false }
];

app.get('/todos', (req, res) => {
    res.json(todos);
});

// app.get("/todos/:id" , (req , res) => {
//     let data = todos.find(i => i.id == req.params.id)
//     if (data != undefined) res.json(data)
//     else res.json({ massage: "ไม่พบบันทึกงานที่ระบุ" })
//  })

 app.post('/todos', (req , res) => {
    let todosID = todos[todos.length - 1].id +1
    let todosTask = req.body.task
    todos = [...todos, { id: todosID, task: todosTask, completed: false}]
    res.json(todos)
 })

 app.put('/todos/:id', (req , res)=> {
    let data = todos.find(i => i.id == req.params.id)
    if (data == undefined) res.json('ไม่พบบันทึกงานที่ระบุ')
    else data.task = req.body.task
    todos.map((i) => {
        if (i.id == data.id) i.task = data.task
    })
    res.json(todos)
})

app.put('/todos/:id/status', (req , res)=> {
    let data = todos.find(i => i.id == req.params.id)
    if (data == undefined) res.json('ไม่พบบันทึกงานที่ระบุ')
    else data.completed = req.body.completed
    todos.map((i) => {
        if (i.id == data.id) i.task = data.task
    })
    res.json(todos)
})

// app.delete('/todos/:id', (req , res)=> {
//     todos = todos.filter(i => i.id != req.params.id)
//     res.json(todos)

//     if (todos.length === beforeDelete) {
//         res.json({ message: "ไม่พบบันทึกงานที่ระบุ" })
//     } else {
//         res.json({ message: "ลบงานสำเร็จ" })
//     }
// })

// app.get("/todos/completed", (req, res) => {
//     let data = todos.filter(i => i.completed === true)
//     if (data != undefined) res.json(data)
//     else res.json({ massage: "ไม่พบบันทึกงานที่ระบุ" })
//  })

// app.get("/todos/pending", (req, res) => {
//     let data = todos.filter(i => i.completed === false)
//     if (data != undefined) res.json(data)
//     else res.json({ massage: "ไม่พบบันทึกงานที่ระบุ" })
//  })
 
 app.delete('/todos/completed', (req, res) => {
    let beforeDelete = todos.length
    todos = todos.filter(i => i.completed === false)
    let afterDelete = todos.length
    res.json({ message: "ลบงานที่เสร็จสิ้นทั้งหมดแล้ว", todos })
    
});

app.get("/todos/search", (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.json({ message: "กรุณาระบุคำค้นหา" })
    }
    let data = todos.filter(i => i.task.includes(query))

    if (data.length > 0) {
        res.json(data)
    } else {
        res.json({ message: "ไม่พบงานที่ตรงกับคำค้นหา" })
    }
});