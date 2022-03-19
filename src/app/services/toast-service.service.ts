import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: ToastrService) {}
  showSuccess(message: string): void {
    this.toastr.success(message);
  }

  onError(message: string): void {
    this.toastr.error(message)
  }
}
