import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, NgZone } from '@angular/core';
import { ChildData } from '../child-data.type';
import { SecondLevelComponent } from '../second-level/second-level.component';

@Component({
  selector: 'app-first-level',
  imports: [CommonModule, SecondLevelComponent],
  template: `
    <strong>{{ childData.label }}</strong>
  <button (click)="mark()">Mark</button>
  <span>{{visualizeChangeDetectionRan()}}</span>

    <div class="children">
    <app-second-level
      *ngFor="let data of childData.children; trackBy: tracker"
      [childData]="data"
    ></app-second-level>
    </div>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  styleUrls: ['./first-level.component.css'],
})
export class FirstLevelComponent {
  @Input() public childData: ChildData;

  public tracker = (i:number) => i;
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
