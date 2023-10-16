import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  @Output() newItemEvent = new EventEmitter<any>();

  user: any = {
    userName: "",
    userEmail: "",
    userPassword: "",
    userGender: "",
    userBirthday: ""
  };

  userNameError = "";
  userEmailError = "";
  userPasswordError = "";
  userGenderError = "";
  userBirthdayError = "";

  addNewItem(value: string) {
    if (this.validate()) {
      this.newItemEvent.emit(value);
    }
  }

  validate() {
    if (this.user.userName.length < 3) {
      return false;
    }
    if (! this.validateEmail(this.user.userEmail)) {
      return false;
    }
    if (this.user.userPassword.length < 6) {
      return false;
    }
    if (this.user.userGender == "") {
      return false;
    }
    if (this.user.userBirthday == "") {
      return false;
    }
    return true;
  }

  onSubmit() {
    if (this.user.userName.length < 3) {
      this.userNameError = "Name is too small";
    } else {
      this.userNameError = "";
    }
    if (! this.validateEmail(this.user.userEmail)) {
      this.userEmailError = "Email is not valid";
    } else {
      this.userEmailError = "";
    }
    if (this.user.userPassword.length < 6) {
      this.userPasswordError = "Password can't be less than 6 letters";
    } else {
      this.userPasswordError = "";
    }
    if (this.user.userGender == "") {
      this.userGenderError = "Choose the gender";
    } else {
      this.userGenderError = "";
    }
    if (this.user.userBirthday == "") {
      this.userBirthdayError = "Set the birthday";
    } else {
      this.userBirthdayError = "";
    }
  }

  validateEmail(email: string) {
    let format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(format)) {
//      console.log(11111111111111);
      return true;
    }
    return false;
  }
}
