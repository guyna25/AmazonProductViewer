import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';

class ProductItem extends StatelessWidget {
  final Map<String, String> product;
  const ProductItem({
    Key? key,
    required this.product,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(10.0),
      // height: 150.0,
      // width: 200.0,
      child: Column(
        children: [
          SizedBox(
            height: 100,
            width: 100,
            child: Image.network(
              product["image"]!,
              fit: BoxFit.cover,
            ),
          ),
          const SizedBox(
            height: 5,
          ),
          SizedBox(
            height: 30,
            width: 100,
            child: Text(
              product["name"]!,
              maxLines: 1,
              overflow: TextOverflow.clip,
            ),
          ),
          Text(
            product["quantity"]!,
            maxLines: 1,
          ),
          Text(
            product["price"]!,
            maxLines: 1,
          ),
          RatingBar.builder(
            initialRating: (double.parse(product["rating"]!) * 2).round() / 2,
            minRating: 0,
            direction: Axis.horizontal,
            allowHalfRating: true,
            itemCount: 5,
            itemSize: 30.0,
            itemPadding: const EdgeInsets.symmetric(horizontal: 4.0),
            itemBuilder: (context, _) => const Icon(
              Icons.star,
              color: Colors.amber,
            ),
            onRatingUpdate: (rating) {
              print(rating);
            },
          ),
        ],
      ),
    );
  }
}
