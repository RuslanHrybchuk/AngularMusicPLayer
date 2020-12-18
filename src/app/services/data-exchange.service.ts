import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataExchangeService {

  public songSubject = new Subject();
  public trackSubject = new Subject();
  public loginSubject = new Subject();
  public closeModalSubject = new Subject();

  constructor() {
  }

  public emitActiveSong(song): void {
    this.songSubject.next(song);
  }

  public playNextTrack(): void {
    this.trackSubject.next('next');
  }

  public playPreviousTrack(): void {
    this.trackSubject.next('prev');
  }

  public emitLoginClick(): void {
    this.loginSubject.next('login');
  }

  public emitRegisterClick(): void {
    this.loginSubject.next('register');
  }

  public emitCloseModalClick(): void {
    this.closeModalSubject.next(true);
  }
}
