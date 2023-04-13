import {dbConfigModule} from './src/utlis/db.js';
import {objectClassTodoRecord} from './src/record/TodoRecord.js'
import {nanoid} from "nanoid";
import moment from "moment";
import {objectClassTodoRepository} from './repositories/repository.js'


let index = null;

(async () => {

    const { pool } = dbConfigModule;
    const {TodoRecord} = objectClassTodoRecord;
    const {TodoRepository} = objectClassTodoRepository;

    const showAll = await TodoRepository.findAll();

    if(showAll.length > 0) {
        const tempCheckpointOrderNumber = showAll.reduce((max, todo) => {
            return todo.todoOrder > max ? todo.todoOrder : max;
        }, -Infinity);
        index = tempCheckpointOrderNumber + 1
    }else{
        index = 1
    }

    const todoItem = new TodoRecord({
        id: nanoid(),
        todoName: 'INC24567',
        description: 'Lorem Ipsum is simply ',
        todoOrder: index,
        addDate: moment().format("YYYY-MM-DD"),
    });

    const newID = await TodoRepository.insert(todoItem);
    console.log(newID);
    //     const foundTodo = await TodoRecord.find(id);
    //     foundTodo.todoOrder = orderNumber + 1
    //     await foundTodo.update();

    //await todoItem.delete();

    await pool.end();

})();

