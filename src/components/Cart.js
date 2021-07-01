const Cart = ({ cart, changeCartQuantity }) => {
    const options = () => {
        const optsArr = [];

        optsArr.push('0 (Delete)')
        for (let i = 1; i <= 100; i++) {
            optsArr.push(i);
        }
        return optsArr;
    }

    const handleChange = (e) => {
        const id = parseInt(e.target.getAttribute('keyprop'));
        const count = parseInt(e.target.value);

        changeCartQuantity(id, count);
    }

    const onClick = (e) => {
        const id = parseInt(e.target.getAttribute('keyprop'));
        changeCartQuantity(id, 0);
    }

    const subTotal = () => {
        let subT = 0;
        for (const { item, count } of cart) {
            const price = parseFloat(item.price.match(/(\d*)\.(\d+)/)) * count;
            subT += price;
        }
        return subT.toLocaleString();
    }

    return (
        <>
            {cart.map(({ item, count }) => (
                <div className='item' key={item.id}>
                    <h3>
                        {item.text}
                        <select name='qty' keyprop={item.id} value={count} onChange={handleChange}>
                            {options(count).map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </h3>
                    <p>
                        {item.price}
                        <button className='delete' keyprop={item.id} onClick={onClick}>Remove from Cart</button>
                    </p>
                </div>
                
            ))}
            <div id='totals'>
                <h3>Subtotal: </h3>
                <h3 id='subtotal'>${subTotal()}</h3>
            </div>
        </>
    )
}

export default Cart
