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
import {GroupsService, RolesService, UsersService} from "../../services";


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


class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            selectedUser: {},
            selectedUserGroups: [],
            selectedUserRoles: [],
            groups: [],
            roles: []
        };
    }

    componentDidMount() {
        this.getUsers();
        this.getGroups();
        this.getRoles();
    }

    getUsers = async () => {
        try {
            const response = await UsersService.get();
            console.log('response', response);
            this.getUserRoles(response.data[0].id); // mark first user
            this.getUserGroups(response.data[0].id);

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

    getUserRoles = async (id) => {
        try {
            const response = await UsersService.getUserRoles(id);
            this.setState({
                selectedUserRoles: Object.assign([], response.data)
            })
        } catch (error) {
            console.error('error', error);
        }
    }

    getUserGroups = async (id) => {
        try {
            const response = await UsersService.getUserGroups(id);
            this.setState({
                selectedUserGroups: Object.assign([], response.data)
            })
        } catch (error) {
            console.error('error', error);
        }
    }

    selectUser = (user) => {
        this.getUserRoles(user.id);
        this.getUserGroups(user.id);
        this.setState({
            selectedUser: Object.assign({}, user)
        })
    }

    deleteUser = async ()=>{
        try {
            const response = await UsersService.delete(this.state.selectedUser.id);
            this.getUsers();
        } catch (error) {
            console.error('error', error);
        }
    }

    addUserRole = async (allRoles, selectedRole)=>{
        try {
            const response = await UsersService.addUserRole(this.state.selectedUser.id, selectedRole);
            this.getUserRoles(this.state.selectedUser.id);
        } catch (error) {
            console.error('error', error);
        }
    }

    addUserGroup = async (allGroups, selectedGroup)=>{
        try {
            const response = await UsersService.addUserGroup(this.state.selectedUser.id, selectedGroup);
            this.getUserGroups(this.state.selectedUser.id);
        } catch (error) {
            console.error('error', error);
        }
    }

    render() {
        const {users, selectedUser, groups, roles, selectedUserGroups, selectedUserRoles} = this.state;

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
                                Users
                            </CardHeader>
                            <CardBody>
                                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                                    <thead className="thead-light">
                                    <tr>
                                        <th className="text-center"><i className="icon-people"></i></th>
                                        <th>User</th>
                                        <th className="text-center">Username</th>
                                        <th>Email</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.map(user =>
                                        <tr key={user.id}
                                            className={selectedUser.id === user.id ? 'selected-user-row' : null}
                                            onClick={() => this.selectUser(user)}>
                                            <td className="text-center">
                                                <div className="avatar">
                                                    <img src={'assets/img/avatars/1.jpg'} className="img-avatar"
                                                         alt="admin@bootstrapmaster.com"/>
                                                    <span className="avatar-status badge-success"></span>
                                                </div>
                                            </td>
                                            <td>
                                                <div>{user.firstName || '-'} {user.lastName || '-'}</div>
                                                <div className="small text-muted">
                                                    Registered: {user.createDate}
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                {user.username || '-'}
                                            </td>
                                            <td>
                                                {user.email || '-'}
                                            </td>
                                            {/*<i className="fa fa-remove fa-lg"></i>*/}
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
                                Edit user
                            </CardHeader>
                            <CardBody>
                                <div className="card">
                                    <div className="card-header"><strong>{selectedUser.username}</strong>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="roles" className="">Roles</label>
                                                    <Select
                                                        value={selectedUserRoles}
                                                        onChange={(item, opt) => this.addUserRole(item, opt.option)}
                                                        options={roles}
                                                        getOptionValue={(item) => item.id}
                                                        getOptionLabel={(item) => item.name}
                                                        isMulti
                                                    /></div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="position-relative form-group">
                                                    <label htmlFor="groups" className="">Groups</label>
                                                    <Select
                                                        value={selectedUserGroups}
                                                        onChange={(item, opt) => this.addUserGroup(item, opt.option)}
                                                        options={groups}
                                                        getOptionValue={(item) => item.id}
                                                        getOptionLabel={(item) => item.name}
                                                        isMulti
                                                    /></div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4">
                                                <small className="text-info">Changes are automatically saved</small>
                                            </div>
                                            <div className="col-8">
                                                <div className="position-relative form-group col-3 float-md-right p-0">
                                                    <button aria-pressed="true"
                                                            className="btn btn-danger btn-block btn-sm" onClick={this.deleteUser}>Delete
                                                    </button>
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

export default Users;
