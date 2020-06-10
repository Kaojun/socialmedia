import React from 'react'
import {connect} from "react-redux";
import {followThunkCreator, getUsersThunkCreator, unfollowThunkCreator,} from "../../redux/Users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUser} from "../../redux/users-selectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";


type MapStatePropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    users: Array<UserType>
    followingInProgress: Array<number>
}
type MapDispatchPropsType = {
    unfollowThunkCreator: (userId:number) => void
    followThunkCreator: (userId:number) => void
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
}
type OwnProps = {
    pageTitle : string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnProps


class UsersAPIcomponent extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsersThunkCreator(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.getUsersThunkCreator(pageNumber, pageSize)
    }

    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   followingInProgress={this.props.followingInProgress}
                   followThunkCreator={this.props.followThunkCreator}
                   unfollowThunkCreator={this.props.unfollowThunkCreator}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType):MapStatePropsType => {
    return {
        users: getUser(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}
//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State
export default compose(
    connect<MapStatePropsType,MapDispatchPropsType,OwnProps,AppStateType> (mapStateToProps, {getUsersThunkCreator, followThunkCreator, unfollowThunkCreator})
)
(UsersAPIcomponent)
