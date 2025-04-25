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

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(socket: Socket) {
    console.log(socket.id);
    const sock_user=await this.chatService.getUserFromSocket(socket);
     socket.data.user = sock_user.id;
  }

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @MessageBody() data: { to: number; content: string },
    @ConnectedSocket() socket: Socket,
  ) {
    console.log("user",socket.data.user)
    const senderId: number = socket.data.user;
    const receiverId = data.to;

    const message = await this.chatService.sendMessage(
      senderId,
      receiverId,
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
