import 'package:socket_io_client/socket_io_client.dart' as io;

final io.Socket socket = io.io("ws://192.168.11.199:3001", <String, dynamic>{
  'transports': ['websocket'],
  'autoConnect': false,
});
