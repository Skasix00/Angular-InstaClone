import { OnInit, Component } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {
    const firebaseConfig = {

      apiKey: "AIzaSyDkxeNn9-QjuZnKOWlKxqVoSD0EXZ5Iw7I",

      authDomain: "jta-instagram-clome.firebaseapp.com",

      projectId: "jta-instagram-clome",

      storageBucket: "jta-instagram-clome.appspot.com",

      messagingSenderId: "506782073794",

      appId: "1:506782073794:web:0f22b7703c5758e0d38c5b",

      measurementId: "G-SLJ6SLKCJF",
      
      databaseURL: "https://jta-instagram-clome-default-rtdb.firebaseio.com"

    };

    firebase.initializeApp(firebaseConfig)
  }

}
