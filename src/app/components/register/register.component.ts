import { Component, OnInit } from '@angular/core';
import { DataExchangeService } from '../../services/data-exchange.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private dataExchangeService: DataExchangeService) { }

  ngOnInit(): void {
  }

  public clickLogin(): void {
    this.dataExchangeService.emitLoginClick();
  }

  public clickClose(): void {
    this.dataExchangeService.emitCloseModalClick();
  }

}
