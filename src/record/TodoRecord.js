/*
active record
to store ID && others in active method
*/

import {dbConfigModule} from "../utlis/db.js";

const { pool } = dbConfigModule;
class TodoRecord {
    constructor(obj) {

        this.id = obj.id;
        this.todoName = obj.todoName;
        this.description = obj.description;
        this.todoOrder = obj.todoOrder;
        this.addDate = obj.addDate;

        this._validRecord();
    };

    _validRecord = () => {

        if (this.todoName.trim().length > 55){
            throw new Error("TODO title can not be longer then 55 characters. Kindly, please change the name of the title");
        }else if(this.description.trim().length > 1260){
            throw new Error("TODO description can not be longer then 1260 characters. Kindly, please change the description");
        }

    };



}

export const objectClassTodoRecord = {
    TodoRecord,
}
