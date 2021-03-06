import {Component, OnInit} from '@angular/core';
import {CommonService} from '../common.service';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  isCameraOpen = false;
  isMobile: boolean;
  year: any;
  error = false;

  constructor(private commonService: CommonService, private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.isMobile = this.commonService.isMobile();
    this.year = new Date().getFullYear();
    this.apiService.healthCheck()
      .subscribe(() => {
          console.log('APP IS UP AND READY');
        },
        err => {
          this.error = true;
        });
  }

  get hasError() {
    return this.error;
  }

  get openModal() {
    return this.commonService.openModal;
  }

  handleFileInput(images) {
    const reader = new FileReader();
    reader.onload = e => {
      this.commonService.setImageSrc(reader.result);
      this.commonService.openModal = true;
    };

    reader.readAsDataURL(images[0]);
  }

  updateUploadVisible(event) {
    this.isCameraOpen = event;
  }

  refresh() {
    window.location.reload();
  }

  onError() {
    this.error = true;
  }
}
