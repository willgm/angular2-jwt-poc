import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  set(key:string|Object, item?:string|Object):LocalStorageService {
    if(typeof key === 'object') for(let k in key) this.set(k, key[k]);
    else localStorage.setItem(key, typeof item === 'string' ? item : JSON.stringify(item));
    return this;
  }

  get(key:string):string {
    return localStorage.getItem(key);
  }

  getObject(key:string):Object {
    return JSON.parse(this.get(key));
  }

  clear(...keys:string[]):LocalStorageService {
    if(!keys.length) localStorage.clear();
    else for(let k of keys) localStorage.removeItem(k); 
    return this;
  }

}
