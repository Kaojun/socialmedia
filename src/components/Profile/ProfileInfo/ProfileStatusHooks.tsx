import React, {ChangeEvent, useEffect, useState} from 'react'


type PropsType = {
	editMode:boolean
	status:string
	updateStatus: (newStatus:string) => void

}

const ProfileStatusHooks = (props:PropsType) => {




	let [editMode , setEditMode] = useState(false)          // едитмод = фолс / сетедитмод -фукнция,меняеет едитмод
	let [status , setStatus] = useState(props.status)       //статус = пустая строка из стейта  , сет статус меняет её

	useEffect ( () =>{                         // при приходе статуса с сервера он сетится в стейт и перерисовывает
		setStatus(props.status)
	}, [props.status])                    // если оставить [] то будет эффект как у componentDidMount

	const activateMode = () => {
		setEditMode(true)
	}
	const deactivateMode = () => {
		setEditMode(false)
		props.updateStatus(status)
	}
	const onStatusChange = (e:ChangeEvent<HTMLInputElement>) =>{
		setStatus(e.currentTarget.value)
	}


		return (
			<div>
				{ !editMode &&
				<div>
				 <b>Status</b>	<span onDoubleClick={activateMode}>  {props.status || "----"} </span>
				</div>
				}
				{editMode &&  <div> <input autoFocus={true}
																	 onChange={onStatusChange}
																	 onBlur={deactivateMode}
				value={status}/>
				</div>
				}
			</div>
		)
	}

export default ProfileStatusHooks;