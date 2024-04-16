import React from 'react'

import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/Tictactoe">Tictactoe</Link>
            <Link to="/Chess">Chess</Link>
          </div>
        </div>
      </section>
    </nav>
  )
}