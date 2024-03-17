import 'package:flutter/material.dart';

class LoginField extends StatefulWidget {
  final String title;
  final Function(String) onChanged;
  final bool needHiding;
  final bool isError;
  final String errorText;
  final bool isId;

  const LoginField(
      {super.key,
      required this.title,
      required this.onChanged,
      required this.needHiding,
      required this.isError,
      required this.errorText,
      required this.isId});

  @override
  State<LoginField> createState() => _LoginFieldState();
}

class _LoginFieldState extends State<LoginField> {
  bool isHidden = true;

  IconData icon = Icons.visibility_off_outlined;

  void hidden() {
    setState(() {
      if (isHidden) {
        icon = Icons.visibility_off_outlined;
      } else {
        icon = Icons.visibility_outlined;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: TextField(
        style: const TextStyle(fontFamily: "SpecialElite"),
        obscureText: widget.needHiding ? isHidden : false,
        onChanged: widget.onChanged,
        keyboardType: widget.isId ? TextInputType.number : TextInputType.name,
        decoration: InputDecoration(
          filled: true,
          fillColor: const Color(0xFFF3EDC8),
          suffixIcon: widget.title == "Password"
              ? IconButton(
                  onPressed: () {
                    isHidden = !isHidden;
                    hidden();
                  },
                  icon: Icon(icon),
                )
              : null,
          errorText: widget.isError ? "Incorrect ${widget.errorText}" : null,
          contentPadding:
              const EdgeInsets.symmetric(vertical: 20, horizontal: 12),
          label: Text(
            widget.title,
            style: const TextStyle(
                fontSize: 13, fontFamily: "SpecialElite", color: Colors.brown),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15),
            borderSide: const BorderSide(
              color: Colors.brown,
              width: 0.8,
            ),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15),
            borderSide: const BorderSide(color: Colors.brown, width: 1.7),
          ),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15),
            borderSide: const BorderSide(
              color: Colors.brown,
            ),
          ),
        ),
      ),
    );
  }
}
