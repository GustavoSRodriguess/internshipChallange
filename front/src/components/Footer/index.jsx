import React from 'react'
import github from '../../images/github.png'
import linkedin from '../../images/linkedin.png'
import './index.css'

export const Footer = () => {
  return (
    <footer>
        Made by Gustavo Schneider Rodrigues in SoftExper<br/>
        <a href='https://github.com/GustavoSRodriguess'><img src={github}/></a>
        <a href='https://github.com/GustavoSRodriguess'><img src={linkedin}/></a>
    </footer>
  )
}
