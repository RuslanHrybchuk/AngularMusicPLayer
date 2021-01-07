import {Component, OnInit} from '@angular/core';
import {DataExchangeService} from '../../services/data-exchange.service';
import {ServerService} from '../../services/server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;

  constructor(private dataExchangeService: DataExchangeService,
              private serverService: ServerService) {
  }

  ngOnInit(): void {
  }

  public async login(): Promise<any> {
    await this.serverService.userAuth(this.username, this.password);
  }

  public clickRegister(): void {
    this.dataExchangeService.emitRegisterClick();
  }

  public clickClose(): void {
    this.dataExchangeService.emitCloseModalClick();
  }

}
