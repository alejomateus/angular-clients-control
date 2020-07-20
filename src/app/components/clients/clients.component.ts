import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients: Array<Client>;
  client: Client = {
    name: '',
    lastname: '',
    email: '',
    balance: 0
  };
  constructor(private clientService: ClientService,
              private flashMessages: FlashMessagesService) { }

  ngOnInit(): void {
    this.getClients();
  }
  getClients() {
    this.clientService.getClientes().subscribe(
      clients => {
        this.clients = clients;
      }
    );
  }
  getTotalBalance() {
    let totalBalance = 0;
    if (this.clients) {
      this.clients.forEach((client: Client) => {
        totalBalance += client.balance;
      });
    }
  }
  add({ value, valid }: { value: Client, valid: boolean }) {
    if (!valid) {
      this.flashMessages.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {

    }
  }

}
