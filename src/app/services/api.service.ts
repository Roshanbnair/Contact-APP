import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ContactSchema } from 'src/models/contactSchema';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  BASE_URL = 'https://contact-app-x28w.onrender.com';
  constructor(private http: HttpClient) { }

  // handle error
  handleError(error: HttpErrorResponse) {
    let errorMsg: string = '';
    errorMsg = `Error: ${error.message}`;
    // if (error.error) {
    //   // client error
    //   errorMsg = `Error : ${error.error.message}`;
    // } else {
    //   errorMsg = `Status : ${error.status} \n Error: ${error.message}`;
    // } 
    return throwError(() => errorMsg);
  }

  // get all contacts api
  getAllContacts() {
    // api call: url=http://localhost:3000/contacts req : get
    return this.http.get(`${this.BASE_URL}/contacts`);
  }
  
  // view a contact
  viewContact(id: any) {
    // api call: url=http://localhost:3000/contacts/ca1 req : get
    return this.http.get(`${this.BASE_URL}/contacts/${id}`);
  }

  // get a particular group
  getGroup(id: any) {
    // api call: url=http://localhost:3000/groups/ca1 req : get
    return this.http.get(`${this.BASE_URL}/groups/${id}`);
  }

  // get all groups
  getGroups() {
    // api call-http://localhost:3000/groups.
    return this.http.get(`${this.BASE_URL}/groups`);
  }

  // Add contact
  addContact(contact: ContactSchema) {
    // api Call
    return this.http.post(`${this.BASE_URL}/contacts`, contact);
  }

  // Delete Contact
  deleteContact(id: string) {
    // api call to delete contact
    return this.http.delete(`${this.BASE_URL}/contacts/${id}`);
  }

  // Edit a contact
  editContact(id: string, contact: ContactSchema) {
    // api call
    return this.http.put(`${this.BASE_URL}/contacts/${id}`, contact);
  }
}
