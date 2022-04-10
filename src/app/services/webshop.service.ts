import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebshopService {

  constructor(
    private http: HttpClient
  ) { }

  getWebshopItems(){
    return this.http.get(env.API_URL + env.WEBSHOP_ITEM);
  }

  addWebshopItem(title:String, description:String){
    return this.http.post(env.API_URL + env.WEBSHOP_ITEM, {
      title: title,
      description:description
    })
  }

  updateWebshopItem(id:String,title:String, description:String){
    return this.http.put(env.API_URL+env.WEBSHOP_ITEM, {
      id: id,
      title: title,
      description: description
    })
  }

  deleteWebshopItem(id:String){
    return this.http.delete(env.API_URL+env.WEBSHOP_ITEM+'/'+id)
  }
}
