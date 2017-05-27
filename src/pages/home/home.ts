import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// We import the authentication provider to test the log-out function.
import { AuthProvider } from '../../providers/auth/auth';
import { MediaPlugin, MediaObject } from '@ionic-native/media';

declare var cordova:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public file:MediaObject;
     
  constructor(public navCtrl: NavController, public authProvider: AuthProvider, private media: MediaPlugin){
 
  }
    // Create a MediaPlugin instance.  Expects path to file or url as argument
      // We can optionally pass a second argument to track the status of the media
 
    
   
  /**
   * Calls the authentication provider and logs the user out, on successful logout it sends the user
   * back to the login page.
   */
  logMeOut() {
    this.authProvider.logoutUser().then( () => {
      this.navCtrl.setRoot('LoginPage');
    });
  }

  recordAudio(){
    var path = cordova.file.externalDataDirectory;
      this.file = this.media.create(path);

      this.file.startRecord();
      let duration = this.file.getDuration();
      console.log(duration);
      // Platform Quirks:
      // iOS simply create a new instance and the old one will be overwritten
      // Android you must call release() to destroy instances of media when you are done
       this.file.release();
   
  }
  stopRecord(){
       this.file.stopRecord();
  }


  playAudioRecorded(){
    // play the file
      this.file.play();
      this.file.getCurrentPosition().then((position) => {
        console.log(position);
      });
      // pause the file file.pause();
  }
  stopAudioRecorded(){
    this.file.stop();
  }


      

      



    

}
