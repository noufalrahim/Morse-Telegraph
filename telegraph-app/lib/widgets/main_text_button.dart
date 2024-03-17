import 'package:flutter/material.dart';

class MainTextButtton extends StatelessWidget {
  final VoidCallback onPressed;
  final String title;

  bool isLoad;
  Color backColor;

  MainTextButtton({
    super.key,
    required this.onPressed,
    required this.title,
    this.backColor = const Color(0xFFBF3131),
    this.isLoad = false,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10),
      child: TextButton(
        style: TextButton.styleFrom(
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(17)),
          foregroundColor: Colors.white,
          backgroundColor: backColor,
        ),
        onPressed: onPressed,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 9),
          child: !isLoad
              ? Text(title)
              : const SizedBox(
                  height: 16,
                  width: 16,
                  child: Center(
                    child: CircularProgressIndicator(
                      strokeWidth: 2.5,
                      color: Colors.white,
                    ),
                  ),
                ),
        ),
      ),
    );
  }
}
