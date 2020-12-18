import {Component, OnInit} from '@angular/core';
import {DataExchangeService} from '../../services/data-exchange.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private dataExchangeService: DataExchangeService) {
  }

  ngOnInit(): void {
  }

  public clickRegister(): void {
    this.dataExchangeService.emitRegisterClick();
  }

  public clickClose(): void {
    this.dataExchangeService.emitCloseModalClick();
  }

}
