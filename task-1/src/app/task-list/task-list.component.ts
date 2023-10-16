import { Component } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  title = "Todo list";

  allItems = JSON.parse(localStorage.getItem("allItems") || '[]');

  get items() {
    //let parseString = "";
    //parseString = localStorage.getItem("allItems");
    //this.allItems = JSON.parse(localStorage.getItem("allItems") || '[]');

    console.log(this.allItems);
    return this.allItems;//this.allItems;
  }
  
  addItem(description: string) {
    this.allItems.unshift({
      description,
      done: false
    });
    this.saveToLocalStorage();
  }

  doneItem(index: number) {
    // item:index.done = !item:index.done;
    this.allItems[index].done = !this.allItems[index].done;
  }
  
  deleteItem(index: number) {
    // delete this.allItems[index];
    this.allItems = this.allItems.filter(function (value: string, idx: number) {
      return idx != index;
    });
    this.saveToLocalStorage();
    // location.reload();
  }
  
  saveToLocalStorage() {
    localStorage.setItem("allItems", JSON.stringify(this.allItems));
  }
}
