import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_DATA = [
	{
		id: "i1",
		title: "Sofa - double seater",
		price: 249.99,
		description: "A nice double seater sofa for your living room"
	},
	{
		id: "i2",
		title: "Samsung TV, 53 inches",
		price: 399.99,
		description: "53 inches smart tv with Netflix included"
	},
	{
		id: "i3",
		title: "Ninja",
		price: 79.99,
		description: "Ninja blender with smart features included"
	}
]

const context = DUMMY_DATA.map((item) => {
	return <ProductItem
		  key={item.id}
		  id={item.id}
          title={item.title}
          price={item.price}
          description={item.description}
        />
})

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
       {context}
      </ul>
    </section>
  );
};

export default Products;
