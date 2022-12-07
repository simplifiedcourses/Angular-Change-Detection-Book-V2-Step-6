import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, NgZone } from '@angular/core';
import { ChildData } from '../child-data.type';
import { ThirdLevelComponent } from '../third-level/third-level.component';

@Component({
  selector: 'app-second-level',
  imports: [CommonModule, ThirdLevelComponent],
  template: `
  <strong>{{ childData.label }}</strong>
  <button (click)="mark()">Mark</button>
  <span>{{visualizeChangeDetectionRan()}}</span>

  <div class="children">
  <app-third-level
    *ngFor="let data of childData.children; trackBy: tracker"
    [childData]="data"
  ></app-third-level>
  </div>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  styleUrls: ['./second-level.component.css'],
})
export class SecondLevelComponent {
  public tracker = (i:number) => i;
  @Input() public childData: ChildData;
  constructor(private elementRef: ElementRef, private zone: NgZone) {}

  public visualizeChangeDetectionRan(): void {
    this.zone.runOutsideAngular(() => {
      this.elementRef.nativeElement.classList.add('detecting');
      setTimeout(() => {
        this.elementRef.nativeElement.classList.remove('detecting');
      }, 1000);
    });
  }
  public mark(): void {}
}
