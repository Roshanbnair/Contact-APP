import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ContactSchema } from 'src/models/contactSchema';

@Component({
  selector: 'app-edit-contacts',
  templateUrl: './edit-contacts.component.html',
  styleUrls: ['./edit-contacts.component.css'],
})
export class EditContactsComponent implements OnInit{
  contact: ContactSchema = {};
  groups: any = [];

  constructor(
    private editRouter: ActivatedRoute,
    private api: ApiService,
    private edit2Router: Router
  ) {}

  ngOnInit(): void {
    // get contact id from its url
    this.editRouter.params.subscribe((data: any) => {
      const { id } = data;
      console.log(id);
      this.api.viewContact(id).subscribe({
        next: (response) => {
          console.log(response);
          this.contact = response;
        },
      });
    });
    this.api.getGroups().subscribe({
      next: (allGroups) => {
        this.groups = allGroups;
        console.log(this.groups);
      },
    });
  }

  // edit contact
  editContact(id: any) {
    // api call to edit contact
    this.api.editContact(id, this.contact).subscribe({
      next: (response: any) => {
        // navigate to all Contacts
        this.edit2Router.navigateByUrl('');
      },
    });
  }
}
