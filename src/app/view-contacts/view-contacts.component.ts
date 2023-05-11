import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-contacts',
  templateUrl: './view-contacts.component.html',
  styleUrls: ['./view-contacts.component.css'],
})
export class ViewContactsComponent implements OnInit {

  contact: any = {};
  errorMsg: any = '';
  group: any = '';
  constructor(private api: ApiService, private viewRouter: ActivatedRoute) {}

  ngOnInit(): void {
    
    //get contact id from its url
    this.viewRouter.params.subscribe((data: any) => {
      const { id } = data;
      console.log(id);

      // api call to get a particular contact details
      this.api.viewContact(id).subscribe({
        next: (response: any) => {
          console.log(response);
          const { groupId } = response;
          this.api.getGroup(groupId).subscribe((data: any) => {
            console.log(data);
            const { name } = data;
            this.group = name;
          })
          this.contact = response;
        },
        error: (err: any) => {
          console.log(err.message);
          this.errorMsg=err.message;
        }
      })
    });
  }
}
