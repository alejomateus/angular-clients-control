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
  getClientes(): Observable<Client[]>{
    this.clients = this.clientsCollection.snapshotChanges().pipe(
        map( cambios => {
            return cambios.map( accion => {
                const datos = accion.payload.doc.data() as Client;
                datos.id = accion.payload.doc.id;
                return datos;
            });
        })
    );
    return this.clients;
}
}
