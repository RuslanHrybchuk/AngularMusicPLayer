import {Component, OnInit} from '@angular/core';
import {DataExchangeService} from '../../services/data-exchange.service';
import {HttpClient} from '@angular/common/http';
import {log} from 'util';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {
  public songTitle: string;
  public songAuthor = ' ';
  public uploadedSongName: string;
  public songFile: File = null;
  public imgFile: File = null;
  public songImage: string;
  public defaultImage = 'default.jpg';

  constructor(private dataExchangeService: DataExchangeService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  public clickClose(): void {
    this.dataExchangeService.emitCloseModalClick();
  }

  // adds new song to database
  public async addSong(): Promise<any> {
    this.uploadSong();

    if (!this.songTitle) {
      this.songTitle = this.songFile.name;
    }

    if (!this.imgFile) {
      this.songImage = this.defaultImage;
    } else {
      this.songImage = this.imgFile.name;
      this.uploadImage();
    }

    // console.log(this.imgFile);

    await this.http.post('http://localhost:3003/songs/new', {
      title: this.songTitle,
      author: this.songAuthor,
      duration: '3:33',                // NOT DONE YET  NOT DONE YET  NOT DONE YET  NOT DONE YET
      background: `../../assets/images/${this.songImage}`,
      audioUrl: `../../assets/audio/${this.songFile.name}`
    }).subscribe( async res => {
      console.log('res is');
      console.log(res);

      // @ts-ignore
      const resId = res._id;

      await this.addSongToUser(resId);
    });

    this.clickClose();
  }

  private async addSongToUser(songId): Promise<any> {
    const userId = sessionStorage.getItem('currentUser');
    console.log('Song id ' + songId);
    console.log('TypeOf song id ' + typeof songId);
    console.log('User id ' + userId);

    await this.http.patch(`http://localhost:3003/users/update/${userId}`, {
      songId
    }).subscribe(res => {
      console.log(res);
    });
  }


  public onSongUpload(event): void {
    this.songFile = event.target.files[0];
  }

  public onImgUpload(event): void {
    this.imgFile = event.target.files[0];
  }

  private uploadImage(): void {
    const fd = new FormData();
    fd.append('image', this.imgFile, this.imgFile.name);

    this.http.post('http://localhost:3003/upload/image', fd).subscribe( res => {
      // console.log(res);
    });
  }

  private uploadSong(): void {
    const fd = new FormData();
    fd.append('song', this.songFile, this.songFile.name);

    this.http.post('http://localhost:3003/songs/upload/song', fd).subscribe( res => {
      // console.log(res);
    });
  }

}
