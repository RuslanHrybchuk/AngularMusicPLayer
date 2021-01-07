import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.scss']
})
export class MusicCardComponent implements OnInit {
  @Input() cardData;
  @Input() currentId;
  deleteCounter = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  public async deleteSong(event): Promise<any> {
    event.stopPropagation();
    console.log(this.deleteCounter);
    this.deleteCounter++;

    if (this.deleteCounter >= 2) {
      await this.sendDeleteRequest();
      window.location.reload();
    }
  }

  private async sendDeleteRequest(): Promise<any> {
    const userId = sessionStorage.getItem('currentUser');

    await this.http.patch(`http://localhost:3003/users/delete/${userId}`, {
      songId: this.cardData._id
    }).subscribe(res => {
      console.log(res);
    });
  }
}
