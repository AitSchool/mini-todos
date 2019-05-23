import { formatTime } from './../../utils/util.js';

Page({
  data: {
    todos: [{
      id: '123',
      title: '默认事情',
      status: 0,
      created_time: '2019/05/24',
    },{
      id: '124',
      title: '默认事情 2',
      status: 1,
      created_time: '2019/05/24',
    }],
    value: '',
  },
  handleInput: function(event) {
    let value = event.detail.value;
    this.setData({ value })
  },
  handleConfirm: function(event) {
    let title = event.detail.value;
    let created_time = formatTime(new Date())
    let id = Date.now();
    let todos = this.data.todos;
    let status = 0;
    todos.push({ id, title, created_time, status });
    this.setData({ value: '', todos })
  },
  handleShowActionSheet: function(event) {
    let index = event.currentTarget.dataset.index;
    let id = event.currentTarget.dataset.id;
    wx.showActionSheet({
      itemList: ['完成', '删除'],
      itemColor: '#333',
      success: (res)=> {
        let tapIndex = res.tapIndex;
        switch (tapIndex) {
          case 0:
            this.handleFinishTodo(id,index);
            break;
          case 1:
            wx.showModal({
              title: '删除',
              content: '是否确定要删除该 Todo',
              success:(res)=> {
                if (res.confirm) {
                  this.handleDeleteTodo(id,index);
                }
              }
            })
            break;
        }
      },
      fail(res) {
        console.log(res.errMsg);
      }
    })
  },
  handleFinishTodo: function(id,index) {
    let todos = this.data.todos;
    todos[index].status = 1;
    this.setData({ todos });
  },
  handleDeleteTodo: function(id, index) {
    let todos = this.data.todos;
    todos.splice(index,1);
    this.setData({ todos });
  }
})