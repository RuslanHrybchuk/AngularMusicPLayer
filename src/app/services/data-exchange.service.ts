import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataExchangeService {

  public songSubject = new Subject();

  constructor() { }

  public emitActiveSong(song): void {
    this.songSubject.next(song);
  }
}
