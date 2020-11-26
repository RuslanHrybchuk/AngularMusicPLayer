import { Component, OnInit } from '@angular/core';
import { DataExchangeService } from '../../services/data-exchange.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit {
  private dataSubscription: Subscription;

  public musicList = [
    {
      id: 0,
      title: 'Devils Trigger',
      author: 'Casey Edwards',
      duration: '6:45',
      background: '../../assets/images/m0.jpg',
      audioUrl: '../../assets/audio/Devils Trigger.mp3'
    },
    {
      id: 1,
      title: 'Breaking the habit',
      author: 'Linkin Park',
      duration: '3:16',
      background: '../../assets/images/m1.jpg',
      audioUrl: '../../assets/audio/linkin_park_-_breaking_the_habit_(zv.fm).mp3'
    },
    {
      id: 2,
      title: 'The red baron',
      author: 'Sabaton',
      duration: '3:22',
      background: '../../assets/images/m3.jpg',
      audioUrl: '../../assets/audio/sabaton_-_the_red_baron.mp3'
    },
    {
      id: 3,
      title: 'Yandere Song',
      author: 'MiatriSs',
      duration: '4:34',
      background: '../../assets/images/m2.jpg',
      audioUrl: '../../assets/audio/MiatriSs - Yandere Song.mp3'
    }
  ];
  public activeCard: number;

  constructor(private dataExchangeService: DataExchangeService) {
  }

  ngOnInit(): void {
    this.dataSubscription = this.dataExchangeService.trackSubject.subscribe(this.subscribeToTrackSignal.bind(this));
  }

  private playMusicCard(songId): void {
    this.activeCard = songId;
    this.dataExchangeService.emitActiveSong(this.musicList[songId]);
  }

  private activatePrevCard(): void {
    if ((this.activeCard - 1) >= 0 ) {
      this.activeCard--;
    }
  }

  private activateNextCard(): void {
    if ((this.activeCard + 1) <= (this.musicList.length - 1) ) {
      this.activeCard++;
    }
  }

  private subscribeToTrackSignal(track): void {
    if (track === 'prev') {
      this.activatePrevCard();
    } else if (track === 'next') {
      this.activateNextCard();
    }
    this.playMusicCard(this.activeCard);
  }
}
