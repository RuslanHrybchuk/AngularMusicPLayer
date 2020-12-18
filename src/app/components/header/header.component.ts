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

  public clickLogin(): void {
    this.dataExchangeService.emitLoginClick();
  }

}
