import React, { Component } from 'react';
import { Drawer } from 'antd';
import { connect } from 'react-redux';

class HeaderMobile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuDrawer: false,
        };
    } 

    handleShowMenuDrawer = () => {
        this.setState({
            menuDrawer: !this.state.menuDrawer
        });
    };

    handleDrawerClose = () => {
        this.setState({
            menuDrawer: false
        });
    };


    render() {
        return (
            <header className="header--mobile">
                <Drawer
                    className="ps-panel--mobile"
                    placement="right"
                    closable={false}
                    onClose={this.handleDrawerClose}
                    visible={this.state.menuDrawer}>
                    <div className="ps-panel--wrapper ">
                        <div className="ps-panel__header p-20 m-20">
                            <h3>Menu</h3>
                            <button className="btn btn-danger" onClick={this.handleDrawerClose}>
                                Cerrar
                            </button>
                        </div>
                        <div className="ps-panel__content">
                            <span>...</span>
                        </div>
                    </div>
                </Drawer>
                <div className="header__left">
                    <button className="ps-drawer-toggle" onClick={this.handleShowMenuDrawer}>
                        <i>
                            <img src={require('../../../../../assets/icons/list-solid.svg')} className="icon-w30" alt="" />
                        </i>
                    </button>
                </div>
                <div className="header__center">

                </div>
                <div className="header__right">
                    <a className="header__site-link" href="#">
                        <i>
                            <img src={require('../../../../../assets/icons/door-open-solid.svg')} className="icon-w30" alt="" />
                        </i>
                    </a>
                </div>
            </header>
        );
    }
    
}

const mapStateToProps = (state) => {
    return { setting: state.setting };
};
export default connect(mapStateToProps)(HeaderMobile);