import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameService } from '../services/game.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  gameId: string;
  userId: string = "";
  uid: string;
  gameCode: string;
  

  joinGame(){
    var didJoinGame = this.gameService.joinGame(this.gameId)
    console.log(`did I join game ${didJoinGame}`, didJoinGame)
    if (didJoinGame) {
      this.router.navigate([`/game/${this.gameId}`])
    } else {
      this._snackbar.open("Could not join game. Try another game", '',{
        duration: 3000,
      })
    }
  }

  constructor(private auth: AngularFireAuth, private router: Router, private _snackbar: MatSnackBar, private gameService: GameService) { }

  loggedIn(){
    console.log(`user id from loggedIn(): ${this.userId}`)
    if(this.userId){
      this.gameService.createGame();
    } else {
      this._snackbar.open("Start New Game", '',{
        duration: 3000,
      })
    }
  }

  ngOnInit(): void {
    this.auth.user.subscribe(v => {
      return this.userId = v ? v.uid : '';
    });
  }
  //user ? user.userId 
  logout() {
    this.auth.signOut().then(() => { });
  }
    
}
  


  

   

  

  


