import { Component, OnInit } from '@angular/core';
import { DataExchangeService } from '../../services/data-exchange.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private dataExchangeService: DataExchangeService) { }

  ngOnInit(): void {
  }

  public addSong(): void {
    this.dataExchangeService.emitAddSongClick();
  }

  public clickLogin(): void {
    this.dataExchangeService.emitLoginClick();
  }

  public clickLogOut(): void {
    sessionStorage.removeItem('currentUser');
    window.location.reload();
  }

  public userLogged(): boolean {
    if (sessionStorage.getItem('currentUser')) {    // check localstorage
      return true;
    } else {
      return false;
    }
  }

}
