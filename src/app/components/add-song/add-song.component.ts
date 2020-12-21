import {Component, OnInit} from '@angular/core';
import {DataExchangeService} from '../../services/data-exchange.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {
  public songTitle;
  public songAuthor;
  public songFile: File = null;
  public imgFile: File = null;

  constructor(private dataExchangeService: DataExchangeService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  public clickClose(): void {
    this.dataExchangeService.emitCloseModalClick();
  }

  public addSong(): void {
    // this.uploadSong();
    // this.uploadImage();
  }

  public onSongUpload(event): void {
    this.songFile = event.target.files[0];
  }

  public onImgUpload(event): void {
    this.imgFile = event.target.files[0];
  }

  private uploadSong(): void {
    const fd = new FormData();
    fd.append('song', this.songFile, this.songFile.name);

    this.http.post('http://localhost:3003/songs/upload', fd).subscribe( res => {
      console.log(res);
    });
  }

}
