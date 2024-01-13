import React, {FC} from 'react';
import styles from "./Button.module.css"

type PropsType = {
    handleClick: () => void
    isActive?: boolean
    isDisabled?: boolean
    children: React.ReactNode
}

const Button: FC<PropsType> = ({
                                   handleClick,
                                   isActive = false,
                                   isDisabled = false,
                                   children
                               }) => {
    let className = styles.button
    if (isActive) className = className + " " + styles.active;
    return (
        <button disabled={isDisabled} className={className} onClick={handleClick}>{children}</button>
    );
};

export default Button;