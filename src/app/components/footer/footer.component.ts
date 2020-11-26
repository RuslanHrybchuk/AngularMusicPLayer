import {Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {DataExchangeService} from '../../services/data-exchange.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('stream') playerRef: ElementRef<HTMLAudioElement>;
  @ViewChild('timeline') timelineRef: ElementRef<HTMLDivElement>;
  @ViewChild('playhead') playheadRef: ElementRef<HTMLDivElement>;
  @ViewChild('hoverPlayhead') hoverPlayheadRef: ElementRef<HTMLDivElement>;

  private dataSubscription: Subscription;
  public audio;
  public songData: any;
  public currentTime: string;
  public pause: boolean;
  public volume = 50;
  private savedVolume: number;

  get player(): HTMLAudioElement {
    return this.playerRef.nativeElement;
  }

  get timeline(): HTMLDivElement {
    return this.timelineRef.nativeElement;
  }

  get playhead(): HTMLDivElement {
    return this.playheadRef.nativeElement;
  }

  get hoverPlayhead(): HTMLDivElement {
    return this.hoverPlayheadRef.nativeElement;
  }


  constructor(private dataExchangeService: DataExchangeService) {
  }

  ngOnInit(): void {
    this.dataSubscription = this.dataExchangeService.songSubject.subscribe(this.subscribeToSignal.bind(this));
  }

  //////////////////////////////////////////////////////////////////


  private updatePlayer(): void {
    this.audio = new Audio(this.songData.audioUrl);
    this.player.load();                                   // Reloads new audio
  }

  public playPreviousTrack(): void {
    this.dataExchangeService.playPreviousTrack();
  }

  public playNextTrack(): void {
    this.dataExchangeService.playNextTrack();
  }

  public playOrPause(): void {
    if (this.pause !== undefined) {
      this.pause ? this.player.play() : this.player.pause();
      this.pause = !this.pause;
    }
  }

  private subscribeToSignal(signal: object): void {
    if (this.songData !== signal) {
      this.songData = signal;

      this.updatePlayer();
      this.player.play();
      this.pause = false;
    }
  }


  private changeCurrentTime(e): void {
    const duration = this.player.duration;

    const playheadWidth = this.timeline.offsetWidth;
    const offsetWidth = this.timeline.offsetLeft;
    const userClickWidth = e.clientX - offsetWidth;

    const userClickWidthInPercent = (userClickWidth * 100) / playheadWidth;

    this.playhead.style.width = userClickWidthInPercent + '%';
    this.player.currentTime = (duration * userClickWidthInPercent) / 100;
  }

  public changeVolume(value): void {
    this.volume = value;
    this.player.volume = value / 100;
  }

  public volumeClick(): void {
    if (this.volume === 0) {
      this.changeVolume(this.savedVolume * 100);
    } else {
      this.savedVolume = this.player.volume;
      this.changeVolume(0);
    }
  }


  private resetTimeLine(): void {
    this.hoverPlayhead.style.width = '0';
  }


  private hoverTimeLine(e): void {
    const duration = this.player.duration;

    const playheadWidth = this.timeline.offsetWidth;

    const offsetWidth = this.timeline.offsetLeft;
    const userClickWidth = e.clientX - offsetWidth;
    const userClickWidthInPercent = (userClickWidth * 100) / playheadWidth;

    if (userClickWidthInPercent <= 100) {
      this.hoverPlayhead.style.width = userClickWidthInPercent + '%';
    }

    const time = (duration * userClickWidthInPercent) / 100;

    if ((time >= 0) && (time <= duration)) {
      this.hoverPlayhead.dataset.content = this.formatTime(time);
    }
  }


  private timeUpdate(): void {
    const duration = this.player.duration;
    const timelineWidth = this.timeline.offsetWidth - this.playhead.offsetWidth;
    const playPercent = 100 * (this.player.currentTime / duration);
    this.playhead.style.width = playPercent + '%';

    const currentTime = this.formatTime(this.player.currentTime);

    this.currentTime = currentTime;
  }


  private formatTime(currentTime): string {
    const minutes: number | string = Math.floor(currentTime / 60);
    let seconds: number | string = Math.floor(currentTime % 60);

    seconds = (seconds >= 10) ? seconds : '0' + seconds % 60;

    const formatTime = minutes + ':' + seconds;

    return formatTime;
  }


  ngAfterViewInit(): void {
    this.player.addEventListener('timeupdate', this.timeUpdate.bind(this), false);
    this.player.addEventListener('ended', this.playNextTrack.bind(this), false);
    this.timeline.addEventListener('click', this.changeCurrentTime.bind(this), false);
    this.timeline.addEventListener('mousemove', this.hoverTimeLine.bind(this), false);
    this.timeline.addEventListener('mouseout', this.resetTimeLine.bind(this), false);
  }


  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();

    this.player.removeEventListener('timeupdate', this.timeUpdate);
    this.player.removeEventListener('ended', this.playNextTrack);
    this.timeline.removeEventListener('click', this.changeCurrentTime);
    this.timeline.removeEventListener('mousemove', this.hoverTimeLine);
    this.timeline.removeEventListener('mouseout', this.resetTimeLine);
  }
}
