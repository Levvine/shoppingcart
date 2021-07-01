const Items = ({ items, addToCart, options, quantities, setQuantities }) => {
    const handleChange = (e) => {
        const qty = { ...quantities };
        qty[e.target.getAttribute('keyprop')] = parseInt(e.target.value);
        setQuantities(qty);
    }  

    return (
        <>
            {items.map(item => (
                <div className='item' key={item.id}>
                    <h3>
                        {item.text}
                        <select name='qty' keyprop={item.id} value={(quantities[item.id])} onChange={handleChange}>
                            {options.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </h3>
                    <p>
                        {item.price}
                        <button onClick={() => addToCart(item.id, quantities[item.id])}>Add to Cart</button>
                    </p>
                </div>
            ))}
        </>
    )
}

export default Items
