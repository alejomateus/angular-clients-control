import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';

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
  @ViewChild('clientForm') clientForm: NgForm;
  @ViewChild('closeButton') closeButton: ElementRef;

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
  getTotalBalance(): number {
    let totalBalance: number = 0;
    if (this.clients) {
      this.clients.forEach((client: Client) => {
        totalBalance += parseInt(client.balance.toString());
      });
    }
    return totalBalance;
  }
  add({ value, valid }: { value: Client, valid: boolean }): void {
    if (!valid) {
      this.flashMessages.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      this.clientService.addClient(value);
      this.clientForm.reset();
      this.closeModal()
    }
  }
  private closeModal(): void {
    this.closeButton.nativeElement.click();
  }

}
