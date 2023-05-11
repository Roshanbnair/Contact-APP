import { Component, OnInit } from '@angular/core';
import { ContactSchema } from 'src/models/contactSchema';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contacts',
  templateUrl: './add-contacts.component.html',
  styleUrls: ['./add-contacts.component.css'],
})
export class AddContactsComponent implements OnInit {
  groups: any = {};
  model: string = '';
  flag:boolean = true;

  contact: ContactSchema = {};
  constructor(private api: ApiService,private addContactRouter:Router) {
    this.contact.groupId = 'Select a group';
  }

  ngOnInit(): void {
    this.api.getGroups().subscribe({
      next: (response: any) => {
        console.log(response);
        this.groups = response;
      },
      error: (err: any) => {
        console.log(err.message);
      },
    });
  }

  addContact(contact: ContactSchema) {
    //call api in service
    this.api.addContact(contact).subscribe({
      next: (response: any) => {
        // data added to server
        console.log(response);
        // navigate to allContacts page
        this.addContactRouter.navigateByUrl("");
      },
      error: (err: any) => {
        console.log(err.message);
      }
    })
  }
}
