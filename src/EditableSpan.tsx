import React, {ChangeEvent, FC, useState} from 'react';

type TProps = {
    title: string
    onChangeHandler: (title: string) => void
}
export const EditableSpan: FC<TProps> = ({title, onChangeHandler}) => {
    const [newTitle, setNewTitle] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    const enableIsEdit = () => {
        setNewTitle(title)
        setIsEdit(true)
    }
    const disableIsEdit = () => {
        onChangeHandler(newTitle);
        setIsEdit(false);
    }

    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (isEdit
            ? (<input value={newTitle}
                      onBlur={disableIsEdit}
                      autoFocus type="text"
                      onChange={changeInputHandler}/>)
            : (<span onDoubleClick={enableIsEdit}>{title}</span>)
    )
};


