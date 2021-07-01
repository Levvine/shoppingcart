import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = ({ title, links, routes, nCart }) => {
    const location = useLocation();

    const [navBarLinks] = useState([[links.HOME, routes.HOME], [links.CART, routes.CART]]);

    return (
        <header className='header'>
            <h1>{title}</h1>       
            {navBarLinks.map(([link, route]) => (
                <Link to={route} key={link}>
                    <button className={`btn ${location.pathname === route && 'onPage'}`}>
                            {/* Shows label as Cart(n) if greater than 0 items in cart */}
                            {link} {link === links.CART && nCart() ? `(${nCart()})` : ''}
                    </button>
                </Link>
            ))}
        </header>
    )
}

Header.defaultProps = {
    title: 'My Shop'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,

}

export default Header
