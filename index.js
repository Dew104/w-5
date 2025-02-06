const e = require('express')
const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

let std = [
    { id: 1, name: "Pongpan"},
    { id: 2, name: "Chisanuphong"},
    { id: 3, name: "Siwat"},
]

app.get('/std', (req , res) => res.json(std))
app.get("/std/:id" , (req , res) => {
    let data = std.find(i => i.id == req.params.id)
    if (data != undefined) res.json(data)
    else res.json({ massage: "not found" })
 })

 app.post('/std', (req , res) => {
    let stdID = std[std.length - 1].id +1
    let stdName = req.body.name
    std = [...std, { id: stdID, name: stdName}]
    res.json(std)
 })
app.put('/std/:id', (req , res)=> {
    let data = std.find(i => i.id == req.params.id)
    if (data == undefined) res.json('Not found')
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
    { id: 1, task: "ทำการบ้าน", completed: false },
    { id: 2, task: "ออกกำลังกาย", completed: true },
    { id: 3, task: "อ่านหนังสือ", completed: false },
    { id: 4, task: "ทำอาหาร", completed: true },
    { id: 5, task: "ซักผ้า", completed: false },
    { id: 6, task: "ไปซื้อของ", completed: true },
    { id: 7, task: "ทำความสะอาดบ้าน", completed: false },
    { id: 8, task: "เขียนโปรแกรม", completed: true },
    { id: 9, task: "ดูซีรีส์", completed: false },
    { id: 10, task: "นั่งสมาธิ", completed: true }
];
app.get('/todos', (req, res) => {
    res.json(todos);
});

app.get("/todos/:id" , (req , res) => {
    let data = todos.find(i => i.id == req.params.id)
    if (data != undefined) res.json(data)
    else res.json({ massage: "ไม่พบบันทึกงานที่ระบุ" })
 })

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

app.delete('/todos/:id', (req , res)=> {
    todos = todos.filter(i => i.id != req.params.id)
    res.json(todos)

    if (todos.length === beforeDelete) {
        res.json({ message: "ไม่พบบันทึกงานที่ระบุ" })
    } else {
        res.json({ message: "ลบงานสำเร็จ" })
    }
})

app.get("/todos/completed", (req, res) => {
    let data = todos.filter(i => i.completed === true)
    if (data != undefined) res.json(data)
    else res.json({ massage: "ไม่พบบันทึกงานที่ระบุ" })
 })

 app.get("/todos/pending", (req, res) => {
    let data = todos.filter(i => i.completed === false)
    if (data != undefined) res.json(data)
    else res.json({ massage: "ไม่พบบันทึกงานที่ระบุ" })
 })

app.delete('/todos/completed', (req, res) => {
    let beforeDelete = todos.length
    todos = todos.filter(i => i.completed === false)
    let afterDelete = todos.length
    res.json({ message: "ลบงานที่เสร็จแล้วทั้งหมดสำเร็จ", todos })
})

app.get("/todos/search", (req, res) => {
    let data = todos.filter(i => i.task.includes(req.query.query));
    res.json(data.length ? data : { message: "ไม่พบงานที่ตรงกับคำค้นหา" });
});