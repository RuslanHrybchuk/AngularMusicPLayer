import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataExchangeService } from '../../services/data-exchange.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription;
  private song: Array<any>;
  private currentTime: number;

  constructor(private dataExchangeService: DataExchangeService) { }

  ngOnInit(): void {
    this.dataSubscription = this.dataExchangeService.songSubject.subscribe(this.subscribeToSignal.bind(this));
  }

  private subscribeToSignal(signal: Array<any>): void {
    this.song = signal;
    console.log(this.song);
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

}
