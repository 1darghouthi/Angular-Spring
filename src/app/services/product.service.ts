import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {throws} from "assert";
import {PageProduct, Product} from "../model/product.model";
import {UUID} from "angular2-uuid";
import {ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products! : Array<Product>;

  constructor() {
    this.products =[
      {id:UUID.UUID(), name:"Computer", price :6500, promotion: true},
      {id:UUID.UUID(), name:"Printer", price :1200, promotion:false},
      {id:UUID.UUID(), name:"Smart phone", price :3000, promotion:true},
    ];
    for (let i = 0; i <10 ; i++) {
      this.products.push({id:UUID.UUID(), name:"Computer", price :6500, promotion: true});
      this.products.push( {id:UUID.UUID(), name:"Printer", price :1200, promotion:false},);
      this.products.push({id:UUID.UUID(), name:"Smart phone", price :3000, promotion:true},);

    }
  }

  public getAllProducts() : Observable<Product[]>{
    let rmd=Math.random();
    if(rmd<0.1) return throwError(()=> new Error("Internet connexion error"));

    else return of([...this.products]);
  }


  public getPageProducts(page : number, size :number) : Observable<PageProduct>{
    let index =page*size;
    let totalPages = ~~(this.products.length / size);
    if(this.products.length % size !=0)
      totalPages++;
    let pageProducts = this.products.slice(index,index+size);
    return of({page:page ,size:size, totalPages:totalPages, products :pageProducts });
  }

  public deleteProduct(id : string) : Observable<boolean>{
    this.products = this.products.filter(p=>p.id!=id);
    return of(true);

  }

  public setPromotion(id : string) : Observable<boolean>{
    let product= this.products.find(p=>p.id==id);
    if(product !=undefined) {

      product.promotion = !product.promotion;
      return  of(true);
    } else return throwError(()=> Error("Product not found"));
  }

  public searchProducts(Keyword :string, page : number, size : number): Observable<PageProduct>{
    let result = this.products.filter(p=>p.name.includes(Keyword));
    let index =page*size;
    let totalPages = ~~(result.length / size);
    if(this.products.length % size !=0)
      totalPages++;
    let pageProducts = result.slice(index,index+size);
      return of( {page:page ,size:size, totalPages:totalPages, products :pageProducts });
  }

  public addNewProduct(product : Product) : Observable<Product>{
    product.id=UUID.UUID();
    this.products.push(product);
    return of(product);
  }

  public getProduct(id:string): Observable<Product>{
     let product = this.products.find(p=>p.id==id);
     if(product==undefined) return throwError(()=>new Error("Product not found"));
     return of(product);
  }

  getErrorMessage(fieldName: string, error: ValidationErrors) {
    if (error['required']){
      return fieldName +" is Required";
    }else if(error['minlength']){
      return fieldName+"should have at least "+error['minlength']['requiredLength']+" Characters";
    }

    else if(error['min']){
      return fieldName+"should have min value "+error['min']['min'];
    }
    else return"";


  }

  public updateProduct(product : Product) : Observable<Product>{
    this.products=this.products.map(p=>(p.id==product.id)?product:p);
    return of(product);
  }

}
