import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataExchangeService {

  public songSubject = new Subject();
  public trackSubject = new Subject();
  public modalSubject = new Subject();
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
    this.modalSubject.next('login');
  }

  public emitAddSongClick(): void {
    this.modalSubject.next('addSong');
  }

  public emitRegisterClick(): void {
    this.modalSubject.next('register');
  }

  public emitCloseModalClick(): void {
    this.closeModalSubject.next(true);
  }
}
