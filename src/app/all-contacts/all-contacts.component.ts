import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.css'],
})
export class AllContactsComponent implements OnInit {
  allContacts: any = [];
  isLoading: boolean = true;
  errorMsg: string = '';
  searchKey: string = '';
    constructor(private api: ApiService, private deleteContactRouter: Router) {}


  getAllContacts() {
    this.api.getAllContacts().subscribe({
      next: (response: any) => {
        console.log(response);
        setTimeout(() => {
          this.allContacts = response;
          this.isLoading = false;
        }, 2000);
      },
      error: (err: any) => {
        console.log(err.message);
        this.errorMsg = err.message;
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.getAllContacts();
  }
  // delete contact
  deleteContact(id: any) {
    // api call
    this.api.deleteContact(id).subscribe({
      next: (response: any) => {
        this.getAllContacts();
      }
    });
  }
}
