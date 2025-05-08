let tasks = [];

  window.onload = function() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      tasks = JSON.parse(saved);
      renderTasks();
    }
  };

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    if (text === '') return;

    tasks.push({ text, completed: false });
    saveTasks();
    renderTasks();
    input.value = '';
    showToast('Task berhasil ditambahkan!');
  }

  function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
    showToast('Task dihapus!');
  }

  function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
      const taskDiv = document.createElement('div');
      taskDiv.className = 'task' + (task.completed ? ' completed' : '');

      const textSpan = document.createElement('span');
      textSpan.className = 'task-text';
      textSpan.textContent = task.text;

      const btnDiv = document.createElement('div');
      btnDiv.className = 'task-buttons';

      const doneBtn = document.createElement('button');
      doneBtn.textContent = 'Selesai';
      doneBtn.className = 'done-btn';
      doneBtn.onclick = () => toggleTask(index);

      const delBtn = document.createElement('button');
      delBtn.textContent = 'Hapus';
      delBtn.className = 'delete-btn';
      delBtn.onclick = () => deleteTask(index);

      btnDiv.appendChild(doneBtn);
      btnDiv.appendChild(delBtn);

      taskDiv.appendChild(textSpan);
      taskDiv.appendChild(btnDiv);

      taskList.appendChild(taskDiv);
    });
  }