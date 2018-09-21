// angular
import { Component, OnInit, OnChanges, Input } from '@angular/core';

// models
import {
  TrackActivity
} from '../../../shared/model';

@Component({
  selector: 'racer-track-activity',
  templateUrl: './track-activity.component.html',
  styleUrls: ['./track-activity.component.scss']
})
export class TrackActivityComponent implements OnInit, OnChanges {
  @Input() trackActivity: TrackActivity;

  ngOnInit() {
  }

  ngOnChanges() {
  }
}
