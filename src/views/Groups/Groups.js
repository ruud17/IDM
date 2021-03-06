import React, {Component, lazy, Suspense} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import Select from 'react-select';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Table,
} from 'reactstrap';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities'
import {GroupsService, RolesService, UsersService, ProvidersService} from "../../services";


const brandPrimary = getStyle('--primary')
const brandInfo = getStyle('--info')

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

const emptyGroupObj = {
    name: "",
    service: ''
}

class Groups extends Component {
    constructor(props) {
        super(props);


        this.state = {
            users: [],
            roles: [],
            groups: [],
            services: [],
            selectedGroup: emptyGroupObj,
            // selectedGroupUsers: [],

        };
    }

    componentDidMount() {
        this.getUsers();
        this.getGroups();
        this.getRoles();
        this.getServices();
    }

    getUsers = async () => {
        try {
            const response = await UsersService.get();
            this.setState({
                users: Object.assign([], response.data),
                selectedUser: Object.assign({}, response.data[0])
            })
        } catch (error) {
            console.error('error', error);
        }
    }

    getGroups = async () => {
        try {
            const response = await GroupsService.get();
            this.setState({
                groups: Object.assign([], response.data)
            })
        } catch (error) {
            console.error('error', error);
        }
    }

    getRoles = async () => {
        try {
            const response = await RolesService.get();
            this.setState({
                roles: Object.assign([], response.data)
            })
        } catch (error) {
            console.error('error', error);
        }
    }

    getServices = async () => {
        try {
            const response = await ProvidersService.get();
            this.setState({
                services: Object.assign([], response.data)
            })
        } catch (error) {
            console.error('error', error);
        }
    }

    selectGroup = (gr) => {
        this.setState({
            selectedGroup: Object.assign({}, gr)
        })
    }

    selectService = (selectedService) => {
        let selectedGroup = Object.assign({}, this.state.selectedGroup);
        selectedGroup.service = selectedService;
        this.setState({selectedGroup});
    }

    addNewGroup = () => {
        this.setState({
            selectedGroup: Object.assign({}, emptyGroupObj)
        })
    }

    handleInputGroupNameChange = (e) => {
        let selectedGroup = Object.assign({}, this.state.selectedGroup);
        selectedGroup.name = e.target.value;
        this.setState({selectedGroup});
    }

    saveGroupChanges = async (group) => {
        try {
            const response = group.id ? GroupsService.update(group.id, group) : await GroupsService.add(group);
            this.getGroups();
            console.log('Group successfully created/updated', response)
        } catch (error) {
            console.error('error', error);
        }
    }

    saveGroup = () => {
        const {selectedGroup} = this.state;
        let groupObj = {
            "name": selectedGroup.name,
            "serviceId": selectedGroup.service.id,
            "accountId": "9ff6e2fa-d0c6-481a-8513-45023cf7b881" // for demo purpose
        }
        if (selectedGroup.id) { // edit
            groupObj.id = selectedGroup.id;
        }
        this.saveGroupChanges(groupObj);
        this.addNewGroup(); //reset form
    }

    deleteGroup = async () => {
        try {
            const response = await GroupsService.delete(this.state.selectedGroup.id);
            this.getGroups();
            this.addNewGroup(); //reset form
            console.log('Group successfully deleted', response)
        } catch (error) {
            console.error('error', error);
        }
    }

    render() {
        const {users, selectedGroup, groups, roles, services} = this.state;

        return (

            <div className="animated fadeIn">
                <Row>

                    <Col xs="12" sm="4" lg="4">
                        <Card className="text-white bg-primary">
                            <CardBody className="pb-0">
                                <div className="text-value">
                                    <small>Total users:</small>
                                    {users.length}</div>
                            </CardBody>
                            <div className="chart-wrapper mx-3" style={{height: '70px'}}>
                                <Line data={cardChartData1} options={cardChartOpts1} height={70}/>
                            </div>
                        </Card>
                    </Col>

                    <Col xs="12" sm="4" lg="4">
                        <Card className="text-white bg-danger">
                            <CardBody className="pb-0">
                                <div className="text-value">
                                    <small>Total roles:</small>
                                    {roles.length}</div>
                            </CardBody>
                            <div className="chart-wrapper mx-3" style={{height: '70px'}}>
                                <Bar data={cardChartData4} options={cardChartOpts4} height={70}/>
                            </div>
                        </Card>
                    </Col>

                    <Col xs="12" sm="4" lg="4">
                        <Card className="text-white bg-warning">
                            <CardBody className="pb-0">
                                <div className="text-value">
                                    <small>Total groups:</small>
                                    {groups.length}</div>
                            </CardBody>
                            <div className="chart-wrapper" style={{height: '70px'}}>
                                <Line data={cardChartData3} options={cardChartOpts3} height={70}/>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12" sm="6" lg="6">
                        <Card>
                            <CardHeader>
                                Groups
                                <button className="btn btn-outline-primary btn-block btn-sm col-2 float-right"
                                        onClick={this.addNewGroup}>Add new</button>
                            </CardHeader>
                            <CardBody>
                                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                                    <thead className="thead-light">
                                    <tr>
                                        <th className="text-center"><i className="icon-list"></i></th>
                                        <th>Groups</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {groups.map(gr =>
                                        <tr key={gr.id}
                                            className={selectedGroup.id === gr.id ? 'selected-user-row' : null}
                                            onClick={() => this.selectGroup(gr)}>
                                            <td className="text-center">
                                                <div className="avatar">
                                                    <img src={'assets/img/avatars/users.png'} className="img-avatar"
                                                         alt="admin@bootstrapmaster.com"/>
                                                </div>
                                            </td>
                                            <td>
                                                <div>{gr.name || '-'}</div>
                                                <div className="small text-muted">
                                                    Id: {gr.id}
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="6">
                        <Card>
                            <CardHeader>
                                Group settings
                            </CardHeader>

                            <CardBody>
                                <div className="card">
                                    <div className="card-header">
                                        <strong>{selectedGroup.id ? `Edit "${selectedGroup.name}" group` : "Add new group"}</strong>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="name" className="">Name</label>
                                                    <input id="name" placeholder="Enter group name"
                                                           type="text" className="form-control"
                                                           value={selectedGroup.name}
                                                           onChange={this.handleInputGroupNameChange}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="services" className="">Service</label>
                                                    <Select
                                                        value={selectedGroup.service}
                                                        onChange={(item) => this.selectService(item)}
                                                        options={services}
                                                        getOptionValue={(item) => item.id}
                                                        getOptionLabel={(item) => item.name}
                                                    /></div>
                                            </div>
                                        </div>
                                        {/*{selectedGroup.id && (<div className="row">*/}
                                        {/*<div className="col-12">*/}
                                        {/*<div className="position-relative form-group">*/}
                                        {/*<label htmlFor="groups" className="">Users</label>*/}
                                        {/*<Select*/}
                                        {/*value={selectedUserGroups}*/}
                                        {/*//modify this*/}
                                        {/*onChange={(item, opt) => this.updateUserGroups(item, opt.option)}*/}
                                        {/*options={users}*/}
                                        {/*getOptionValue={(item) => item.id}*/}
                                        {/*getOptionLabel={(item) => item.username}*/}
                                        {/*isMulti*/}
                                        {/*/></div>*/}
                                        {/*</div>*/}
                                        {/*</div>)}*/}
                                        <div className="row">
                                            <div className="col-12 flex-grow-0">
                                                <div className="position-relative form-group editor-buttons">
                                                    <div>
                                                        <button className="btn btn-success btn-block btn-sm"
                                                                onClick={this.saveGroup}>Save
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <button className="btn btn-danger btn-block btn-sm"
                                                                onClick={this.deleteGroup}>Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Groups;
