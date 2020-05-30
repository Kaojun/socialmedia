import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/Profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

class ProfileContainer extends React.Component {
	componentDidMount() {

		let userId = this.props.match.params.userId;
		if (!userId) {                           // если приходит !undef , то фолс и хардкод логин юсера
			userId = this.props.AuthUserId
			if (!userId) {
				this.props.history.push("/login")
			}
		}
		this.props.getUserProfile(userId)
		this.props.getStatus(userId)
	}

	render() {
		return <div>
			<Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
			}
		</div>
	}
}


let mapStateToProps = (state) => ({
	profile: state.profilesPage.profile,
	status: state.profilesPage.status,
	AuthUserId: state.auth.userId
})

export default compose(withRouter,
	connect(mapStateToProps,
		{getUserProfile ,getStatus , updateStatus})

	)
(ProfileContainer)