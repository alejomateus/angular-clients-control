import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  client: Client = {
    name: '',
    lastname: '',
    email: '',
    balance: 0
  };
  id: string;
  constructor(private clientService: ClientService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe((client: Client) => {
      this.client = client;
    });
  }
  save({value,valid}: {value:Client,valid: boolean}) {
    if (!valid) {
      this.flashMessages.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      value.id = this.id;
      this.clientService.updateClient(value);
      this.router.navigate(['/']);
    }
  }
  delete() {
    if (confirm('Are you sure you want to delete the client?')) {
      this.clientService.deleteClient(this.client);
      this.router.navigate(['/']);
    }
  }
}
