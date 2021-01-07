import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataExchangeService} from './data-exchange.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private serverUrl = 'http://localhost:3003/';
  private userID;

  constructor(private http: HttpClient,
              private dataExchangeService: DataExchangeService) {
  }

  public async addNewUser(username: string, password: string): Promise<any> {
    await this.http.post(`${this.serverUrl}users`, {
      username,
      password
    }).toPromise();

    this.userAuth(username, password);
  }

  public async userAuth(username, password): Promise<any> {
    this.http.post(`${this.serverUrl}users/login`, {
      username,
      password
    }, {observe: 'response'}).subscribe({
      error: error => {
        if (error.error.text) {
          console.log('User Id: ' + error.error.text);
          this.userID = error.error.text;
          sessionStorage.setItem('currentUser', this.userID);
          this.dataExchangeService.emitCloseModalClick();
        } else {
          alert('Error: ' + error.error);
        }
      }
    });
  }
}
