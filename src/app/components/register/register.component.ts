import { Component, OnInit } from '@angular/core';
import { DataExchangeService } from '../../services/data-exchange.service';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public username: string;
  public password: string;
  public repeatPass: string;

  constructor(private dataExchangeService: DataExchangeService,
              private serverService: ServerService) { }

  ngOnInit(): void {
  }

  public clickLogin(): void {
    this.dataExchangeService.emitLoginClick();
  }

  public clickClose(): void {
    this.dataExchangeService.emitCloseModalClick();
  }

  public regValidate(): void {
    if (this. password === this.repeatPass) {
      this.registerUser();
    } else {
      alert('Passwords dont match');
    }
  }

  private async registerUser(): Promise<any> {
    await this.serverService.addNewUser(this.username, this.password);
    await this.userAuth();
  }

  private async userAuth(): Promise<any> {
    await this.serverService.userAuth(this.username, this.password);
  }

}
