import express from 'express';
import { objectClassTodoRecord } from './src/record/TodoRecord.js';
import { nanoid } from "nanoid";
import moment from "moment";
import * as path from "path";

const app = express();
const port = 4000;

const __dirname = path.resolve();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Endpoint do obsługi zapytania GET
app.get('/todos', async (req, res) => {
    try {
        const { TodoRecord } = objectClassTodoRecord;
        const showAll = await TodoRecord.findAll();
        res.json(showAll);
    } catch (error) {
        res.status(500).json({ error: 'Wystąpił błąd' });
    }
});

// Endpoint do obsługi zapytania POST
app.post('/todos', async (req, res) => {
    try {
        const { TodoRecord } = objectClassTodoRecord;
        const { todoName, description } = req.body;

        const showAll = await TodoRecord.findAll();
        let index = 1;

        if (showAll.length > 0) {
            const tempCheckpointOrderNumber = showAll.reduce((max, todo) => {
                return todo.todoOrder > max ? todo.todoOrder : max;
            }, -Infinity);
            index = tempCheckpointOrderNumber + 1
        }

        const todoItem = new TodoRecord({
            id: nanoid(),
            todoName: todoName,
            description: description,
            todoOrder: index,
            addDate: moment().format("YYYY-MM-DD"),
        });

        const newID = await todoItem.insert();
        res.json({ id: newID });
    } catch (error) {
        res.status(500).json({ error: 'Wystąpił błąd' });
    }
});

// Endpoint do obsługi zapytania PUT
app.put('/todos/:id', async (req, res) => {

    console.log(res)

    try {
        const { TodoRecord } = objectClassTodoRecord;
        const { id } = req.params;
        const { todoOrder } = req.body;

        const foundTodo = await TodoRecord.find(id);
        if (foundTodo) {
            foundTodo.todoOrder = todoOrder;
            await foundTodo.update();
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Nie znaleziono rekordu' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Wystąpił błąd' });
    }
});

// Endpoint do obsługi zapytania DELETE
app.delete('/todos/:id', async (req, res) => {
    try {
        const { TodoRecord } = objectClassTodoRecord;
        const { id } = req.params;

        const foundTodo = await TodoRecord.find(id);
        if (foundTodo) {
            await foundTodo.delete();
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Nie znaleziono rekordu' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Wystąpił błąd' });
    }
});

// // Obsługa żądania GET dla strony głównej
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "index.html")); // Zwracamy plik HTML jako odpowiedź
// });



app.listen(port, () => {
    console.log(`Serwer nasłuchuje na porcie ${port}`);
});
