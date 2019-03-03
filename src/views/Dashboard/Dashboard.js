import React, {Component, lazy, Suspense} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {
    Badge,
    Button,
    ButtonDropdown,
    ButtonGroup,
    ButtonToolbar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Progress,
    Row,
    Table,
} from 'reactstrap';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities'
import {UsersService} from "../../services";

const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

// Card Chart 1
const cardChartData1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: brandPrimary,
            borderColor: 'rgba(255,255,255,.55)',
            data: [65, 59, 84, 84, 51, 55, 40],
        },
    ],
};

const cardChartOpts1 = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
        display: false,
    },
    scales: {
        xAxes: [
            {
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent',
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                },

            }],
        yAxes: [
            {
                display: false,
                ticks: {
                    display: false,
                    min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
                    max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
                },
            }],
    },
    elements: {
        line: {
            borderWidth: 1,
        },
        point: {
            radius: 4,
            hitRadius: 10,
            hoverRadius: 4,
        },
    }
}


// Card Chart 2
const cardChartData2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: brandInfo,
            borderColor: 'rgba(255,255,255,.55)',
            data: [1, 18, 9, 17, 34, 22, 11],
        },
    ],
};

const cardChartOpts2 = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
        display: false,
    },
    scales: {
        xAxes: [
            {
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent',
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                },

            }],
        yAxes: [
            {
                display: false,
                ticks: {
                    display: false,
                    min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
                    max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
                },
            }],
    },
    elements: {
        line: {
            tension: 0.00001,
            borderWidth: 1,
        },
        point: {
            radius: 4,
            hitRadius: 10,
            hoverRadius: 4,
        },
    },
};

// Card Chart 3
const cardChartData3 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,255,255,.2)',
            borderColor: 'rgba(255,255,255,.55)',
            data: [78, 81, 80, 45, 34, 12, 40],
        },
    ],
};

const cardChartOpts3 = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
        display: false,
    },
    scales: {
        xAxes: [
            {
                display: false,
            }],
        yAxes: [
            {
                display: false,
            }],
    },
    elements: {
        line: {
            borderWidth: 2,
        },
        point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
        },
    },
};

// Card Chart 4
const cardChartData4 = {
    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,255,255,.3)',
            borderColor: 'transparent',
            data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
        },
    ],
};

const cardChartOpts4 = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
        display: false,
    },
    scales: {
        xAxes: [
            {
                display: false,
                barPercentage: 0.6,
            }],
        yAxes: [
            {
                display: false,
            }],
    },
};


class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };


    }

    componentDidMount() {
        this.getUsers();
    }


    getUsers = async () => {
        try {
            const response = await UsersService.get();
            this.setState({
                users: Object.assign([], response.data)
            })
        } catch (error) {
            console.error('error', error);
        }
    }

    render() {
        const {users} = this.state;

        return (

            <div className="animated fadeIn">
                <Row>

                    <Col xs="12" sm="4" lg="4">
                        <Card className="text-white bg-primary">
                            <CardBody className="pb-0">

                                <div className="text-value">{users.length}</div>
                                <div>Total users</div>
                            </CardBody>
                            <div className="chart-wrapper mx-3" style={{height: '70px'}}>
                                <Line data={cardChartData1} options={cardChartOpts1} height={70}/>
                            </div>
                        </Card>
                    </Col>

                    <Col xs="12" sm="4" lg="4">
                        <Card className="text-white bg-warning">
                            <CardBody className="pb-0">
                                <ButtonGroup className="float-right">
                                    <Dropdown id='card3' isOpen={this.state.card3} toggle={() => {
                                        this.setState({card3: !this.state.card3});
                                    }}>
                                        <DropdownToggle caret className="p-0" color="transparent">
                                            <i className="icon-settings"></i>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>Action</DropdownItem>
                                            <DropdownItem>Another action</DropdownItem>
                                            <DropdownItem>Something else here</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </ButtonGroup>
                                <div className="text-value">23</div>
                                <div>Total groups</div>
                            </CardBody>
                            <div className="chart-wrapper" style={{height: '70px'}}>
                                <Line data={cardChartData3} options={cardChartOpts3} height={70}/>
                            </div>
                        </Card>
                    </Col>

                    <Col xs="12" sm="4" lg="4">
                        <Card className="text-white bg-danger">
                            <CardBody className="pb-0">
                                <ButtonGroup className="float-right">
                                    <ButtonDropdown id='card4' isOpen={this.state.card4} toggle={() => {
                                        this.setState({card4: !this.state.card4});
                                    }}>
                                        <DropdownToggle caret className="p-0" color="transparent">
                                            <i className="icon-settings"></i>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>Action</DropdownItem>
                                            <DropdownItem>Another action</DropdownItem>
                                            <DropdownItem>Something else here</DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                </ButtonGroup>
                                <div className="text-value">145</div>
                                <div>Total roles</div>
                            </CardBody>
                            <div className="chart-wrapper mx-3" style={{height: '70px'}}>
                                <Bar data={cardChartData4} options={cardChartOpts4} height={70}/>
                            </div>
                        </Card>
                    </Col>
                </Row>


                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                Users
                            </CardHeader>
                            <CardBody>
                                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                                    <thead className="thead-light">
                                    <tr>
                                        <th className="text-center"><i className="icon-people"></i></th>
                                        <th>User</th>
                                        <th className="text-center">Country</th>
                                        <th>Usage</th>
                                        <th className="text-center">Payment Method</th>
                                        <th>Activity</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="text-center">
                                            <div className="avatar">
                                                <img src={'assets/img/avatars/1.jpg'} className="img-avatar"
                                                     alt="admin@bootstrapmaster.com"/>
                                                <span className="avatar-status badge-success"></span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>Yiorgos Avraamu</div>
                                            <div className="small text-muted">
                                                <span>New</span> | Registered: Jan 1, 2015
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <i className="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i>
                                        </td>
                                        <td>
                                            <div className="clearfix">
                                                <div className="float-left">
                                                    <strong>50%</strong>
                                                </div>
                                                <div className="float-right">
                                                    <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                                                </div>
                                            </div>
                                            <Progress className="progress-xs" color="success" value="50"/>
                                        </td>
                                        <td className="text-center">
                                            <i className="fa fa-cc-mastercard" style={{fontSize: 24 + 'px'}}></i>
                                        </td>
                                        <td>
                                            <div className="small text-muted">Last login</div>
                                            <strong>10 sec ago</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">
                                            <div className="avatar">
                                                <img src={'assets/img/avatars/2.jpg'} className="img-avatar"
                                                     alt="admin@bootstrapmaster.com"/>
                                                <span className="avatar-status badge-danger"></span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>Avram Tarasios</div>
                                            <div className="small text-muted">

                                                <span>Recurring</span> | Registered: Jan 1, 2015
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <i className="flag-icon flag-icon-br h4 mb-0" title="br" id="br"></i>
                                        </td>
                                        <td>
                                            <div className="clearfix">
                                                <div className="float-left">
                                                    <strong>10%</strong>
                                                </div>
                                                <div className="float-right">
                                                    <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                                                </div>
                                            </div>
                                            <Progress className="progress-xs" color="info" value="10"/>
                                        </td>
                                        <td className="text-center">
                                            <i className="fa fa-cc-visa" style={{fontSize: 24 + 'px'}}></i>
                                        </td>
                                        <td>
                                            <div className="small text-muted">Last login</div>
                                            <strong>5 minutes ago</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">
                                            <div className="avatar">
                                                <img src={'assets/img/avatars/3.jpg'} className="img-avatar"
                                                     alt="admin@bootstrapmaster.com"/>
                                                <span className="avatar-status badge-warning"></span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>Quintin Ed</div>
                                            <div className="small text-muted">
                                                <span>New</span> | Registered: Jan 1, 2015
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <i className="flag-icon flag-icon-in h4 mb-0" title="in" id="in"></i>
                                        </td>
                                        <td>
                                            <div className="clearfix">
                                                <div className="float-left">
                                                    <strong>74%</strong>
                                                </div>
                                                <div className="float-right">
                                                    <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                                                </div>
                                            </div>
                                            <Progress className="progress-xs" color="warning" value="74"/>
                                        </td>
                                        <td className="text-center">
                                            <i className="fa fa-cc-stripe" style={{fontSize: 24 + 'px'}}></i>
                                        </td>
                                        <td>
                                            <div className="small text-muted">Last login</div>
                                            <strong>1 hour ago</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">
                                            <div className="avatar">
                                                <img src={'assets/img/avatars/4.jpg'} className="img-avatar"
                                                     alt="admin@bootstrapmaster.com"/>
                                                <span className="avatar-status badge-secondary"></span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>Enéas Kwadwo</div>
                                            <div className="small text-muted">
                                                <span>New</span> | Registered: Jan 1, 2015
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <i className="flag-icon flag-icon-fr h4 mb-0" title="fr" id="fr"></i>
                                        </td>
                                        <td>
                                            <div className="clearfix">
                                                <div className="float-left">
                                                    <strong>98%</strong>
                                                </div>
                                                <div className="float-right">
                                                    <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                                                </div>
                                            </div>
                                            <Progress className="progress-xs" color="danger" value="98"/>
                                        </td>
                                        <td className="text-center">
                                            <i className="fa fa-paypal" style={{fontSize: 24 + 'px'}}></i>
                                        </td>
                                        <td>
                                            <div className="small text-muted">Last login</div>
                                            <strong>Last month</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">
                                            <div className="avatar">
                                                <img src={'assets/img/avatars/5.jpg'} className="img-avatar"
                                                     alt="admin@bootstrapmaster.com"/>
                                                <span className="avatar-status badge-success"></span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>Agapetus Tadeáš</div>
                                            <div className="small text-muted">
                                                <span>New</span> | Registered: Jan 1, 2015
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <i className="flag-icon flag-icon-es h4 mb-0" title="es" id="es"></i>
                                        </td>
                                        <td>
                                            <div className="clearfix">
                                                <div className="float-left">
                                                    <strong>22%</strong>
                                                </div>
                                                <div className="float-right">
                                                    <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                                                </div>
                                            </div>
                                            <Progress className="progress-xs" color="info" value="22"/>
                                        </td>
                                        <td className="text-center">
                                            <i className="fa fa-google-wallet" style={{fontSize: 24 + 'px'}}></i>
                                        </td>
                                        <td>
                                            <div className="small text-muted">Last login</div>
                                            <strong>Last week</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">
                                            <div className="avatar">
                                                <img src={'assets/img/avatars/6.jpg'} className="img-avatar"
                                                     alt="admin@bootstrapmaster.com"/>
                                                <span className="avatar-status badge-danger"></span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>Friderik Dávid</div>
                                            <div className="small text-muted">
                                                <span>New</span> | Registered: Jan 1, 2015
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <i className="flag-icon flag-icon-pl h4 mb-0" title="pl" id="pl"></i>
                                        </td>
                                        <td>
                                            <div className="clearfix">
                                                <div className="float-left">
                                                    <strong>43%</strong>
                                                </div>
                                                <div className="float-right">
                                                    <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                                                </div>
                                            </div>
                                            <Progress className="progress-xs" color="success" value="43"/>
                                        </td>
                                        <td className="text-center">
                                            <i className="fa fa-cc-amex" style={{fontSize: 24 + 'px'}}></i>
                                        </td>
                                        <td>
                                            <div className="small text-muted">Last login</div>
                                            <strong>Yesterday</strong>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
            ;
    }
}

export default Dashboard;
