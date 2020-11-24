import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { MusicCardComponent } from './components/music-card/music-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataExchangeService } from './services/data-exchange.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    MusicCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [
    DataExchangeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
