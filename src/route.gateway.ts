import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { iptrace } from 'ip-trace';
import { WebSocket } from 'ws';

@WebSocketGateway()
export class RouteGateway {
  @SubscribeMessage('requestFindDomain')
  handleFindDomain(
    @ConnectedSocket() client: WebSocket,
    @MessageBody('domain') domain: string,
  ): void {
    const tracer = iptrace(domain);
    tracer
      .onHop((hop) => {
        client.send(
          JSON.stringify({
            event: 'hop',
            data: {
              hop,
            },
          }),
        );
      })
      .onFindDestinationIP((destination) => {
        client.send(
          JSON.stringify({
            event: 'findDestination',
            data: {
              destination,
            },
          }),
        );
      })
      .onClose((msg) => {
        client.send(
          JSON.stringify({
            event: 'close',
            data: {
              msg,
            },
          }),
        );
      })
      .onError((error) => {
        client.send(
          JSON.stringify({
            event: 'error',
            data: {
              error,
            },
          }),
        );
      })
      .onDestination((destination) => {
        client.send(
          JSON.stringify({
            event: 'destination',
            data: {
              destination,
            },
          }),
        );
      })
      .onRawMessage((rawMessage) => {
        client.send(
          JSON.stringify({
            event: 'rawMessage',
            data: {
              rawMessage,
            },
          }),
        );
      })
      .start();
  }
}
