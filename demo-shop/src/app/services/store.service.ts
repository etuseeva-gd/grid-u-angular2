import { Injectable } from '@angular/core';

const NAMESPACE = 'DS-';

@Injectable()
export class StoreService {

  constructor() { }

  static get(key: string): any {
    return JSON.parse(window.localStorage.getItem(NAMESPACE + key));
  }

  static set(key: string, value: any) {
    return window.localStorage.setItem(NAMESPACE + key, JSON.stringify(value));
  }

  static has(key: string):boolean {
    return window.localStorage.getItem(NAMESPACE + key) !== null;
  }

  static remove(key: string): void {
    window.localStorage.removeItem(NAMESPACE + key)
  }
}
