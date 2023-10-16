import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-user-list-component',
  templateUrl: './user-list-component.component.html',
  styleUrls: ['./user-list-component.component.css']
})
export class UserListComponentComponent {
  itemArray: any[] = [];

//  currentItem = "My item";
  user: any = {};

//  change() {
//    this.currentItem += "as";
//  }

  onChanged(newUser:any){
//    this.user = newUser;
    this.itemArray.push(Object.assign({}, newUser));
    console.log(this.itemArray);
  }
}
