import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import {actions} from '../../../../redux/modules/cuenta/profile'

class MenuSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seleccionado: '/',
            estado:'1',
        };
    }
 
    componentDidMount() {
    this.handleInit()    
    }    


    handleSetActive = (ruta) => {
        this.setState({seleccionado:`${ruta.url}`})
    }


    handleInit = () => {
    const get_ruta = location.href.split("/");
    let route = get_ruta[get_ruta.length - 1];
    this.setState({seleccionado:`${route}`})
       
    }



    render() {
        const menuItems = [
            {
                text: 'Dashboard',
                url: '/',
                icon: 'icon-home',
                id: '1'
            },
            {
                text: 'Solicitudes de retiro',
                url: '/solicitudes',
                icon: 'icon-cash-dollar',
                id: '2'
            },
            {
                text: 'Familias & Categorías',
                url: '/familias-list',
                icon: 'icon-library',
                id: '7'
            },
            {
                text: 'Catalogo',
                url: '/productos',
                icon: 'icon-database',
                id: '3'
            },
            {
                text: 'Vendedores',
                url: '/vendedores',
                icon: 'icon-users',
                id: '4'
            },
            {
                text: 'Logs',
                url: '/bitacora-list',
                icon: 'icon-book',
                id: '6'
            },
            {
                text: 'Ajustes',
                url: '/ajustes',
                icon: 'icon-cog',
                id: '5'
            },
        ];
        return (
            <React.Fragment>
                <ul className="menu">
                    {menuItems.map((item, index) => (
                        <li key={index} className={this.state.seleccionado === item.url ? 'active' : ''}>
                    <Link 
                        to={item.url} 
                        onClick={this.handleSetActive.bind(
                            this,
                            item
                        )}
                    >
                    <i className={item.icon}></i>
                    {item.text}       
                    </Link>
                        </li>
                    ))}
                </ul>
            </React.Fragment>
        );
    }
}

const ms2p = (state) => {
    return state.profile;
  };

const md2p = {...actions}
  
export default connect(ms2p ,md2p)(MenuSidebar);

