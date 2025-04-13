import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/shared/model/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  displayedColumns = ['name', 'email', 'role', 'actions'];
  dataSource!: MatTableDataSource<User>;
  searchTerm = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort; //sorting
    this.dataSource.paginator = this.paginator; //pagination
  }

  //getting users grid
  loadUsers() {
    const users = this.userService.getUsers();
    this.dataSource = new MatTableDataSource(users);

    // Enable search filter by name/email
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const term = filter.trim().toLowerCase();
      return (
        data.name.toLowerCase().includes(term) ||
        data.email.toLowerCase().includes(term)
      );
    };
  }
//filter for search according to name and email
  applyFilter() {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }
//function for delete
  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.userService.deleteUser(user.id);
      this.loadUsers();
    }
  }
}
