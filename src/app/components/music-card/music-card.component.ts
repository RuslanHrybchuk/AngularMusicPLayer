import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.scss']
})
export class MusicCardComponent implements OnInit {
  @Input() cardData;
  @Input() isActive;

  constructor() { }

  ngOnInit(): void {
  }

}
