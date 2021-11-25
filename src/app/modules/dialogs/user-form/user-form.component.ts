import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import User from '../../../interfaces/user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    age: ['', [Validators.required, Validators.min(0), Validators.max(150)]],
    email: ['', [Validators.required, Validators.email]]
  }, { updateOn: 'submit' });

  constructor(@Inject(MAT_DIALOG_DATA) public data: User,
    public dialogRef: MatDialogRef<UserFormComponent>,
    private formBuilder: FormBuilder) {}

  saveUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      this.dialogRef.close({
        name: this.userForm.value.name,
        lastName: this.userForm.value.lastName,
        age: this.userForm.value.age,
        email: this.userForm.value.email,
        _id: this.data._id
      });
    }
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }
}
