import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {throws} from "assert";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products! : Array<any>;

  constructor() {
    this.products =[
      {id:1, name:"Computer", price :6500},
      {id:2, name:"Printer", price :1200},
      {id:3, name:"Smart phone", price :3000},
    ];
  }

  public getAllProducts() : Observable<Array<any>>{
    let rmd=Math.random();
    if(rmd<0.5) return throwError(()=> new Error("Internet connexion error"));

    else return of(this.products);
  }


}
