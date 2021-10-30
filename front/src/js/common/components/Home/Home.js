import React, { Component } from "react";
import DefaultHeader from "../layout/Header/DefaultHeader";
import { connect } from "react-redux";
import { api } from "../../../utility/api";
import LoadMask from "../Utils/LoadMask/LoadMask";
import moment from "moment";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.handleLoader();
    }

    handleLoader = () => {
        setTimeout(() => this.setState({ loader: false }), 1000);
    };




    render() {
        const data = this.state.dashboard;
        return (
            <div>
                <DefaultHeader title="Dashboard" visible={true} />
                {this.state.loader ? (
                    <LoadMask loading={this.state.loader} dark></LoadMask>
                ) : (
                    <div>
                        <div
                            className="container"
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center"
                            }}
                        >
                            {/*Content here!*/}
                        </div>
                        <hr />
                        <section className="ps-dashboard">
                            <div
                                className="container"
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "space-evenly"
                                }}
                            >
                                {/*Content here!*/}
                            </div>
                        </section>
                    </div>
                )}
            </div>
        );
    }
}

const ms2p = (state) => ({ ...state });


export default connect(ms2p, null)(Home);
