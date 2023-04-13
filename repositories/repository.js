import {dbConfigModule} from "../src/utlis/db.js";
const { pool } = dbConfigModule;
import {objectClassTodoRecord} from '../src/record/TodoRecord.js'


const {TodoRecord} = objectClassTodoRecord;
class TodoRepository {

    static _checkRecord(record) {
        if (!(record instanceof TodoRecord)) {
            throw new Error(`TodoRecord must be an instance of TodoRecord`)
        }
    }

    //dodawanie do bazy
    static async insert(record) {

        TodoRepository._checkRecord(record);

        await pool.execute('INSERT INTO `todos` VALUES(:id, :title, :description, :todoOrder, :addDate)', {
            id: record.id,
            title: record.todoName,
            description: record.description,
            todoOrder: record.todoOrder,
            addDate: record.addDate,
        });

        return record.id;
    };

    //aktualizacja rekordu
    static async update(record) {

        TodoRepository._checkRecord(record);

        await pool.execute('UPDATE `todos` SET `todoOrder` = :todoOrder WHERE `id` =:id', {
            id: record.id,
            todoOrder: record.todoOrder,
        });
    };

    //usuwanie z bazy
    static async delete(record) {

        TodoRepository._checkRecord(record);

        if(!record.id) {
            throw new Error("ID does not exist")
        }

        await pool.execute('DELETE FROM `todos` WHERE `id`= :id', {
            id: record.id,
        })

    };
    //read po ID
    static async find(id) {
        const [results] = await pool.execute('SELECT * FROM `todos` WHERE `id` = :id',{
            id: id,
        });
        return new TodoRecord(results[0]);
    };

    static async findAll() {
        const [results] = await pool.execute('SELECT * FROM `todos`');
        return results.map(result => new TodoRecord(result));
    };

}

export const objectClassTodoRepository = {
    TodoRepository,
}