import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataExchangeService {

  public songSubject = new Subject();
  public trackSubject = new Subject();

  constructor() { }

  public emitActiveSong(song): void {
    this.songSubject.next(song);
  }

  public playNextTrack(): void {
    this.trackSubject.next('next');
  }

  public playPreviousTrack(): void {
    this.trackSubject.next('prev');
  }
}
