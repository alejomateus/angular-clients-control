import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Client } from '../models/client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;
  constructor(
    private db: AngularFirestore
  ) {
    this.clientsCollection = db.collection('clients', ref => ref.orderBy('name', 'asc'));
  }
  getClientes(): Observable<Client[]> {
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(cambios => {
        return cambios.map(action => {
          const datos = action.payload.doc.data() as Client;
          datos.id = action.payload.doc.id;
          return datos;
        });
      })
    );
    return this.clients;
  }
  addClient(client: Client) {
    this.clientsCollection.add(client)
  }
  getClient(id: string): Observable<Client> {
    this.clientDoc = this.db.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null
        } else {
          const datos = action.payload.data() as Client;
          datos.id = action.payload.id;
          return datos;
        }
      })
    );
    return this.client;
  }
  updateClient(client: Client): void {
    this.clientDoc = this.db.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }
  deleteClient(client:Client) {
    this.clientDoc = this.db.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }
}
