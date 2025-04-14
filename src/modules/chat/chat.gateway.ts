import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService} from './chat.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(socket: Socket) {
    await this.chatService.getUserFromSocket(socket);
  }

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @MessageBody() data: { to: number; content: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const senderId: number = socket.data.user;
    const receiverId = data.to;

    const message = await this.chatService.sendMessage(
      senderId,
      receiverId ,
      data.content,
    );

    // Emit to receiver if online
    this.server.emit(`chat_${receiverId}`, message);

    // Optionally emit back to sender for delivery status
    socket.emit('message_sent', message);
  }

  //  async listenForMessages(
  //     @MessageBody() content: string,
  //     @ConnectedSocket() socket: Socket,
  //   ) {
  //     const author = await this.chatService.getUserFromSocket(socket);

  //     this.server.sockets.emit('receive_message', {
  //       content,
  //       author,
  //     });
  //   }
}
