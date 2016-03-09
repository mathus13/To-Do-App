'use strict';
var todos = {
    data: [],
    hasLocalStorage: function () {
        if (undefined === localStorage) {
            return false;
        }
        return true;
    },
    store: function () {
        if (!this.hasLocalStorage()) {
            return;
        }
        localStorage.setItem('todos', JSON.stringify(this.data));
    },
    retrieve: function () {
        if (!this.hasLocalStorage()) {
            return;
        }
        var todos = localStorage.getItem('todos');
        console.log(todos);
        if (undefined === todos || null === todos) {
            this.data = [];
            return;
        }
        this.data = JSON.parse(todos);
    },
    push: function (todo) {
        this.data.push(todo);
        this.store();
    }
};
todos.retrieve();

var view = new Vue({
    el: '.content',
    data: {
        newTodo: '',
        todos: todos.data,
        priotities: [
            {
                value: 0,
                label: 'New'
            },
            {
                value: 2,
                label: 'Medium'
            },
            {
                value: 3,
                label: 'High'
            },
            {
                value: 4,
                label: 'Urgent'
            },
        ]
    },
    methods: {
        addTodo: function () {
            var text = this.newTodo.trim();
            if (text) {
                todos.push({
                    text: text,
                    priority: 0,
                    done: false
                });
                this.newTodo = '';
            }
        },
        removeTodo: function (index) {
            this.todos.splice(index, 1);
        }
    }
});

window.addEventListener("unload", function (e) {
    todos.store();
});
