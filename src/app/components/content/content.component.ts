import {Component, OnChanges, OnInit} from '@angular/core';
import {DataExchangeService} from '../../services/data-exchange.service';
import {Subscription} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit, OnChanges {
  private dataSubscription: Subscription;
  private loginSubscription: Subscription;
  private closeModalSubscription: Subscription;
  public musicList = [];
  public activeCard: number = null;
  public activeCardId;
  public modalWindow = 'closed';

  constructor(private dataExchangeService: DataExchangeService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.dataSubscription = this.dataExchangeService.trackSubject.subscribe(this.subscribeToTrackSignal.bind(this));
    this.loginSubscription = this.dataExchangeService.modalSubject.subscribe(this.subscribeToModalSignal.bind(this));
    this.closeModalSubscription = this.dataExchangeService.closeModalSubject.subscribe(this.subscribeToCloseSignal.bind(this));
    this.getSongsFromServer();
  }

  ngOnChanges(): void {
    this.getSongsFromServer();
  }

  private async getSongsFromServer(): Promise<any> {
    const userId = sessionStorage.getItem('currentUser');

    if (userId) {
      await this.getSongs(userId);
    }
  }

  private async getSongs(userId): Promise<any> {
    await this.http.get<any>(`http://localhost:3003/users/id/${userId}`).subscribe({
      next: data => {
        const songs = data.userSongs;
        console.log(data);
        for (const i in songs) {
          if (i) {
            this.getSong(songs[i]);
          }
        }
      },
      error: error => {
        console.error('Error:', error);
      }
    });
  }

  private async getSong(id): Promise<any> {
    await this.http.get<any>(`http://localhost:3003/songs/id/${id}`).subscribe({
      next: song => {
        this.musicList.push(song);
      },
      error: error => {
        console.error('Error:', error);
      }
    });
  }

  private playMusicCard(songId): void {
    const currentCard = this.musicList.indexOf(this.musicList.find(x => x._id === songId));
    this.activeCard = currentCard;
    this.activeCardId = songId;

    this.dataExchangeService.emitActiveSong(this.musicList[currentCard]);
  }

  private activatePrevCard(): void {
    if (this.activeCard > 0) {
      this.activeCard--;
      this.activeCardId = this.musicList[this.activeCard]._id;
    }
  }

  private activateNextCard(): void {
    if (this.activeCard < (this.musicList.length - 1)) {
      this.activeCard++;
      this.activeCardId = this.musicList[this.activeCard]._id;
    }
  }

  private subscribeToModalSignal(signal): void {
    this.modalWindow = signal;
  }

  private subscribeToCloseSignal(): void {
    this.modalWindow = 'closed';
    window.location.reload();
  }

  private subscribeToTrackSignal(track): void {
    if (track === 'prev') {
      this.activatePrevCard();
    } else if (track === 'next') {
      this.activateNextCard();
    }
    this.playMusicCard(this.activeCardId);
  }
}
