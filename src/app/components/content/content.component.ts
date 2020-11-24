import { Component, OnInit } from '@angular/core';
import { DataExchangeService } from '../../services/data-exchange.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  public musicList = [
    {
      id: 1,
      title: 'Devils Trigger',
      author: 'Casey Edwards',
      duration: '6:45',
      background: '../../assets/images/m0.jpg',
      audioUrl: '../../audio/Devils Trigger.mp3'
    },
    {
      id: 2,
      title: 'Breaking the habit',
      author: 'Linkin Park',
      duration: '3:16',
      background: '../../assets/images/m1.jpg',
      audioUrl: '../../audio/linkin_park_-_breaking_the_habit_(zv.fm).mp3'
    },
    {
      id: 3,
      title: 'The red baron',
      author: 'Sabaton',
      duration: '3:22',
      background: '../../assets/images/m3.jpg',
      audioUrl: '../../audio/sabaton_-_the_red_baron.mp3'
    },
    {
      id: 4,
      title: 'Yandere Song',
      author: 'MiatriSs',
      duration: '4:34',
      background: '../../assets/images/m2.jpg',
      audioUrl: '../../audio/MiatriSs - Yandere Song.mp3'
    }
  ];
  public activeCard: number;

  private playMusicCard(song): void {
    this.activeCard = song.id;
    this.dataExchangeService.emitActiveSong(song);
  }

  constructor(private dataExchangeService: DataExchangeService) { }

  ngOnInit(): void {

  }
}
