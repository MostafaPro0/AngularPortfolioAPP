import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EncryptionService } from '../service/encryption.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {
  encryptedHref!: SafeUrl;

  constructor(private enc: EncryptionService, private sanitizer: DomSanitizer) {
    const query = this.enc.buildQuery({
      video: 'https://www.youtube.com/embed/DmGOmZ8AKyk?si=ttkQtens4n2eFiO8',
      video_iframe: 'https://www.youtube.com/embed/DmGOmZ8AKyk?si=ttkQtens4n2eFiO8',
      videoName: 'Mango',
      studentName: 'Mostafa Mohamed',
      studentViews: 192,
      clientLogo: 'https://mr-muyassar.com/new_student/Frontend-Mr.Muyasser-main/images/logo.png',
      clientName: 'Mr. Mostafa Mohamed',
      VersionNumber: '1.0',
      NameAboveVid: 1,
      NameMoveSeconds: 3
    });

    this.enc.debugEncryption(query);

    const cipher = this.enc.encrypt(query);
    
    // Use URL-safe Base64 directly
    const finalUrl = `OnxamVideoPlayer:?${cipher}`;
    
    console.log('Final URL:', finalUrl);
    console.log('Length:', finalUrl.length);

    this.encryptedHref = this.sanitizer.bypassSecurityTrustUrl(finalUrl);
  }
}