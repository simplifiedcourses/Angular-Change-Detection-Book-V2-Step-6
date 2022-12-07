import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, NgZone } from '@angular/core';
import { ChildData } from './child-data.type';
import { FirstLevelComponent } from './first-level/first-level.component';
import { updateNodeTree } from './helpers';

@Component({
  selector: 'my-app',
  imports: [CommonModule, FirstLevelComponent],
  template: `
  {{ visualizeChangeDetectionRan() }}
  <strong>App root</strong>
  <button (click)="mark()">Mark</button>
  <div class="children">
    <app-first-level
      *ngFor="let level of data; trackBy: tracker"
      [childData]="level"
    ></app-first-level>
  </div>
  <div class="data-structure">
    <h2>Update from outside (immutable)</h2>
    <ul>
      <li *ngFor="let l1 of data">
        <div class="row">
          {{ l1.id }}
          <button (click)="update(l1.id)">Update node: {{l1.label}}</button>
        </div>
        <ul *ngIf="l1.children">
          <li *ngFor="let l2 of l1.children">
            <div class="row">
              {{ l2.id }}
              <button (click)="update(l2.id)">Update node: {{l2.label}}</button>
            </div>
            <ul>
              <li *ngFor="let l3 of l2.children">
                <div class="row">
                  {{ l3.id }}
                  <button (click)="update(l3.id)">Update node: {{l3.label}}</button>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>

  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public data: ChildData[] = [
    {
      label: 'Level 1: 1',
      id: 'l1_1',
      children: [
        {
          label: 'Level 2: 1',
          id: 'l2_1',
          children: [
            {
              label: 'Level 3: 1',
              id: 'l3_1',
            },
            {
              label: 'Level 3: 2',
              id: 'l3_2',
            },
          ],
        },
        {
          label: 'Level 2: 2',
          id: 'l2_2',
          children: [
            {
              label: 'Level 3: 3',
              id: 'l3_3',
            },
            {
              label: 'Level 3: 4',
              id: 'l3_4',
            },
          ],
        },
      ],
    },
    {
      id: 'l1_2',
      label: 'Level 1: 2',
      children: [
        {
          id: 'l2_3',
          label: 'Level 2: 3',
          children: [
            {
              label: 'Level 3: 5',
              id: 'l3_5',
            },
          ],
        },
      ],
    },
  ];

  public tracker = (i:number) => i;
  constructor(private elementRef: ElementRef, private zone: NgZone) {
  }

  public visualizeChangeDetectionRan() {
    this.elementRef.nativeElement.classList.add('detecting');
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.elementRef.nativeElement.classList.remove('detecting');
      }, 1000);
    });
  }

  public mark(): void {}

  public update(id: string): void {
    console.log(id);
    this.data = updateNodeTree(this.data, id);
  }
}
