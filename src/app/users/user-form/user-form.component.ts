import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/model/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;
  userId!: number;

  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    public us: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    }); //form fields and validatons given

    //getting id from url
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.isEdit = true;
      this.userId = Number(paramId);
      const user = this.us.getUserById(this.userId);
      //patchvalue during editing form
      if (user) {
        this.form.patchValue({
          name: user.name,
          email: user.email,
          role: user.role,
        });
      }
    }
  }
  //back to from function
  goBack() {
    this.router.navigate(['/']);
  }

  //function onsubmit button after form is valid
  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const allUsers = this.us.getUsers();

      const duplicateEmail = allUsers.find(
        (user) =>
          user.email === formValue.email &&
          (!this.isEdit || user.id !== this.userId) // Exclude current user in edit mode
      );

      if (duplicateEmail) {
        alert('Email already exists. Please use a different one.');
        return;
      }
      const user: User = {
        id: this.isEdit ? this.userId : new Date().getTime(), // Use existing ID for update, new one for add
        name: formValue.name,
        email: formValue.email,
        role: formValue.role,
      };
      console.log(user);

      if (this.isEdit) {
        this.us.updateUser(user);
        alert('User updated successfully!');
      } else {
        this.us.addUser(user);
        alert('User added successfully!');
      }

      this.router.navigate(['/']);
    } else {
      this.form.markAllAsTouched(); // to show validation errors
    }
  }
}
