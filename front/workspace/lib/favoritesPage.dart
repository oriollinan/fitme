import 'package:flutter/material.dart';
import 'package:just_friends/main.dart';


class favoritePage extends StatelessWidget {
  final List<String> favorite;

  favoritePage({required this.favorite});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Favorite'),
      ),
      body: ListView.builder(
        itemCount: favorite.length,
        itemBuilder: (context, index) {
          final product = favorite[index];
          return ListTile(
            title: Text(product),
          );
        },
      ),
    );
  }
}
