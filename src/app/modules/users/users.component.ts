import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../dialogs/confirm-delete/confirm-delete.component';
import User from '../../interfaces/user.interface';
import { UserFormComponent } from '../dialogs/user-form/user-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from "../../services/user.service";
import UserRequest from 'src/app/interfaces/userRequest.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {

  debugAlerts: boolean = true;
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private userService: UserService) {
    this.dataSource = new MatTableDataSource();
  }

  displayedColumns: string[] = ['name', 'lastName', 'age', 'email', 'actions'];

  ngAfterViewInit() {
    this.fillList()
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fillList() {
    this.userService.getUsers().subscribe(
      res => {
        this.dataSource.data = res
        console.log(res)
      },
      err => console.log(err)
    )
  }

  edit(user: any): void {
    let index = this.dataSource.data.findIndex(x => x === user);
    console.log(index)
    let dialogRef = this.dialog.open(UserFormComponent, { data: { ...user } });

    dialogRef.afterClosed().subscribe((formUser: User) => {
      if (formUser) {
        if (formUser._id !== undefined) {
          this.userService.updateUsers(formUser._id, formUser).subscribe((userEdited: UserRequest) => {
            if (userEdited) {
              this.dataSource.data[index] = userEdited.user;
              this.dataSource.data = [...this.dataSource.data];
              this.openAlert(userEdited.message);
            }
          })
        }
      }
    })
  }

  remove(user: any): void {
    const userID = this.dataSource.data.filter((item) => item._id === user._id)[0]._id
    let dialogRef = this.dialog.open(ConfirmDeleteComponent, { data: {} });

    dialogRef.afterClosed().subscribe((res: Boolean) => {
      if (res) {
        if (userID !== undefined) {
          this.userService.deleteUsers(userID).subscribe((userDeleted: UserRequest) => {
            if (userDeleted) {
              this.dataSource.data = this.dataSource.data.filter((item) => item._id !== userID);
              this.openAlert(userDeleted.message);
            }
          })
        }
      }
    })
  }

  add(): void {
    let dialogRef = this.dialog.open(UserFormComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe((res: User) => {
      if (res) {
        this.userService.createUsers(res).subscribe((newUser: UserRequest) => {
          if(newUser){
            this.dataSource.data = [...this.dataSource.data, newUser.user]
            this.openAlert(newUser.message);
          }
        })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAlert(message: string|undefined){
    if(this.debugAlerts)
      alert(message);
  }
}