import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  set(key: string|Object, item?: string|Object): LocalStorageService {
    if (typeof key === 'object') {
      Object.keys(key).forEach( k => this.set(k, key[k]) );
    } else {
      const itemValue = typeof item === 'string' ? item : JSON.stringify(item);
      localStorage.setItem(key, itemValue);
    }
    return this;
  }

  get(key: string): string {
    return localStorage.getItem(key);
  }

  getObject(key: string): Object {
    return JSON.parse(this.get(key));
  }

  clear(...keys: string[]): LocalStorageService {
    if (!keys.length) {
      localStorage.clear();
    } else {
      keys.forEach( k => localStorage.removeItem(k) );
    }
    return this;
  }

}
