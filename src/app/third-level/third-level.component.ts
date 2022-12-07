import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, NgZone } from '@angular/core';
import { ChildData } from '../child-data.type';

@Component({
  selector: 'app-third-level',
  imports: [CommonModule],
  standalone: true,
  template: `
    <strong>{{ childData.label }}</strong>
  <button (click)="mark()">Mark</button>
  <span>{{visualizeChangeDetectionRan()}}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./third-level.component.css'],
})
export class ThirdLevelComponent {
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
