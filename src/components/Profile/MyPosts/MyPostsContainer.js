import React from 'react';
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/Profile-reducer";


let mapStateToProps = (state) => {
	return {
		posts: state.profilesPage.posts,
	}
}
let mapDispatchToProps = (dispatch) => {
	return {
		addPost: (AddPostBody) => dispatch(addPostActionCreator(AddPostBody))
	}
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;








