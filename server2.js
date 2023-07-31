const { recieveTasks } = require('./libs/recieveTasks');
const { completeTask } = require('./libs/completeTask');

recieveTasks(completeTask, 'newTasksQueue', 'server2');