import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore' 
import { SocketService } from './socket.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  db = this.afs.collection('game')
  userId: string = "";
  gameId: string;
  boardReady: boolean = true;
  playerTurn: boolean = true;
  gameInfo: any = null

  constructor(private router: Router, private auth: AngularFireAuth, private afs: AngularFirestore, private socketService: SocketService) { 
    this.auth.user.subscribe(v=> {
      this.userId = v ? v.uid : null;
    });
  
  }

createGame(){
  this.gameId =  Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 8);
  this.afs.collection('game').doc(`${this.gameId}`).set({
    gameId: this.gameId,
    gameOver: false,
    winner: null,
    gameReady: false,
    numLocked: 0,
    activePlayer: this.userId,
    inactivePlayer: null,
    boards: {}
  })
  // subscribe to that doc
  // navigate them to that page
  
 }


 joinGame(gameId: string){
    console.log(`The game ID being passed in from home comp: ${gameId}`)
    let docRef = this.afs.collection('game').doc(`${gameId}`)
    // Does that game exist??
    docRef.get().toPromise().then(doc => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    // YES - Is there an inactive player?
      // YES - GTFO
      // NO  - set inactive player, set this.gameId subscribe to that doc
      // NO - Show error
    this.router.navigate([`/game/${gameId}`])
 }


 submitBoard(board){
   // set appropriate board and increment numLocked by 1, if it's now 2, set gameReady to true
 }


 guessShot(col: number, row: number){
    // I'm active 1234
    // Inactive is 5678
    // I take a shot it says ok who's inactive
    // Check game.boards.5678 at some coordinates []
    // Let's say I shot A5 (0, 4)
    // Hey check game.boards.5678.0[4] 
        // Is it a 2,3,4? Ignore the shot and don't continue
        // Is it 0 then change to 2
        // Is it a 1, change to 3 check for gameOver
        // Swap inactive and active players if not gameOver
 }


 showWinner(){
   // NYI
 }


}