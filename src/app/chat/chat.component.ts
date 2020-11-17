import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { GameService } from '../services/game.service';
import { SocketService } from '../services/socket.service';
import { take } from 'rxjs/operators';
import { Message } from '../interfaces/message.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('output') private chatOutput: ElementRef;
  messages: Array<Message> = [];
  messageText: string = '';
  displayName = '';
  currentGame: string;
  player: string;
  currentPlayer: string;
  constructor(private gameservice: GameService, private auth: AngularFireAuth, private afs: AngularFirestore, private socketService: SocketService) { }

  sendMessage(){
    if(this.messageText.length > 0 && this.messageText.length <= 280){
      let msg: Message = {
        displayName: this.currentPlayer,
        body: this.messageText
      }
      this.messageText = '';

    }

  }
  chatScroll(): void {
    try {
      this.chatOutput.nativeElement.scrollTop = this.chatOutput.nativeElement.scrollHeight
      // scrollTo(0, this.messages.length * 20);
    } catch (err) { }
  }

  onKeydown(event) {
    event.preventDefault();
  }


  ngOnInit(): void {
    this.socketService.chatMessages$.subscribe((msg: Message) => {
      this.messages.push(msg)
      setTimeout(this.chatScroll.bind(this), 50)
    });
  }

}
