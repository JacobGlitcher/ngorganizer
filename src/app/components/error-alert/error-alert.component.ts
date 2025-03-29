import { Component, Input } from '@angular/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  standalone: true,
  selector: 'app-error-alert',
  imports: [NzAlertModule],
  template: `
    @if (message) {
      <nz-alert nzType="error" [nzMessage]="message" nzShowIcon class="mt-2"></nz-alert>
    }
  `,
  styles: [],
})
export class ErrorAlertComponent {
  @Input() message: string | null = null;
}
