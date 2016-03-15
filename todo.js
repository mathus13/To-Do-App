'use strict';
var todos = (function () {
    var data = [];

    function hasLocalStorage() {
        if (undefined === localStorage) {
            return false;
        }
        return true;
    }

    function store() {
        if (!hasLocalStorage()) {
            return;
        }
        localStorage.setItem('todos', JSON.stringify(data));
    }

    function retrieve() {
        if (!hasLocalStorage()) {
            return;
        }
        var todos = localStorage.getItem('todos');
        if (undefined === todos || null === todos) {
            data = [];
            return;
        }
        data = JSON.parse(todos);
        console.log(data);
    }

    function push(todo) {
        data.push(todo);
    }

    function removeTodo(index) {
        data.splice(index, 1);
    }

    retrieve();
    return {
        store: store,
        push: push,
        remove: removeTodo,
        data: data
    };
}());

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
    ready: function () {
        this.initFocus();
    },
    watch: {
        todos: {
            handler: function () {
                todos.store();
            },
            deep: true
        }
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
            todos.remove(index);
        },
        initFocus: function () {
            this.$els.newToDo.focus();
        }
    }
});
