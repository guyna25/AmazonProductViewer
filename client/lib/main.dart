import 'package:easy_search_bar/easy_search_bar.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const AppBase());
}

class AppBase extends StatefulWidget {
  const AppBase({Key? key}) : super(key: key);

  @override
  State<AppBase> createState() => _AppBaseState();
}

class _AppBaseState extends State<AppBase> {
  String searchValue = '';
  final List<String> _suggestions = [
    'Ducks',
    'Lotion',
  ];

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Price Comparison',
        theme: ThemeData(primarySwatch: Colors.orange),
        home: Scaffold(
            appBar: EasySearchBar(
                title: const Text('Enter product name'),
                onSearch: (value) => setState(() => searchValue = value),
                suggestions: _suggestions),
            drawer: Drawer(
                child: ListView(padding: EdgeInsets.zero, children: [
              const DrawerHeader(
                decoration: BoxDecoration(
                  color: Colors.blue,
                ),
                child: Text('Drawer Header'),
              ),
              ListTile(
                  title: const Text('Item 1'),
                  onTap: () => Navigator.pop(context)),
              ListTile(
                  title: const Text('Item 2'),
                  onTap: () => Navigator.pop(context))
            ])),
            body: Center(child: Text('Value: $searchValue'))));
  }
}
