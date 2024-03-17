import 'package:flutter/cupertino.dart';

class FormResponse extends ChangeNotifier {
  String name = "";
  String userName = "";
  String password = "";
  String uid = "";
  String receiverId = "all";

  void setData(dynamic data) {
    name = data["name"];
    userName = data["username"];
    password = data["password"];
    uid = data["_id"];
  }

  void setId(String id) {
    if (id == uid) {
      receiverId = "all";
    } else {
      receiverId = id;
    }
  }
}
